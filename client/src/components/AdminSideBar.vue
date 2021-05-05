<template>
  <div id="sideBar">
    <current-profile hidden @dataChanges="fetchData"></current-profile>
    <div class="side-nav">
      <div class="side-nav-option">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon bi bi-people" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        </svg>
        <router-link class="link" to="/admin">Manage Users</router-link>
      </div>
      
      <div class="side-nav-option">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon bi bi-card-list" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
        </svg>
        <router-link class="link" to="/admin/forums">Manage Forums</router-link>
      </div>
      <div class="side-nav-option">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon bi bi-envelope" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
        </svg>
        <router-link class="link" to="/admin/contacts">Manage Contact Us Messages</router-link>
      </div>
      <div class="side-nav-option">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon bi bi-file-earmark-x" viewBox="0 0 16 16">
          <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z"/>
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
        </svg>
        <router-link class="link" to="/admin/reports">Manage Reports</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import CurrentProfile from '../components/NavBar';

export default {
  components: {
    CurrentProfile
  },
  data(){
    return {
      currentUser:{}
    }
  },
  methods: {
    fetchData(data) {
      this.currentUser = data
    }
  },
  creared(){
    if (!this.currentUser) {
      this.$router.push({name: 'home'})
      // window.location = "/";
      console.log("Access Denied!")
    } else if (this.currentUser.isAdmin === null || this.currentUser.isAdmin != true) {
      // window.location = "/";
      this.$router.push({name: 'home'})
      console.log("Access Denied!")
    } else {
      return console.log("Access Granted!")
    }
  },
}
</script>

<style scoped>
#sideBar {
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  right: 0;
  align-self: flex-start;
  min-height: 100vh;  
  overflow-y: hidden;
}

.side-nav {
  height:auto;
  width: var(--side-bar-width);
  background-color: #111;
}

.side-nav-option {
  padding: 5px;
  margin: 5px;
  display: flex;
  align-items: center;
  align-items: baseline;
}

.side-nav a {
  padding: 0px 8px 0px 5px;
  text-decoration: none;
  font-size: 25px;
  color: #8a8a8a;
  display: block;
} svg {
  color: #8a8a8a;
  margin:0 0 0 5px;
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
}
 
:is(.side-nav-option):hover :is(a, svg){
  color: #f1f1f1;
}

</style>