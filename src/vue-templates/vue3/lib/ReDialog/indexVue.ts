/*
 * @Author: TuWenxuan
 * @Date: 2024-06-20 15:20:41
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-20 15:30:07
 * @FilePath: /testcode1/src/vue-templates/vue3/lib/ReDialog/indexVue.ts
 * @Description: 
 * 
 */
const template = `
<template>
  <el-dialog
    v-for="(options, index) in dialogStore"
    :key="index"
    v-model="options.visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-bind="options"
    class="dialog-container"
  >
    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">{{ options.title }}</span>
      </div>
    </template>
    <component
      v-bind="options?.props"
      :is="options.contentRenderer!({ options, index })"
      @close="(args) => handleClose(options, index, args)"
    />
    <!-- footer -->
    <template v-if="!options?.hideFooter" #footer>
      <template v-if="options?.footerRenderer">
        <component :is="options?.footerRenderer({ options, index })" />
      </template>
      <span v-else>
        <el-button
          v-for="(btn, key) in footerButtons(options)"
          :key="key"
          v-bind="btn"
          @click="
            btn.btnClick!({
              dialog: { options, index },
              button: { btn, index: key },
            })
          "
        >
          {{ btn?.label }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { closeDialog, dialogStore } from './index';
import { DialogOptions, EventType } from './type';
import { useFoolterButton } from './useFooterButton';

function handleClose(
  options: DialogOptions,
  index: number,
  args = { command: 'close' }
) {
  closeDialog(options, index, args);
  eventsCallBack('close', options, index);
}

function eventsCallBack(
  event: EventType,
  options: DialogOptions,
  index: number
) {
  if (options?.[event] && typeof options?.[event] === 'function') {
    return options?.[event]!({ options, index });
  }
}

const { footerButtons } = useFoolterButton();
</script>

<style scoped lang="scss">
.dialog-container {
  .dialog-header {
    .dialog-title {
      font-weight: 500;
      font-size: 16px;
      color: #1c2025;
      display: flex;
      align-items: center;
      position: relative;
      &:before {
        width: 3px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        content: '';
        background-color: #283feb;
        margin-right: 6px;
      }
    }
  }
}
</style>
<style lang="scss">
.el-dialog.dialog-container {
  --el-dialog-padding-primary: 0;
  .el-dialog__header {
    border-bottom: 1px solid #e7ebf1;
    padding-bottom: 0;
    height: 56px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 24px;
    .el-dialog__headerbtn {
      height: 56px;
    }
  }
  .el-dialog__body {
    padding: 24px 24px !important;
  }
  .el-dialog__footer {
    padding: 10px 24px;
    border: 1px solid #e7ebf1;
    padding-bottom: 24px;
  }
}
</style>
`;

export default {
  name: 'index.vue',
  path: 'ReDialog',
  template,
};