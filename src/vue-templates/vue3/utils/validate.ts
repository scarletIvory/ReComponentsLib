const template = `
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

// 校验邮箱
export function validateEmail(val: string): boolean {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(val);
}

// 校验字符串中是否有空格
export function validateSpaceOfStr(val: string): val is string {
  return /\s/g.test(val);
}

// 校验变量命名规范 字母数字下划线组成，不能数字开头
export function validateVariableName(val: string): val is string {
  return /^[a-zA-Z_][a-zA-Z0-9_]+$/.test(val);
}

// 校验是否中文
export function validateIsChinese(val: string): val is string {
  return /[\u4E00-\u9FFF]/.test(val);
}
`;

export default {
  name: 'validate.ts',
  path: 'utils',
  template,
};