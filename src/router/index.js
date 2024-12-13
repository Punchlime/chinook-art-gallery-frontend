import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeTempView from '../views/HomeTempView.vue'
import AllAuctionsView from '../views/AllAuctionsView.vue'
import LoginView from '../views/LoginView.vue'
import ListedView from '../views/ListedView.vue'
import AccountView from '../views/AccountView.vue'
import CreateItemView from '../views/CreateItemView.vue'
import AuctionItemView from '../views/AuctionItemView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  {
    // TODO build home view
    path: '/homeHidden',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   route level code-splitting
  //   this generates a separate chunk (about.[hash].js) for this route
  //   which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/',
    name: 'hometemp',
    component: HomeTempView
  },
  {
    path: '/items',
    name: 'auctions',
    component: AllAuctionsView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/listed',
    name: 'listed',
    component: ListedView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/item/create',
    name: 'create',
    component: CreateItemView
  },
  {
    path: '/item/:id',
    name: 'item',
    component: AuctionItemView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
