/*
 * @Author: TuWenxuan
 * @Date: 2024-06-19 09:54:39
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-19 10:47:25
 * @FilePath: /testcode1/src/nodeHandlers/BaseNodeHandler.ts
 * @Description: 
 * 
 */
interface Node {
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

interface IBaseNodeHandler {
  handle(): Node | undefined;
  isContain(): Boolean;
}

export class BaseNodeHandler implements IBaseNodeHandler {
  protected path: any;
  protected index: any;
  constructor(path: any, index: number) {
    this.path = path;
    this.index = index;
  }

  _isContain(node: any, index: number) {
    // 也可以通过 工具类实现
    return index >= node.start && index <= node.end;
  }

  isContain(): Boolean {
    throw new Error("must write isContain");
  }

  handle(): Node | undefined {
    throw new Error("must write handle");
  }
}
