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
            <input id="forumTopic" class="form-control" type="text" v-model="formForum.forumTitle" placeholder="Type here" required/>
            <label for="forumDescription">Forum Description</label>
            <input id="forumTopic" class="form-control" type="text" v-model="formForum.forumDescription" placeholder="Type here" required/>

            <button type="submit" class="btn btn-success">Register</button>

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
      postForm: {
        title: "",
        description: ""
      },
      userData: {},
      formForum: {
        forumTitle: '',
        forumDescription: ''
      },
    };
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
  methods: {
    createForum() {
     axios
      .get('http://localhost:3000/user/createForum', this.formForum)
      .then(forumData => {
        console.log(forumData);
      })
    },
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
