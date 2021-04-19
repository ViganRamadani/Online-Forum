import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: { isAuthenticated: false, requiresAuth: false }
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: { requiresAuth: null }
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
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
  },
  {
    path: "/forums/:id",
    name: "forums",
    component: () => import(/* webpackChunkName: "user" */ "../views/Forums.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/createCategoryPost",
    name: "createCategoryPost",
    component: () => import(/* webpackChunkName: "createCategoryPost" */ "../views/Category/CreateCategoryPost"),
    meta: { requiresAuth: true }
  },
  {
    path: "/listCategoryPost",
    name: "listCategoryPost",
    component: () => import(/* webpackChunkName: "listCategoryPost" */ "../views/Category/ListCategoryPost"),
    meta: { requiresAuth: true }
  },
  {
    path: "/editCategoryPost/:id",
    name: "editCategoryPost",
    component: () => import(/* webpackChunkName: "editCategoryPost" */ "../views/Category/EditCategoryPost"),
    meta: { requiresAuth: true }
  },
  {
    path: "/category/:selected",
    name: "categoryPosts",
    component: () => import(/* webpackChunkName: "categoryPosts" */ "../views/Category/CategoryPosts.vue"),
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
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
