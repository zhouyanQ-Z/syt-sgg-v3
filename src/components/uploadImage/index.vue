<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      :action="uploadImgUrl"
      :multiple="props.isMultiple"
      :limit="props.limitNum"
      :disabled="props.isDisableUpload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <el-icon class="icon"><slot name="tip-icon"></slot></el-icon>
    </el-upload>

    <!-- 上传提示 -->
    <div class="el-upload__tip" slot="tip" v-if="props.showTip">
      请上传
      <template v-if="props.maxFileSize">
        大小不超过 <b style="color: #f56c6c">{{ props.maxFileSize }}MB</b>
      </template>
      <template v-if="props.acceptType">
        格式为 <b style="color: #f56c6c">{{props.acceptType }}</b>
      </template>
      的文件
    </div>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="预览" style="width: 100%;height: 100%;" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { reactive, toRefs, watch } from 'vue';
  import type { UploadProps, UploadUserFile,UploadFile,UploadFiles,UploadRawFile } from 'element-plus'
  import { msgError } from '@/utils/modal'

  
  interface Props {
    acceptType?: string; // 上传文件类型
    isMultiple?: boolean; //   是否可批量上传
    limitNum?: number; // 允许上传文件的最大数量
    isDisableUpload?: boolean; // 是否禁用上传
    maxFileSize?: number; // 文件大小
    modelValue?: any; // 回显的文件
    isDownLoad?: boolean; // 是否可以下载
    showTip?: boolean, // 是否显示提示
  }

  const props = withDefaults(defineProps<Props>(),{
    acceptType: 'png,jpg,jpeg,gif',
    isMultiple: true,
    limitNum: 10,
    isDisableUpload: false,
    maxFileSize: 10,
    modelValue: [],
    isDownLoad: false,
    showTip: false
  })

  const emits = defineEmits(['update:modelValue'])

  const data = reactive({
    fileList: [],
    uploadImgUrl: '/api/oss/file/fileUpload?fileHost=userAuah',
    dialogImageUrl: "",
    dialogVisible: false,
  })

  let { fileList,uploadImgUrl,dialogImageUrl,dialogVisible } = toRefs(data)

  // 上传文件之前的钩子
  const handleBeforeUpload = (rawFile: UploadRawFile) => {   
    // 校验文件格式
    let typeArr = props.acceptType.split(',')
    let type = rawFile.type.split('/')[1]
    if(typeArr.indexOf(type) < 0) {
      msgError(`文件格式不正确，请上传${props.acceptType.replace(',','/')}格式文件`)
      return false
    } else if(rawFile.size/1024/1024 > props.maxFileSize) {
      msgError(`上传文件大小不能超过${props.maxFileSize}MB`)
      return false
    }
    return true
  }
  // 上传文件成功
  const handleSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    let newFile = fileList.value.map((item:any) => {
      return {
        imgName: item.name,
        imgUrl: item.response? item.response.data: item.url
      }
    })
    emits('update:modelValue',newFile)
  }
  // 上传文件失败
  const handleError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    msgError('上传图片失败，请重试')
  }

 // 预览
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }

  // 删除图片
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    
    emits("update:modelValue", fileList.value);
  }

  // 超出限制
  const handleExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
    msgError(`上传文件数量不能超过 ${props.limitNum} 个!`)
  }


  watch(() => props.modelValue,()=> {
    
    // 转换数据格式
    if(props.modelValue.length) {
      fileList.value = props.modelValue.map((item:any) => {        
        return { name: item.imgName||item.name,url: item.imgUrl||item.url }
      })
    }
  })
</script>

<style scoped="scss">
</style>