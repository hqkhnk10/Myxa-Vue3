import { createRouter, createWebHashHistory } from "vue-router";

import NotFound from "../views/pages/NotFound.vue";

export const routes = [
  {
    path: "/home",
    name: "Home",
    component: NotFound,
    meta: {
      title: "Home",
      icon: "",
    },
    children: [
      {
        path: "/child1",
        name: "Child 1",
        component: NotFound,
        meta: {
          title: "Child1",
          icon: "",
        },
      },
      {
        path: "/child2",
        name: "Child 2",
        component: NotFound,
        meta: {
          title: "Child2",
          icon: "",
        },
      }
    ],
  },
  {
    path: "/home2",
    name: "Home",
    component: NotFound,
    meta: {
      title: "Home",
      icon: "",
    },
    children: [
      {
        path: "/child3",
        name: "Child 3",
        component: NotFound,
        meta: {
          title: "Child1",
          icon: "",
        },
      },
      {
        path: "/child5",
        name: "Child 2",
        component: NotFound,
        meta: {
          title: "Child2",
          icon: "",
        },
      }
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
router.beforeEach((to, from) => {
  console.log("tofrom", to, from);
  // ...
  // explicitly return false to cancel the navigation
});
