import router from '@/router'
import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
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
      userMenu: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu

      console.log('注册动态路由')

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenu)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenu)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // console.log('执行accountLoginAction', payload)
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 发送初始化的请求(完整的role/department)
      //root 是根目录的请求
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      console.log('请求用户信息 userInfoResult', userInfo)

      // 3.获取用户信息的菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenu = userMenusResult.data
      commit('changeUserMenu', userMenu)
      localCache.setCache('userMenu', userMenu)
      console.log('获取用户信息的菜单 ', userMenu)

      // 4.跳到首页
      router.push('/main')
    },
    // 因为vuex的数据刷新是不会保存数据的，如果本地有值，需要重新赋值
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenu')
      if (userMenus) {
        commit('changeUserMenu', userMenus)
      }
    }

    // phoneLoginAction({ commit }, payload: IAccount) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}

export default loginModule
