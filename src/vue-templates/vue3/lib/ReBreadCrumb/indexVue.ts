
const template = `
import { defineComponent, PropType } from 'vue';
import classes from './bread.module.scss';

export type ITitleList = Array<{ label: string; path?: string }>;
export default defineComponent({
  components: {},
  props: {
    titleList: {
      type: Array as PropType<ITitleList>,
      default: () => [],
    },
  },
  emits: [],
  setup(props) {
    return () => (
      <el-breadcrumb separator="/" class={classes['container']}>
        {props.titleList.map((item) => (
          <el-breadcrumb-item
            to={{ path: item.path ?? '' }}
            key={item.label}
            class={classes['bread-item']}
          >
            {item.label}
          </el-breadcrumb-item>
        ))}
      </el-breadcrumb>
    );
  },
});
`;

export default {
  name: 'index.tsx',
  path: 'ReBreadCrumb',
  template
};