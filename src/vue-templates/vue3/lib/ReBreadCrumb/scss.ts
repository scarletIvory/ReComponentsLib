/*
 * @Author: TuWenxuan
 * @Date: 2024-06-25 14:01:52
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-25 14:03:29
 * @FilePath: /testcode1/src/vue-templates/vue3/lib/ReBreadCrumb/scss.ts
 * @Description: 
 * 
 */

const template = `.container {
  .bread-item {
    :global(.el-breadcrumb__inner) {
      color: #798089;
      font-weight: normal;
      cursor: inherit !important;
      &:hover {
        color: #798089;
      }
    }
    &:last-child {
      :global(.el-breadcrumb__inner) {
        color: #4f565f;
      }
    }
  }
}
`;

export default {
  name: 'bread.module.scss',
  path: 'ReBreadCrumb',
  template
};