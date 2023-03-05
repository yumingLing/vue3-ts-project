import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'

import type { IAccount } from '@/service/login/type'
import type { ILoginState } from './type'
import type { IRootState } from '../type'

// S是指模块的state的类型，R是根模块的state的类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true, // 作用： state=>state.moduleB.countB
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUerInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUerMenu(state, userMenu: any) {
      state.userMenu = userMenu
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // console.log('执行accountLoginAction', payload)
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUerInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      console.log('请求用户信息 userInfoResult', userInfo)

      // 3.获取用户信息的菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenu = userMenusResult.data
      commit('changeUerInfo', userMenu)
      localCache.setCache('userInfo', userMenu)
      console.log('获取用户信息的菜单 ', userMenu)

      // 4.跳到首页
      router.push('/main')
    },
    // 因为vuex的数据刷新是不会保存数据的，如果本地有值，需要重新赋值
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }

    // phoneLoginAction({ commit }, payload: IAccount) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}

export default loginModule
