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
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" plain @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { PropType, reactive, ref } from 'vue';
import _ from 'lodash';
import { IFormOptions } from './type';

const props = defineProps({
  options: {
    type: Array as PropType<IFormOptions[]>,
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const quickFormRef = ref<FormInstance>();
const emit = defineEmits(['search', 'reset', 'update:modelValue']);

const formData = reactive(props.modelValue || {});

const generateOptions = (options: IFormOptions['options']) => {
  if (Array.isArray(options)) {
    return options;
  } else if (_.isFunction(options)) {
    return options();
  } else {
    return [];
  }
};

const onSubmit = () => {
  emit('search', props.modelValue);
};
const onReset = () => {
  if (quickFormRef.value) {
    quickFormRef.value.resetFields();
    emit('reset', props.modelValue);
  }
};
</script>

<style scoped lang="scss">
.form-container {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 2px;
  .form-item {
    width: 260px;
    margin-bottom: 0;
  }
}
</style>
`;

export default {
  name: 'index.vue',
  path: 'ReSearchBar',
  template,
};