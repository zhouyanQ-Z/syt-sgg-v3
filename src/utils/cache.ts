// 封装本地存储

// 存储数据
export const setItem = (type:string,data:any) => {
  localStorage.setItem(type,data)
}
// 获取数据
export const getItem = (type:string) => {
  return localStorage.getItem(type)
}
// 删除数据
export const removeItem = (type:string) => {
  localStorage.removeItem(type)
}