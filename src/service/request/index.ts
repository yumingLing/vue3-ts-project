import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults } from 'axios'
import type { APIRequestConfig, APIRequestInterceptors } from './type'
// 创建拦截器，可根据不同的实例创建自定义拦截器

class APIRequest {
  // 创建实例，可根据不同的配置创建不同的实例来进行请求
  instance: AxiosInstance
  interceptors?: APIRequestInterceptors

  constructor(config: APIRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.intercetors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseIntercetor,
      this.interceptors?.responseIntercetorCatch
    )

    // 所有的实例都会拥有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的拦截器都有的请求成功！')
        return config
      },
      (err) => {
        console.log('所有的拦截器都有的请求失败！')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的拦截器都有的响应成功！')
        return res
      },
      (err) => {
        console.log('所有的拦截器都有的响应失败！')
        return err
      }
    )
  }

  request(config: APIRequestConfig) {
    // 对于使用request方法的时候，可以再传每次请求单独的拦截器进行处理
    if (config.intercetors?.requestInterceptor) {
      // config 的类型本来是 InternalAxiosRequestConfig 的，但是传入的不一定带header ,设置了any
      config = config.intercetors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.intercetors?.responseIntercetor) {
        res = config.intercetors.responseIntercetor(res)
      }
      console.log(res)
    })
  }
}
export default APIRequest
