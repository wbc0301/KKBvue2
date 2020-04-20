import Vue from "vue";
import Router from "vue-router";
import Layout from '@/layout'; // 布局页

Vue.use(Router);

export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: "/",
    component: Layout, // 布局
    redirect: "/home",
    meta: { title: '首页', icon: 'qq' },
    children: [
      {
        path: "home",
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "home",
        meta: { title: "Home", icon: "qq" }
      },
      {
        path: "mua",
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "mua",
        meta: { title: "波一个", icon: "wx" }
      },
      {
        path: '/button',
        name: 'button',
        meta: { auth: false },
        component: () => import(/* webpackChunkName: "button" */ '@/test/1_button.vue')
      }
    ]
  }
];

export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    children: [
      {
        path: "index",
        component: () => import(/* webpackChunkName: "home" */ "@/views/About.vue"),
        name: "about",
        meta: { title: "About", icon: "qq", roles: ['editor'] },
      },
      {
        path: "bla",
        component: () => import(/* webpackChunkName: "home" */ "@/views/About.vue"),
        name: "bla",
        meta: { title: "About", icon: "qq", roles: ['admin'] },
      },
    ]
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes
});