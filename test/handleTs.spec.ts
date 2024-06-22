/*
 * @Author: TuWenxuan
 * @Date: 2024-06-19 09:54:39
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-19 09:57:21
 * @FilePath: /testcode1/test/handleTs.spec.ts
 * @Description: 
 * 
 */
import { describe, it, expect } from "vitest";
import { getDeleteFunctionNodeJs } from "../src/handlers/handleJs";
describe("handle ts", () => {
  it("should delete function at index Position", () => {
    let index = 20;

    const code = `
    function getName ():string {
        return 'name'
    }
    `;

    const node = getDeleteFunctionNodeJs(index, code);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 2,
        column: 4,
        index: 5,
      },
      end: {
        line: 4,
        column: 5,
        index: 61,
      },
    });
  });
});
