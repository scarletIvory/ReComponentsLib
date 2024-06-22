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
`;

export default {
  name: 'index.ts',
  path: 'utils',
  template,
};