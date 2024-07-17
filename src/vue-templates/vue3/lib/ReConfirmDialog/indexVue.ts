
const template = `
<template>
  <div class="confirm-container">
    <div class="title">
      <el-icon class="tips-icon"><WarningFilled /></el-icon>
      <span>{{ title }}</span>
    </div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue';
withDefaults(
  defineProps<{
    title: string;
    content: string;
  }>(),
  {
    title: '',
    content: '',
  }
);
</script>

<style scoped lang="scss">
.confirm-container {
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 0 16px;
  font-weight: 400;
  font-size: 16px;
  color: #1c2025;

  .tips-icon {
    color: #ffb41f;
    font-size: 18px;
    margin-right: 8px;
  }
  .title {
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  .content {
    padding-top: 16px;
    font-size: 14px;
    color: #4f565f;
    padding-left: 24px;
    line-height: 18px;
  }
}
</style>

<style lang="scss">
.el-dialog.dialog-container.confirm-dialog-container {
  .el-dialog__header {
    border: none;
    height: 36px;

    .dialog-header {
      display: none;
    }
  }
  .el-dialog__body {
    padding-top: 0 !important;
  }
  .el-dialog__footer {
    border: none;
  }
}
</style>
`;

export default {
  name: 'index.vue',
  path: 'ReConfirmDialog',
  template
};