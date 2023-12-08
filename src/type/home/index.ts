import { HospContent,LevelAndRegionItf } from '../api/hospital'
export interface LevelItf {
  id: number,
  name: string
}

// 分页器数据类型
export interface PaginationItf {
  pageNo:number,
  pageSize:number,
  total: number
}

export interface RestaurantItem {
  value: string
  link: string
}

export class HomeData {
  levelList: LevelAndRegionItf[] = []
  regionList: LevelAndRegionItf[] = []
  pagination: PaginationItf={
    pageNo: 1,
    pageSize: 10,
    total: 0
  }
  hospital: HospContent[] = []
  hostype: string=''
  districtCode: string=''
}