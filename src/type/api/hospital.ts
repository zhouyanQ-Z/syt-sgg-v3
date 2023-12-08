// 医院接口返回 data 数据类型
export interface HospitalItf {
  content: HospContent[]
  size: number
  totalPages: number
  totalElements: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
  }
}

// 医院接口返回content数据类型
export interface HospContent {
  id: number,
  hosname: string,
  hoscode: string,
  hostype: string,
  provinceCode: string,
  cityCode: string,
  districtCode: string,
  createTime: string,
  updateTime: string,
  isDeleted: 0 | 1,
  logoData: string,
  intro: string,
  route: string,
  status: number,
  param: {
    fullAddress: string,
    hostypeString: string
  },
  bookingRule: {
    cycle: number,
    quitDay: number,
    quitTime: string,
    releaseTime: string,
    stopTime: string,
    rule: string[]
  }
}

// 医院等级和地区 data 数据类型
export interface LevelAndRegionItf {
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


// 医院详情接口返回数据类型
export interface HospitalDetailItf {
  hospital: {
    id: number,
    hosname: string,
    hoscode: string,
    hostype: string,
    provinceCode: string,
    cityCode: string,
    districtCode: string,
    createTime: string,
    updateTime: string,
    isDeleted: 0 | 1,
    logoData: string,
    intro: string,
    route: string,
    status: number,
    bookingRule: string,
    param: {
      fullAddress: string,
      hostypeString: string
    },
  }
  bookingRule: {
    cycle: number,
    quitDay: number,
    quitTime: string,
    releaseTime: string,
    stopTime: string,
    rule: string[]
  }
}

// 医院科室接口返回数据类型
export interface DepartmentItf {
  depcode: string
  depname: string
  children?: DepartmentItf[]
}








// 预约排班返回数据类型
export interface BookingScheduleRes {
  total: number,
  bookingScheduleList: {
    workDate: string,
    workDateMd: string,
    dayOfWeek: string,
    docCount: number,
    reservedNumber: number,
    availableNumber: number,
    status: number
  }[],
  baseMap: {
    workDateString: string,
    releaseTime: string,
    bigname: string,
    stopTime: string,
    depname: string,
    hosname: string
  }
}


// 医生排班返回数据类型
export interface DoctorScheduleRes {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    dayOfWeek: string,
    depname: string,
    hosname: string
  },
  hoscode: string,
  depcode: string,
  title: string,
  docname: string,
  skill: string,
  workDate: string,
  workTime: number,
  reservedNumber: number,
  availableNumber: number,
  amount: number,
  status: number,
  hosScheduleId: string
}




// 排班医生数据类型
export interface DoctorItf {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    dayOfWeek: string,
    depname: string,
    hosname: string
  },
  hoscode: string,
  depcode: string,
  title: string,
  docname: string,
  skill: string,
  workDate: string,
  workTime: number,
  reservedNumber: number,
  availableNumber: number,
  amount: number,
  status: number,
  hosScheduleId: string
}