import Vue from "vue";
import Router from "vue-router";

const Launch = () =>
  import(/* webpackChunkName: "teams" */ "../pages/launch.vue");

const Wrapper = () =>
  import(/* webpackChunkName: "Wrapper" */ "../pages/Wrapper.vue");

const Index = () =>
  import(/* webpackChunkName: "index" */ "../pages/index.vue");

const Account = () => import("../pages/account.vue");

const Recharges = () => import("../pages/recharge/index.vue");

const RechargeSuccess = () => import("../pages/recharge/success.vue");

const Members = () => import("../pages/member/index.vue");

const Services = () => import("../pages/service/index.vue");
const ServicesPay = () => import("../pages/service/pay.vue");

const Orders = () => import("../pages/order/index.vue");

const New = () => import("../pages/new.vue");

const NewSuccess = () => import("../pages/new-success.vue");

const RenewCount = () => import("../pages/renew/count.vue");

const RenewMonthly = () => import("../pages/renew/monthly.vue");

const RenewAlipay = () => import("../pages/renew/alipay.vue");

const RenewSuccess = () => import("../pages/renew/success.vue");

const UserEdit = () => import("../pages/user/edit.vue");

const UserPassword = () => import("../pages/user/password.vue");


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "homePage",
      component: Index
    },
    {
      path: "/",
      component: Wrapper,
      children: [
        {
          path: "/account",
          name: "Account",
          component: Account
        },
        {
          path: "recharges",
          name: "Recharges",
          component: Recharges
        },
        {
          path: "services",
          name: "Services",
          component: Services
        },
        {
          path: "services/pay",
          name: "ServicesPay",
          component: ServicesPay
        },
        {
          path: "members",
          name: "Members",
          component: Members
        },
        {
          path: "orders",
          name: "Orders",
          component: Orders
        }
      ]
    },
    {
      path: "/launch",
      component: Launch
    },
    {
      path: "/new",
      component: New
    },
    {
      path: "/new/success",
      component: NewSuccess
    },
    {
      path: "/recharge/success",
      name: "充值成功",
      component: RechargeSuccess
    },
    {
      path: "/renew/count",
      name: "renew-count",
      component: RenewCount
    },
    {
      path: "/renew/monthly",
      name: "renew-monthly",
      component: RenewMonthly
    },
    {
      path: "/renew/alipay",
      name: "renew-alipay",
      component: RenewAlipay
    },
    {
      path: "/renew/success",
      name: "renew-success",
      component: RenewSuccess
    },
    {
      path: "/user/edit",
      name: "user-edit",
      component: UserEdit
    },
    {
      path: "/user/password",
      name: "user-password",
      component: UserPassword
    },

  ]
});
