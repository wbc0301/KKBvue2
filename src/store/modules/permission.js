import { asyncRoutes, constRoutes } from "@/router";

// 根据路由meta.role确定是否当前用户拥有访问权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {  // 如果当前路由有roles字段则需判断用户访问权限   
    return roles.some(role => route.meta.roles.includes(role)); // 若用户拥有的角色中有被包含在待判定路由角色表中的则拥有访问权
  } else {  
    return true;  // 没有设置roles则无需判定即可访问
  }
}

// 递归过滤AsyncRoutes路由表
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {   
    const tmp = { ...route }; // 复制一份   
    if (hasPermission(roles, tmp)) {  // 如果用户有访问权则加入结果路由表     
      if (tmp.children) { // 如果存在子路由则递归过滤之
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}

const state = {
  routes: [],   // 当前用户的完整路由表
  filteredRoutes: [] // 过滤后的 asyncRoutes
};

const mutations = {
  SET_ROUTES: (state, routes) => {     
    state.filteredRoutes = routes; // filteredRoutes是用户可以访问的权限页面   
    state.routes = constRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, roles) { // 得到用户角色后会第一时间调用
    return new Promise(resolve => {
      let filteredRoutes = [];   
      if (roles.includes("admin")) { 
        filteredRoutes = asyncRoutes; // 管理员
      } else {
        filteredRoutes = filterAsyncRoutes(asyncRoutes, roles); // 根据角色过滤 asyncRoutes
      }
      commit("SET_ROUTES", filteredRoutes);
      resolve(filteredRoutes);
    });
  }
};

export default {  namespaced: true,  state,  mutations,  actions};