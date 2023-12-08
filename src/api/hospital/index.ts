import request from '@/utils/request'
import { PromiseRes } from '@/type/api'
import { 
  HospitalDetailItf,
  DepartmentItf,
  BookingScheduleRes,
  DoctorScheduleRes,
  DoctorItf} from '@/type/api/hospital'

enum API {
  // 医院详情
  HOSPITAL_DETAIL_URL = '/hosp/hospital/',
  // 某一医院科室数据
  HOSPITAL_DEPARTMENT_URL = '/hosp/hospital/department/',
  // 获取验证码接口
  LOGINCODE_URL = '/sms/send/',
  // 预约排班数据接口
  BOOKING_SCHEDULE_URL='/hosp/hospital/auth/getBookingScheduleRule/',
  // 某个科室某一天的医生排班数据接口
  DOCTOR_SCHEDULE_URL='/hosp/hospital/auth/findScheduleList/',
  // 获取某个医生的基本信息
  DOCTORINFO_URL = '/hosp/hospital/getSchedule/',
}

// 获取医院详情
export const reqHospDetail = (hoscode: string):PromiseRes<HospitalDetailItf> => request.get(API.HOSPITAL_DETAIL_URL+hoscode)
// 获取医院科室数据
export const reqHospDepartment = (hoscode: string):PromiseRes<DepartmentItf[]> => request.get(API.HOSPITAL_DEPARTMENT_URL+hoscode)
// 获取验证码
export const reqPhoneCode = (phone: string):PromiseRes<string> => request.get(API.LOGINCODE_URL+phone)
// 获取预约排班数据
export const reqBookingSchedule = (page: number,limit: number,hoscode: string,depcode: string):PromiseRes<BookingScheduleRes> => request.get(API.BOOKING_SCHEDULE_URL+`${page}/${limit}/${hoscode}/${depcode}`)
// 获取某个科室某一天的医生排班数据
export const reqDoctorSchedule = (hoscode: string,depcode: string,workDate: string):PromiseRes<DoctorScheduleRes[]> => request.get(API.DOCTOR_SCHEDULE_URL+`${hoscode}/${depcode}/${workDate}`)
// 获取挂号医生信息
export const reqDoctorInfo = (doctorId: string):PromiseRes<DoctorItf> =>  request.get(API.DOCTORINFO_URL+doctorId)