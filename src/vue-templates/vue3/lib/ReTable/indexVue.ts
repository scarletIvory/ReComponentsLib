const setTableRowClassName = ({ row }: { row: any }) => {
  if (!row.customRowClassName) {
    return 'commonTable-row-class-name';
  }
  if (typeof row.customRowClassName === 'string') {
    return `${row.customRowClassName} commonTable-row-class-name`;
  }
  const t = ['commonTable-row-class-name'];
  for (const key of row.customRowClassName) {
    t.push(key);
  }
  return t.join(' ');
};

const template = `
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-indent -->
<template>
  <div class="mytable-root-bar">
    <div
      ref="tableBar"
      class="mytable-table-bar"
      :class="showPagation ? 'with-pagation' : 'no-pagation'"
    >
      <el-table
        ref="mytable"
        v-loading="loading"
        :data="tableData"
        header-row-class-name="commonTable-header-row-class-name"
        :row-class-name="(row) => setTableRowClassName(row)"
        cell-class-name="commonTable-cell-class-name"
        header-cell-class-name="header-cell-class-name"
        fit
        :border="border"
        @selection-change="changeFun"
        @expand-change="(a, b) => expandChange(a, b)"
      >
        <el-table-column
          v-if="showIndexBox"
          type="index"
          width="100"
          label="序号"
          fixed
        />
        <!-- 添加复选框按钮 -->
        <el-table-column
          v-if="showCheckBox"
          :width="checkWidth"
          type="selection"
        />
        <template v-for="(item, i) in columns">
          <el-table-column
            v-if="item.type === 'index'"
            :key="'index_' + i"
            type="index"
            :fixed="handlefixed(item.fixed)"
            :index="(idx) => item.indexMethod(idx, pageSize, pageNum)"
            :label="item.label"
            :width="item.width || '120px'"
            :min-width="item.minWidth"
          />
          <el-table-column
            v-else-if="item.isImage"
            :key="'img' + i"
            :header-align="align"
            :align="align"
            :fixed="handlefixed(item.fixed)"
            :prop="item.prop"
            :label="item.label"
            :width="item.width || '120px'"
            :min-width="item.minWidth"
          >
            <template #default>暂无数据</template>
          </el-table-column>
          <el-table-column
            v-else-if="item.type === 'expand'"
            :key="'expand' + i"
            type="expand"
            :header-align="align"
            :align="align"
            :fixed="handlefixed(item.fixed)"
            :prop="item.prop"
            :label="item.label"
            :width="item.width || '120px'"
            :min-width="item.minWidth"
          >
            <template #default="scope">
              <slot
                v-if="getColumnSlots(item.prop, $slots).length > 0"
                :name="'column-' + item.prop"
                :row="scope.row"
              ></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="!item.hide"
            :key="i"
            :show-overflow-tooltip="
              item.showOverflowTooltip === false ? false : true
            "
            :prop="item.prop"
            :index="i"
            :fixed="handlefixed(item.fixed)"
            :label="item.label"
            :header-align="align"
            :align="align"
            :width="item.width"
            :min-width="item.minWidth"
          >
            <template #header>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.label"
                placement="top"
                popper-class="maxw500"
                :disabled="showTips(i)"
              >
                <span>{{ item.label }}</span>
              </el-tooltip>
            </template>

            <template #default="scope">
              <slot
                v-if="getColumnSlots(item.prop, $slots).length > 0"
                :name="'column-' + item.prop"
                v-bind="scope"
              ></slot>
              <div v-else-if="item.formatter">
                {{ item.formatter(scope.row) }}
              </div>
              <template v-else>
                {{ scope.row[item.prop] }}
              </template>
            </template>
          </el-table-column>
        </template>
        <!-- 操作    btnAuth: { type: Boolean, default: true }, -->
        <el-table-column
          v-if="operation.length"
          :fixed="operationFixed"
          :label="operationLabel"
          :header-align="align"
          :align="align"
          :width="operationWidth"
          class-name="operate-row"
        >
          <template #default="scope">
            <span v-for="(item, i) in operation" :key="i">
              <el-button
                v-if="generateColumnVisible(item, scope.row)"
                type="primary"
                link
                :disabled="generateColumnDisabled(item, scope.row)"
                @click="handleClick(scope.row, item.type, scope.$index)"
              >
                {{ item.label }}
              </el-button>
            </span>
          </template>
        </el-table-column>
        <template #empty>
          <ReSvgIcon icon-class="empty" class-name="empty-icon" />
        </template>
      </el-table>
    </div>
    <div v-if="showPagation" class="mytable-page-bar">
      <el-pagination
        background
        layout="total,sizes,prev, pager, next, jumper"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        :total="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { widthFix } from '@/utils/format';
import { ref, PropType, watchEffect, computed } from 'vue';
interface Foo {
  type?: string;
  fixed?: any;
  prop?: any;
  formatter?: any;
  label?: string;
  width?: string | number;
  isImage?: boolean;
  hide?: boolean;
  showTitleTips?: any;
  [x: string]: any;
}
const props = defineProps({
  pageNum: { type: Number as PropType<number>, required: false, default: 1 },
  pageSize: { type: Number as PropType<number>, required: false, default: 10 },
  align: { type: String, required: false, default: 'left' },
  columns: { type: Array as PropType<Foo[]>, required: true },
  tableData: { type: Array as PropType<Recordable[]>, default: () => [] },
  totalNum: { type: Number, default: 0 },
  showCheckBox: { type: Boolean, default: false },
  showIndexBox: { type: Boolean, default: false },
  operationLabel: { type: String, default: '操作' },
  operation: {
    type: Array as PropType<Recordable[]>,
    required: true,
    default: () => [],
  },
  operationWidth: { type: [String, Number], default: 120 },
  operationFixed: { type: [String, Boolean], default: 'right' },
  showPagation: { type: Boolean, default: true },
  border: { type: Boolean, default: false },
  btnAuth: { type: Boolean, default: true },
});
const emit = defineEmits([
  'expand-change',
  'search',
  'select-change',
  'click',
  'update:pageSize',
  'update:pageNum',
  'pageChage',
]);
const pageSize = ref(10);
const pageNum = ref(1);
const loading = ref(false);
const tableBar = ref();
const mytable = ref();

const checkWidth = computed(() => {
  return widthFix(60);
});

watchEffect(() => {
  pageNum.value = props.pageNum;
  pageSize.value = props.pageSize;
});

/**
 * checkbox选择监听事件
 */
const changeFun = (val) => {
  emit('select-change', val);
};

const showTips = (index) => {
  const item = props.columns[index];
  return !item.showTitleTips;
};

/**
 * @description: 获取pageSize, pageNum
 * @param {void}
 * @returns {Object}
 */
const getPagenation = () => {
  return {
    pageSize: pageSize.value,
    pageNum: pageNum.value,
  };
};

/**
 * @description: 自定义表格行class name
 * @param {Array} row.customRowClassName 自定义类名数组
 * @returns {String}
 */
const setTableRowClassName = ${setTableRowClassName};

/**
 * @description: 处理固定列
 */
const handlefixed = (value) => {
  return value === undefined ? false : value;
};

const getColumnSlots = (field, slots) => {
  // eslint-disable-next-line no-extra-parens
  return (slots['column-' + field] && slots['column-' + field]()) || [];
};

const handleSizeChange = (val) => {
  pageSize.value = val;
  pageNum.value = 1;
  emit('update:pageSize', val);
  emit('pageChage', { pageSize: val, pageNum: 1 });
};

const handleCurrentChange = (val) => {
  // console.log("val",val)
  pageNum.value = val;

  emit('update:pageNum', val);
  const param = { pageSize: pageSize.value, pageNum: val };
  emit('pageChage', param);
};

/**
 * @description: 判断列是否展示
 * @param {*} rowData
 * @return {*} boolean
 */
function generateColumnVisible(operation, rowData) {
  if (Object.prototype.hasOwnProperty.call(operation, 'visible')) {
    if (typeof operation.visible === 'boolean') {
      return operation.visible;
    } else if (typeof operation.visible === 'function') {
      return operation.visible(rowData);
    }
  } else {
    return true;
  }
}

/**
 * @description: 判断列是否禁用
 * @param {*} rowData
 * @return {*} boolean
 */
function generateColumnDisabled(operation, rowData) {
  if (Object.prototype.hasOwnProperty.call(operation, 'disable')) {
    if (typeof operation.disable === 'boolean') {
      return operation.disable;
    } else if (typeof operation.disable === 'function') {
      return operation.disable(rowData);
    }
  } else {
    return false;
  }
}

const handleClick = (row, type, index) => {
  emit('click', row, type, index);
};
defineExpose({
  loading,
  getPagenation,
  pageNum,
  pageSize,
});
</script>

<style lang="scss" scoped>
.mytable-root-bar {
  width: 100%;
  background-color: white;

  .no-pagation {
    height: 100%;
  }

  .with-pagation {
    height: calc(100% - 50px);
  }

  .mytable-table-bar {
    // overflow-y: auto;
    .common-table-img {
      width: 48px;
      height: 40px;
    }
    :deep(.el-table::before) {
      background-color: transparent;
    }
    :deep(.el-table__fixed-right::before) {
      background-color: transparent;
    }
  }

  .mytable-page-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 78px;
  }
  :deep(.commonTable-header-row-class-name) {
    th {
      background-color: rgba(245, 247, 250, 1);
    }
    .el-table__cell {
      height: 54px;
      background-color: rgba(245, 247, 250, 1);
      border-bottom: none;
    }
  }
  :deep(.commonTable-row-class-name) {
    height: 54px;
    .operate-row {
      .el-button {
        &:last-child {
          span {
            border: none;
          }
        }
      }
    }
  }
  // 每个cell的样式
  :deep(.commonTable-cell-class-name) {
    .cell {
      padding-left: 24px;
      color: #4f565f;
      font-size: 14px;
    }
  }
  // header cell的样式
  :deep(.header-cell-class-name) {
    .cell {
      padding-left: 24px;
      color: rgba(28, 32, 37, 1);
      font-size: 14px;
      font-weight: 500;
    }
  }
  :deep(.el-table__empty-text) {
    .empty-icon {
      width: 80px;
      height: 100px;
      color: #e4e6ea;
    }
  }
  :deep(.el-scrollbar__wrap) {
    display: flex;
  }
}

.el-tooltip > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-table {
  width: 100%;
  height: 100% !important;
  & :deep(.el-table__inner-wrapper) {
    height: 100%;
  }
}
</style>
`;

export default {
  name: 'index.vue',
  path: 'ReTable',
  template
};