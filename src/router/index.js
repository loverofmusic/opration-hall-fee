import Vue from "vue";
import VueRouter from "vue-router";
import Opration from "../views/BigScreenOpration.vue";
// import Fee from "../views/BigScreenFee.vue";
import Hall from "../views/BigScreenHall.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/hall",
    meta: {
      title: "ddd"
    }
  },
  {
    path: "/hall",
    name: "hall",
    component: Hall,
    meta: {
      title: "营业厅运营监测平台"
    }
  },
  {
    path: "/opration",
    name: "opration",
    component: Opration,
    meta: {
      title: "智能营电管控平台"
    }
  },
  {
    path: "/fee",
    name: "fee",
    meta: {
      title: "抄表催费业务管控平台"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BigScreenFee.vue")
  }
];

const router = new VueRouter({
  // mode: "history",
  routes
});

export default router;
