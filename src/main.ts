import { createApp, App } from 'vue'
import rootApp from './App.vue'
import router from './router'
import store from './store'
import { registerApp } from './global/index'
import apiRequest from './service/index'

// 引入默认重置的东西
import 'normalize.css'

import * as Elicons from '@element-plus/icons-vue'
//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import { setupStore } from '@/store/index'
const app: App = createApp(rootApp)
registerApp(app)

// 全局注册elementplus icon
Object.keys(Elicons).forEach((key) => {
  app.component(key, Elicons[key as keyof typeof Elicons])
})
app.use(store)
// router在刷新的时候，初始化会直接去加载浏览器的url，
// 但是前置守卫的初始化动态路由还没初始化好，所以刷新的时候会找不到，解决问题就是初始化动态路由放前面
setupStore()
app.use(router)
app.mount('#app')

//这里刷新的话，放下面会404
// setupStore()
// 请求的使用示例，请求的类型
// interface RequestDataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// apiRequest
//   .post<RequestDataType>({
//     url: 'login',
//     data: {
//       name: 'coderwhy',
//       password: '123456'
//     },
//     intercetors: {
//       requestInterceptor: (config) => {
//         console.log('这是针对某次请求的单独的拦截器')
//         return config
//       },
//       responseIntercetor: (res) => {
//         console.log('这是针对某次响应的单独的拦截器')
//         return res
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
