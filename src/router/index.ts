import Vue from 'vue'
import Router, { Route, RouteConfig } from 'vue-router'
import Singer from '../views/singer/index.vue'
import Rank from '../views/rank/index.vue'
import Search from '../views/search/index.vue'
import Recommend from '../views/recommend/index.vue'

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: '',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  }

]

const router: Router = new Router({
  mode: 'history',
  routes
})

export default router
