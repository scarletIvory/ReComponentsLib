/*
 * @Author: TuWenxuan
 * @Date: 2024-06-13 17:55:19
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-14 17:58:47
 * @FilePath: /testcode1/src/extension.ts
 * @Description: 
 * 
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FuncNode, getFuncNode } from './functionNode.js';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('reComponentsLib.deleteFunc', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from testcode1!');

		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		};

		const code = editor.document.getText();
		const index = editor.document.offsetAt(editor.selection.active);

		const funcNode: FuncNode | undefined = getFuncNode(code, index);

		if (!funcNode) {
			return;
		}

		editor.edit((editBuilder) => {
			editBuilder.delete(new vscode.Range(funcNode.start.line - 1, 0, funcNode.end.line - 1, funcNode.end.column));
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
/*
 * @Author: TuWenxuan
 * @Date: 2024-06-13 17:55:19
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-14 16:22:44
 * @FilePath: /testcode1/src/extension.ts
 * @Description: 
 * 
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FuncNode, getFuncNode } from './functionNode.js';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('reComponentsLib.deleteFunc', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from testcode1!');

		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		};

		const code = editor.document.getText();
		const index = editor.document.offsetAt(editor.selection.active);

		const funcNode: FuncNode | undefined = getFuncNode(code, index);

		if (!funcNode) {
			return;
		}

		editor.edit((editBuilder) => {
			editBuilder.delete(new vscode.Range(funcNode.start.line - 1, funcNode.start.column, funcNode.end.line - 1, funcNode.end.column));
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
