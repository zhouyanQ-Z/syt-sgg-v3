export interface OrderInfoRes {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    orderStatusString: string
  }
  userId: number
  outTradeNo: string
  hoscode: string
  hosname: string
  depcode: string
  depname: string
  scheduleId: string
  title: string
  reservedDate: string
  reservedTime: number
  patientId: number
  patientName: string
  patientPhone: string
  hosRecordId: string
  number: number
  fetchTime: string
  fetchAddress: string
  amount: number
  quitTime: string
  orderStatus: number
}

export interface WxCodeRes {
  codeUrl: string
  orderId: string
  totalFee: string
  resultCode: string
}

// 订单列表
export interface OrderListItf {
  records: OrderInfoRes[]
  total: number
  size: number
  current: number
  orders: {}
  hitCount: boolean
  searchCount: boolean
  pages: number
}

// 订单状态类型
export interface OrderStatusItf {
  comment: string
  status: number
}