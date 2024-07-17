/*
 * @Author: TuWenxuan
 * @Date: 2024-06-13 17:55:19
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-25 12:06:08
 * @FilePath: /testcode1/src/extension.ts
 * @Description: 
 * 
 */
import * as vscode from "vscode";
import { getDeleteFunctionNode } from "./handlers";
import { createComponentTemplate } from "./vue-templates";
import { generateSettings } from "./projectSettings";
import { generateFunc } from "./vue-templates/generateFunc";



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('Welcome to use SI Components Lib!');
	const commandDelete = 'reComponentsLib.deleteFunc';
	const commandCreate = 'reComponentsLib.createComponent';
  const commandSet = 'reComponentsLib.setProject';
  const commandCreateSFC = [
    'ReTable',
    'ReDialog',
    'ReTitleTab',
    'ReSearchBar'
  ];
	const disposableDelete = vscode.commands.registerCommand(commandDelete, () => {
		try {
      deleteFunction();
    } catch (e) {}
	});

	const disposableCreate = vscode.commands.registerCommand(commandCreate, (uri: vscode.Uri) => {
		try {
			createComponentTemplate(uri).then((res) => {
				vscode.window.showInformationMessage(res);
			});
		} catch (e) {}
	});

  const disposableSet = vscode.commands.registerCommand(commandSet, () => {
    try {
      const path = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

      if (!path) {
        vscode.window && vscode.window.showErrorMessage("请先打开一个工作区！");
        return;
      }
      generateSettings(path).then((res) => {
        vscode.window.showInformationMessage(res);
      });
    } catch (e) {}
  });

  const disposableGenerate = vscode.commands.registerCommand('reComponentsLib.generateComponent', (uri: vscode.Uri) => {
    getDom(uri);
  });
  
  commandCreateSFC.forEach((command) => {
    const disposable = vscode.commands.registerCommand(`reComponentsLib.create${command}`, (uri: vscode.Uri) => {
      try {
        createComponentTemplate(uri, command).then((res) => {
          vscode.window.showInformationMessage(res);
        });
      } catch (e) {}
    });
    context.subscriptions.push(disposable);
  });
  
	context.subscriptions.push(disposableCreate);
	context.subscriptions.push(disposableDelete);
  context.subscriptions.push(disposableSet);
  context.subscriptions.push(disposableGenerate);
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

async function getDom(uri: vscode.Uri){
  const editor = vscode.window.activeTextEditor;
  if(!editor){
    return;
  }
  const selection = editor.selection;
  const text = editor.document.getText(selection);
  const selectPath = uri.fsPath;
  const replacedText = await generateFunc(text, selectPath);
  if (replacedText && replacedText !== '') {
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, replacedText);
    });
  }
}