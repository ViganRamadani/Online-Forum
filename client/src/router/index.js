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
    path: "/user/:username",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/forums/:id",
    name: "forums",
    component: () => import(/* webpackChunkName: "forums" */ "../views/Forums.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/user/post/:username&:postId",
    name: "userPost",
    component: () => import(/* webpackChunkName: "userPost" */ "../views/UserPost.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/user/reportPost/:username&:postId",
    name: "reportPost",
    component: () => import(/* webpackChunkName: "reportPost" */ "../views/ReportPost.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/createCategoryPost",
    name: "createCategoryPost",
    component: () => import(/* webpackChunkName: "createCategoryPost" */ "../views/category/CreateCategoryPost"),
    meta: { requiresAuth: true }
  },
  {
    path: "/listCategoryPost",
    name: "listCategoryPost",
    component: () => import(/* webpackChunkName: "listCategoryPost" */ "../views/category/ListCategoryPost"),
    meta: { requiresAuth: true }
  },
  {
    path: "/editCategoryPost/:id",
    name: "editCategoryPost",
    component: () => import(/* webpackChunkName: "editCategoryPost" */ "../views/category/EditCategoryPost"),
    meta: { requiresAuth: true }
  },
  {
    path: "/category/:selected",
    name: "categoryPosts",
    component: () => import(/* webpackChunkName: "categoryPosts" */ "../views/category/CategoryPosts.vue"),
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
  // console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
