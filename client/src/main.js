import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/firestore";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "@/static/main.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSlideUpDown from 'vue-slide-up-down';
// import $ from 'jquery';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.component('vue-slide-up-down', VueSlideUpDown)

Vue.use(VueSweetalert2);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);


Vue.config.productionTip = false;
// Vue.prototype.$axios = axios;

firebase.settings = { timestampsInSnapshots: true };

const firebaseConfig = {
  apiKey: "AIzaSyDottsANBDBF3u5DIOI1mtT9d1TGnCqDt4",
  authDomain: "online-forums.firebaseapp.com",
  projectId: "online-forums",
  storageBucket: "online-forums.appspot.com",
  messagingSenderId: "50427151083",
  appId: "1:50427151083:web:2462442bceedf88af0b4ae",
  measurementId: "G-08VXQ27ZZR"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

// Check the user's status, and route rules
router.beforeEach((to, from, next) => {
  // Redirect if user is disallowed to view the page
  const isLogged = !!store.getters.getUser;
  if (isLogged && to.meta.disallowAuthed) {
    return router.push("/home");
  }
  return next();
});

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
