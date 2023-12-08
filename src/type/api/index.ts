// 定义 API 返回值数据类型

export type PromiseRes<T={}> = Promise<ManageResult<T>>


interface ManageResult<T={}> {
  code: number,
  message?: string,
  data: T,
  ok?: string
}