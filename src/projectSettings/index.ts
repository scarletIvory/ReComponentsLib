import vue2Setting from "./vue2Setting";
import vue3Setting from "./vue3Setting";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function generateSettings(path: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      createVueSettingByVersion(path, reject);
      resolve("项目初始化成功！");
    }
    catch (e) {
      reject(e);
    }
  });
}

const createVueSettingByVersion = async (
  rootPath: string,
  reject: (reason?: any) => void
  ) => {
  const packageJsonPath = path.join(rootPath, 'package.json');
  const packageJsonContent = await fs.promises.readFile(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);
  const vueVersion = packageJson.dependencies?.vue || packageJson.devDependencies?.vue;
  if (vueVersion) {
    // Remove any ^, ~, or other characters in the version string
    const cleanedVersion = vueVersion.replace(/^[^\d]*/, '');
    const majorVersion = parseInt(cleanedVersion.split('.')[0]);
    fs.writeFileSync(packageJsonPath, majorVersion >= 3 ? vue3Setting.packageJson : vue2Setting.packageJson);
    if (majorVersion >= 3) {
      if (fs.existsSync(path.join(rootPath, 'tsconfig.json'))) {
        fs.writeFileSync(path.join(rootPath, 'tsconfig.json'), vue3Setting.tsConfig);
      }
      if (fs.existsSync(path.join(rootPath, 'vite.config.ts'))) {
        fs.writeFileSync(path.join(rootPath, 'vite.config.ts'), vue3Setting.viteConfig);
      }
    } else {
      if (fs.existsSync(path.join(rootPath, 'vue.config.js'))) {
        fs.writeFileSync(path.join(rootPath, 'vue.config.js'), vue2Setting.vueConfig);
      }
    }
  } else {
    reject('Vue is not listed as a dependency in package.json');
  }
  return vueVersion;
};