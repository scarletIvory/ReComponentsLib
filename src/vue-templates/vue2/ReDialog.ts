const template = `
<template>
  <el-dialog
    v-dialogDrag
    ref="refDialog"
    :title="Poptitle"
    :visible.sync="appSystemShow"
    @closed="closeApp"
    :before-close="handleClose"
    :close-on-click-modal="false"
    class="edit-dialog"
    :width="width"
    :top="top"
  >
    <template slot="title">
      <div class="zkTitle title">
        <div>
          <div></div>
          <div>{{ title }}</div>
        </div>
      </div>
    </template>
    <div class="divide-line"></div>
    <div class="dialog-body">
      <slot></slot>
    </div>
    <div class="divide-line"></div>
    <template slot="footer">
      <template v-for="(item, index) in btnGroups">
        <el-button :key="index" :type="item.type" @click="item.click">{{
          item.text
        }}</el-button>
      </template>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'ReDialog',
  props: {
    appShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '编辑'
    },
    beforeClose: {
      type: Function,
      default: () => {}
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    btnProp: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const getBtns = () => {
      return [
        {
          text: '取消',
          type: 'default',
          click: this.closeApp
        },
        {
          text: '确定',
          type: 'primary',
          click: this.confirm
        }
      ];
    };
    return {
      appSystemShow: this.appShow,
      Poptitle: this.title,
      btnGroups: this.btnProp.length > 0 ? this.btnProp : getBtns()
    };
  },
  watch: {
    btnProp(val) {
      this.btnGroups = val;
    },
    appShow(val) {
      this.appSystemShow = val;
    }
  },
  methods: {
    closeApp() {
      this.$emit('close');
      // this.appSystemShow = false;
    },
    confirm() {
      this.$emit('confirm');
      // this.appSystemShow = false;
    },
    handleClose(done) {
      if (this.beforeClose) {
        this.beforeClose();
      }
      done();
    }
  }
};
</script>
<style scoped>
.divide-line {
  width: 100%;
  height: 1px;
  background: #e7ebf1;
}

.dialog-body {
  padding: 20px 20px 0;
}

.el-button {
  width: 65px;
  height: 32px !important;
  margin-left: 8px;

  &:first-child {
    margin-left: 0px;
  }
}

/deep/ .el-dialog {
  .el-dialog__footer {
    padding: 10px 24px;
  }
}
</style>
`;

export default {
  name: "ReDialog",
  template,
};