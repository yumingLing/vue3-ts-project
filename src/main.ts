import { createApp, App } from 'vue'
import rootApp from './App.vue'
import router from './router'
import store from './store'
import { registerApp } from './global/index'
import apiRequest from './service/index'

const app: App = createApp(rootApp)
registerApp(app)
app.use(store).use(router).mount('#app')

apiRequest.request({
  url: 'login',
  method: 'POST',
  data: {
    name: 'coderwhy',
    password: '123456'
  },
  intercetors: {
    requestInterceptor: (config) => {
      console.log('这是针对某次请求的单独的拦截器')
      return config
    },
    responseIntercetor: (res) => {
      console.log('这是针对某次响应的单独的拦截器')
      return res
    }
  }
})
