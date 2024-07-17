/*
 * @Author: TuWenxuan
 * @Date: 2024-06-25 14:11:06
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-25 15:05:17
 * @FilePath: /testcode1/src/vue-templates/vue3/lib/ReFileUpload/indexVue.ts
 * @Description: 
 * 
 */
const text1 = "`文件个数超限,只可上传${defineProp.limit}个文件`";
const text2 = "`请上传${defineProp.accept.join('、')}格式文件`";
const text3 = "`文件上传不能大于${defineProp.fileSize}M!`";
const template = `
<template>
  <div class="fileupload">
    <el-upload
      v-show="defineProp.isShowUpload"
      ref="uploadRef"
      v-model:file-list="fileLists"
      action="/#"
      :multiple="defineProp.multiple"
      :auto-upload="false"
      :drag="defineProp.drag"
      :disabled="defineProp.disabled"
      :show-file-list="false"
      :on-exceed="handleExceed"
      :on-change="onChange"
      :limit="defineProp.limit"
      :list-type="defineProp.listType"
      :on-remove="onRemove"
      :http-request="defineProp.httpRequest"
      :on-success="onSuccess"
    >
      <div v-if="showPictureUpload" class="uploadBox">
        <!-- v-if="(!URLdata.length && !pdfUrl.length) || isEditing" -->
        <div class="uploadBtn">
          <Plus class="upload-btn-icon" />
          <span>{{ defineProp.text }}</span>
        </div>
      </div>
      <div v-else class="upload-file-btn">
        <el-button plain>
          <el-icon class="upload-file-btn-icon"><Upload /></el-icon>
          上传文件
        </el-button>
        <el-button
          v-if="uploadTemplate"
          class="upload-file-btn_extra"
          text
          type="primary"
          @click.stop="onDownTemplate"
        >
          {{ uploadTemplateButtonLabel }}
        </el-button>
      </div>
    </el-upload>
    <template v-if="URLdata.length && listType === 'picture'">
      <div v-for="(item, index) in URLdata" :key="index" class="images">
        <div v-if="item.type === 'image'" class="upload-image-picture">
          <el-image
            :src="item.url"
            fit="contain"
            :preview-src-list="[item.url]"
          />
          <ReSvgIcon
            icon-class="close"
            class-name="btn-plus-icon"
            @click="handleRemove"
          />
        </div>
        <div
          v-if="item.type === 'pdf'"
          :key="index"
          class="pdf-item el-icon-document"
          @click.stop="seePdf(item.url)"
        />
        <div
          v-if="item.type === 'zip'"
          :key="index"
          class="pdf-item el-icon-document"
        />
      </div>
    </template>
    <div v-else class="images">
      <el-image
        v-if="imgUrl"
        style="height: 100px"
        :src="imgUrl"
        :preview-src-list="[imgUrl]"
        fit="contain"
      />
      <div
        v-if="pdfUrl"
        class="pdf-item el-icon-document"
        @click="seePdfFile(pdfUrl)"
      >
        <img class="file" src="../../assets/images/file.png" alt="" />
      </div>
    </div>
    <!-- 上传tips -->
    <div v-if="defineProp.accept && !showUploadTips" class="upload-tips">
      可上传{{ defineProp.accept.join('、') }}格式，大小不超过{{
        defineProp.fileSize
      }}M。
    </div>
    <div v-else class="upload-tips">
      <slot name="upload-tips"></slot>
    </div>
    <!-- 上传列表 -->
    <FileList
      v-if="defineProp.showFileList"
      :file-list="URLdata"
      @remove="handleRemove"
    />
  </div>
</template>

<script lang="ts" setup>
import { Upload } from '@element-plus/icons-vue';
import { useFormTrigger } from './hooks/useFormTrigger';
import { computed, PropType, ref, useSlots, watch } from 'vue';
import {
  ElMessage,
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadRawFile,
  UploadRequestHandler,
} from 'element-plus';
import FileList from './FileList.vue';
import { downFile } from '@/utils';
import type { EpPropMergeType } from 'element-plus/es/utils';

const emit = defineEmits(['update:file', 'removeCover', 'fileList']);
const defineProp = defineProps({
  file: {
    type: [Object, String],
    default: () => {
      return {};
    },
  },
  text: {
    type: String,
    default: '上传附件',
  },
  size: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  showFileList: {
    type: Boolean,
    default: true,
  },
  uploadTemplateButtonLabel: {
    type: String,
    default: '下载模版',
  },
  uploadTemplate: {
    type: String,
    default: '',
  },
  uploadTemplateName: {
    type: String,
    default: '',
  },
  drag: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: Array,
    default: () => [],
  },
  limit: {
    type: Number,
    default: 2,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  listType: {
    type: String as PropType<
      EpPropMergeType<
        StringConstructor,
        'text' | 'picture' | 'picture-card',
        unknown
      >
    >,
    default: 'text',
  },

  /**
   * 自定义参数
   *  @param { fileSize }为上传文件的大小限制（M）
   *  @param { imgUrl }图片显示
   *  @param { pdfUrl }显示pdf
   *
   */
  fileSize: {
    type: Number,
    default: 20,
  },
  imgUrl: {
    type: String,
    default: '',
  },
  pdfUrl: {
    type: String,
    default: '',
  },
  zipUrl: {
    type: String,
    default: '',
  },
  isShowUpload: {
    type: Boolean,
    default: true,
  },
  docUrl: {
    type: String,
    default: '',
  },
  pptxUrl: {
    type: String,
    default: '',
  },
  isdownLoadPdf: {
    type: Boolean,
    default: false,
  },
  fileList: {
    type: Array,
    default: () => [],
  },
  httpRequest: {
    type: Function as PropType<UploadRequestHandler>,
    default: () => null,
  },
});
const { emitTrigger } = useFormTrigger();

const uploadRef = ref<UploadInstance>();
const fileLists = ref<any>([]); // 存放文件
const URLdata = ref<any>([]);
const showPictureUpload = computed(() => {
  return (
    defineProp.limit === 1 &&
    defineProp.listType === 'picture' &&
    URLdata.value.length <= 0
  );
});

const slots = useSlots();
// 判断是否展示上传提示
const showUploadTips = computed(() => {
  return slots['upload-tips'];
});

watch(
  () => defineProp.fileList,
  () => {
    URLdata.value = URLdata.value.concat(defineProp.fileList);
  },
  {
    immediate: true,
  }
);
function onBefroreUpload(file: UploadFile, fileList: UploadFiles): boolean {
  if (URLdata.value.length >= defineProp.limit) {
    const index = fileList.findIndex(
      (uploadFile) => uploadFile.uid === file.uid
    );
    if (index > -1) {
      fileList.splice(index, 1);
    }
    ElMessage.error(${text1});
    return false;
  }
  return true;
}
function handleExceed() {
  ElMessage.error(${text1});
  return;
}
function onRemove(e: any, res: any) {
  console.log(e, '删除文件', res);
  const fileData = res.map((item: { raw: any }) => {
    // const fileFormData = new FormData();
    // fileFormData.append('file', item.raw);
    // return fileFormData;
    return item.raw;
  });
  URLdata.value.splice(fileData, 1);
  console.log(fileData);
  if (!defineProp.multiple) {
    emit('update:file', fileData[0]);
  } else {
    emit('update:file', fileData);
  }
  emitTrigger();
}

function onChange(file: any, fileList: any[]) {
  if (!onBefroreUpload(file, fileList)) return false;
  if (fileList.length > 1 && !defineProp.multiple) {
    fileList.splice(0, 1);
    if (URLdata.value.length) {
      URLdata.value.splice(0, 1);
    }
  }

  const filetype = file.raw.name
    .substring(file.raw.name.lastIndexOf('.') + 1)
    .toLowerCase();
  const type = file.raw.type.split('/');
  const size = file.raw.size;
  console.log(type);
  // if (!this.accept.includes(type[1]) && !this.accept === '') {
  if (
    defineProp.accept.length > 0 &&
    !defineProp.accept.some(
      (type) => (type as string).toLowerCase() === filetype
    )
  ) {
    ElMessage.error(${text2});
    fileList = fileList.filter((item) => item.name !== file.name);
    fileLists.value.splice(fileList, 1);
    URLdata.value.splice(fileList, 1);
    return false;
  } else if (size > defineProp.fileSize * 1024 * 1024) {
    // 102
    ElMessage.error(${text3});
    fileList = fileList.filter((item) => item.name !== file.name);
    fileLists.value.splice(fileList, 1);
    URLdata.value.splice(fileList, 1);
    return false;
  }
  // 图片展示
  if (type[0] === 'image') {
    URLdata.value.push({
      type: 'image',
      url: window.URL.createObjectURL(file.raw),
      name: file.raw.name,
    });
  } else {
    // 非图片
    URLdata.value.push({
      type: filetype,
      url: window.URL.createObjectURL(file.raw),
      name: file.raw.name,
    });
  }

  const fileData = fileList.map((item) => {
    // const fileFormData = new FormData();
    // fileFormData.append('file', item.raw);
    // return fileFormData;
    return item.raw;
  });
  console.log(fileData, 'fileDatafileData----');
  fileLists.value = fileList;

  /**
   * 单个上传返回Object => FormData
   * 多个上传返回Array => FormData
   */
  if (!defineProp.multiple) {
    emit('update:file', fileData[0]);
  } else {
    emit('update:file', fileData);
  }
  emitTrigger();
  // console.log(fileList, 'fileUpload.vue');
  // emit('uploadFile',fileList);
}

/**
 * @description: 文件上传成功
 * @return {*} void
 */
function onSuccess(response: any) {
  console.log(response);
}

/**
 * 查看pdf
 */
function seePdf(url: string) {
  window.open(url);
}

/**
 * @description: 删除File
 * @param {*} file
 * @return {*}
 */
function handleRemove() {
  if (uploadRef.value) {
    uploadRef.value.handleRemove(defineProp.file as UploadRawFile);
    emit('removeCover');
  }
}
function seePdfFile(url: string) {
  console.log(url, 'uuuuuuuuu');
  window.open(url);
}

/**
 * @description: 下载上传需要的模版
 * @return {*} void
 */
function onDownTemplate() {
  if (defineProp.uploadTemplate) {
    downFile(defineProp.uploadTemplate, defineProp.uploadTemplateName);
  }
}

function reset() {
  URLdata.value = [];
  uploadRef.value?.clearFiles();
  emit('update:file', '');
  emit('fileList', []);
}

defineExpose({
  reset,
});
</script>
<style lang="scss" scoped>
.fileupload {
  display: flex;
  flex-direction: column;
  .upload-file-btn {
    :deep(.el-button) {
      font-weight: 400;
    }
    &-icon {
      margin-right: 4px;
    }
    &_extra {
      margin-left: 2px;
    }
  }
  .images {
    position: relative;
    .upload-image-picture {
      height: 116px;
      width: 116px;
      position: relative;
      border-radius: 2px;
      display: flex;
      align-items: center;
      border: 1px dashed #d9d9d9;
      .el-image__inner {
        height: 116px;
      }
    }
    &:first-child {
      margin-left: 0;
    }
    :deep(.btn-plus-icon) {
      width: 14px;
      height: 14px;
      position: absolute;
      top: -7px;
      right: -7px;
      cursor: pointer;
    }
  }
}
.uploadBox {
  display: flex;

  flex-direction: column;
  .uploadBtn {
    width: 116px;
    height: 116px;
    text-align: center;
    background: #fbfbfb;
    border: 1px dashed #d9d9d9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      font-size: 14px;
      color: #4f565f;
    }
    .upload-btn-icon {
      width: 28px;
      height: 28px;
      color: rgba(0, 0, 0, 0.43);
      font-weight: 600;
    }
  }
}

.file {
  width: 50px;
  cursor: pointer;
}

.upload-tips {
  font-weight: 400;
  font-size: 14px;
  color: #8c8c8c;
}
</style>
`;

export default {
  name: 'index.vue',
  path: 'ReFileUpload',
  template
};