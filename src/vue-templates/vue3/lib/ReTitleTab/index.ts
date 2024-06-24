
const template = `
<template>
  <div :class="['title-wrap', {'title-wrap-white': type === 'white'}]">
    <span v-if="type !== 'white'" class="title-line"></span>
    <span class="title">{{ title }}</span>
    <ReSvgIcon
      v-if="type !== 'white'"
      icon-class="read-filled"
      :class-name="'read-icon'"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * @description: 详情页的标题tab
 * @param {string} title 标题
 * @param {'default' | 'white';} type  类型 default 为蓝底的，white为白底的
 * @return {*}
 */
interface IProps {
  title: string;
  type?: 'default' | 'white';
}
defineProps<IProps>();

</script>

<style scoped lang="scss">
.title-wrap {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 0 20px 24px;
  background: linear-gradient( 270deg, #E4EDFE 0%, #EFF3FF 100%);
  border: 1px solid #FFFFFF;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid #FFFFFF;

  :deep(.read-icon) {
    position: absolute;
    width: 72px;
    height: 55px;
    right: 32px;
    top: 2.5px;
  }

  .title-line {
    display: inline-block;
    width: 4px;
    height: 16px;
    background: #283FEB;
    border-radius: 2px;
  }
  .title {
    font-weight: 500;
    font-size: 18px;
    color: #1C2025;
    line-height: 26px;
    margin-left: 7px;
  }
}
.title-wrap-white {
  padding: 16px 32px;
  background: #fff;
  border-bottom: 1px solid #E7EBF1;
}
</style>
`;

export default [{
  name: 'index.vue',
  path: 'ReTitleTab',
  template,
}];