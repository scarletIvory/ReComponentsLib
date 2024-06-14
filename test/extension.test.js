/*
 * @Author: TuWenxuan
 * @Date: 2024-06-12 14:51:48
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-14 10:42:38
 * @FilePath: /helloworld/test/extension.test.js
 * @Description:
 *
 */
import { test, expect } from 'vitest';
import { getFuncNode } from '../src/functionNode';
test('init', () => {
    const code = `
        const read = ()=>{
            return 'you'
        }
        const read1 = ()=>{
            return 'you'
        }
    `;
    const funcNode = getFuncNode(code, 10);
    expect(funcNode).toEqual({
        name: "square",
        start: {
            line: 2,
            column: 8,
            index: 9
        },
        end: {
            line: 4,
            column: 9,
            index: 61
        }
    });
});

test.only('arrowFunction', () => {
    const code = `
        const read = ()=>{
            return 'you'
        }
        const read1 = ()=>{
            return 'you'
        }
    `;
    const funcNode = getFuncNode(code, 10);
    expect(funcNode).toEqual({
        name: "read",
        start: {
            "column": 8,
            "index": 9,
            "line": 2,
        },
        end: {
            "column": 9,
            "index": 62,
            "line": 4,
        }
    });
});

//# sourceMappingURL=extension.test.js.map