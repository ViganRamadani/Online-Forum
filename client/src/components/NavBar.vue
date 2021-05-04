<template>
  <b-navbar id="navMain" toggleable="md">
      <b-navbar-toggle class="ml-auto" style="margin-right: 10px;" target="nav-collapse" id="navCollapse"></b-navbar-toggle>
          
      <b-collapse id="nav-collapse" is-nav>
        <router-link v-if="user.loggedIn" class="menu-items" to="/">Home</router-link>
        <router-link class="menu-items"  to="/about">About</router-link>
        <Dropdown dropDownLink="/tutorials" v-if="user.loggedIn" title="Tutorials" :items="tutorials" />
        <Dropdown v-if="user.loggedIn" dropDownLink="#" title="Category" :items="category" />
        <router-link class="menu-items" to="/contactUs">Contact Us</router-link>
        <router-link class="menu-items" v-if="user.loggedIn && currentUser.isAdmin == true" to="/admin">Admin</router-link>
      
        <div class="user-nav go-right">
          <router-link v-if="!user.loggedIn" class="menu-items" to="/register">Sign Up</router-link>
          <router-link v-if="!user.loggedIn" class="menu-items" to="/login">Login</router-link>
          <div id="welcomeUser" v-if="user.loggedIn">
            <p>Welcome! <router-link id="username" :to="/user/ + user.data.displayName">{{ user.data.displayName }}</router-link></p>
          </div>
          <button v-if="user.loggedIn" @click="signOut" id="signOut" class="menu-items">Sign out</button>
        </div>
      </b-collapse>
  </b-navbar>
</template>

<script>
import Dropdown from "./Dropdown";
import firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";
import axios from "axios";


export default {
  name: "navbar",
  data() {
    return {
      currentUser: {
        isAdmin: false,
      },
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
      ], 
      category: [
        {
          title: "All Questions",
          link: "/listCategoryPost"
        },
        {
          title: "Make a Question",
          link: "/createcategorypost"
        },
        {
          title: "Operation System",
          link: "/category/operationsystem"
        },
        {
          title: "Mobile",
          link: "/category/mobile"
        },
        {
          title: "Web",
          link: "/category/web"
        },
        {
          title: "Hardware",
          link: "/category/hardware"
        },
        {
          title: "Security",
          link: "/category/security"
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
  async mounted() {
    if (this.user.data.displayName != null) {
      await axios
        .get("http://localhost:3000/user/" + this.user.data.displayName)
        .then(async res => {
          this.currentUser = await res.data;
          // console.log(this.currentUser, "currentUser");

          this.$emit('dataChanges', this.currentUser)
        });
    }
  },
  components: {
    Dropdown
  },
  methods: {
    // emitChanges(){
    //   this.$emit('dataChanges', this.currentUser)
    // },
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

