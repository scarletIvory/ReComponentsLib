/*
 * @Author: TuWenxuan
 * @Date: 2024-06-19 17:11:14
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-27 14:51:22
 * @FilePath: /testcode1/src/vue-templates/vue3/lib/index.ts
 * @Description: 
 * 
 */
import ReTable from './ReTable';
import ReDialog from './ReDialog';
import ReTitleTab from './ReTitleTab';
import ReSearchBar from './ReSearchBar';
import ReConfirmDialog from './ReConfirmDialog';
import ReSvgIcon from './ReSvgIcon';
import ReBreadCrumb from './ReBreadCrumb';
import ReMenu from './ReMenu';
import ReFileUpload from './ReFileUpload';
import ReText from './ReText';
import ReHtmlView from './ReHtmlView';

const Vue3Templates = [
  ...ReTable,
  ...ReDialog,
  ...ReTitleTab,
  ...ReSearchBar,
  ...ReConfirmDialog,
  ...ReSvgIcon,
  ...ReBreadCrumb,
  ...ReMenu,
  ...ReFileUpload,
  ...ReText,
  ...ReHtmlView
];

let generateFlag = false;

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
    if(!generateFlag) {
      const sourcePath = 'components';
      item.path = `${sourcePath}/${item.path}`;
    }
  });
  if(!generateFlag) {generateFlag = true;}
  return templates;
};