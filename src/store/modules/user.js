import { getToken, setToken, removeToken } from "@/utils/auth";

const state = {// 存储令牌和角色
  token: getToken(),
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // 登录 user/login  dispatch('user/login')
  login({ commit }, userInfo) {
    const { username } = userInfo;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" || username === "wbc") {          
          commit("SET_TOKEN", username); // 保存状态          
          setToken(username); // 写入cookie
          resolve();
        } else {
          reject("用户名、密码错误");
        }
      }, 1000);
    });
  },

  // 获取角色
  getInfo({ commit, state }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const roles = state.token === 'admin' ? ['admin'] : ['editor']
        commit("SET_ROLES", roles);
        resolve({ roles });
      }, 1000);
    });
  },

  // 重置令牌
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  }
};

export default { namespaced: true, state, mutations, actions };
