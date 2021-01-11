import * as vscode from "vscode";
import defaultConfigStr from "./defaultConfig";

const CONFIG_FILE_PATH = ".vscode/easy-component.js";

const { workspace, Uri, window } = vscode;
// user's input name
let componentName = "";
type Config = { [key: string]: string | ((v: string) => string) | Config };
// easy-component.js
let configFunc: (v: string) => Config;
// the first file we create
let firstFileUri: vscode.Uri;

function transStrToUnit8(value: string): Uint8Array {
  return new Uint8Array(Buffer.from(value));
}

function resolveRootPath(fileName: string): vscode.Uri | never {
  const { workspaceFolders } = workspace;
  if (workspaceFolders === undefined) {
    window.showErrorMessage("工作区不能为空");
    throw new Error("workspaceFolders is empty");
  }
  const filePath: string = workspaceFolders[0].uri.toString() + "/" + fileName;
  return Uri.parse(filePath);
}

// parse the config object to files
async function parseObject(obj: Config, prePath: string) {
  const entries = Object.entries(obj);
  for (const [key, value] of entries) {
    const pathName = prePath + "/" + key;
    if (typeof value === "function" || typeof value === "string") {
      const fileUri = resolveRootPath(pathName);
      const data = transStrToUnit8(
        typeof value === "function" ? getFileContentByFunction(value) : value
      );
      if (!firstFileUri) {
        firstFileUri = fileUri;
      }
      await workspace.fs.writeFile(fileUri, data);
    } else {
      await parseObject(value, pathName);
    }
  }
}

function getFileContentByFunction(fn: (v: string) => string): string {
  return fn(componentName);
}

async function onConfigFileError(e: any) {
  // easy-component.config is not found
  if (e.code === "MODULE_NOT_FOUND") {
    const fileUri = resolveRootPath(CONFIG_FILE_PATH);
    await workspace.fs.writeFile(fileUri, transStrToUnit8(defaultConfigStr));
    await window.showTextDocument(fileUri, {
      preserveFocus: true,
    });
    window.showErrorMessage("请先配置easy-component.js");
  } else {
    window.showErrorMessage(e.message);
  }
}

// create components files now
async function createFiles() {
  await parseObject(configFunc(componentName), "");
  if (firstFileUri) {
    // after creating files, make the vscode window focus on the frist created file
    window.showTextDocument(firstFileUri, {
      preserveFocus: true,
    });
    window.showInformationMessage("已在当前根目录生成组件模板，请查看");
  }
}

async function handleAfterRegisterCommand() {
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
    configFunc = require(configPath);
    if (typeof configFunc !== "function") {
      throw new Error("easy-component.js输出的不是一个函数");
    }
  } catch (e) {
    onConfigFileError(e);
    return;
  }

  // show input
  const fileName = await window.showInputBox({
    placeHolder: `会根据${CONFIG_FILE_PATH}来生成文件`,
    prompt: "输入组件的名字",
  });

  // if the user's input is not empty or canceled
  if (fileName) {
    componentName = fileName;
    createFiles();
  }
}

export default function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    // The command has been defined in the package.json file
    "extension.createComponent",
    handleAfterRegisterCommand
  );

  context.subscriptions.push(disposable);
}
