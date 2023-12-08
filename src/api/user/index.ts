import request from '@/utils/request'
import { PromiseRes, } from '@/type/api'
import {
  LoginParam,
  LoginRes,
  WxLoginRes,
  VisitorItf,
  UserInfoItf,
  CertificateTypeItf,
  UserAuthItf,
  PatientItf
} from '@/type/api/user'

enum API {
  // 用户登录接口
  LOGINBYPHONE_URL = '/user/login/',
  // 获取微信扫码登录需要的参数
  WXLOGIN_URL = '/user/weixin/getLoginParam/',
  // 获取就诊人信息
  GUESTER_URL = '/user/patient/auth/findAll',
  // 获取当前账号信息
  USERINFO_URL = '/user/auth/getUserInfo',
  // 获取证件类型
  CERTIFICATETYPE_URL = '/cmn/dict/findByDictCode/',
  // 用户认证
  USERAUTH_URL = '/user/auth/userAuah',
  // 获取所有就诊人
  PATIENTALL_URL = '/user/patient/auth/findAll',
  // 添加就诊人
  ADDPATIENT_URL = '/user/patient/auth/save',
  // 修改就诊人
  UPDATEPATIENT_URL = '/user/patient/auth/update',
  // 删除就诊人
  REMOVEPATIENT_URL = '/user/patient/auth/remove/',
}



// 用户手机登录
export const reqLoginByPhone = (data: LoginParam):PromiseRes<LoginRes> => request.post(API.LOGINBYPHONE_URL,data)
// 获取微信扫码登录所需参数
export const reqWxLoginParam = (wxRediectUri: string):PromiseRes<WxLoginRes> => request.get(API.WXLOGIN_URL+`?wxRediectUri=${wxRediectUri}`)
// 获取就诊人信息
export const reqGuester = ():PromiseRes<VisitorItf[]> =>  request.get(API.GUESTER_URL)
// 获取当前账号信息
export const reqUserInfo = ():PromiseRes<UserInfoItf> =>  request.get(API.USERINFO_URL)
// 会员认证状态
export const reqCertificateType = (dictCode: string='CertificatesType'):PromiseRes<CertificateTypeItf[]> =>  request.get(API.CERTIFICATETYPE_URL+dictCode)
// 用户认证
export const reqUserAuth = (data: UserAuthItf):PromiseRes<null> =>  request.post(API.USERAUTH_URL,data)
// 获取所有就诊人
export const reqAllPatient = ():PromiseRes<VisitorItf[]> => request.get(API.PATIENTALL_URL)
// 添加或修改就诊人
export const reqAddOrUpdatePatient = (data: PatientItf):PromiseRes<string|null> => {
  if(data.id) {
    return request.put(API.UPDATEPATIENT_URL,data)
  }
  return request.post(API.ADDPATIENT_URL,data)
}
// 删除就诊人
export const reqRemovePatient = (id: number):PromiseRes<VisitorItf[]> => request.get(API.REMOVEPATIENT_URL+id)