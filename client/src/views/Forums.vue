<template>
  <div>
    <div  class="forum-main">
      <div class="forum" v-for="item in forumData" :key="item._id">
        <img :src="require('../../../server/uploads/' + item.imagePath)">
        
        <div class="forum-details">
          <h1>{{ forumTopic }}</h1>
          <p>{{ item.forumDescription }}</p>
        </div>
      </div>
    </div>

    

    <div  class="posts-main">
      <div class="new-post">
        <button @click='toggleForm' class="btn create-post">Create a post</button>
      </div>
      <hr>

      <vue-slide-up-down :active="active">
        <form enctype="multipart/form-data" ref="addPost" @submit="addPost">
          <h2>Create a Post here!</h2>
            <div class="col-md-2 p-2">
              <input id="title" class="form-control" type="text" v-model="postForm.title" placeholder="Title" autofocus />
            </div>
          <div class="col-md-2 p-2">
            <input id="description" class="form-control" type="text" v-model="postForm.description" placeholder="Description"/>
          </div>
          <div class="col-md-2 p-2">
            <input type="file" @change="selectFile" ref="file" name="file" id="input-files" class="form-control-file border"/>
          </div>
          <button class="btn btn-primary" type="submit">Add post</button>
        <hr>
        </form>
      </vue-slide-up-down>

        <div v-for="posts in forumData" :key="posts._id">
          <div v-if="posts.allPosts.length !== 0" > <!-- Checks if there's any posts in the array -->
            <div class="flex-column" v-for="post in posts.allPosts" :key="post._id">
              <div class="all-posts" >
                <div class="flex-column">
                  <router-link class="author" :to="'../user/' + post.author">{{ post.author }}</router-link>
                  <router-link class="title" :to="'../user/post/' + post.author + '&' + post._id"><h4>{{ post.title }}</h4></router-link>
                </div>
                
                <div class="dropdown-main">
                  <button class="toggle-menu">···</button>
                  <ul class="menu-list">
                    <li class="menu-button"><a class="menu-report" :href="post._id">Report Post</a></li>
                    <li class="menu-button"><a class="menu-remove" href="">Delete Post</a></li>
                  </ul>
                </div>
              </div>
              <hr>
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

export default {
  name: "Forums",
  data() {
    return {
      active: false,
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
              // * This is a workaround to assign the Current User to the author propperty, since it was throwing errors above
              this.postForm.author = this.user.data.displayName,
              axios.post("http://localhost:3000/user/addPost/" + this.forumTopic, this.postForm)
            })
        } catch(err){
          console.log(err);
        }
    },
    toggleForm(){
      this.active = !this.active;
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    }
  },
  created() {
    axios.get("http://localhost:3000/user/getForumPosts/"+ this.forumTopic)
      .then(res => {
        this.forumData = res.data;
        // console.log(this.forumData);
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
router-link, a {
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
.forum  img {
  width: 100%;
  height: 100%; 
  object-fit: cover;
  object-position: top;
  /* transform: translateY(-20%); */
  animation: move 5s forwards 0.5s;
}

@keyframes move {
  100% {
    object-position: 0 -1025px;
  }
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
  transition: all 0.4s ;
} .create-post:hover {
  color: #fff;
  background-color: hsl(0, 70%, 59%);
}

.all-posts {
  display: flex;
}

.author {
  color: #000;
}

.dropdown-main {
  position: relative;
  margin-left: auto;
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
    transition: all 0.4s ;
    transform: translateY(-65px);
}

.menu-button, .menu-report, .menu-remove {
    width: 100%;
    height: 100%;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    transition: all 0.2s ease;
    text-decoration: none;
} .menu-button a {
    padding: 10px;
} .menu-report:hover {
    background-color: rgb(255, 251, 57);
} .menu-remove:hover{
    background-color: rgb(255, 57, 57);
  }

.toggle-menu:focus + .menu-list, .menu-list:hover {
    opacity: 1;
    pointer-events: all;
    transform: translateY(-50px);
}
.posts-main hr {
  border-top: 1px solid black;
}


</style>