import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from '../views/pages/HomeView.vue'

export const routes = [
  { path: "/home",name:'Home', component: HomeView },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
router.beforeEach((to, from) => {
    console.log('tofrom',to,from);
    // ...
    // explicitly return false to cancel the navigation
  })
