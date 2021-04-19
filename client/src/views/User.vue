<template>
  <div class="user-profile-container">

    <div @click="toggleProfile" class="profile">
      <img v-if="userData.profilePath != null" id="profilePic" :src="require('../../../server/uploads/' + userData.profilePath)">
      <div class="change-profile-main">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="changeProfile bi bi-person-bounding-box" viewBox="0 0 16 16">
          <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        </svg>
      </div>
      <div class="test">

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

          <div class="submit-photo" v-if="userData.profilePath === null">
            <button @click='selectFile' type="submit" ref="submit" class="btn btn-outline-success">Create Profile Picture</button>
            <button @click.prevent='profileTrigger' class="btn btn-outline-dark">This aint it chief</button>
          </div>
          <div class="submit-photo" v-else>
            <button type="submit" ref="submit" class="btn btn-outline-success">yee</button>
            <button @click.prevent='profileTrigger' class="btn btn-outline-dark">Change Profile</button>
            <input hidden id="forum-Description" class="form-control" type="file" @change="selectFile" ref='file' name='file'/>
          </div>
        </form>
      </div>
    </div>

    <div v-if="userData.allPosts.length != 0" class="all-posts-main">
      <div v-for="post in userData.allPosts" :key="post.postId">
        <div v-if="post.length != 0">
          <div>
            <img :src="require('../../../server/uploads/' + userData.profilePath)">
            <div>
              <h2>{{ post.postTitle }}</h2>
              <p>{{ post.forum }}</p>
            </div>
          </div>
        <h3> {{ post.description }}</h3>
        
        <img width="250px" :src="require('../../../server/uploads/' + post.imagePath)">
        </div>
        <div v-else><h1>Hurr Durr</h1></div>
      </div>
    </div>
    <div v-else><h1>Hurr Durr</h1></div>

    <!-- <div>
      <h2>{{ userData.isAdmin }}</h2>
    </div> -->
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
      file: '',
      url: null,
      postForm: {
        profilePath: '',
        username: '',
      }
    };
  },
  methods: {
    changeProfile() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        axios.post('http://localhost:3000/user/profilePic', formData)
          .then(res => {
            this.postForm.profilePath = res.data.file.filename;
            this.postForm.username = this.user.data.displayName
            // console.log(this.postForm);
            axios.patch('http://localhost:3000/user/addProfile', this.postForm)

            // @ This forces a refresh so that you'll see the change in the profile
            window.location = "/user/" + this.user.data.displayName;
          })
      } catch(err) {
        console.log(err);
      }
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
    toggleProfile() {
      this.reveal = !this.reveal;
      // this.$refs.file.click();
    }
  },
  created() {
    // const username = this.usernameURI.replace(" ", "%20")
    // console.log(username);
    // console.log(this.usernameURI)
    
    axios
      .get("http://localhost:3000/user/" + this.username)
      .then(res => (this.userData = res.data));

    // console.log(this.res)
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
  /* position:absolute; */
  /* width: calc(100% + 150px); */
  height: 100%;
  object-fit: fill;
}


.new-profile-main {
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

</style>
