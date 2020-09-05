import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  fallback:true,
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      meta:{
        title: ' 支付',
        // requireAuth: true, 
      },
      component: () => import('../page/home.vue'),
    },
    {
      path: '/pay',
      name: 'pay',
      meta:{
        title: ' 支付',
        // requireAuth: true, 
      },
      component: () => import('../page/pay.vue'),
    },
    {
      path: '/suc/:reservOrderId',
      name: 'suc',
      meta:{
        title: ' 支付成功',
        // requireAuth: true, 
      },
      component: () => import('../page/paysuc.vue'),
    },
    {
      path: '/load',
      name: 'load',
      meta:{
        title: ' 支付中',
        // requireAuth: true, 
      },
      component: () => import('../page/load.vue'),
    },
    {
      path: '/orderform/:reservOrderId',
      props:true,
      name: 'orderform',
      meta:{title: '订单',
          // requireAuth: true, 
      },
      component: () => import('../page/orderform.vue'),
    },
    {
      path: '/safarishow',
      props:true,
      name: 'safarishow',
      meta:{title: '跳转中',
          // requireAuth: true, 
      },
      component: () => import('../page/safarishow.vue'),
    }
  ]
})
