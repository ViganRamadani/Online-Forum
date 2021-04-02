<template>
  <div>
    <h1>Admin</h1>
      <h4>Hello World</h4>
      <h1>{{ user.data.displayName }} </h1>
      <h1> {{ user }} </h1>
      <h1>{{ user.uid }}</h1> 
      
      <form @submit.prevent="addPost">
        <div class="col-md-6">
          <input id="title" type="text" class="form-control" v-model="postForm.title" placeholder="title" value required autofocus />
        </div>
      <div class="col-md-6">
        <input type="text" v-model="postForm.description" placeholder="description" />
      </div>
      <button type="submit">Add post</button>
      </form>
      <br>
      <div v-if="userData.length !== 0">
        <div v-for="user in userData" :key="user._id">
          <!-- <p>{{ user }}</p> -->
          <h1>{{ user.username }}</h1>
          <h2>{{ user.email }}</h2>
        </div>

      </div>
      <div v-else>
        <p>No users yeet.</p>
      </div>
      
      <!-- <p>{{userData}}</p> -->

  </div>
</template>

<script>
import "firebase/auth";
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  name: "admin",
  data() {
    return {
      postForm: {
        title: '',
        description: '',
      },
      userData: {},
      // user: 'erfsf',
      // secrets: "",
    };
  },
  created() {
    axios
      .get('http://localhost:3000/user/allUsers')
      .then(respose => ( this.userData = respose.data ))
      console.log(this.userData)
  },
  computed: {
    ...mapGetters({
        // map `this.user` to `this.$store.getters.user`
        user: "user",
      }),
  },
  methods: {
    addPost() {
      axios.post("http://localhost:3000/user/addPost", this.postForm)
      this.$router.push("/")      
    }
  }
};
</script>

<style>

</style>