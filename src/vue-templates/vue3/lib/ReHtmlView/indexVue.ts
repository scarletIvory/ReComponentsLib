
const template = `
<template>
  <div v-if="!!htmlText" class="w-e-text-container">
    <div data-slate-editor v-html="detailContent"></div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { inject } from 'vue';

interface IHtmlView {
  htmlText: string;
}
const props = defineProps<IHtmlView>();

const $xss = inject<(input: string) => void>('$xss')!;
// 详情内容
const detailContent = computed(() => {
  return $xss(props?.htmlText || '');
});
</script>
<style scoped lang="scss">
.html-view {
  // line-height: 1.5;
  ::v-deep img {
    max-width: 100%;
  }
  ::v-deep p {
    margin-bottom: 15px;
  }
}
</style>
<style lang="scss">
@import '@/style/wang-editor.scss';
.html-view {
  @include publicCss();
}
</style>
`;

export default {
  name: 'index.vue',
  path: 'ReHtmlView',
  template
};