<template>
  <div class="admin-main">
    <div id="admin">
      <h1>Admin</h1>
    </div>
    <div class="container">
      <!-- && currentUser.isAdmin === true" -->
      <div v-if="userData.length !== 0"  class="users-table-main">
        <table class="table">
          <thead>
            <tr>
              <th>
                Username:
              </th>
              <th>
                Email:
              </th>
              <th>
                Is Admin:
              </th>
              <th>
                Options:
              </th>
            </tr>
          </thead>
          <tbody style="width: max-content;">
            <tr v-for="user in userData" :key="user.username">
              <td>
                <router-link :to="'user/' + user.username">{{
                  user.username
                }}</router-link>
              </td>

              <td>
                {{ user.email }}
              </td>
              <td>
                {{ user.isAdmin }}
              </td>
              <td>
                <a href="">Edit</a> |
                <router-link :to="'user/' + user.username">Details</router-link> |
                <a href="">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No users yeet.</p>
      </div>
      <hr style="border-top: 3px solid black;">
      
      <h2 style="text-align: center">Create a Forum Here :D</h2>

      <div class="forum-container-main">
        <div class="forum-container">
          <form @submit.prevent="createForum">
            <label for="forum-Topic">Forum Topic</label>
            <input id="forum-Topic" class="form-control" type="text" v-model="postForm.forumTopic" placeholder="Type here" required/>
            <label for="forum-Description">Forum Description</label>
            <input id="forum-Description" class="form-control" type="text" v-model="postForm.forumDescription" placeholder="Type here" required/>
            <label for="forum-Picture">Select the forum topic Image</label>
            <input  id="forum-Description" class="form-control" type="file" @change="selectFile" ref='file' name='file'/>
            
            <button type="submit" class="btn btn-primary">Create Forum</button>
          </form>
          
        </div>
        <div v-if="url" id="imgPreview">
            <p>Preview for the image.</p>
            <img :src="url" alt="Your Image will load here...">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "firebase/auth";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "admin",
  data() {
    return {
      url: null,
      userData: {},
      currentUser: {},
      file: '',
      postForm: {
        forumTopic: "",
        forumDescription: "",
        imagePath: '',
      },
    };
  },
  methods: {
    deleteUsers(){
        // var user = firebase.auth().currentUser;

        // user.delete().then(function() {
        //   // User deleted.
        // }).catch(function(error) {
        //   // An error happened.
        // });
    },
    async createForum() {
      const formData = new FormData();
      formData.append('file', this.file);
        try{
          // console.log(this.file);
          axios.post("http://localhost:3000/user/admin/forumImg", formData)
            .then(res => {
              this.postForm.imagePath = res.data.file.filename;
              axios.post("http://localhost:3000/user/admin/createForum", this.postForm)
            })
        } catch(err){
          console.log(err);
        }
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      // To preview the file
      const filePreview = this.$refs.file.files[0];
      this.url = URL.createObjectURL(filePreview);
    }
  },
  created() {
    axios
      .get('http://localhost:3000/user/allUsers')
      .then(res => { 
        this.userData = res.data 
      });
    axios.get('http://localhost:3000/user/' + this.user.data.displayName)
      .then(res => {
        this.currentUser = res.data
      })    
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
};
</script>

<style scoped>
#admin {
  text-align: center;
  margin: 20px 0;
} #admin h1 {
  font-weight: 600;
}

.forum-container-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.forum-container {
  width: 500px;
  padding: 5px 20px 0 20px;
  margin: 0 auto 10px;
  border: 2px solid rgb(81, 82, 81);
  border-radius: 10px;
}

button {
  margin: 10px auto;
}


#imgPreview {
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(81, 82, 81);
  border-radius: 10px;
  padding: 10px;
  width: 500px;
  margin-bottom: 25px;
}
#imgPreview p {
  margin-bottom:5px;
}

#imgPreview img {
  /* background-size: cover; */
  max-width: 100%;
  max-height: 100%;
}
</style>
