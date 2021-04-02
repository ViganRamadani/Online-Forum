<template>
  <nav>
    <router-link class="menu-items" to="/">Home</router-link>
    <router-link class="menu-items" to="/about">About</router-link>
    <Dropdown title="Tutorials" :items="tutorials" />
    <div class="menu-items"><a href="">Contact</a></div>
    <router-link class="menu-items" to="/admin">Admin</router-link>

    <div class="go-right">
      <div class="flex-row">
        <!-- user.loggedIn Checks the state of the user in the store/index.js file -->
        <router-link v-if="!user.loggedIn" class="menu-items" to="/register">Register</router-link>
        <router-link v-if="!user.loggedIn" class="menu-items" to="/login">Login</router-link>
        <button v-if="user.loggedIn" @click="signOut" id="signOut" class="menu-items" >Sign out</button>
      </div>
    </div>
  </nav>
</template>

<script>
import Dropdown from "./Dropdown";
import firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      tutorials: [
        {
          title: "HTML",
          link: "#",
        },
        {
          title: "CSS",
          link: "#",
        },
        {
          title: "ASP.NET Core",
          link: "#",
        },
        {
          title: "Vue",
          link: "#",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  components: {
    Dropdown,
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
    },
  },
};
</script>

<style>
nav {
  display: flex;
  align-items: center;
}

nav .menu-items {
  position: relative;
  display: flex;
  padding: 10px 20px;
  border-bottom: 3px solid transparent;
  color: #fff;
  text-align: center;
  transition: 0.4s;
}

nav .menu-items.active,
nav .menu-items:hover {
  background-color: #444;
  border-bottom: 3px solid #ff5858;

  /* border-bottom-color: #ff5858; */
}

nav .menu-items a {
  color: inherit;
}

#signOut {
  width: fit-content;
  height: max-content;
  font-size: inherit;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  outline: none;
  cursor: pointer;
}
#signOut:hover {
  background-color: rgb(128, 106, 106);
  border-bottom: 3px solid #d62e2e;
}
</style>