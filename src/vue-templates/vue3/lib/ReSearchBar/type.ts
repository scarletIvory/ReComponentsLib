const template = `export interface IFormOptions {
  label: string;
  type: 'input' | 'select';
  placeholder?: string;
  key: string;
  options?: { label: string; value: string | number }[] | (() => Array<any>);
}
`;

export default {
  name: 'type.ts',
  path: 'ReSearchBar',
  template
};