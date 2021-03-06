import Vue from "vue";
import Router from "vue-router";

const Launch = () => import(/* webpackChunkName: "teams" */ "../pages/launch.vue");

const Wrapper = () => import(/* webpackChunkName: "Wrapper" */ "../pages/Wrapper.vue");

const Index = () => import(/* webpackChunkName: "index" */ "../pages/index.vue");

const Account = () => import("../pages/account.vue");

const Notification = () => import("../pages/notification.vue");

const Event = () => import("../pages/event/index.vue");

const Bill = () => import("../pages/bill/index.vue");

const RechargeSuccess = () => import("../pages/recharge/success.vue");

const Members = () => import("../pages/member/index.vue");

const Orders = () => import("../pages/order/index.vue");

// const NewIdex = () => import("../pages/user")

const New = () => import("../pages/new.vue");

const NewSuccess = () => import("../pages/new-success.vue");

const RenewService = () => import("../pages/renew/service.vue");

const RenewDoc = () => import("../pages/renew/doc.vue")

const RenewGateway = () => import("../pages/renew/gateway.vue")

const RenewMonitor = () => import("../pages/renew/monitor.vue")

const RenewAlipay = () => import("../pages/renew/alipay.vue");

const RenewSuccess = () => import("../pages/renew/success.vue");

const UserEdit = () => import("../pages/user/edit.vue");

const UserPassword = () => import("../pages/user/password.vue");

const UserThirdParty = () => import("../pages/user/third-party.vue");




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
          path: "bill",
          name: "Bills",
          component: Bill
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
      path: "/notification",
      component: Notification
    },
    {
      path: "/event",
      component: Event
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
      name: "????????????",
      component: RechargeSuccess
    },
    {
      path: "/renew/service",
      name: "renew-service",
      component: RenewService
    },
    {
      path: "/renew/doc",
      name: "renew-doc",
      component: RenewDoc
    },
    {
      path: "/renew/gateway",
      name: "renew-gateway",
      component: RenewGateway
    },
    {
      path: "/renew/monitor",
      name: "renew-doc",
      component: RenewMonitor
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
    {
      path: "/user/thirdParty",
      name: "user-thirdParty",
      component: UserThirdParty
    }
  ]
});
