
const template = `
<template>
  <div class="menu">
    <div :class="['menu-title', {'menu-title-fold': !menuStatus}]" @click="changeOpenStatus">
      <span class="title">{{ title }}</span>
      <el-icon color="#C1C7D3">
        <CaretBottom v-if="menuStatus" />
        <CaretTop v-else />
      </el-icon>
    </div>
    <div v-if="menuStatus" class="menu-list">
      <template v-if="menuList.length">
        <div
          v-for="item in (menuList || [])"
          :key="item.key"
          :class="['menu-item', {'menu-item-active': item.key === activeData}]"
          @click="changeData(item)"
        >
          <ReText
            :text="item.title || ''"
            :number-of-lines="1"
            :class="['menu-item-title', {'menu-item-title-max': !item.value && item.value !== 0}]"
          />
          <span v-if="item.value || item.value == 0" class="menu-item-value">{{ item.value }}</span>
        </div>
      </template>
      <div v-else class="no-data">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { IMenuItem } from './interface';
import { watchEffect } from 'vue';
const props = defineProps<{
  menuList: IMenuItem[];
  title: string;
  initKey?: number;
}>();
const emit = defineEmits(['changeData']);
// 数据领域菜单折叠状态
const menuStatus = ref(true);
const activeData = ref(props?.initKey || props?.menuList?.[0]?.key);
watchEffect(() => {
  activeData.value = props?.initKey || props?.menuList?.[0]?.key;
});

/**
 * @description: 折叠菜单
 * @return {*}
 */
 const changeOpenStatus = () => {
  menuStatus.value = !menuStatus.value;
};

/**
 * @description: 切换菜单选择回调
 * @return {*}
 * @param {{key: number}} item 当前选择项
 */
const changeData = item => {
  activeData.value = item.key;
  emit('changeData', item);
};
</script>
<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 240px;
  margin-right: 20px;
  flex-shrink: 0;

  .menu-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid #E7EBF1;
    cursor: pointer;
    background: #fff;

    .title {
      font-weight: 500;
      font-size: 16px;
      color: #1C2025;
      line-height: 24px;
    }
  }
  .menu-list {
    padding: 8px;
    background: #fff;
    max-height: 450px;
    overflow-y: auto;

    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 0 8px;
      cursor: pointer;

      &-title {
        font-weight: 400;
        font-size: 14px;
        color: #1C2025;
        line-height: 22px;
        max-width: calc(100% - 20px);
      }
      &-title-max {
        max-width: 100%;
      }
      &-value {
        font-weight: 400;
        font-size: 12px;
        color: #717578;
        line-height: 20px;
      }
    }
    .menu-item-active {
      background: #ecf5ff;
    }
  }
  .menu-title-fold {
    border: none;
  }
}
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-size: 14px;
  color: #798089;
}
</style>
`;

export default {
  name: 'index.vue',
  path: 'ReMenu',
  template
};