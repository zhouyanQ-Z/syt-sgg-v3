<template>
  <el-card class="card-box">
    <template #header>
      <div class="card-header">
        <span class="header-title">{{ title }}</span>
        <el-button size="large" class="button" type="success" v-if="scene == 0" @click="onAdd">
          <el-icon><i-ep-user /></el-icon>
          <span>添加就诊人</span>
        </el-button>
      </div>
    </template>
    <!-- 展示就诊人模块 -->
    <div class="visitor-box" v-if="scene==0">
      <Visitor 
        v-for="(item,index) in visitors" 
        :key="item.id" 
        :index="index" 
        :visitor="item" 
        @on-edit="onEdit"
        @on-delete="onDelete"
        v-if="visitors.length" />
      <el-empty description="暂无数据，请添加就诊人" v-else />
    </div>
    
    <!-- 添加就诊人 -->
    <div class="add-box" v-if="scene==1">
      <div class="block">
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form ref="formRef" :rules="rules" :model="formParams" size="large" class="form-box" label-width="80" >
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="formParams.name" clearable placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="证件类型" prop="certificatesType">
            <el-select style="width: 100%;" v-model="formParams.certificatesType" class="m-2" placeholder="请选择证件类型" size="large">
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
          <el-form-item label="用户性别" prop="certificatesNo">
            <el-radio-group v-model="formParams.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthdate">
            <el-date-picker style="width: 80%;" v-model="formParams.birthdate" type="date" value-format="YYYY-MM-DD"  placeholder="选择出生日期" size="large" />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formParams.phone" minLength="11" maxLength="11" placeholder="请输入手机号码" clearable />
          </el-form-item>
        </el-form>
      </div>
      <div class="block">
        <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
        <el-form ref="formRef" :rules="rules" :model="formParams" size="large" class="form-box" label-width="90" >
          <el-form-item label="婚姻状况" prop="isMarry">
            <el-radio-group v-model="formParams.isMarry">
              <el-radio :label="0">未婚</el-radio>
              <el-radio :label="1">已婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自费/医保" prop="isInsure">
            <el-radio-group v-model="formParams.isInsure">
              <el-radio :label="0">自费</el-radio>
              <el-radio :label="1">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="当前住址" prop="addressSelected">
            <el-cascader v-model="formParams.addressSelected" style="width: 80%;" :props="regions" />
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="formParams.address" placeholder="请输入详细地址" clearable />
          </el-form-item>
        </el-form>
      </div>
      <div class="block">
        <el-divider content-position="left">联系人信息（选填）</el-divider>
        <el-form ref="formRef" :rules="rules" :model="formParams" size="large" class="form-box" label-width="80" >
          <el-form-item label="用户姓名" prop="contactsName">
            <el-input v-model="formParams.contactsName" clearable placeholder="请输入用户姓名" />
          </el-form-item>
            <el-form-item label="证件类型">
              <el-select style="width: 100%;" v-model="formParams.contactsCertificatesType" class="m-2" placeholder="请选择证件类型" size="large">
                <el-option
                  v-for="item in IDOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="contactsCertificatesNo">
            <el-input v-model="formParams.contactsCertificatesNo" minLength="15" maxLength="18" placeholder="请输入证件号码" clearable />
          </el-form-item>
          <el-form-item label="手机号码" prop="contactsPhone">
            <el-input v-model="formParams.contactsPhone" minLength="11" maxLength="11" placeholder="请输入手机号码" clearable />
          </el-form-item>
          <el-form-item class="btn-box">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script setup lang='ts'>
import { nextTick, onMounted, reactive, toRefs, watchEffect } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import Visitor from '@/components/visitor/index.vue';
import { reqCertificateType, reqGuester,reqAddOrUpdatePatient,reqRemovePatient } from '@/api/user';
import { reqCity } from '@/api/home';
import { CertificateTypeItf, VisitorItf,PatientItf } from '@/type/api/user';
import type { CascaderProps, FormInstance } from 'element-plus';
import { msgError, msgSuccess } from '@/utils/modal';


const $router = useRouter()
const $route = useRoute()

const data = reactive({
  visitors: ([] as VisitorItf[]),
  scene: 0, // 场景切换
  title: '就诊人管理',
  formParams: ({
    id: undefined,
    name: '',
    certificatesType: '',
    certificatesNo: '',
    sex: 0,
    birthdate: '',
    phone: '',
    isMarry: 0,
    isInsure: 0,
    address: '',
    addressSelected: [],
    contactsName: '',
    contactsCertificatesType: '',
    contactsCertificatesNo: '',
    contactsPhone: '',
  } as PatientItf),
  formRef: ({} as FormInstance),
  IDOptions: ([] as CertificateTypeItf[]),
 })

 const { visitors,scene,formParams,title,IDOptions,formRef } = toRefs(data)

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
const validatePhone = (rule: any,value: any,cb: any) => {
  if(value === '') cb(new Error('手机号不能为空'))
  else if(!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(value))) cb(new Error('手机号不正确！！！'))
  else cb()
}
  // 自定义表单验证规则
 const rules = reactive({
  name: [{required: true,validator: nameValid,trigger: 'change'}],
  certificatesType: [{required: true, message: '请选择证件类型', trigger: 'change'}],
  certificatesNo: [{required: true,validator: noValid, trigger: 'change'}],
  sex: [{required: true,trigger: 'change'}],
  birthdate: [{required: true,message: '请选择出生日期',trigger: 'change'}],
  phone: [{required: true,validator: validatePhone,trigger: 'change'}],
  issMarry:[{required: true,trigger: 'change'}],
  isInsure:[{required: true,trigger: 'change'}],
  addressSelected: [{required: true,message: '请选择常住地址',trigger: 'change'}],
  address: [{required: true,message: '请输入详细地址',trigger: 'change'}],
  //contactsName: [{validator: nameValid,trigger: 'change'}],
  //contactsCertificatesType: [{message: '请选择证件类型', trigger: 'change'}],
  //contactsCertificatesNo: [{validator: noValid, trigger: 'change'}],
  //contactsPhone: [{validator: validatePhone,trigger: 'change'}],
 })

 onMounted(() => {
  // 若路由跳转携带type='add'则场景切换为1
  if($route.query.type == 'add') {
    scene.value = 1
    title.value = '添加就诊人'
  }
  
  getVisitorData()
  getType()
})

// 获取地址信息
const regions: CascaderProps = {
  lazy: true,
  lazyLoad(node, resolve) {
    reqCity(node.data?.id as string || '86').then(res => {
      if(res.code === 200) {
        // 整理数据
        const nodes = res.data.map(item => {
          return {
            id: item.id,
            value: item.value,
            label: item.name,
            leaf: !item.hasChildren
          }
        })
        resolve(nodes)
      }
    })
  },
}

// 获取就诊人信息
const getVisitorData = () => {
  reqGuester().then(res => {
    if(res.code === 200) {
      visitors.value = res.data
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

// 添加就诊人
const onAdd = () => {
  scene.value = 1
  title.value = '添加就诊人'
}

// 编辑就诊人
const onEdit = (id: number) => {
  scene.value = 1
  title.value = '修改就诊人'
  let user = visitors.value.find(item => item.id === id)
  
  Object.assign(formParams.value,user)
}

// 删除就诊人
const onDelete = (id: number) => {
  reqRemovePatient(id).then(res => {
    if(res.code == 200) {
      msgSuccess('删除成功')
      getVisitorData()
    }
  })
}

// 提交认证
const submit = () => {
  
  if(!formRef) return
  formRef.value?.validate((valid) => {
    if(valid) {
      reqAddOrUpdatePatient(formParams.value).then(res => {
        if(res.code === 200) {
          // 若路由跳转携带type参数，则返回上级路由
          if($route.query.type) {
            $router.back()
          } else {
            scene.value = 0
            title.value = '就诊人管理'
          }
          msgSuccess((formParams.value.id ? '修改': '添加')+'成功')
          getVisitorData()
        } else {
          msgError((formParams.value.id ? '修改': '添加')+'认证失败')
        }
      })
    }
  })
}

// 重置
const reset = () => {
  formParams.value.id = undefined
  nextTick(() => {
    formRef.value?.resetFields()
  })
}

watchEffect(()=>{
  if(visitors.value) {    
    if($route.query.type == 'edit') {
      const id = $route.query.id as unknown
      Object.assign(formParams.value,visitors.value.find(item => item.id == id))

      scene.value = 1
      title.value = '修改就诊人'
    }
  }
})
</script>

<style scoped lang='scss'>
.card-box {
  //font-size: 18px;
  .card-header {
    
    @include flex-center(space-between);
    .header-title {
      font-size: 30px;
      font-weight: bold;
    }
    .button {
      font-size: 18px;
      span {
        margin-left: 5px;
      }
    }
  }

  .add-box {
    .block {
      .el-divider {
        ::v-deep(.divider__text) {
          font-size: 16px;
        }
      }
      .form-box {
        width: 80%;
        margin: 0 auto;
        
      }
    }
  }
}
</style>