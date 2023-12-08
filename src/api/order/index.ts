import request from '@/utils/request'
import { PromiseRes } from '@/type/api'
import { OrderInfoRes,WxCodeRes,OrderListItf,OrderStatusItf } from '@/type/api/order'
import { 
  } from '@/type/api/hospital'

enum API {
  // 创建订单
  CREATE_ORDER_URL = '/order/orderInfo/auth/submitOrder/',
  // 获取订单
  ORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  // 取消预约
  CANCEL_ORDER_URL = '/order/orderInfo/auth/cancelOrder/',
  // 下单生成二维码
  CREATE_WXCODE_URL = '/order/weixin/createNative/',
  // 查询支付状态
  QUERYPAYSTATUS_URL = '/order/weixin/queryPayStatus/',
  // 获取分页订单列表
  ORDERLIST_URL = '/order/orderInfo/auth/',
  // 获取订单状态列表
  ORDERSTATUS_URL = '/order/orderInfo/auth/getStatusList'
}

// 创建订单
export const reqCreateOrder = (hoscode: string,scheduleId: string,patientId: number):PromiseRes<string> => request.post(API.CREATE_ORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)
// 获取订单
export const reqOrderInfo = (orderId: string):PromiseRes<OrderInfoRes> => request.get(API.ORDERINFO_URL+orderId)
// 取消订单
export const reqCancelOrder = (orderId: string):PromiseRes<{}> => request.get(API.CANCEL_ORDER_URL+orderId)
// 下单生成二维码
export const reqWxCode = (orderId: string):PromiseRes<WxCodeRes> => request.get(API.CREATE_WXCODE_URL+orderId)
// 查询支付状态
export const reqPayStatus = (orderId: string):PromiseRes<boolean> => request.get(API.QUERYPAYSTATUS_URL+orderId)
//获取分页订单列表
export const reqOrderList = (page: number,limit: number,patientId: string='',orderStatus: string=''):PromiseRes<OrderListItf> => {
  if(patientId && (orderStatus != '')) return request.get(API.ORDERLIST_URL+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
  else if(patientId) return request.get(API.ORDERLIST_URL+`${page}/${limit}?patientId=${patientId}`)
  else if(orderStatus != '') return request.get(API.ORDERLIST_URL+`${page}/${limit}?orderStatus=${orderStatus}`)
  else return request.get(API.ORDERLIST_URL+`${page}/${limit}`)
}
// 获取订单状态列表
export const reqOrderStatus = ():PromiseRes<OrderStatusItf[]> => request.get(API.ORDERSTATUS_URL)