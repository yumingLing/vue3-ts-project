import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './type'

import { getPageListData } from '@/service/main/system/system'

import login from './login/login'
import system from './main/system/system'

const store = createStore<IRootState>({
  state: {
    name: 'dd',
    age: 17,
    entireDepartment: [],
    entireRole: [],
    entireMenu: []
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: { login, system }
})

// 由于vuex的数据是保存在内存里面的，所以 每次用户刷新页面都会把数据清空的
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // 下面可能token没有拿到
  // store.dispatch('getInitialDataAction')
}

// 封装可带ts属性的类型数据，可以准确获取数据，不易出错
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
