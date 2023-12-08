import request from '@/utils/request'
import { PromiseRes } from '@/type/api'
import { HospitalItf,LevelAndRegionItf,HospContent } from '@/type/api/hospital'
enum API {
  // 医院数据接口
  HOSPITAL_URL = '/hosp/hospital/',
  // 医院等级和地区数据接口
  LEVELANDREGION_URL = '/cmn/dict/findByDictCode/',
  // 根据医院名称获取数据接口
  HOSPITALBYNAME_URL = '/hosp/hospital/findByHosname/',
  // 根据上级id获取子节点数据列表(获取省份数据)
  CITYREGION_URL = '/cmn/dict/findByParentId/',
}

// 获取医院数据
export const reqHospital = (page: number,limit: number,hostype='',districtCode=''):PromiseRes<HospitalItf> => {
  if(hostype && districtCode != '') return request.get(API.HOSPITAL_URL+`${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
  else if(hostype) return request.get(API.HOSPITAL_URL+`${page}/${limit}?hostype=${hostype}`)
  else if(districtCode != '') return request.get(API.HOSPITAL_URL+`${page}/${limit}?districtCode=${districtCode}`)
  else return request.get(API.HOSPITAL_URL+`${page}/${limit}`)
}
// 获取医院等级和地区数据
export const reqLevelAndRegion = (dictCode: string):PromiseRes<LevelAndRegionItf[]> => request.get(API.LEVELANDREGION_URL+dictCode)
// 根据医院名称获取医院数据
export const reqHospByname = (name: string):PromiseRes<HospContent[]> => request.get(API.HOSPITALBYNAME_URL+name)
// 获取省市区地区数据
export const reqCity = (parentId: string):PromiseRes<LevelAndRegionItf[]> => request.get(API.CITYREGION_URL+parentId)