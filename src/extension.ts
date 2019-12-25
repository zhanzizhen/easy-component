import * as vscode from "vscode";
import defaultConfig from "./defaultConfig";

const {
  env: { appRoot },
  workspace: { fs },
  Uri,
  window
} = vscode;
const resolvePath = (pathName: string) =>
  Uri.parse("file://" + "/" + appRoot + "/" + pathName);
function transStrToUnit8(value: string) {
  return new Uint8Array(Buffer.from(value));
}

export function activate(context: vscode.ExtensionContext) {
  let componentName = "";
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    async () => {
      async function parseObject(obj: object, prePath: string) {
        const entries = Object.entries(obj);
        for (let [key, value] of entries) {
          const pathName = prePath + "/" + key;
          if (typeof value === "object") {
            await parseObject(value, pathName);
          } else {
            const fileUri = resolvePath(replaceTemplate(pathName));
            const data = transStrToUnit8(replaceTemplate(value));
            await fs.writeFile(fileUri, data);
          }
        }
      }

      function replaceTemplate(value: string): string {
        return value.replace(/\${Name}/g, componentName);
      }

      const fileName = await window.showInputBox({
        placeHolder: "会替换配置文件的${Name}",
        prompt: "输入组件的名字"
      });
      if (fileName) {
        componentName = fileName;
        await parseObject(defaultConfig, "");
        // Display a message box to the user
        window.showInformationMessage("已为您创建文件!");
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
