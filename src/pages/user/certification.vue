<template>
  <el-card class="certification">
    <template #header>
      <div class="card-header">
        <h1>实名信息</h1>
      </div>
    </template>
    <div class="tip">
      <el-icon><i-ep-InfoFilled /></el-icon>
      <p>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</p>
    </div>
    <el-descriptions
        class="margin-top"
        :column="1"
        border
        size="small"
        v-if="userInfo.authStatus == 1"
      >
        <el-descriptions-item label-align="center" label-class-name="desc-label" label="用户姓名">{{ userInfo.name }}</el-descriptions-item>
        <el-descriptions-item label-align="center" label-class-name="desc-label" label="证件类型">{{ userInfo.certificatesType == '10' ? '身份证': '户口本' }}</el-descriptions-item>
        <el-descriptions-item label-align="center" label-class-name="desc-label" label="证件号码">{{ userInfo.certificatesNo }}</el-descriptions-item>
    </el-descriptions>

    <el-form ref="formRef" :rules="rules" :model="formParams" size="large" class="form-box" v-else>
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="formParams.name" clearable placeholder="请输入用户姓名" />
      </el-form-item>
        <el-form-item label="证件类型" prop="certificatesType">
          <el-select style="width: 100%;" v-model="formParams.certificatesType" class="m-2" placeholder="请选择" size="large">
          <el-option
            v-for="item in IDOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input v-model="formParams.certificatesNo" minLength="15" maxLength="18" placeholder="请输入证件号码" clearable />
      </el-form-item>
      <el-form-item label="上传证件" prop="certificatesUrl">
        <UploadImg :limitNum="1" v-model="formParams.certificatesUrl">
          <template #tip-icon>
            <img  class="icon-img" src="../../assets/images/auth_example.png" alt="">
          </template>
        </UploadImg>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  
</template>

<script setup lang='ts'>
import { reactive, toRefs,onMounted, nextTick } from 'vue';
import UploadImg from '@/components/uploadImage/index.vue'
import { reqUserInfo,reqCertificateType,reqUserAuth } from '@/api/user'
import type { UserInfoItf,CertificateTypeItf,UserAuthItf } from '@/type/api/user';
import { msgError, msgSuccess } from '@/utils/modal';
import type { FormInstance } from 'element-plus';

const data = reactive({
  formParams:({} as UserAuthItf),
  IDOptions: ([] as CertificateTypeItf[]),
  userInfo: ({} as UserInfoItf),
  formRef: ({} as FormInstance)
})

let { formParams,IDOptions,userInfo,formRef } = toRefs(data)

const nameValid = (rule: any,value: any,cb: any) => {
  const reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/
  if(value === '') cb(new Error('请输入姓名'))
  else if(!(reg.test(value))) cb(new Error('姓名不正确！！！'))
  else cb()
}
const noValid = (rule: any,value: any,cb: any) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
  if(value === '') cb(new Error('请输入证件号'))
  else if(!(reg.test(value))) cb(new Error('证件号不正确！！！'))
  else cb()
}

// 表单验证规则
const rules = reactive({
  name: [{ validator: nameValid,trigger: 'change', required: true }],
  certificatesType: [{ message: '请选择证件类型',trigger: 'change',required: true }],
  certificatesNo: [{ validator: noValid,trigger: 'change',required: true }],
  certificatesUrl: [{ message: '请上传证件照',trigger: 'change',required: true }],
})



onMounted(() => {
  getUserInfo()
})

// 获取用户信息
const getUserInfo = () => {
  reqUserInfo().then(res => {
    if(res.code === 200) {
      userInfo.value = res.data
      if(res.data.authStatus == 0) {
        getType()
      }
    }
  })
}

// 获取证件类型
const getType = () => {
  reqCertificateType().then(res => {
    if(res.code === 200) {
      IDOptions.value = res.data
    }
  })
}

// 提交认证
const submit = () => {
  //console.log(formParams.value);
  
  if(!formRef) return
  formRef.value?.validate((valid) => {
    if(valid) {
      // 整理数据
      let url = formParams.value.certificatesUrl?.length > 0 && formParams.value.certificatesUrl[0].imgUrl
      formParams.value.certificatesUrl = url
      reqUserAuth(formParams.value).then(res => {
        if(res.code === 200) {
          msgSuccess('认证成功')
          getUserInfo()
        } else {
          msgError('认证失败')
        }
      })
    }
  })
}

// 重置
const reset = () => {
  nextTick(() => {
    formRef.value?.resetFields()
  })
}

</script>

<style scoped lang='scss'>
.certification {
  h1 {
    font-weight: bold;
    font-size: 30px;
  }
  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7f7f7f;
    p {
      margin-left: 3px;
    }
  }
  .margin-top {
    margin: 20px auto;
    width: 60%;
    ::v-deep(.desc-label) {
      width: 100px;
    }
  }

  .form-box {
    width: 50%;
    margin: 30px auto;
    .icon-img{
      width: 130px;
      height: 130px;
    }

    .btn-box {
      ::v-deep(.el-form-item__content) {
        justify-content: center;
      }
    }
  }
}
</style>