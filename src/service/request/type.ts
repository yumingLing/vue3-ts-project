import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
//
export interface APIRequestInterceptors<T = AxiosResponse> {
  //config的参数本来是 InternalAxiosRequestConfig类型的，但是后面的封装有点问题，只能这样了
  requestInterceptor?: (config: any) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseIntercetor?: (res: T) => T
  responseIntercetorCatch?: (error: any) => any
}
export interface APIRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  intercetors?: APIRequestInterceptors<T>
}
