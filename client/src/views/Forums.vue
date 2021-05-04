<template>
  <div>
    <current-profile hidden @dataChanges="fetchData"></current-profile>
    <div class="forum-main">
      <div class="forum" v-for="item in forumData" :key="item._id">
        <img :src="require('../../../server/uploads/' + item.imagePath)" />

        <div class="forum-details">
          <h1>{{ forumTopic }}</h1>
          <p>{{ item.forumDescription }}</p>
        </div>
      </div>
    </div>
    <div class="posts-main">
      <div class="new-post">
        <button @click="toggleForm" class="btn create-post">Create a post</button>
      </div>
      <hr />

      <vue-slide-up-down :active="active">
        <div>
          <h2>Create a Post here!</h2>
          <form enctype="multipart/form-data" ref="addPost" @submit.prevent="addPost">
            <div class="col-md-2 p-2">
              <input id="title" class="form-control" type="text" v-model="postForm.title" placeholder="Title" autofocus/>
            </div>
            <div class="col-md-2 p-2">
              <!-- <textarea > </textarea> -->
              <input id="description" class="form-control" type="text" v-model="postForm.description" placeholder="Description"/>
            </div>
            <div class="col-md-2 p-2">
              <input type="file" @change="selectFile" ref="file" name="file" id="input-files" class="form-control-file border"/>
            </div>
            <button class="btn btn-primary" type="submit">Add post</button>
            <hr>
          </form>
        </div>
      </vue-slide-up-down>

      <div v-for="posts in forumData" :key="posts._id">
        <div v-if="posts.allPosts.length !== 0">
          <!-- Checks if there's any posts in the array -->
          <div v-for="post in posts.allPosts" :key="post._id">
            <div class="all-posts">
              <div>
                <router-link class="author" :to="'../user/' + post.author">{{ post.author }}</router-link>
                <router-link class="title" :to="'../user/post/' + post.author + '&' + post._id"><h4>{{ post.title }}</h4></router-link>
              </div>

              <div class="dropdown-main">
                <button class="toggle-menu">···</button>
                <ul class="menu-list">
                  <li  class="menu-button">
                    <button class="menu-report" @click="reportPost(post.author, post._id, forumTopic)">Report Post</button>
                  </li>
                  <li v-if="post.author == user.data.displayName || currentUser.isAdmin" class="menu-button">
                    <button class="menu-remove" @click="deletePost(post.author, post._id)">Delete Post</button>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div v-else>
          <h1>No posts yet D:</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import CurrentProfile from '../components/NavBar';

export default {
  name: "forums",
  components: {
    CurrentProfile
  },
  data() {
    return {
      active: false,
      forumData: {},
      currentUser: {},
      forumTopic: this.$route.params.id,
      file: '',
      postForm: {
        title: '',
        description: '',
        imagePath: '',
        author: '',
      },
      formData: '',
    };
  },
  methods: {
    async fetchData(data) {
      this.currentUser = await data
    },
    async addPost() {
        try{
          // console.log(this.file);
          // console.log(this.formData);
          if(this.formData == '') {
            console.log(this.formData, "is undefined");
            this.postForm.author = this.user.data.displayName,
            await axios.post("http://localhost:3000/user/addPost/" + this.forumTopic, this.postForm)
              .then(async () => {
                axios.get("http://localhost:3000/user/getForumPosts/"+ this.forumTopic)
                .then(newData => {
                  this.forumData = newData.data;
                  console.log(this.forumData);
                })
              })
          } else {
            console.log(this.formData, "defined");
            await axios.post("http://localhost:3000/user/user/addImage", this.formData)
            .then(async res => {
              this.postForm.imagePath = await res.data.file.filename;
              //* This is a workaround to assign the Current User to the author propperty, since it was throwing errors above
              this.postForm.author = this.user.data.displayName,
              await axios.post("http://localhost:3000/user/addPost/" + this.forumTopic, this.postForm)
            }).then(async() => {
              await axios.get("http://localhost:3000/user/getForumPosts/"+ this.forumTopic)
                .then(async newData => {
                  this.forumData = await newData.data;
                  console.log(this.forumData);
                })
            })
          }
          
        } catch(err){
          console.log(err);
        }
    },
    toggleForm(){
      this.active = !this.active;
    },
    selectFile() {
      this.file = this.$refs.file.files[0];

      // const formData = new FormData();
      this.formData = new FormData();
      this.formData.append('file', this.file);
    },
    reportPost(author, postId){
      this.$router.push('/user/reportPost/' + author + '&' + postId + '&' + this.forumTopic);
    },
    async deletePost(author, postId) {
      // console.log(postId);
      // console.log(author, postId);
      await axios.delete('http://localhost:3000/user/deletePost/' + author + '&' + postId)
      .then(async () => {
        await axios.get('http://localhost:3000/user/getForumPosts/'+ this.forumTopic)
          .then(async newData => {
            this.forumData = await newData.data;
            // console.log(this.forumData);
          })
        .then(() => {
             this.$swal({
            title: 'Post Deleted',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            // timerProgressBar: true
          })
        })
      })
    },
  },
  created() {
    axios.get("http://localhost:3000/user/getForumPosts/"+ this.forumTopic)
      .then(res => {
        if(res.data.length == 0){
          this.$router.push("/")
          
          this.$swal({
            icon: 'error',
            title: `Oopsie Daisy... :D`,
            text: `Could not find ${this.forumTopic}`,
            footer: ` <div style="display: flex; flex-direction:column; text-align: center;">
                        <h6>It may seem that the forum does not exist.</h6>
                        <h5>Please contact the administration if you think this was wrong.</h5>
                      </div>
                    `
          })
        }
        this.forumData = res.data;
        console.log(res.data);
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
  }
}
</script>

<style scoped>
router-link,
a {
  color: #000;
}
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
  width: 75%;
  height: 250px;
  overflow: hidden;
}
.forum img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  /* transform: translateY(-20%); */
  animation: move 5s forwards 0.5s;
}

@keyframes move {
  100% {
    object-position: 0 var(--objPosition);
  }
}

.forum-details {
  position: absolute;
  top: 0%; /* Adjust this value to move the positioned div up and down */
  text-align: center;
  background: rgba(0, 0, 0, 0.452);
  font-family: Arial, sans-serif;
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
  padding: 25px;
  margin: 0 auto;
  margin-top: 25px;
  width: 75%;
}

.new-post {
  display: flex;
  /* justify-content: flex-end; */
}

.create-post {
  margin-left: auto;
  background-color: hsl(0, 100%, 67%);
  color: #fff;
  transition: all 0.4s;
}
.create-post:hover {
  color: #fff;
  background-color: hsl(0, 70%, 59%);
}

.all-posts {
  display: flex;
}

.author {
  color: #000;
}

/* @ DROPDOWN */
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
  transition: all 0.4s;
  transform: translateY(-65px);
}

.menu-button,
.menu-report,
.menu-remove {
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
}
.menu-button button {
  padding: 10px;
}
.menu-report:hover {
  background-color: rgb(255, 251, 57);
}
.menu-remove:hover {
  background-color: rgb(255, 57, 57);
}

.toggle-menu:focus + .menu-list,
.menu-list:hover {
  opacity: 1;
  pointer-events: all;
  transform: translateY(-50px);
}
.posts-main hr {
  border-top: 1px solid black;
}
</style>