/*
 * @Author: Jinkin1995 - jinkin1995@gmail.com
 * @Date: 2017-12-11 20:28:49
 * @Last Modified by:   Jinkin1995 - jinkin1995@gmail.com
 * @Last Modified time: 2017-09-01 20:28:49
 */
import Vue from 'vue'
import Router from 'vue-router'

const Launch = () => import(/* webpackChunkName: "teams" */ '../pages/launch.vue')

const Wrapper = () => import(/* webpackChunkName: "Wrapper" */ '../pages/Wrapper.vue')

const Index = () => import(/* webpackChunkName: "index" */ '../pages/index.vue')

const Account = () => import('../pages/account.vue')

const Recharges = () => import('../pages/recharge/index.vue')
const RechargeSuccess = () => import('../pages/recharge/success.vue')

const Members = () => import('../pages/member/index.vue')

const Orders = () => import('../pages/order/index.vue')

const New = () => import('../pages/new.vue')
const NewSuccess = () => import('../pages/new-success.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: Index
    },
    {
      path: '/',
      component: Wrapper,
      children: [
        {
          path: '/account',
          name: 'Account',
          component: Account
        }, {
          path: 'recharges',
          name: 'Recharges',
          component: Recharges
        }, {
          path: 'members',
          name: 'Members',
          component: Members
        }, {
          path: 'orders',
          name: 'Orders',
          component: Orders
        }]
    }, {
      path: '/launch',
      component: Launch
    }, {
      path: '/new',
      component: New
    }, {
      path: '/new/success',
      component: NewSuccess
    }, {
      path: '/recharge/success',
      name: '充值成功',
      component: RechargeSuccess
    },
  ]
})




