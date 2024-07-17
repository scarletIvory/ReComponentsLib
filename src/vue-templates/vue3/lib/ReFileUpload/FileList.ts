/*
 * @Author: TuWenxuan
 * @Date: 2024-06-25 14:46:53
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-25 14:47:41
 * @FilePath: /testcode1/src/vue-templates/vue3/lib/ReFileUpload/FileList.ts
 * @Description: 
 * 
 */
const template = `<template>
  <div class="file-list-container">
    <ul class="file-list__items">
      <li
        v-for="(file, index) in fileList"
        :key="index"
        class="file-list__item"
      >
        <div class="file-list__item-content">
          <ReSvgIcon icon-class="file" class-name="btn-file-icon" />
          <span class="file-list__name">{{ file.name }}</span>
        </div>
        <el-icon class="file-list__close" @click="handleRemove">
          <CircleCloseFilled />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { CircleCloseFilled } from '@element-plus/icons-vue';
import { IFileListItem } from './type';

defineProps({
  fileList: {
    type: Array as PropType<IFileListItem[]>,
    default: () => [],
    required: true,
  },
});

const emit = defineEmits(['remove']);
const handleRemove = () => {
  emit('remove');
};
</script>

<style lang="scss" scoped>
.file-list-container {
  .file-list__items {
    width: 100%;
  }
  .file-list__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #4f565f;
    padding: 0 10px;
    border-radius: 2px;
    line-height: 32px;
    &:hover {
      background-color: #f5f7fa;
      .file-list__close {
        display: inline-block;
      }
    }
    &-content {
      display: inline-block;
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
      cursor: pointer;
      .file-list__name {
        margin-left: 10px;
      }
    }
    .file-list__close {
      cursor: pointer;
      color: #4f565f;
      opacity: 0.6;
      display: none;
    }
  }
}
</style>
`;

export default {
  name: 'FileList.vue',
  path: 'ReFileUpload',
  template
};