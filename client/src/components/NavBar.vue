<template>
  <nav style="display: flex">
    <router-link v-if="user.loggedIn" class="menu-items" to="/">Home</router-link>
    <router-link class="menu-items" to="/about">About</router-link>
    <Dropdown v-if="user.loggedIn" title="Tutorials" :items="tutorials" />
    <router-link class="menu-items" to="/contactUs">Contact Us</router-link>

    <router-link v-if="user.loggedIn && userData.isAdmin == true" class="menu-items" to="/admin"
      >Admin</router-link>

    <div class="go-right">
      <div class="flex-row">
        <!-- user.loggedIn Checks the state of the user in the store/index.js file -->
        <router-link v-if="!user.loggedIn" class="menu-items" to="/register">Sign Up</router-link>
        <router-link v-if="!user.loggedIn" class="menu-items" to="/login">Login</router-link>
        <div id="welcomeUser" v-if="user.loggedIn">
          <p>Welcome! <router-link id="username" :to="/user/ + user.data.displayName">{{ user.data.displayName }}</router-link></p>
        </div>
        <button
          v-if="user.loggedIn"
          @click="signOut"
          id="signOut"
          class="menu-items"
        >
          Sign out
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Dropdown from "./Dropdown";
import firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";
import axios from "axios"

export default {
  name: "navbar",
  data() {
    return {
      userData: {},
      tutorials: [
        {
          title: "HTML",
          link: "#"
        },
        {
          title: "CSS",
          link: "#"
        },
        {
          title: "ASP.NET Core",
          link: "#"
        },
        {
          title: "Vue",
          link: "#"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  mounted() {
      axios
        .get("http://localhost:3000/user/" + this.user.data.displayName)
        .then(res => {
          this.userData = res.data;
          // console.log(this.userData);
          });
  },
  components: {
    Dropdown
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/login");
          });
        });
    }
  }
};
</script>