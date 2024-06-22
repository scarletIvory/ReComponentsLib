const template = `
<template>
  <el-form
    ref="quickFormRef"
    :model="formData"
    :inline="true"
    class="form-container"
  >
    <el-form-item
      v-for="item in options"
      :key="item.key"
      :label="item.label"
      :prop="item.key"
      class="form-item"
    >
      <template v-if="item.type === 'input'">
        <el-input
          v-model="formData[item.key]"
          :placeholder="item.placeholder"
          clearable
        />
      </template>
      <template v-if="item.type === 'select'">
        <el-select
          v-model="formData[item.key]"
          :placeholder="item.placeholder"
          clearable
        >
          <el-option
            v-for="(option, index) in generateOptions(item.options)"
            :key="index"
            :label="option['label']"
            :value="option['value']"
          />
        </el-select>
      </template>
    </el-form-item>
    <el-form-item class="form-item form-item_button">
      <el-button type="primary" @click="onSubmit">查 询</el-button>
      <el-button @click="onReset">清 空</el-button>
    </el-form-item>
    <el-form-item class="form-item form-item_button">
      <el-button v-if="isBack" @click="onBack">返 回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ReSearchBar',
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Object,
      default: function() {
        return {};
      }
    },
    isBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: this.modelValue,
      quickFormRef: null
    };
  },
  methods: {
    generateOptions(options) {
      if (Array.isArray(options)) {
        return options;
      } else {
        return [];
      }
    },
    onSubmit() {
      this.$emit('search', this.formData);
    },
    onReset() {
      if (this.quickFormRef) {
        this.quickFormRef.resetFields();
        this.$emit('reset', this.formData);
      }
    },
    onBack() {
      this.$emit('back');
    }
  },
  mounted() {
    this.quickFormRef = this.$refs.quickFormRef;
  }
};
</script>

<style scoped lang="scss">
.form-container {
  position: relative;
  background-color: #ffffff;
  padding: 22px 24px;
  border-radius: 2px;

  .form-item {
    margin-right: 24px;
    margin-bottom: 0;

    &:last-child {
      position: absolute;
      top: 22px;
      right: 24px;
      margin-right: 0;
      text-align: right;
    }
  }

  /deep/ .el-form-item__content {
    width: 180px;
  }

  .form-item_button {
    margin-left: 6px;
  }
}

/deep/ .el-input__inner {
  height: 32px;
}

.el-button {
  width: 65px;
  height: 32px !important;
  margin-left: 4px;

  &:first-child {
    margin-left: 0;
  }
}
</style>
`;

export default {
  name: "ReSearchBar",
  template,
};