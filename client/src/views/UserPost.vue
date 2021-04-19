<template>
  <div>
    <h1 style="text-align:center; margin: 25px;">Post view for {{postData.postTitle}}</h1>
    <div class="user-post-main">
      <div class="user-post">
        <div class="top-main">

          <router-link :to="'../' + this.userData.username">
            <img id='userPic' :src="require('../../../server/uploads/' + userData.profilePath)">
          </router-link>
          <div class="post-title flex-column">
            <router-link id="username" :to="'../' + this.userData.username"> {{ userData.username }}</router-link>
            <div class="flex-row">
              <router-link id="postTitle" style="display: flex;" :to="userData.username + '&' + postData.postId"><h4 style="display: flex;">{{ postData.postTitle }}</h4></router-link>
              <!-- <span style="margin: 0 5px;">></span>  <router-link :to="'../../forums/' + postData.forum">{{ postData.forum }}</router-link> -->
            </div>
          </div>
          <div class="dropdown-main">
            <button class="toggle-menu">···</button>
            <ul class="menu-list">
              <li class="menu-button"><a class="menu-report" :href="postData._id">Report Post</a></li>
              <li class="menu-button"><a class="menu-remove" href="">Delete Post</a></li>
            </ul>
          </div>
        </div>

        <div class="content-main">
          <img :src="require('../../../server/uploads/' + postData.imagePath)">
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "userPost",
  data(){
    return {

      postData: {},
      username: {},
    }
  },
  beforeMount(){
    axios.get('http://localhost:3000/user/getPost/' + this.$route.params.username + '&' + this.$route.params.id)
      .then((res) =>{
        this.postData = res.data.allPosts[0];
        this.userData = res.data;
        console.log(this.postData);
      })
      .catch((err) =>{
        console.log(err);
      })
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  }
}
</script>

<style scoped>
.user-post-main {
  display: flex;
  margin: 0 auto;
  justify-content: center;

}
.user-post {
  display: flex;
  flex-direction: column;
  width: 750px;
  min-height: 500px; 
  max-height: 750px; 
  margin-bottom: 25px;
  padding: 25px;
  background-color: #fff;
  border-radius: 25px;
}

.top-main {
  display: flex;
}

.post-title {
  margin: 0 0 0 10px;
  padding: 5px 0;
  /* display: flex; */
}

/* 
.post-title > div {
  align-items: stretch;
  margin-top: auto;
} */

#userPic {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  object-fit: cover;
}


#postTitle {
  display: flex;
  /* margin-top: auto; */
}

.content-main {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 75%;
}

/* @ DROPDOWN */
.dropdown-main {
  position: relative;
  margin-left: auto;
  /* margin-right: 15px; */
}

.toggle-menu {
  background: none;
  color: black;
    /* color: var(--font-color); */
  font-size: 35px;
  font-family: Arial;
  border: none;
}

.toggle-menu:focus {
  outline: none;
}

.menu-list {
    margin: -45px 0 0 90px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    background: white;
    left: 0px;
    list-style: none;
    border-radius: 10px;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s ;
    transform: translateY(-40px);
}

.menu-button, .menu-report, .menu-remove {
    width: 100%;
    height: 100%;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    transition: all 0.2s ease;
    text-decoration: none;
} .menu-button a {
    padding: 10px;
} .menu-report:hover {
    background-color: rgb(255, 251, 57);
} .menu-remove:hover{
    background-color: rgb(255, 57, 57);
  }

.toggle-menu:focus + .menu-list, .menu-list:hover {
    opacity: 1;
    pointer-events: all;
    transform: translateY(-5px);
}
</style>