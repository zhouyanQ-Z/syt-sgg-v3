
// 账号信息数据类型
export interface UserInfoItf {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number | 1
  param: {}
  openid: null
  nickName: null | string
  phone: string
  name: string
  certificatesType: string
  certificatesNo: string
  certificatesUrl: null
  authStatus: number
  status: number
}

// 证件数据类型
export interface CertificateTypeItf {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {}
  parentId: number
  name: string
  value: string
  dictCode: string
  hasChildren: boolean
}

// 手机登录接口数据类型
export interface LoginParam {
  phone: string
  code: string
}

// 手机登录接口返回数据类型
export interface LoginRes {
  name: string
  token: string
}

// 微信扫码登录返回数据类型
export interface WxLoginRes {
  redirectUri: string
  appid: string
  scope: string
  state: string
}

// 就诊人信息数据类型
export interface VisitorItf {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    certificatesTypeString: string
    contactsCertificatesTypeString: string
    cityString: string | null
    fullAddress: string
    districtString: string | null
    provinceString: string | null
  }
  userId: number
  name: string
  certificatesType: string
  certificatesNo: string
  sex: number
  birthdate: string
  phone: string
  issMarry: string
  provinceCode: string | null
  cityCode: string | null
  districtCode: string | null
  address: string
  contactsName: string
  contactsCertificatesType: string
  contactsCertificatesNo: string
  contactsPhone: string
  isInsure: string
  cardNo: string | null
  status: string
  isSelect?: number
}

// 用户认证所需参数
export interface UserAuthItf {
  certificatesNo: string
  certificatesType: string
  certificatesUrl: string | any
  name: string
}

// 添加或修改就诊人信息所需参数数据类型
export interface PatientItf {
  id?: string
  name: string
  certificatesType: string
  certificatesNo: string
  sex: number
  birthdate: string
  phone: string
  isMarry: number
  isInsure: number
  address: string
  addressSelected: string[]
  contactsName?: string
  contactsCertificatesType?: string
  contactsCertificatesNo?: string
  contactsPhone?: string
}