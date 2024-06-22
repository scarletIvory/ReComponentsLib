const template = `
<template>
  <div :class="['title-wrap', { 'title-wrap-white': type === 'white' }]">
    <div class="title-container">
      <span v-if="type !== 'white'" class="title-line"></span>
      <span class="title">{{ title }}</span>
    </div>
    <div class="btns-container">
      <template v-for="(item, index) in btnProps">
        <el-button
          :key="index"
          :type="item.type"
          @click="item.click"
          :plain="item.plain || false"
          >{{ item.label }}</el-button
        >
      </template>
    </div>
    <!-- <SvgIcon
      v-if="type !== 'white'"
      icon-class="read-filled"
      :class-name="'read-icon'"
    /> -->
  </div>
</template>

<script>
export default {
  name: 'ReTitleTab',
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'default',
      validator: function(value) {
        return ['default', 'white'].includes(value);
      }
    },
    btnProps: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ .el-button {
  &.el-button--default {
    color: #0d7bff;
    border-color: #0d7bff;
  }
}
.title-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 20px;
  background: linear-gradient(270deg, #e4edfe 0%, #eff3ff 100%);
  border: 1px solid #ffffff;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid #ffffff;

  .title-container {
    display: flex;
    align-items: center;
  }

  /deep/ .read-icon {
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
    margin-right: 7px;
    background: #283feb;
    border-radius: 2px;
  }
  .title {
    font-weight: 500;
    font-size: 16px;
    color: #1c2025;
    line-height: 26px;
    // margin-left: 7px;
  }

  .btns-container {
    display: flex;
    align-items: center;
  }
}
.title-wrap-white {
  padding: 16px 32px;
  background: #fff;
  // border-bottom: 1px solid #E7EBF1;
}
</style>
`;

export default {
  name: "ReTitleTab",
  template,
};