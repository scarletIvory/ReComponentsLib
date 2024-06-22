const template = `<template>
  <div class="mytable-root-bar">
    <div class="mytable-table-bar" ref="tableBar">
      <el-table
        :data="data"
        :height="tableHeight"
        v-bind="$attrs"
        v-loading="loading"
        header-row-class-name="commonTable-header-row-class-name"
        row-class-name="commonTable-row-class-name"
        cell-class-name="commonTable-cell-class-name"
        header-cell-class-name="commonTable-cell-class-name"
        ref="mytable"
        @selection-change="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <template v-for="(item, i) in columns">
          <el-table-column
            :key="'selection' + i"
            v-if="item.type === 'selection'"
            type="selection"
            :width="item.width"
          ></el-table-column>
          <el-table-column
            :key="'index' + i"
            v-else-if="item.type === 'index'"
            type="index"
            :label="item.label"
            :index="getIndex"
            :width="item.width"
            :min-width="item.minWidth"
          >
          </el-table-column>
          <el-table-column
            :key="'img' + i"
            v-else-if="item.type === 'img'"
            :header-align="align"
            :align="align"
            :prop="item.prop"
            :width="item.width"
            :min-width="item.minWidth"
            :label="item.label"
          >
            <template slot-scope="scope">
              <img
                class="common-table-img"
                :src="scope.row[item.prop] || defaultImg"
              />
            </template>
          </el-table-column>
          <el-table-column
            :key="i"
            :show-overflow-tooltip="!item.notShowTooltip"
            v-else-if="!item.hide"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :header-align="align"
            :align="align"
          >
            <template slot="header" slot-scope="scope">
              <slot
                v-if="getColumnHeaderSlots(item.prop).length > 0"
                :name="'column-header-' + item.prop"
                :row="item.label"
              ></slot>
              <span v-else>{{ item.label }}</span>
            </template>
            <template slot-scope="scope">
              <slot
                v-if="getColumnSlots(item.prop, $slots, $scopedSlots).length > 0"
                :name="'column-' + item.prop"
                :row="scope.row"
              ></slot>
              <template v-else>
                <!-- <el-tooltip
                  v-if="item.copy"
                  :disabled="!item.toolTip"
                  :content="scope.row[item.prop]"
                  placement="top-start"
                > -->
                <div
                  class="pointer"
                  v-if="item.copy"
                  v-clipboard:copy="scope.row[item.prop]"
                  v-clipboard:success="handleCopy"
                  v-clipboard:error="handleCopyError"
                >
                  {{
                    item.formatter
                      ? item.formatter(scope.row[item.prop])
                      : scope.row[item.prop]
                  }}
                </div>
                <!-- </el-tooltip> -->
                <div
                  v-else-if="item.formatter"
                  v-html="item.formatter(scope.row[item.prop], scope.row)"
                ></div>
                <div v-else>
                  {{ scope.row[item.prop] }}
                </div>
              </template>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          :fixed="operationFixed"
          label="操作"
          v-if="operation.length"
          :width="operation.length * optWidth"
          :header-align="align"
          :align="align"
          class-name="operate-row"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row, item.type, scope.$index)"
              type="text"
              v-for="(item, i) in operation"
              :disabled="
                (item.keyOfDisable &&
                  item.valueOfDisable.indexOf(scope.row[item.keyOfDisable]) >=
                    0) ||
                item.disable
              "
              :key="i"
              >{{ item.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mytable-page-bar" v-if="!hidePagination">
      <el-pagination
        background
        layout="total,sizes,prev, pager, next"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="pageSize"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request';
export default {
  name: 'ReTable',
  props: {
    align: { type: String, required: false, default: 'left' },
    columns: { type: Array, required: true },
    operation: { type: Array, required: true, default: () => [] },
    url: { default: '' },
    params: {
      default: () => {
        return {};
      }
    },
    operationFixed: {
      type: [String, Boolean],
      default: 'right'
    },
    operationWidth: {
      type: Number,
      default: 70
    },
    totalLimit: {
      type: Number | Boolean,
      default: false
    },
    method: {
      type: String,
      default: 'get'
    },
    dataRender: {
      type: Function
    },
    hidePagination: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tableUrl() {
      return this.url;
    }
  },
  mounted() {
    this.columns.forEach((item) => {
      if (item.width) {
        this.tableColumnsWidth.push(item.width);
      } else {
        this.tableColumnsWidth.push(0);
      }
    });
    this.$nextTick(() => {
      this.resetTableSize();
      this.search();
      window.addEventListener('resize', this.resetTableSize);
    });
  },
  destroyed() {
    window.removeEventListener('resize', this.resetTableSize);
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      data: [],
      loading: true,
      tableColumnsWidth: [],
      tableHeight: 0,
      defaultImg: require('@/assets/data-images/upload.png'),
      optWidth: 70,
      multipleSelection: []
    };
  },
  methods: {
    getColumnSlots(field) {
      return (
        (this.$scopedSlots['column-' + field] &&
          this.$scopedSlots['column-' + field]()) ||
        []
      );
    },
    getColumnHeaderSlots(field) {
      return (
        (this.$scopedSlots['column-header-' + field] &&
          this.$scopedSlots['column-header-' + field]()) ||
        []
      );
    },
    /**
     * @description:  获取序号
     * @param {*} index
     * @return {*}
     */
    getIndex(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    search(action) {
      if (this.tableUrl === '') {
        return;
      }
      if (!action) {
        this.currentPage = 1;
      }
      let config;
      if (this.method === 'get') {
        config = {
          params: {
            ...this.params
          }
        };
        if (!this.hidePagination) {
          config.params = {
            ...config.params,
            currentPageNo: this.currentPage,
            pageSize: this.pageSize
          };
        }
      } else {
        config = {
          ...this.params
        };
        if (!this.hidePagination) {
          config = {
            ...config,
            currentPageNo: this.currentPage,
            pageSize: this.pageSize
          };
        }
      }
      return request[this.method](this.tableUrl, config)
        .then(({ data }) => {
          if (this.dataRender && typeof this.dataRender === 'function') {
            this.data = this.dataRender(data);
          } else {
            this.data = data.list;
          }
          if (typeof this.totalLimit === 'number') {
            this.total = Math.min(this.totalLimit, data.totalElement);
          } else {
            this.total = data.totalElement;
          }

          this.loading = false;
          this.$emit('loaded', data);
        })
        .catch(() => {
          this.loading = false;
          this.$emit('loaded');
        });
    },
    handleClick(row, type, index) {
      this.$emit('click', row, type, index);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.search('pageAction');
      this.$emit('changeSize', val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search('pageAction');
      this.$emit('changePage', val);
    },
    // 复制成功
    handleCopy() {
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
    // 复制失败
    handleCopyError() {
      this.$message({
        message: '复制失败',
        type: 'error'
      });
    },
    /**
     * @description: 多选
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('selection-change', val);
    },

    /**
     * @description: 全选
     * @param {*} val
     * @return {*} void
     */
    handleSelectAll(val) {
      this.$emit('selection-all', val);
    },

    /**
     * @description:  重置表格高宽
     * @return {*}
     */
    resetTableSize() {
      if (
        this.$refs &&
        this.$refs.tableBar &&
        this.$refs.tableBar.offsetHeight
      ) {
        // 获取窗口宽度
        const width = document.documentElement.clientWidth;
        this.$nextTick(() => {
          this.tableHeight = this.$refs.tableBar.offsetHeight;
          this.optWidth = (width / 1920) * this.operationWidth;
          this.resizeWidth(width / 1920);
          // this.$refs["mytable"].resizeListener();
        });
      }
    },
    resizeWidth(scale) {
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].width) {
          this.columns[i].width = this.tableColumnsWidth[i] * scale;
        }
      }
    },
    refreshTable(data, index) {
      this.data.splice(index, 1, data);
    }
  }
};
</script>
<style lang="scss" scoped>
.mytable-root-bar {
  width: 100%;
  height: 100%;
  background-color: white;

  .mytable-table-bar {
    height: calc(100% - 74px);

    .common-table-img {
      width: 48px;
      height: 40px;
    }

    /deep/ .el-table::before {
      background-color: transparent;
    }

    /deep/ .el-table__fixed-right::before {
      background-color: transparent;
    }
  }

  .mytable-page-bar {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  /deep/ .commonTable-header-row-class-name {
    height: 54px;
    color: #1c2025;
    font-weight: 500;

    th {
      background-color: #f5f7fa;
    }
  }

  /deep/ .commonTable-row-class-name {
    border-radius: 41px 4px 0px 0px;
    height: 54px;

    .operate-row {
      .el-button {
        padding: 0 !important;

        span {
          border-right: 1px solid #e7ebf1;
        }

        &:not(:last-child) {
          span {
            padding-right: 12px;
          }
        }

        &:last-child {
          span {
            border: none;
          }
        }
      }
    }
  }

  /deep/ .commonTable-cell-class-name {
    .cell {
      padding-left: 24px;
    }
  }
}

.el-tooltip > div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.pointer {
  cursor: pointer;
}
</style>
`;

const ReTableTemplate = 
{
  name: 'ReTable',
  template,
};

export default ReTableTemplate;