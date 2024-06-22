const template = `
import _ from 'lodash';
import { computed } from 'vue';
import { closeDialog } from '.';
import { ButtonProps, DialogOptions } from './type';
import { debounce } from '@/utils';

export const useFoolterButton = () => {
  const footerButtons = computed(() => {
    return (options: DialogOptions) => {
      return options &&
        options.footerButtons &&
        options.footerButtons.length > 0
        ? options.footerButtons
        : ([
            {
              label: '取消',
              bg: true,
              plain: true,
              action: 'cancel',
              btnClick: ({ dialog: { options, index } }) => {
                const done = () =>
                  closeDialog(options!, index!, { command: 'cancel' });
                if (
                  options?.beforeCancel &&
                  _.isFunction(options?.beforeCancel)
                ) {
                  options.beforeCancel(done, {
                    options: options!,
                    index: index!,
                  });
                } else {
                  done();
                }
              },
            },
            {
              label: '确定',
              type: 'primary',
              bg: true,
              action: 'confirm',
              btnClick: debounce(({ dialog: { options, index } }) => {
                const done = () =>
                  closeDialog(options!, index!, { command: 'sure' });
                if (options?.beforeSure && _.isFunction(options?.beforeSure)) {
                  options.beforeSure(done, {
                    options: options!,
                    index: index!,
                  });
                } else {
                  done();
                }
              }, 300),
            },
          ] as Array<ButtonProps>);
    };
  });
  return {
    footerButtons,
  };
};
`;

export default {
  name: 'useFooterButton.ts',
  path: 'ReDialog',
  template,
};