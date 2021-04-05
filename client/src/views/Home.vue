<template>
  <div class="home">
    <div class="postContainerMain">
      <form ref="addPost" @submit.prevent="addPost">
        <h2>Create a Post here!</h2>
        <div class="col-md-2 p-2">
          <input
            id="title"
            class="form-control"
            type="text"
            v-model="postForm.title"
            placeholder="Title"
            value
            required
            autofocus
          />
        </div>
        <div class="col-md-2 p-2">
          <input
            id="description"
            class="form-control"
            type="text"
            v-model="postForm.description"
            placeholder="Description"
          />
        </div>
        <button type="submit">Add post</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "firebase/auth";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Home",
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
