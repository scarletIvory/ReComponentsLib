import { NodePath } from '@babel/traverse';

export function getSelf(path: NodePath, index: number) {
  let funcNode;
  let start = path.node?.start!;
  let end = path.node?.end!;
  if (index && index >= start && index <= end) {
    funcNode = {
      name: path.node?.id?.name,
      start: path.node?.loc?.start,
      end: path.node?.loc?.end
    };
  }

  return funcNode;
}

export function getParent(path: NodePath, index: number) {
  let funcNode;
  const parent = path.parentPath?.parentPath;

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

  return funcNode;
}