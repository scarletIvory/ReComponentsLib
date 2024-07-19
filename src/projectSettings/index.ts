/*
 * @Author: TuWenxuan
 * @Date: 2024-06-24 17:52:04
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-07-19 17:18:51
 * @FilePath: /src/projectSettings/index.ts
 * @Description: 
 * 
 */
import vue2Setting from "./vue2Setting";
import vue3Setting from "./vue3Setting";
import { vue3Config, configMap } from "./vue3Package";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function generateSettings(path: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      await createVueSettingByVersion(path, reject);
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
    generateDependencies(packageJson, packageJsonPath);
  } else {
    reject('Vue is not listed as a dependency in package.json');
  }
  return vueVersion;
};

const generateDependencies = (packageJson: any, packageJsonPath: string) => {
  const config = vscode.workspace.getConfiguration('reComponentsLib');
  console.log('Current configuration:', config);

  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  if (config.usePnpm) {
    packageJson.pnpm = vue3Config['pnpm'].pnpmConfig;
  } else {
    delete packageJson.pnpm;
  }

  Object.keys(configMap).forEach((configKey) => {
    const mapItem = configMap[configKey];
    const vue3Setting = vue3Config[mapItem.configKey];
    if (mapItem.version) {
      updateDependencies(config[configKey], config[mapItem.version], vue3Setting.dependencies, dependencies);
    } else if (mapItem.packages) {
      updateDevDependencies(config[configKey], config[mapItem.packages], vue3Setting.devDependencies, devDependencies);
    }
  });

  packageJson.dependencies = dependencies;
  packageJson.devDependencies = devDependencies;

  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Updated ${packageJsonPath} successfully.`);
  } catch (error) {
    console.error(`Error writing ${packageJsonPath}:`, error);
  }
};


const updateDependencies = (
  useConfig: boolean,
  version: string,
  configDependencies: any,
  dependencies: any
) => {
  console.log(configDependencies);
  Object.keys(configDependencies).forEach((pkg) => {
    console.log(pkg);
    if (useConfig) {
      dependencies[pkg] = version || configDependencies[pkg];
    } else {
      console.log(dependencies[pkg]);
      delete dependencies[pkg];
    }
  });
};

const updateDevDependencies = (
  useConfig: boolean,
  versionConfig: any,
  configDependencies: any,
  devDependencies: any
) => {
  Object.keys(configDependencies).forEach((pkg) => {
    if (useConfig) {
      devDependencies[pkg] = versionConfig[pkg] || configDependencies[pkg];
    } else {
      delete devDependencies[pkg];
    }
  });
};
