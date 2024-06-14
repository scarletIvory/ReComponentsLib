import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

export interface FuncNode {
  name: string;
  start: {
    line: number;
    column: number;
    index: number;
  };
  end: {
    line: number;
    column: number;
    index: number;
  };
}

export function getFuncNode(code: string, index: number): FuncNode | undefined {
  let funcNode;

  const ast = parse(code);
  traverse(ast, {
    FunctionDeclaration(path) {
      if (path.parentPath.isVariableDeclarator()) return;
      let start = path.node?.start!;
      let end = path.node?.end!;
      if (index && index >= start && index <= end) {
        funcNode = {
          name: path.node?.id?.name,
          start: path.node?.loc?.start,
          end: path.node?.loc?.end
        };
      }
    },
    ArrowFunctionExpression(path) {
      const parent = path.parentPath.parentPath;

      const getName = () => {
        return Object.keys(path.parentPath.getBindingIdentifiers())[0];
      };

      if (parent && parent.isVariableDeclaration()) {
        let start = parent.node?.start!;
        let end = parent.node?.end!;
        if (index && index >= start && index <= end) {
          funcNode = {
            name: getName(),
            start: parent.node?.loc?.start,
            end: parent.node?.loc?.end
          };
        }
      }
    }
  });

  return funcNode;
}