/*
 * @Author: TuWenxuan
 * @Date: 2024-06-19 11:38:50
 * @LastEditors: tuwenxuan
 * @LastEditTime: 2024-06-23 17:04:55
 * @FilePath: \ReComponentsLib\src\vue-templates\index.ts
 * @Description: 
 * 
 */
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import Vue2Templates from "./vue2";
import { generateVue3Template } from "./vue3";

export const createComponentTemplate = (uri: vscode.Uri, name: string = 'all', context?: vscode.ExtensionContext): Promise<string> => {
  return new Promise (async (resolve, reject) => {
    try {
      const path = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

      if (!path) {
        vscode.window && vscode.window.showErrorMessage("请先打开一个工作区！");
        reject("no path");
        return;
      }
      const selectPath = uri.fsPath;
      await createVueTempByVersion(name, path, selectPath, reject);
      resolve("success");
    }
    catch (e) {
      reject(e);
    }
  });
};

const createVueTempByVersion = async (
  name: string,
  rootPath: string, 
  selectPath: string, 
  reject: (reason?: any) => void): Promise<string | undefined> => 
    {
  const packageJsonPath = path.join(rootPath, 'package.json');
  const packageJsonContent = await fs.promises.readFile(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);
  const vueVersion = packageJson.dependencies?.vue || packageJson.devDependencies?.vue;
  if (vueVersion) {
    // Remove any ^, ~, or other characters in the version string
    const cleanedVersion = vueVersion.replace(/^[^\d]*/, '');
    const majorVersion = parseInt(cleanedVersion.split('.')[0]);

    if (majorVersion >= 3) {
      vscode.window.showInformationMessage(`Vue version is ${vueVersion} which is greater than or equal to 3`);
      createVue3Template(selectPath, name, reject);
    } else {
      createVue2Template(selectPath, reject);
    }
  } else {
    vscode.window.showWarningMessage('Vue is not listed as a dependency in package.json');
  }
  return vueVersion;
};

const createVue2Template = (selectPath: string, reject: (reason?: any) => void) => {
  Vue2Templates.forEach((template) => {
    const indexPath = `${selectPath}/components/${template.name}/index.vue`;
    const indexCode = template.template;
    if(!fs.existsSync(indexPath)) {
      fs.mkdirSync(`${selectPath}/components/${template.name}`, { recursive: true });
      fs.writeFileSync(indexPath, indexCode);
    }else {
      vscode.window && vscode.window.showErrorMessage(`文件${template.name}已存在！`);
      reject("file exist");
      return;
    }
  });
};

const createVue3Template = (selectPath: string, name: string, reject: (reason?: any) => void) => {
  const vue3Templates = generateVue3Template(name);
  vue3Templates.forEach((template) => {
    const indexPath = `${selectPath}/${template.path}/${template.name}`;
    const indexCode = template.template;
    if(!fs.existsSync(indexPath)) {
      fs.mkdirSync(`${selectPath}/${template.path}`, { recursive: true });
      fs.writeFileSync(indexPath, indexCode);
    }else {
      vscode.window && vscode.window.showErrorMessage(`文件${template.name}已存在！`);
      reject("file exist");
      return;
    }
  });
};