<template>
  <div>
    <div class="forum-main">
      <div class="forum" v-for="item in forumData" :key="item._id">
        <img :src="require('../../../server/uploads/' + item.imagePath)">
        
        <div class="forum-details">
          <h1> {{ forumTopic }}</h1>
          <p> {{ item.forumDescription }} </p>
        </div>
      </div>
    </div>

    <div class="posts-main">
      <div v-for="posts in forumData" :key="posts._id">
        <div v-for="post in posts.allPosts" :key="post._id">
          <p id="author">{{ post.author }}</p>
          <h4 id="title">{{ post.title }}</h4>
        </div>
      </div>
    </div>

    <!-- <form enctype="multipart/form-data" ref="addPost" @submit.prevent="addPost">
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
    </form> -->
    <!-- <p>{{ forumData }}</p> -->

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Forums",
  data() {
    return {
      forumData: {},
      forumTopic: this.$route.params.id,
      file: '',
      postForm: {
        title: '',
        description: '',
        imagePath: '',
        author: '',
      },
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
              // * This is a workaround to assign the Current User to the author propperty, since it was throwing errors
              this.postForm.author = this.user.data.displayName,
              axios.post("http://localhost:3000/user/addPost/" + this.forumTopic, this.postForm)
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
    axios.get("http://localhost:3000/user/getForumPosts/"+ this.forumTopic)
      .then(res => {
        this.forumData = res.data;
        console.log(this.forumData);
      })
  },
  computed: {
  ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),

    // currentForum() {
    //   return this.forumData.filter()
    // }
  },

}
</script>

<style scoped>
.forum-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 25px;
}

.forum {
  position: relative;
}
.forum  img {
  width: 1500px;
  height: 250px; 
  object-fit: cover;
}

.forum-details {
  position: absolute;
  top: 0%; /* Adjust this value to move the positioned div up and down */
  text-align: center;
  background: rgba(0, 0, 0, 0.452);
  font-family: Arial,sans-serif;
  color: #f1f1f1;
  width: 100%; 
  height: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
}

.posts-main {
  border: 1px solid black;
}
</style>