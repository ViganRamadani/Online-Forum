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
                Options:
              </th>
            </tr>
          </thead>
          <tbody style="width: max-content;">
            <tr v-for="user in userData" :key="user._id">
              <td>
                <router-link :to="'user/' + user._id">{{
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
                <router-link :to="'user/' + user._id">Details</router-link> |
                <a href="">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No users yeet.</p>
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
      userData: {}
      // user: 'erfsf',
      // secrets: "",
    };
  },
  created() {
    axios.get("http://localhost:3000/user/allUsers").then(respose => {
      this.userData = respose.data;
      console.log(respose);
    });
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    addPost() {
      axios.post("http://localhost:3000/user/addPost", this.postForm);
      this.$refs.addPost.reset(); // This will clear that form
      // this.$router.push("/")
    }
  }
};
</script>

<style scoped></style>
