// service的统一的出口
import APIRequest from './request'
import logcalCache from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './request/config'

//如果有需要多个request的话，会new多个，所以类会创建有instance创建实例,每个实例都可以自定义拦截器
const apiRequest = new APIRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  intercetors: {
    requestInterceptor: (config) => {
      // console.log('请求成功的拦截！')
      // 设置token
      const token = logcalCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('请求失败的拦截！')
      return error
    },
    responseIntercetor: (res) => {
      // console.log('响应成功的拦截！')
      // 去掉axios封装的一些结构
      return res.data
    },
    responseIntercetorCatch: (error) => {
      console.log('响应失败的拦截！')
      return error
    }
  }
})
export default apiRequest
