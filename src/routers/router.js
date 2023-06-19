import { createRouter, createWebHashHistory } from "vue-router";

const TheLayout = () => import("@/components/Layout/TheLayout.vue");
const NotFound = () => import("@/views/pages/base-view/NotFound.vue");
const BaseStyle = () => import("@/views/pages/base-view/BaseStyle.vue");
const EmulationTitle = () =>
  import("@/views/pages/emulation-title/EmulationTitleIndex.vue");

const mainRoutes = [
  {
    path: "/",
    name: "home",
    component: TheLayout,
    children: [],
  },
  {
    path: "/emis",
    name: "EmisStyle",
    component: () => import("@/views/pages/base-view/EmisStyle.vue"),
    children: [],
  },
  {
    path: "/homework",
    name: "Homework",
    component: () => import("@/views/pages/emis-study/MainPage.vue"),
    children: [],
  },
];

export const routes = [
  {
    path: "/summary",
    name: "Summary",
    component: BaseStyle,
    meta: {
      title: "router.summary",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_dashboard_default.110fa5f3.svg",
    },
  },
  {
    path: "/competition",
    name: "Competition",
    component: NotFound,
    meta: {
      title: "router.competition",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_movement_default.102c9e3d.svg",
    },
    children: [
      {
        path: "/emulationMovement",
        name: "emulationMovement",
        component: NotFound,
        meta: {
          title: "router.emulationMovement",
          icon: "",
        },
      },
      {
        path: "/registerCompetition",
        name: "registerCompetition",
        component: NotFound,
        meta: {
          title: "router.registerCompetition",
          icon: "",
        },
      },
      {
        path: "/summaryRegister",
        name: "summaryRegister",
        component: NotFound,
        meta: {
          title: "router.summaryRegister",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/reward",
    name: "reward",
    component: NotFound,
    meta: {
      title: "router.reward",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_reward_default.156d6945.svg",
    },
    children: [
      {
        path: "/soldiersAtTheUnit",
        name: "soldiersAtTheUnit",
        component: NotFound,
        meta: {
          title: "router.soldiersAtTheUnit",
          icon: "",
        },
      },
      {
        path: "/subordinateAppraisal",
        name: "subordinateAppraisal",
        component: NotFound,
        meta: {
          title: "router.subordinateAppraisal",
          icon: "",
        },
      },
      {
        path: "/militaryReview",
        name: "militaryReview",
        component: NotFound,
        meta: {
          title: "router.militaryReview",
          icon: "",
        },
      },
      {
        path: "/votationCommendation",
        name: "votationCommendation",
        component: NotFound,
        meta: {
          title: "router.votationCommendation",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/decide",
    name: "decide",
    component: NotFound,
    meta: {
      title: "router.decide",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_decision_menu_default.cae653f2.svg",
    },
    children: [
      {
        path: "/commendationDecision",
        name: "commendationDecision",
        component: NotFound,
        meta: {
          title: "router.commendationDecision",
          icon: "",
        },
      },
      {
        path: "/commendationResistance",
        name: "commendationResistance",
        component: NotFound,
        meta: {
          title: "router.commendationResistance",
          icon: "",
        },
      },
      {
        path: "/offsetCommendation",
        name: "offsetCommendation",
        component: NotFound,
        meta: {
          title: "router.offsetCommendation",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/profile",
    name: "profile",
    component: NotFound,
    meta: {
      title: "router.profile",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_profile_default.d730fb8f.svg",
    },
    children: [
      {
        path: "/employee",
        name: "employee",
        component: NotFound,
        meta: {
          title: "router.employee",
          icon: "",
        },
      },
      {
        path: "/groupEmployee",
        name: "groupEmployee",
        component: NotFound,
        meta: {
          title: "router.groupEmployee",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/search",
    name: "search",
    component: NotFound,
    meta: {
      title: "router.search",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_search_default.903d371b.svg",
    },
    children: [
      {
        path: "/employee",
        name: "employee",
        component: NotFound,
        meta: {
          title: "router.employee",
          icon: "",
        },
      },
      {
        path: "/groupEmployee",
        name: "groupEmployee",
        component: NotFound,
        meta: {
          title: "router.groupEmployee",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/report",
    name: "report",
    component: NotFound,
    meta: {
      title: "router.report",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_report_default.67157268.svg",
      afterLine: true,
    },
    children: [
      {
        path: "/employee",
        name: "employee",
        component: NotFound,
        meta: {
          title: "router.employee",
          icon: "",
        },
      },
      {
        path: "/groupEmployee",
        name: "groupEmployee",
        component: NotFound,
        meta: {
          title: "router.groupEmployee",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/category",
    name: "category",
    meta: {
      title: "router.category",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_category.f257fcc6.svg",
    },
    children: [
      {
        path: "/emulationTitle",
        name: "emulationTitle",
        component: EmulationTitle,
        meta: {
          title: "router.emulationTitle",
          icon: "",
        },
      },
      {
        path: "/rewardCategory",
        name: "rewardCategory",
        component: NotFound,
        meta: {
          title: "router.rewardCategory",
          icon: "",
        },
      },
      {
        path: "/jobPosition",
        name: "jobPosition",
        component: NotFound,
        meta: {
          title: "router.jobPosition",
          icon: "",
        },
      },
      {
        path: "/conditionReward",
        name: "conditionReward",
        component: NotFound,
        meta: {
          title: "router.conditionReward",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/setting",
    name: "setting",
    component: NotFound,
    meta: {
      title: "router.setting",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_setting_default.be222d4a.svg",
      afterLine: true,
    },
    children: [
      {
        path: "/employee",
        name: "employee",
        component: NotFound,
        meta: {
          title: "router.employee",
          icon: "",
        },
      },
      {
        path: "/groupEmployee",
        name: "groupEmployee",
        component: NotFound,
        meta: {
          title: "router.groupEmployee",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/guide",
    name: "guide",
    component: NotFound,
    meta: {
      title: "router.guide",
      icon: "https://cegovapp.misacdn.net/cegov/img/ic_guide_default.186420dc.svg",
    },
    children: [
      {
        path: "/employee",
        name: "employee",
        component: NotFound,
        meta: {
          title: "router.employee",
          icon: "",
        },
      },
      {
        path: "/groupEmployee",
        name: "groupEmployee",
        component: NotFound,
        meta: {
          title: "router.groupEmployee",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/notFound",
    name: "notFound",
    component: NotFound,
    meta: {
      title: "router.notFound",
      hidden: true,
    },
  },
];
routes.forEach((route) => mainRoutes[0].children.push(route));
export const router = createRouter({
  history: createWebHashHistory(),
  routes: mainRoutes,
});

/**
 * Show loading when change route
 * CreatedBy: NQTruong(15/05/2023)
 */
router.beforeEach((to, from, next) => {
  const loading = document.querySelector(".loading-screen");
  if (loading) {
    loading.style.display = "flex";
  }
  setTimeout(() => {
    next();
  }, 400);
});
/**
 * Hide loading when finish change route
 * CreatedBy: NQTruong(15/05/2023)
 */
router.afterEach(() => {
  const loading = document.querySelector(".loading-screen");
  if (loading) {
    loading.style.display = "none";
  }
});
