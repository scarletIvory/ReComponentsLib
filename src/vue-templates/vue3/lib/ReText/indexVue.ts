const style1 = "`${numberOfLines > 1 ? '-webkit-line-clamp: ' + numberOfLines : ''}`";
const style2 = "`${toolTipWidth ? 'max-width: ' + toolTipWidth + 'px' : ''}`";
const template = `
<template>
  <span
    v-if="!!text"
    :class="['re-text', {'one-line': numberOfLines == 1, 'more-line': numberOfLines > 1, 'blue': type === 'blue'}]"
    :style="${style1}"
  >
    <el-tooltip
      v-if="!!showTooltip"
      effect="light"
      placement="top-start"
    >
      <template #content>
        <span :style="${style2}">
          {{ toolTipText || text }}
        </span>
      </template>
      {{ text }}
    </el-tooltip>
    <span v-else>
      {{ text }}
    </span>
  </span>
</template>
<script setup lang="ts">
interface IText {
  numberOfLines?: number; // 几行省略
  text: string; // 展示文字
  showTooltip?: boolean; // 是否展示tooltip提示
  toolTipWidth?: number; // tooltip提示宽度，默认600px
  type?: string; // 类型，default为14px,#4F565F, blue 为12px #0D7BFF;
  toolTipText?: string; // 提示语
}
withDefaults(defineProps<IText>(), {
  text: '',
  showTooltip: false,
  toolTipWidth: 600,
  numberOfLines: 0,
  type: 'default'
});
defineEmits(['clickTitle']);

</script>
<style scoped lang="scss">
.re-text {
  display: inline-block;
  font-size: 14px;
  color: #4F565F;
  line-height: 22px;
  width: 100%;
}
.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.more-line {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
.blue {
  font-size: 12px;
  color: #0D7BFF;
  line-height: 20px;
}
</style>
`;

export default {
  name: 'index.vue',
  path: 'ReText',
  template
};