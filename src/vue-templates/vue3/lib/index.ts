/*
 * @Author: TuWenxuan
 * @Date: 2024-06-19 17:11:14
 * @LastEditors: tuwenxuan
 * @LastEditTime: 2024-06-23 18:12:53
 * @FilePath: \ReComponentsLib\src\vue-templates\vue3\lib\index.ts
 * @Description: 
 * 
 */
import ReTable from './ReTable';
import ReDialog from './ReDialog';
import ReTitleTab from './ReTitleTab';
import ReSearchBar from './ReSearchBar';

const Vue3Templates = [
  ...ReTable,
  ...ReDialog,
  ...ReTitleTab,
  ...ReSearchBar
];

const getVue3TemplateByName = (name: string) => {
  switch (name) {
    case 'ReTable':
      return [...ReTable];
    case 'ReDialog':
      return [...ReDialog];
    case 'ReTitleTab':
      return [...ReTitleTab];
    case 'ReSearchBar':
      return [...ReSearchBar];
    default:
      return Vue3Templates;
  }
};

export const getVue3Template = (name: string) => {
  const templates = getVue3TemplateByName(name);
  templates.forEach((item) => {
    const sourcePath = 'components';
    item.path = `${sourcePath}/${item.path}`;
  });

  return templates;
};