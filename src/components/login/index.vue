<template>
 <div class='login-box'>
  <el-dialog v-model="userStore.showLogin" title="用户登录" :before-close="close">
    <el-row class="content">
      <el-col :span="12" class="left">
        <div v-show="scene === 1" class="c1">
          <el-form ref="formRef" :rules="rules" :model="loginParam">
            <el-form-item prop="phone">
              <el-input v-model.number="loginParam.phone" maxlength="11" placeholder="请输入手机号">
                <template #prefix>
                  <el-icon class="el-input__icon"><i-ep-UserFilled /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input :disabled="!isPhone" v-model="loginParam.code" placeholder="请输入手机号验证码">
                <template #prefix>
                  <el-icon class="el-input__icon"><i-ep-lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="!isPhone" @click="getCode">{{ countdown > 0 ? codeString+`(${countdown}s)`: codeString }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="!loginFlag" style="width: 100%;" @click="loginByPhone">用户登录</el-button>
            </el-form-item>
          </el-form>
          <div class="bottom" @click="changeScene(2)">
            <p>微信扫码登录</p>
            <svg-icon name="wechat" size="32px" />
          </div>
        </div>
        <div v-show="scene === 2" class="c2">
          <!--<p class="title">微信登录</p>-->
          <div class="code-img" id="login_container">
            <!--<img src="../../assets/images/code_app.png" alt="">-->
          </div>
          <!--<p>使用微信扫一扫登录</p>
          <p>“尚硅谷”</p>-->
          <div class="footer" @click="changeScene(1)">
            <p>手机短信验证码登录</p>
            <svg-icon class="phone-icon" name="phone-2" color="red" size="32px" />
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right">
        <div class="top">
          <div class="code">
            <img src="../../assets/images/code_app.png" alt="">
            <svg-icon class="icon" name="wechat-icon" />
            <p>微信扫一扫关注</p>
            <p>“快速预约挂号”</p>
          </div>
          <div class="code">
            <img src="../../assets/images/code_login_wechat.png" alt="">
            <svg-icon class="icon" name="phone" />
            <p>扫一扫下载</p>
            <p>“预约挂号”APP</p>
          </div>
        </div>
        <div class="bottom mt-20">
          <p>xxxxxxxxx官方指定预约平台</p>
          <p>快速挂号 安全放心</p>
        </div>
      </el-col>
    </el-row>
    <template #footer>
      <el-button plain @click="close">关闭窗口</el-button>
    </template>
  </el-dialog>
 </div>
</template>

<script setup lang='ts'>
import { reactive, ref, toRefs,nextTick,watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { msgError } from '@/utils/modal'
import { LoginParam } from '@/type/api/user'
import { reqWxLoginParam } from '@/api/user'

const $router = useRouter()
const $route = useRoute()

const userStore = useUserStore()

const data = reactive<{
  loginFlag: boolean,
  isPhone: boolean, 
  scene: number,
  loginParam: LoginParam,
  codeString: string,
  countdown: number
}>({
  loginFlag: false, // 是否可以点击用户登录按钮
  isPhone: false, // 根据手机号是否正确来获取验证码
  scene: 1,// 控制 form 内容
  loginParam: {
    phone: '',
    code: ''
  },
  codeString: '获取验证码',
  countdown: 0 // 倒计时
})

let { loginFlag,scene,loginParam,isPhone,codeString,countdown } = toRefs(data)

// 自定义验证规则
const validatePhone = (rule: any,value: any,cb: any) => {
  isPhone.value = false
  if(value === '') cb(new Error('手机号不能为空'))
  else if(!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(value))) cb(new Error('手机号不正确！！！'))
  else {
    isPhone.value = true
    cb()
  }
}
const validateCode = (rule: any,value: any,cb: any) => {
  loginFlag.value = false
  if(value === '') cb(new Error('验证码不能为空'))
  else if(value.length != 6) cb(new Error('请输入6位数字的验证码'))
  else {
    loginFlag.value = true
    cb()
  }
}

// 表单验证规则
const rules = reactive({
  phone: [{ validator: validatePhone,trigger: 'change' }],
  code: [{ validator: validateCode,trigger: 'change' }]
})

const formRef = ref<FormInstance>()

// 关闭对话框
const close = () => {
  // 重置
  loginFlag.value = false
  isPhone.value = false
  // 关闭窗口
  userStore.toggleLogin()
  // 清除表单
  nextTick(() => {    
    formRef.value?.resetFields()
  })
}

// 切换登录场景
const changeScene = (n: number) => {
  scene.value = n
  // 微信扫码登录
  if(n === 2) {
    // 向后台发请求获取相应参数，携带的参数为授权成功后重定向的地址(需要编码encodeURIComponent)
    let rediect_url = encodeURIComponent(window.location.origin+'/wxlogin')
    reqWxLoginParam(rediect_url).then(res => {
      if(res.code === 200) {
        // 生成微信扫码登录二维码页面(https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)
        // @ts-ignore
        new WxLogin({
          self_redirect:true, // 手机点击确认登录后可以在 iframe 内跳转到 redirect_uri(重定向地址)
          id:"login_container", // 页面中显示二维码的容器id
          appid: res.data.appid, // 应用唯一标识
          scope: res.data.scope, // 应用授权作用域，snsapi_login代表当前微信扫码登录页面已经授权了
          redirect_uri: res.data.redirectUri, // 重定向地址，即用户授权成功后，微信服务器向企业后台推送code地址
          state: res.data.state,// 企业服务器重定向的地址携带用户信息
          style: "",// 二维码外观颜色 black||white
          href: "" // 自定义样式链接
        });
      }
    })
  }
}

// 开启倒计时
const countDown = () => {
  countdown.value = 60
  isPhone.value = false
  let timer = setInterval(() => {
    countdown.value--;
    if(countdown.value <= 0) {
      isPhone.value = true
      loginParam.value.code = ''
      clearTimeout(timer)
    }
  }, 1000);
}

// 获取手机验证码
const getCode = async () => {
  try{
    await userStore.getCode(loginParam.value.phone)
    loginParam.value.code = userStore.code
    countDown()
  } catch(e){
    // 获取验证码失败
    msgError(e as string)
  }
}

// 手机登录
const loginByPhone = () => {
  if(!formRef) return
  formRef.value?.validate((valid) => {
    if(valid) {
      userStore.login(loginParam.value).then(res => {
        // 登录成功
        close() // 关闭对话框
        // 是否携带参数
        let redirect = $route.query.redirect as string
        if(redirect) {
          $router.push(redirect)
        } else {
          // 往首页跳转
          $router.push('/home')
        }
      }).catch(err => {
        msgError(err as string)
      })
    }
  })
}


// 监听登录场景变换
watch(() => scene.value,(val: number) => {
  if(val === 2) {
    userStore.queryState()
  }
})
</script>

<style scoped lang='scss'>
.login-box {
  ::v-deep(.el-dialog) {
    .el-dialog__body{
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
  .content {
    .left {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;

      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
          margin-bottom: 10px;
        }
      }

      .c2 {
        .title {
          text-align: center;
          line-height: 50px;
          font-size: 30px;

        }
        .code-img {
          //width: 65%;
          //border: 1px solid #ccc;
          //border-radius: 5px;
          text-align: center;
          margin: auto;
          //padding: 10px 0;
          img {
            width: 200px;
            height: 200px;
          }
        }
        p {
          line-height: 25px;
          text-align: center;
        }
        .phone-icon {
          display: block;
          margin: auto;
        }
      }
    }
    .right {
      //position: relative;
      .top {
        display: flex;
        .code {
          width: 50%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 150px;
            height: 150px;
          }
          p {
            line-height: 25px;
            height: 25px;
          }
        }
      }
      .bottom {
        //position: absolute;
        //bottom: 0;
        //right: 0;
        //left: 0;
        p {
          line-height: 30px;
          font-size: 20px;
          font-style: italic;
          text-align: center;
          font-weight: bold;
        }
      }
    }
  }
}
</style>