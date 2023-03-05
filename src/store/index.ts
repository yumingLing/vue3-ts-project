import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'
const store = createStore<IRootState>({
  state: {
    name: 'dd',
    age: 17
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: { login }
})

// 由于vuex的数据是保存在内存里面的，所以 每次用户刷新页面都会把数据清空的
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 封装可带ts属性的类型数据，可以准确获取数据，不易出错
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
