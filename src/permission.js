// 路由全局守卫  权限控制逻辑在这里

import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 从cookie获取令牌

const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {

  const hasToken = getToken() // 获取令牌

  if (hasToken) { // 已登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0 // 若用户角色已附加则说明动态路由已添加
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')  // 获取角色            
          const filteredRoutes = await store.dispatch('permission/generateRoutes', roles)  // 过滤  
          router.addRoutes(filteredRoutes)  // 添加    
          next({ ...to, replace: true }) 
        } catch (error) { //令牌过期、网络错误等    
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else if (whiteList.indexOf(to.path) !== -1) {  // 白名单   
    next() 
  } else {
    next(`/login?redirect=${to.path}`)
  }
})