const template = `
/**
 * 宽度自适应
 */
export function widthFix(width: number) {
  const scale = document.documentElement.clientWidth / 1920;
  return width * scale;
}

/**
 * @description: 根据对象的key值格式化下拉选项的数组格式
 * @param {any} data
 * @return {*} Array<{label: any, value: any}>
 */
export function generateOptions(data: any): Array<{ label: any; value: any }> {
  return Object.keys(data)
    .filter((key) => {
      return Number.isNaN(Number(key));
    })
    .map((key) => {
      return {
        label: key,
        value: data[key],
      };
    });
}

/**
 * @description: 根据key值获取下拉label值
 * @param {any} data
 * @param {*} key
 * @return {*} string
 */
export function getOptionsLabelByValue(data: any[], key) {
  if (!data || !Array.isArray(data)) {
    return '';
  }
  return data.find((item) => item.value === key)?.label;
}
`;

export default {
  name: 'format.ts',
  path: 'utils',
  template,
};