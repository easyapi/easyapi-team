import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/index.vue'], resolve),
    },
    {
      path: '/white-list',
      name: 'white-list',
      component: resolve => require(['../pages/white-list.vue'], resolve),
    },

    {
      path: '/stat',
      name: 'stat',
      component: resolve => require(['../pages/stat.vue'], resolve),
    }
  ]
});
