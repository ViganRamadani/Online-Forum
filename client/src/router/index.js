import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Register from "../views/Register.vue";
// import Login from "../views/Login.vue";
// import Admin from "../views/Admin.vue";
// import ForgotPass from "../views/ForgotPassword.vue";

import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
    // component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    // component: Login
    meta: {
      // requiresAuth: false,
      isAuthenticated: null
    }
  },
  {
    path: "/register",
    name: "register",
    meta: {
      requiresAuth: null
      // isAuthenticated: false,
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
    // component: Register
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
    // meta: { requiresAuth: true }
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    component: () =>
      import(
        /* webpackChunkName: "forgotPassword" */ "../views/ForgotPassword.vue"
      ),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/user/:id",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
