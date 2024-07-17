const template = `
import { defineComponent, h } from 'vue';

export default defineComponent({
  render() {
    const defaultSlots = this.$slots.default?.();
    const isExistChildren = defaultSlots?.find(
      (item) => item.children && (item.children.length as number) > 0
    );
    return h(
      'div',
      {},
      {
        default: () => [
          isExistChildren || h('span', { style: 'color: #4f565f' }, '--'),
        ],
      }
    );
  },
});
`;
export default {
  name: 'VaidateEmpty.ts',
  path: 'ReFileUpload',
  template
};