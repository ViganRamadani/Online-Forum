<template>
  <div class="user-profile-container">
    <div @click="reveal = !reveal" class="profile">
      <img v-if="userData.profilePath" id="profilePic" :src="require('../../../server/uploads/' + userData.profilePath)">
      <div class="change-profile-main">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="changeProfile bi bi-person-bounding-box" viewBox="0 0 16 16">
          <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        </svg>
      </div>
    </div>

    <div @click="reveal = !reveal" v-show="reveal" class="new-profile-main">
      <div class="profile-containter">
        <form @submit.prevent='changeProfile'>
          <p style='text-align: center;'>Profile Preview Settings</p>
          
          <div v-if="!url" class="current-profile">
            <img v-if="userData.profilePath" id="currentProfilePic" :src="require('../../../server/uploads/' + userData.profilePath)">
          </div>

          <div v-else class="new-profile">
            <img :src="url" alt="New Profile Pic">
          </div>

          <div v-if="!userData.profilePath" class="submit-photo" >
            <button v-if="!url" @click.prevent='profileTrigger' type="submit" ref="submit" class="btn btn-outline-success">Select Profile Picture</button>
            <button v-if="url" type="submit" ref="submit" class="btn btn-outline-success">Create Profile Picture</button>
            <button v-if="url" @click.prevent='profileTrigger' class="btn btn-outline-dark">This aint it chief</button>
            <input hidden id="forum-Description" class="form-control" type="file" @change="selectFile" ref='file' name='file'/>
          </div>

          <div v-else class="submit-photo" >
            <button type="submit" ref="submit" class="btn btn-outline-success">yee</button>
            <button @click.prevent='profileTrigger' class="btn btn-outline-dark">Change Profile</button>
            <input hidden id="forum-Description" class="form-control" type="file" @change="selectFile" ref='file' name='file'/>
          </div>
        </form>
      </div>
    </div>
    <!-- <h1 style="text-align:center; margin: 25px 0;">{{postLength}}</h1> -->
    <div v-if="postLength != 0" class="all-posts-main">
      <div class="post" v-for="post in userData.allPosts" :key="post.postId">
          <div class="flex-row top-main">
            <router-link class="username" :to="userData.username">
              <img class="postProfile" v-if="userData.profilePath" :src="require('../../../server/uploads/' + userData.profilePath)">
            </router-link>
            <div class="flex-column">
              <h2>{{ post.postTitle }}</h2>
              <h3> {{ post.description }}</h3>
              <!-- <p>{{ post.forum }}</p> -->
            </div>
            <div class="dropdown-main">
              <button class="toggle-menu">···</button>
              <ul class="menu-list">
                <li class="menu-button"><button class="menu-report" @click="reportPost(post.postId)">Report Post</button></li>
                <li class="menu-button"><button class="menu-remove" @click="deletePost(post.postId)">Delete Post</button></li>
              </ul>
            </div>
          </div>
          <div class="content-main">
            <img :src="require('../../../server/uploads/' + post.imagePath)">
          </div>
          <div class="bottom-main">
            <button class="btn">Like</button>
            <button class="btn">Comment</button>
          </div>
      </div>
    </div>
    <div v-else ><h1 style="text-align:center; margin: 25px 0;">Hurr Durr</h1></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      reveal: false,
      username: this.$route.params.username,
      userData: {},
      postLength: {},
      file: '',
      url: null,
      postForm: {
        profilePath: '',
        username: '',
      }
    };
  },
  methods: {
    async changeProfile() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await axios.post('http://localhost:3000/user/profilePic', formData)
          .then(async res => {
            this.postForm.profilePath = res.data.file.filename;
            this.postForm.username = this.user.data.displayName
            // console.log(this.postForm);
            await axios.patch('http://localhost:3000/user/addProfile', this.postForm)

            // @ This forces a refresh so that you'll see the change in the profile
            // window.location = "/user/" + this.user.data.displayName;
            window.location.reload();
          })
      } catch(err) {
        console.log(err);
      }
    },
    reportPost(id){
      this.$router.push('/user/reportPost/' + this.$route.params.username + '&' + id);
    },
    async deletePost(id) {
      await axios.delete('http://localhost:3000/user/deletePost/' + this.$route.params.username + '&' + id)
      .then(async () => {
        await this.$swal({
          title: 'Post Deleted',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          // timerProgressBar: true
        }),
        await axios
        .get("http://localhost:3000/user/" + this.username)
        .then(async res => {
          this.userData = await res.data
          this.postLength = this.userData.allPosts.length
        });
      })
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      // console.log(this.file)
      // To preview the file
      const filePreview = this.$refs.file.files[0];
      this.url = URL.createObjectURL(filePreview);
    },
    profileTrigger() {
      this.$refs.file.click()
      this.currentProfile = !this.currentProfile;
      this.newProfile = !this.newProfile;
    },
  },
  async created() {
    await axios
      .get("http://localhost:3000/user/" + this.username)
      .then(async res => {
        this.userData = await res.data
        this.postLength = this.userData.allPosts.length
      });
    // console.log(this.userData);
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  }
};
</script>

<style scoped>
.user-profile-container {
  position: relative;
}

.profile {
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 2px solid gray;
  justify-content: center;  
  align-items: center;
  overflow: hidden;
  transition: all 0.8s;
  cursor: pointer;
}
.test {
  position:absolute;
  width: 100%;
  height: 100%;
  transition: all 0.8s;

}
.profile:hover .test {
  background-color: rgba(0, 0, 0, 0.192);
}

.profile:hover .changeProfile  {
  width: 75px;
  opacity: 100%;
}

#profilePic {
  height: -webkit-fill-available;
  width: auto;
  object-fit: fill;
}


.new-profile-main {
  z-index: 0;
  position:absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: calc(100vh - 77px);
  background-color: rgba(109, 109, 109, 0.15);
  top: 0;
}
.profile-containter {
  z-index: 5;
  width: 600px;
  height: 700px; 
  padding: 25px; 
  margin: 0 auto;
  background-color: #fff;
  border-radius: 25px;
}

.profile-containter form {
  width: auto;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.new-profile, .current-profile {
  display: flex;
  width: auto;
  height: 85%;
  margin-bottom: 25px;
} .new-profile img, #currentProfilePic{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.submit-photo {
  display: flex;
  justify-content: center;
}

.submit-photo button {
  margin: 0 10px;
  border: none;

}
.changeProfile {
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 50px;
  opacity: 0;
  transition: all 0.5s;
}

.all-posts-main {
  display: flex;
  width: fit-content;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;

}

.post {
  display: flex;
  flex-direction: column;
  width: 750px;
  height: 100%;
  margin-bottom: 25px;
  padding: 25px;
  background-color: #fff;
  border-radius: 25px;
}

.top-main {
  display: flex;
  
}

.postProfile {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.content-main {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 75%;
} .content-main > img {
  width: 100%;
}

.bottom-main {
  display: flex;
  justify-content: center;
}
.bottom-main button {
  margin: 5px;
}

/* DROPDOWN */
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
    background-color: white;
    border: none;
    color: black;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    font-size: 25px;
    transition: all 0.2s ease;
    text-decoration: none;
} .menu-button button {
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
