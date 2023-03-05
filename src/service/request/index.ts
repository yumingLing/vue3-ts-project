import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { APIRequestConfig, APIRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
// 创建拦截器，可根据不同的实例创建自定义拦截器

const DEAFULT_LOADING = true

class APIRequest {
  // 1.创建实例，可根据不同的配置创建不同的实例来进行请求
  instance: AxiosInstance
  interceptors?: APIRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: APIRequestConfig) {
    // 2. 保存基本信息
    this.instance = axios.create(config)
    this.interceptors = config.intercetors
    this.showLoading = config.showLoading ?? DEAFULT_LOADING // 看是否赋值，没有默认是true

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseIntercetor,
      this.interceptors?.responseIntercetorCatch
    )

    // 3.添加所有的实例都会拥有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的拦截器都有的请求成功！', this.showLoading)
        // 这里引入没有生效，去首页main.ts里面引用一下
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'raba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有的拦截器都有的请求失败！')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的拦截器都有的响应成功！')

        this.loading?.close()

        return res
      },
      (err) => {
        console.log('所有的拦截器都有的响应失败！')
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }

  // 使用泛型可以得知返回数据的类型
  request<T>(config: APIRequestConfig<any>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对于使用request方法的时候，可以再传每次请求单独的拦截器进行处理
      //1.单个请求对config的处理
      if (config.intercetors?.requestInterceptor) {
        // config 的类型本来是 InternalAxiosRequestConfig 的，但是传入的不一定带header ,设置了any
        config = config.intercetors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loadiing
      if (config.showLoading === !DEAFULT_LOADING) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 2.1 对返回的数据进行拦截
          if (config.intercetors?.responseIntercetor) {
            res = config.intercetors.responseIntercetor(res)
          }

          // 2.2 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          // 3. 将结果数据进行返回
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: APIRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: APIRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: APIRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  //修改
  patch<T>(config: APIRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default APIRequest
