/*
 * @Author: TuWenxuan
 * @Date: 2024-06-25 09:30:01
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-25 12:36:36
 * @FilePath: /testcode1/src/vue-templates/generateFunc/index.ts
 * @Description: 
 * 
 */
import { JSDOM } from 'jsdom';
import * as fs from "fs";
import * as path from "path";

export const generateFunc = async (text: string, selectPath: string): Promise<string> => {
  const doc = new JSDOM(text).window.document;
  const elTables = doc.querySelectorAll('el-table');

  if (!elTables) {
    return '';
  }
  let columnsConfigs = ``;
  let index = 0;
  elTables.forEach((elTable) => {
    const columns = elTable.querySelectorAll('el-table-column');
    let columnsConfig: Array<any> = [];
    columns.forEach((column) => {
      const type = column.getAttribute('type');
      const label = column.getAttribute('label');
      const prop = column.getAttribute('prop');
      const width = column.getAttribute('width');
      const configCell = {
        ...(type && { type }),
        ...(label && { label }),
        ...(prop && { prop }),
        ...(width && { width })
      };
      columnsConfig.push(configCell);
    });
    columnsConfigs += `export const columnsConfig${index} = ${JSON.stringify(columnsConfig, null, 2) + '\n'}`;
    const operation = `export const operationConfig${index} = [
      {
        label: '查看',
        type: 'view'
      },
      {
        label: '修改',
        type: 'update'
      },
      {
        label: '删除',
        type: 'delete'
      }
    ];`;
  
    columnsConfigs += operation;
    const reTable = `
    <div>
  <ReTable
    :columns="columnsConfig${index}"
    :operation="operationConfig${index}"
    :table-data="formData"
  ></ReTable></div>`;
    const reTableDom = new JSDOM(reTable);
    elTable.replaceWith(reTableDom.window.document.querySelector('div')!);
    index++;
  });
  

  //去除最后一个文件
  const selectPathDir = path.dirname(selectPath);
  const indexPath = `${selectPathDir}/config/index.ts`;
  if (fs.existsSync(indexPath)) {
    await fs.promises.appendFile(indexPath, columnsConfigs);
  }
  else {
    await fs.promises.mkdir(`${selectPathDir}/config`);
    await fs.promises.writeFile(indexPath, columnsConfigs);
  }

  const body = doc.querySelector('body');
  const bodyContent = body?.innerHTML || '';
  return bodyContent;
};