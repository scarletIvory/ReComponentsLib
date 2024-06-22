/*
 * @Author: TuWenxuan
 * @Date: 2024-06-13 17:55:19
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-21 16:20:05
 * @FilePath: /testcode1/src/extension.ts
 * @Description: 
 * 
 */
import * as vscode from "vscode";
import { getDeleteFunctionNode } from "./handlers";
import { createComponentTemplate } from "./vue-templates";
import { register } from 'ts-node';



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  register({
    transpileOnly: true,
    compilerOptions: {
      module: "ESNext",
      target: "ESNext",
    }
  });
	vscode.window.showInformationMessage('Welcome to use SI Components Lib!');
	const commandDelete = 'reComponentsLib.deleteFunc';
	const commandCreate = 'reComponentsLib.createComponent';
	const disposableDelete = vscode.commands.registerCommand(commandDelete, () => {
		try {
      deleteFunction();
    } catch (e) {}
	});

	const disposableCreate = vscode.commands.registerCommand(commandCreate, (uri: vscode.Uri) => {
		try {
			createComponentTemplate(uri, context).then((res) => {
				vscode.window.showInformationMessage(res);
			});
		} catch (e) {}
	});

	context.subscriptions.push(disposableCreate);
	context.subscriptions.push(disposableDelete);
}

// This method is called when your extension is deactivated
export function deactivate() { }

function deleteFunction() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    let curPos = editor.selection.active;
    let offset = editor.document.offsetAt(curPos);
    const languageType = vscode.window.activeTextEditor?.document.languageId;
    
    if (!languageType) {
      return;
    }
    const node = getDeleteFunctionNode(
      offset,
      editor.document.getText(),
      languageType
    );

    if (!node) {
      return;
    }

    editor.edit((editBuilder) => {
      editBuilder.delete(
        new vscode.Range(
          new vscode.Position(node.start.line - 1, node.start.column),
          new vscode.Position(node.end.line - 1, node.end.column)
        )
      );
    });
  }
}