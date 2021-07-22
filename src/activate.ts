import * as vscode from "vscode";
import defaultConfigStr from "./defaultConfig";
import utils from "./utils";

const CONFIG_FILE_PATH = ".vscode/easy-component.js";

const { workspace, window } = vscode;
// user's input name
let componentName = "";

let creator: Creator;
// the first file we create
let firstFileUri: vscode.Uri;
/** easy-component.js default export */
let config: Config;

/**
 * @description vscode plugin entry
 */
export default function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    // The command has been defined in the package.json file
    "extension.createComponent",
    showInputs
  );

  context.subscriptions.push(disposable);
}

/**
 * @fires createFiles
 * @description show inputs/selects to user
 */
async function showInputs() {
  await loadConfigFile();
  try {
    validateConfigFile(config);
  } catch (e) {
    window.showErrorMessage(e.message);
    return;
  }

  // show input
  const fileName = await window.showInputBox({
    placeHolder: `会根据${CONFIG_FILE_PATH}的配置来生成文件`,
    prompt: "输入组件的名字",
  });

  if (Array.isArray(config)) {
    const chooseLabel = await window.showQuickPick(
      config.map((item) => item.label)
    );
    creator = config.find((item) => item.label === chooseLabel)!.creator;
  } else {
    creator = config;
  }

  // if the user's input is not empty or canceled
  if (fileName && creator) {
    componentName = fileName;
    createFiles();
  }
}

async function loadConfigFile() {
  const { workspaceFolders } = workspace;
  if (workspaceFolders === undefined) {
    window.showErrorMessage("工作区不能为空");
    return;
  }

  if (workspaceFolders.length > 1) {
    window.showWarningMessage("当前工作区有多个项目，默认选择第一个项目");
  }
  try {
    const configPath = workspaceFolders[0].uri.fsPath + "/" + CONFIG_FILE_PATH;
    // use commonjs to load config
    config = require(configPath);
  } catch (e) {
    // easy-component.config is not found
    if (e.code === "MODULE_NOT_FOUND") {
      const fileUri = utils.resolveRootPath(CONFIG_FILE_PATH);
      await workspace.fs.writeFile(
        fileUri,
        utils.transStrToUnit8(defaultConfigStr)
      );

      await window.showTextDocument(fileUri, {
        preserveFocus: true,
      });

      window.showWarningMessage("请先配置easy-component.js");

      loadConfigFile();
    } else {
      window.showErrorMessage(e.message);
    }
  }
}

function validateConfigFile(config: Config) {
  if (typeof config === "function") {
  } else if (Array.isArray(config)) {
    if (config.some((item) => typeof item !== "object")) {
      throw Error("easy-component.js的导出数组格式错误");
    }
    if (config.some((item) => !item.label)) {
      throw new Error("easy-component.js的导出缺少label字段");
    }
  } else {
    throw new Error("easy-component.js要么是个函数要么是个数组");
  }
}

// create components files now
async function createFiles() {
  function getFileContentByFunction(creator: (v: string) => string): string {
    return creator(componentName);
  }

  // create files now
  async function parseConfig(obj: FileStructure, prePath: string) {
    const entries = Object.entries(obj);

    for (const [dirName, value] of entries) {
      const pathName = prePath + "/" + dirName;

      if (typeof value === "function" || typeof value === "string") {
        const fileUri = utils.resolveRootPath(pathName);
        const data = utils.transStrToUnit8(
          typeof value === "function" ? getFileContentByFunction(value) : value
        );

        if (!firstFileUri) {
          firstFileUri = fileUri;
        }

        await workspace.fs.writeFile(fileUri, data);
      } else {
        await parseConfig(value, pathName);
      }
    }
  }

  await parseConfig(creator(componentName), "");

  if (firstFileUri) {
    // after creating files, make the vscode window focus on the frist created file
    window.showTextDocument(firstFileUri, {
      preserveFocus: true,
    });
    window.showInformationMessage("已在当前根目录生成组件模板，请查看");
  }
}
