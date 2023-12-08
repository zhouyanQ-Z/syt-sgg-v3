import { defineStore } from 'pinia'
import { reqHospDetail,reqHospDepartment } from '@/api/hospital'
import { HospitalDetailItf,DepartmentItf } from '@/type/api/hospital'

interface DataType {
  detail: HospitalDetailItf
  department: DepartmentItf[]
}

export default defineStore('hospitalStore',{
  state: ():DataType => {
    return {
      detail: ({} as HospitalDetailItf),
      department: ([] as DepartmentItf[])
    }
  },
  actions: {
    getDetail(code: string) {
      reqHospDetail(code).then(res => {
        if(res.code === 200) {
          this.detail = res.data
        }
      })
    },
    getDepartment(code:string) {
      reqHospDepartment(code).then(res => {
        if(res.code === 200) {
          this.department = res.data
        }
      })
    }
  }
})