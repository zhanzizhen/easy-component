import * as vscode from "vscode";
import defaultConfigStr from "./defaultConfig";

export default function activate(context: vscode.ExtensionContext) {
  const { workspace, Uri, window } = vscode;
  // user's input name
  let componentName = "";
  let config = {};
  // the first file we create
  let firstFileUri: vscode.Uri;

  function transStrToUnit8(value: string): Uint8Array {
    return new Uint8Array(Buffer.from(value));
  }

  function resolvePath(fileName: string): vscode.Uri {
    return Uri.parse("file://" + "/" + workspace.rootPath + "/" + fileName);
  }

  async function handleAfterRegister() {
    // parse the config object to files
    async function parseObject(obj: object, prePath: string) {
      const entries = Object.entries(obj);
      for (const [key, value] of entries) {
        const pathName = prePath + "/" + key;
        if (typeof value === "object") {
          await parseObject(value, pathName);
        } else {
          const fileUri = resolvePath(replaceTemplate(pathName));
          const data = transStrToUnit8(replaceTemplate(value));
          if (!firstFileUri) {
            firstFileUri = fileUri;
          }
          await workspace.fs.writeFile(fileUri, data);
        }
      }
    }

    function replaceTemplate(value: string): string {
      return value.replace(/{{Name}}/g, componentName);
    }

    async function handdleError(e: any) {
      // easy-component.config is not found
      if (e.code === "MODULE_NOT_FOUND") {
        const fileUri = resolvePath("easy-component.config.js");
        await workspace.fs.writeFile(
          fileUri,
          transStrToUnit8(defaultConfigStr)
        );
        await window.showTextDocument(fileUri, {
          preserveFocus: true
        });
        window.showErrorMessage("请先配置easy-component.config.js");
      } else {
        window.showErrorMessage(e);
      }
    }

    // create components files now
    async function createFiles() {
      await parseObject(config, "");
      if (firstFileUri) {
        window.showTextDocument(firstFileUri, {
          preserveFocus: true
        });
        window.showInformationMessage("已在根目录生成组件模板!");
      }
    }

    try {
      const path = workspace.rootPath + "/" + "easy-component.config.js";
      // use commonjs to load config
      config = require(path);
    } catch (e) {
      handdleError(e);
      return;
    }

    const fileName = await window.showInputBox({
      placeHolder: "会替换配置文件的{{Name}}",
      prompt: "输入组件的名字"
    });

    // if the user's input is not empty or canceled
    if (fileName) {
      componentName = fileName;
      createFiles();
    }
  }

  const disposable = vscode.commands.registerCommand(
    // The command has been defined in the package.json file
    "extension.createComponent",
    handleAfterRegister
  );

  context.subscriptions.push(disposable);
}
