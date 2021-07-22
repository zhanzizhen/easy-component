import * as vscode from "vscode";
const { workspace, Uri, window } = vscode;

const utils = {
  transStrToUnit8(value: string): Uint8Array {
    return new Uint8Array(Buffer.from(value));
  },

  resolveRootPath(fileName: string): vscode.Uri | never {
    const { workspaceFolders } = workspace;
    if (workspaceFolders === undefined) {
      window.showErrorMessage("工作区不能为空");
      throw new Error("workspaceFolders is empty");
    }
    const filePath: string =
      workspaceFolders[0].uri.toString() + "/" + fileName;
    return Uri.parse(filePath);
  },
};

export default utils;
