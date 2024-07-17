/*
 * @Author: TuWenxuan
 * @Date: 2024-06-20 15:44:54
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-25 15:03:13
 * @FilePath: /testcode1/src/vue-templates/vue3/utils/indexTs.ts
 * @Description: 
 * 
 */
const template = `
export function debounce(fn: any, delay?: number) {
  let timer: any;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.call(this, ...args);
    }, delay);
  };
}
  /**
 * 根据url下载文件,自定义文件名称
 * @param {*} url 文件地址
 * @param {String} fileName 文件名
 */
export function downFile(url: string, fileName: string) {
  const x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = function () {
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };
  x.send();
}
`;

export default {
  name: 'index.ts',
  path: 'utils',
  template,
};