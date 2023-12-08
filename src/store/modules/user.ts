import { defineStore } from 'pinia'
import { reqPhoneCode } from '@/api/hospital'
import { reqLoginByPhone } from '@/api/user'
import { LoginParam} from '@/type/api/user'
import { getItem, removeItem, setItem } from '@/utils/cache'
import { confirm } from '@/utils/modal'

export default defineStore('userStore',{
  state: () => {
   return {
    showLogin: false,
    code: '', // 存储验证码
    userInfo: JSON.parse(getItem('USERINFO') as string) || {}
   } 
  },
  actions: {
    toggleLogin() {
      this.showLogin = !this.showLogin
    },
    // 获取验证码
    getCode(phone: string) {
      return reqPhoneCode(phone).then(res => {
        if(res.code === 200) {
          this.code = res.data
          return 'ok'
        } else {
          return Promise.reject(new Error(res.message))
        }
      })
    },
    // 登录
    login(param: LoginParam) {
      return reqLoginByPhone(param).then(res => {
        if(res.code == 200) {
          this.userInfo = res.data
          setItem('USERINFO',JSON.stringify(res.data))
          return 'ok'
        }
        return Promise.reject(new Error(res.message))
      })
    },
    // 退出登录
    logout() {
      return confirm('您确定要退出登录吗？','退出登录').then(res => {
        this.userInfo = {}
        removeItem('USERINFO')
        return 'ok'
      }).catch(err => {
        return Promise.reject(new Error('取消退出'))
      })
    },
    // 查询本地是否存储了用户数据（扫码登录是否授权成功）
    queryState() {
      // 开启定时器每隔一段时间查询本地数据
      let timer = setInterval(()=>{
        // 已经授权成功
        let info = getItem('USERINFO')
        if(info) {
          this.showLogin = false // 关闭对话框
          this.userInfo = JSON.parse(info)
          clearInterval(timer)
        }
      },1000)
    }
  }
})