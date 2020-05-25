import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  // mode: 'history',
  routes: [
    {
      path: '*',
      component: () => import('../components/map/View.vue'),
      // component: () => import('../components/pages/404-pages/VaPageNotFoundLargeText.vue'),
    },
    /* {
      name: 'map',
      path: 'map',
      component: () => import('../components/map/Historical.vue'),
    },
    {
      path: '',
      redirect: { name: 'map' },
    }, */
  ],
})

