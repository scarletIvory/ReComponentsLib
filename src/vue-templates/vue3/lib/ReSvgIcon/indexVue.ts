/*
 * @Author: TuWenxuan
 * @Date: 2024-06-25 13:37:28
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-25 13:45:05
 * @FilePath: /testcode1/src/vue-templates/vue3/lib/ReSvgIcon/indexVue.ts
 * @Description: 
 * 
 */
const mask = '`url(${props.iconClass}) no-repeat 50% 50%`';
const webkit_mask = '`url(${props.iconClass}) no-repeat 50% 50%`';
const iconName = '`#icon-${props.iconClass}`';

const template = `
import { computed, defineComponent, PropType } from 'vue';
import { isExternal as validateIsExternal } from '@/utils/validate';
import classes from './svgicon.module.scss';

export default defineComponent({
  components: {},
  props: {
    iconClass: {
      type: String as PropType<string>,
      required: true,
    },
    className: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const isExternal = computed(() => {
      return validateIsExternal(props.iconClass);
    });

    const styleExternalIcon = computed(() => {
      return {
        mask: ${mask},
        '-webkit-mask': ${webkit_mask},
      };
    });

    const iconName = computed(() => {
      return ${iconName};
    });
    return () => (
      <>
        {isExternal.value ? (
          <div
            style={styleExternalIcon.value}
            class={[classes['svg-icon'], classes['svg-external-icon']]}
          />
        ) : (
          <svg
            onClick={() => {
              emit('click');
            }}
            class={
              props.className
                ? [classes['svg-icon'], props.className]
                : classes['svg-icon']
            }
            aria-hidden={true}
          >
            <use xlinkHref={iconName.value} />
          </svg>
        )}
      </>
    );
  },
});
`;

export default {
  name: 'index.tsx',
  path: 'ReSvgIcon',
  template
};