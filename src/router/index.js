import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/home/index.vue'
import Home from '../views/home/home.vue'
import society from '../views/society/index.vue'
import user from '../views/user/index.vue'
import sell from '../views/sell/index.vue'
import purchase from '../views/purchase/index.vue'
import address from '../views/user/address/index.vue'
import addAddress from '../views/user/address/add.vue'
import order from '../views/user/order/index.vue'
import logistics from '../views/logistics/index.vue'
import OrderDetails from '../views/logistics/OrderDetails.vue'
import info from '../views/logistics/info.vue'
import details from '../views/logistics/details.vue'
import expense from '../views/logistics/expense.vue'
import login from '../views/login/index.vue'
import pay from '../views/pay/index.vue'
import submit from '../views/submit/index.vue'
import shopCart from '../views/shopCart/index.vue'
import guan from '../views/guan/index.vue'
import paylist from '../views/payList/index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: index,

    children: [ //tabber的路由
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'society',
        name: 'society',
        component: society
      },
      {
        path: 'user',
        name: 'user',
        component: user
      },
      {
        path: 'sell',
        name: 'sell',
        component: sell
      },
      {
        path: 'purchase',
        name: 'purchase',
        component: purchase
      },
      {
        path: 'logistics',
        name: 'logistics',
        component: logistics,
      },
      {
        path: 'shopCart',
        name: 'shopCart',
        component: shopCart,
      },
    ]
  },
  { //订单费用
    path: '/login',
    name: 'login',
    component: login,
  },
  { //收货地址
    path: '/address',
    name: 'address',
    component: address,
  },
  { //采购订单列表
    path: '/order',
    name: 'order',
    component: order,
  },
  { //添加
    path: '/addAddress',
    name: 'addAddress',
    component: addAddress,
  },
  { //货物信息
    path: '/info',
    name: 'info',
    component: info,
  },
  { //物流详情
    path: '/details',
    name: 'details',
    component: details,
  },
  { //订单费用
    path: '/expense',
    name: 'expense',
    component: expense,
  },
  { //商品详情
    path: '/pay',
    name: 'pay',
    component: pay,
  },
  { //提交订单
    path: '/submit',
    name: 'submit',
    component: submit,
  },
  { //demo
    path: '/guan',
    name: 'guan',
    component: guan,
  },
  { //订单详情
    path: '/OrderDetails',
    name: 'OrderDetails',
    component: OrderDetails,
  },
  { //商品列表
    path: '/paylist',
    name: 'paylist',
    component: paylist,
  },

]

const router = new VueRouter({
  mode: 'hash',
  base:'./',
  routes
})

export default router