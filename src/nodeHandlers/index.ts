/*
 * @Author: TuWenxuan
 * @Date: 2024-06-19 09:54:39
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-19 10:45:25
 * @FilePath: /testcode1/src/nodeHandlers/index.ts
 * @Description: 
 * 
 */
import { ClassMethodsHandler } from "./ClassMethodsHandler";
import { ExportDeclarationHandler } from "./ExportDeclarationHandler";
import { ExportDefaultDeclarationHandler } from "./ExportDefaultDeclarationHandler";
import { ExportNamedDeclarationHandler } from "./ExportNamedDeclarationHandler";
import { FunctionDeclarationHandler } from "./FunctionDeclarationHandler";
import { FunctionExpressionHandler } from "./FunctionExpressionHandler";
import { ObjectMethodHandler } from "./ObjectMethdHandler";
import { ObjectPropertyHandler } from "./ObjectPropertyHandler";
export function createNodeFunctionExpressionHandler(path: any, index: number) {
  if (path.parentPath?.isExportDefaultDeclaration()) {
    return new ExportDefaultDeclarationHandler(path, index);
  } else if (
    path.parentPath?.parentPath?.parentPath?.isExportNamedDeclaration()
  ) {
    return new ExportNamedDeclarationHandler(path, index);
  } else if (path.parentPath?.isObjectProperty()) {
    return new ObjectPropertyHandler(path, index);
  } else if (
    path.parentPath?.node.type === "VariableDeclarator" &&
    path.parentPath?.parentPath?.node.type === "VariableDeclaration"
  ) {
    return new FunctionExpressionHandler(path, index);
  }
}

export function createNodeFunctionDeclarationHandler(path: any, index: number) {
  if (
    path.parentPath.isExportNamedDeclaration() ||
    path.parentPath.isExportDefaultDeclaration()
  ) {
    return new ExportDeclarationHandler(path, index);
  } else if (path.isFunctionDeclaration()) {
    return new FunctionDeclarationHandler(path, index);
  }
}

export function createNodeClassMethodHandler(path: any, index: number) {
  return new ClassMethodsHandler(path, index);
}

export function createNodeObjectMethodHandler(path: any, index: number) {
  return new ObjectMethodHandler(path, index);
}
