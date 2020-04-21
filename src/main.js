import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./icons";
import "./plugins/element.js";

import "./permission";// 路由守卫

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

