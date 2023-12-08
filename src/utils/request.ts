// 对于Axios函数库进行二次封装
// 目的：1.利用 Axios 请求拦截器、响应拦截器功能；2.请求拦截器，一般可以在请求头携带公共参数：token；3.响应拦截器，可以简化服务器返回的数据，处理http网络错误
import axios from "axios";
import { msgError } from './modal'
import useUserStore from '@/store/modules/user'



const request = axios.create({
  baseURL: '/api', // 基础路径
  timeout: 5000 // 超时时间
})
//请求拦截器
request.interceptors.request.use((config) => {
  // config 请求拦截器配置对象
  let userStore = useUserStore()
  let token = userStore.userInfo.token
  if(token) {
    config.headers.token = token
  }
  return config
})

//
//响应拦截器
request.interceptors.response.use((res) => {
  // 响应拦截器成功回调，可进行简化数据
  return res.data
},(err) => {
  // 处理 http网络错误
  const status = err.response.status
  let message = '';
  switch(status) {
    case 401 :
      message = 'TOKEN过期'
      break;
    case 403 :
      message = '无权访问'
      break;
    case 404 :
      message = '请求地址错误'
      break;
    case 500|501|502|503|504|505 :
      message = '服务器内部错误'
      break;
    default:
      message = '网络出现问题'
      break;
  }
  msgError(message)
  return Promise.reject(new Error(err.message))
})


export default request;