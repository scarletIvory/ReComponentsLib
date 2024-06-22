/*
 * @Author: TuWenxuan
 * @Date: 2024-06-19 17:11:14
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-20 15:44:36
 * @FilePath: /testcode1/src/vue-templates/vue3/lib/index.ts
 * @Description: 
 * 
 */
import ReTable from './ReTable';
import ReDialog from './ReDialog';

const Vue3Templates = [
  ...ReTable,
  ...ReDialog
];

Vue3Templates.forEach((item) => {
  const sourcePath = 'components';
  item.path = `${sourcePath}/${item.path}`;
});

export default Vue3Templates;