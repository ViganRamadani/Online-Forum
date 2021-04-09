<template>
  <div class="home">
    <div class="postContainerMain">
      <form enctype="multipart/form-data" ref="addPost" @submit.prevent="addPost">
        <h2>Create a Post here!</h2>
          <div class="col-md-2 p-2">
            <input id="title" class="form-control" type="text" v-model="postForm.title" placeholder="Title" value autofocus />
          </div>
        <div class="col-md-2 p-2">
          <input id="description" class="form-control" type="text" v-model="postForm.description" placeholder="Description"/>
        </div>
        <div class="col-md-2 p-2">
          <input type="file" @change="selectFile" ref="file" name="file" id="input-files" class="form-control-file border"/>
        </div>
        <button class="btn btn-primary" type="submit">Add post</button>
      </form>
      <!-- <img :src="require('../../../backend/uploads/' + this.articlePost.imagePath)"> -->
      <!-- <img src="../../../server/uploads/61ef229bca4912ed8464fc37bd4268eb.jpg" alt="test"> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "firebase/auth";
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  name: "Home",
  data() {
    return {
      file: '',
      postForm: {
        title: '',
        description: '',
        imagePath: '',
      },
      userData: {},
    };
  },
  methods: {
    async addPost() {
      const formData = new FormData();
      formData.append('file', this.file);
        try{
          // console.log(this.file);
          axios.post("http://localhost:3000/user/user/addImage", formData)
            .then(res => {
              this.postForm.imagePath = res.data.file.filename;
              axios.post("http://localhost:3000/user/addPost", this.postForm)
            })
        } catch(err){
          console.log(err);
        }
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    }
  },
  created() {
    // axios.get("http://localhost:3000/user/getPost")
  },
  computed: {
    ...mapGetters({
        // map `this.user` to `this.$store.getters.user`
        user: "user",
      }),
  },
  
};
</script>
