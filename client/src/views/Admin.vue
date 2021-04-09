<template>
  <div>
    <h1 style="text-align:center; padding: 5px;">Admin</h1>
    <div class="container">
      <div v-if="userData.length !== 0" class="users-table-main">
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

      <hr style="border: 1px solid black">
      
      <h2 style="text-align: center">Create a Forum Here :D</h2>
      <div class="forum-container-main">
        <div class="forum-container">
          <form @submit.prevent="createForum">
            <label for="forumTopic">Forum Topic</label>
            <input id="forumTopic" class="form-control" type="text" v-model="postForm.forumTitle" placeholder="Type here" required/>
            <label for="forumDescription">Forum Description</label>
            <input id="forumDescription" class="form-control" type="text" v-model="postForm.forumDescription" placeholder="Type here" required/>
            <label for="forumPicture">Select the forum topic Image</label>
            <input id="forumDescription" ref='file' name='file' class="form-control" type="file" @change="selectFile"/>
            
            <button type="submit" class="btn btn-primary">Create Forum</button>

          </form>
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
      userData: {},
      // formForum: {
      //   forumTitle: '',
      //   forumDescription: ''
      // },
      file: '',
      postForm: {
        title: "",
        description: "",
        imagePath: '',
      },
    };
  },
  methods: {
    async createForum() {
      const formData = new FormData();
      formData.append('file', this.file);
        try{
          console.log(this.file);
          axios.post("http://localhost:3000/user/admin/forumImg", formData)
            // .then(res => {
            //   this.postForm.imagePath = res.data.file.filename;
            //   axios.post("http://localhost:3000/user/createForum", this.postForm)
            // })
        } catch(err){
          console.log(err);
        }
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    }
    // createForum() {
    //  axios
    //   .get('http://localhost:3000/user/createForum', this.formForum)
    //   .then(forumData => {
    //     console.log(forumData);
    //   })
    // },
  },
  created() {
    axios
      .get('http://localhost:3000/user/allUsers')
      .then(respose => { 
        this.userData = respose.data 
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
.forum-container-main {
  display: flex;
}

.forum-container {
  width: 500px;
  margin: 0 auto;
}


button {
  margin: 10px auto;
}
</style>
