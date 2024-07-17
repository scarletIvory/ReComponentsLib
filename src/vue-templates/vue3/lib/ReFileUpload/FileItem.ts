const template = `
<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    :content="fileName"
    placement="top"
  >
    <span class="file-item" @click="handleClick">
      {{ fileName || '--' }}
    </span>
  </el-tooltip>
</template>

<script setup lang="ts">
import { downFile } from '@/utils';

const props = defineProps({
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
});

const handleClick = () => {
  if (props.fileUrl) {
    downFile(props.fileUrl, props.fileName);
  }
};
</script>

<style lang="scss" scoped>
.file-item {
  cursor: pointer;
  color: var(--el-color-primary);
  display: inline-block;
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
`;

export default {
  name: 'FileItem.vue',
  path: 'ReFileUpload',
  template,
};