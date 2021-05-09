<template>
  <div v-if="postData != null">
    <current-profile hidden @dataChanges="fetchData"></current-profile>
    <h1 style="text-align:center; margin: 25px;">Post view for {{postData.postTitle}}</h1>
    <div class="user-post-main">
    
    <div id="forumView">
        <span><b>Forum:</b> <router-link :to="'/forums/' + postData.forum">{{postData.forum}}</router-link></span>
    </div>
      <div class="user-post">
        <div class="top-main">
          <router-link :to="'../' + this.userData.username">
            <img v-if="userData.profilePath != null" id='userPic' :src="require('../../../server/uploads/' + userData.profilePath)">
          </router-link>
          <div class="post-title flex-column">
            <router-link id="username" :to="'../' + this.userData.username"> {{ userData.username }}</router-link>
            <div class="flex-column">
              <h4 id="postTitle" style="display: flex;" >{{ postData.postTitle }}</h4>
              <h5>{{postData.description}}</h5>
            </div>
          </div>
          <div class="dropdown-main">
            <button class="toggle-menu">···</button>
            <ul class="menu-list">
              <li class="menu-button"><button class="menu-report" @click="reportPost(postData.postId)">Report Post</button></li>
              <li v-if="postData.username == user.data.displayName || currentUser.isAdmin" class="menu-button"><button class="menu-remove" @click="deletePost(postData.postId)">Delete Post</button></li>
            </ul>
          </div>
        </div>

        <div v-if="postData.imagePath" class="content-main">
          <img :src="require('../../../server/uploads/' + postData.imagePath)">
        </div>
        
        <div class="bottom-main">
          <div class="like-main" v-if="isLiked">
            <button @click='dislike' class="btn-like flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
              </svg>
              <p class="like-count">Like {{likesLength}}</p>
            </button>
          </div>

          <div class="unlike-main" v-else>
            <button @click='like' class="btn-unlike flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
              </svg> 
              <p class="like-count">Like {{likesLength}}</p>
            </button>
          </div>
          <!-- Toggle Comment -->
          <div class="comment-main">
            <button @click="toggleForm" class="btn-comment">Comment {{postData.commentCount}}</button>
          </div>

        </div>
        <div class="comments-main">
          <vue-slide-up-down :active="showCommentForm">
            <div>
              <form enctype="multipart/form-data" ref="addPost" @submit.prevent="comment">
                <div class="col-md-16 p-2 px-4" style="display: flex;">
                  <textarea ref="commentArea" @input='resize($event)' id="comment" @keyup.enter="comment" v-model="commentForm.commentDescription" placeholder="Write your comment Here :]"></textarea>
                </div>
              </form>
            </div>
          </vue-slide-up-down>
          <div class="post-comment" v-for="comment in postData.comments" :key="comment._id">
            <div class="flex-column">
              <router-link :to="'/user/' + comment.commentedBy ">{{ comment.commentedBy }}</router-link>
              <h5 class="comment-description">{{ comment.commentDescription }}</h5>  
            </div>
            <div v-if="comment.commentedBy == user.data.displayName || currentUser.isAdmin" class="dropdown-main">
              <button class="toggle-menu">···</button>
              <ul class="menu-list">
                <li class="menu-button"><button class="menu-remove" @click="deleteComment(postData.postId, postData.forum ,comment._id, comment.commentedBy, userData.username)">Delete Comment</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 style="text-align:center; margin: 25px 0;">Post not found!</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import CurrentProfile from '../components/NavBar';

export default {
  name: "userPost",
  components: {
    CurrentProfile,
  },
  data(){
    return {
      commentForm: {
        commentDescription: '',
      },
      showCommentForm: false,
      userData: {},
      currentUser: {},
      postData: {},
      comments: {},
      username: {},
      isLiked: false,
      postLength: {},
      likesLength: {},
    }
  },
  methods: {
    toggleForm(){
      this.showCommentForm = !this.showCommentForm;
    },
    fetchData(data) {
      this.currentUser = data
    },
    reportPost(id){
      this.$router.push('/user/reportPost/' + this.$route.params.username + '&' + id + '&' + this.postData.forum);
    },
    resize(e){
      e.target.style.height = '38px'; //@ Idk what's with javascript but this was the best short lazy way and I still don't know why it works.
                                      //@ ok found it it offsets the hight of the element because of the borders, try removing them completly.
      e.target.style.height = (e.target.scrollHeight) + 'px' ;
    },
    async comment(e){
      // console.log(e);
      if (e.keyCode === 13 && !e.shiftKey || e.type == 'click') {
        e.preventDefault();
        // console.log("submit"),
        const obj = {
          commentedBy: this.user.data.displayName,
          forumTopic: this.postData.forum,
          commentDescription: this.commentForm.commentDescription
        };
        // console.log(obj);
        axios.post('http://localhost:3000/user/comment/' + this.$route.params.username + "&" + this.postData.postId , obj)
          .then(res =>{
            console.log(res.data);
            this.postData.comments.push(res.data)
            this.commentForm.commentDescription = ''
          })
      } 
    },
    deleteComment(pId, forum, cId, commentedBy, author) {
      const obj = {
        forumTopic: forum,
        commentId: cId,
        postAuthor: author,
      }
      // console.log(pId, forum, cId, commentedBy, author)
      axios.put('http://localhost:3000/user/deleteComment/' + commentedBy + '&' + pId, obj)
      .then((newData) => {
        let index;
        // console.log(newData);
        for (var i = 0; i < newData.data.allPosts.length; i++) {
          if(newData.data.allPosts[i].postId == this.postData.postId){
            index = i
            console.log(index)
            break;
          }
        }
        // console.log(newData.data.allPosts[0], "NEW")
        this.postData = newData.data.allPosts[index];
      })

    },
    like(){
      const obj = {
        likedBy: this.user.data.displayName,
        forumTopic: this.postData.forum
      }
      axios.put('http://localhost:3000/user/like/'+ this.$route.params.username + "&" + this.postData.postId , obj)
        .then(res => {
          console.log(res.data, " newDATA")
          let index;

          for (var i = 0; i < res.data.allPosts.length; i++) {
            if(res.data.allPosts[i].postId == this.postData.postId){
              index = i
              break;
            }
          }

          this.postData = res.data.allPosts[index];
          console.log(this.postData, " NewPost")
          this.likesLength = this.postData.likes.length;

          for (let index = 0; index < this.likesLength; index++) {
            if(this.user.data.displayName == this.postData.likes[index].likedBy) {
              this.isLiked = true
              break;
            }        
          }
        })
    },
    dislike(){
      console.log("dislike")
      const obj = {
        likedBy: this.currentUser.username,
        forumTopic: this.postData.forum
      }
      // console.log(obj)
      axios.put('http://localhost:3000/user/unlike/'+ this.$route.params.username + "&"+ this.postData.postId, obj)
        .then(res => {
          let index;

          for (var i = 0; i < res.data.allPosts.length; i++) {
            if(res.data.allPosts[i].postId == this.postData.postId){
              index = i
              break;
            }
          }
          this.postData = res.data.allPosts[index];
          this.likesLength = this.postData.likes.length;
          console.log(this.postData)
          this.isLiked = false
        })
    },
    async deletePost(id) {
      await axios.delete('http://localhost:3000/user/deletePost/' + this.$route.params.username + '&' + id)
      .then(async () => {
        await this.$swal({
          title: 'Post Deleted',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          // timerProgressBar: true
        }).then(() => {
            this.$router.push('../../forums/' + this.postData.forum)
        })
      })
    }
  },
  beforeMount(){
    axios.get('http://localhost:3000/user/getPost/' + this.$route.params.username + '&' + this.$route.params.postId)
      .then((res) =>{
        // console.log(res);
        if(res.data.length == "") {
          console.log("Not Found!");
          this.postData = null;
        } else {
          this.postData = res.data.allPosts[0];
          this.userData = res.data;
          this.likesLength = this.postData.likes.length;
          // console.log(this.postData, " postData");
          console.log(res, "Current Post/postData");
          for (let index = 0; index < this.likesLength; index++) {
            if(this.user.data.displayName == this.postData.likes[index].likedBy) {
              this.isLiked = true
              break;
              }        
          }
          console.log(this.isLiked)
        }
      })
      .catch((err) =>{
        console.log(err);
      })
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  }
}
</script>

<style scoped>
#forumView {
  background:white;
  padding: 5px;
  margin: 5px;
  border-radius: 25px;
  width: fit-content;
  transition: all 0.4s ease-out;
  will-change: transform;
  cursor: pointer;
} #forumView:hover {
  transition: all 0.2s ease-in-out;
  transform: translateY(-5px);
} #forumView a {
  color: black;
}
.user-post-main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  /* width: fit-content; */
  width: 750px;
  margin: 0 auto;
}
.user-post-main span {
  padding: 5px;
}
.user-post {
  /* width: 750px; */
  /* max-width:100%; */
  max-width: 750px;
  min-width: auto;
  height: auto;
  margin-bottom: 25px;
  background-color: #fff;
  border-radius: 25px;
}

.top-main {
  padding: 15px 20px 0;
  display: flex;
}

.post-title {
  margin: 0 0 0 10px;
  padding: 5px 0;
  word-break: break-all;
}


#userPic {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  object-fit: cover;
}

#postTitle {
  display: flex;
}

.content-main {
  display: flex;
  justify-content: center;
  /* height: 603px; */
  max-height: 603px;
  /* max-height: calc(100% - 125px - 44px); */
} 
.content-main img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  height: auto;
}

.bottom-main {
  display: flex;
  justify-content: center;
  padding: 5px 0;
}

.like-main, .unlike-main, .comment-main {
  margin: 5px 5px;
  transition: all 0.2s;
}

.like-main:hover, .unlike-main:hover, .comment-main:hover {
  background: rgba(93, 93, 93, 0.39);
  border-radius: 10px;
}

.btn-unlike, .btn-like, .btn-comment {
  width: 100%;
  height: 100%;
  padding: 5px;
  background: none;
  color: black;
  font-family: Arial;
  border: none;
}

.like-count {
  margin: 0 5px;
}

.btn-like {
  align-items: center;
  clear: both;
} .btn-unlike {
  align-items: center;
  clear: both;
}

.like-count {
  clear: both;
  margin-top: 0;
  margin-bottom: 0;
}

#comment {
  width: 100%;
  height: 34px;
  padding: 3px 5px;
  resize: none;
  overflow: hidden;
  outline: none;
  border: 2px solid;
  border-color: dimgray;
  box-sizing: border-box;
}

.comments-main > .post-comment:last-child:focus-within .menu-list {
  background-color: black;
  transform: translateY(-20px);
}

/* For Future Refference it's a good way to select an inner last element of a child */
/* .comments-main > .post-comment:last-child:focus-within .menu-list {
  background-color: black;
  transform: translateY(-127px);
} */

.post-comment {
  padding: 10px 15px;
  margin: 10px 20px;
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: rgba(100, 170, 143, 0.15);
  border-radius: 20px;
} .post-comment a{
  color: black;
  text-decoration: none;
} .comment-description {
  white-space: pre-line;
  word-break: break-all;
}

/* DROPDOWN */
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

button:focus {
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
    transform: translateY(-40px);
    /* transform: translateX(); */
}

.menu-button, .menu-report, .menu-remove {
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
} .menu-button button {
    padding: 10px;
} .menu-report:hover {
    background-color: rgb(255, 251, 57);
} .menu-remove:hover{
    background-color: rgb(255, 57, 57);
  }

.toggle-menu:focus + .menu-list, .menu-list:hover {
    opacity: 1;
    pointer-events: all;
    transform: translateY(-5px);
}
@media screen and (max-width: 1032px){
  .toggle-menu:focus + .menu-list, .menu-list:hover {
    opacity: 1;
    pointer-events: all;
    transform: translate(-150px, 50px);
  }
}

@media screen and (max-width: 767px) {
  .user-post-main {
    width: 100%;
    padding: 0 5px;
  }
  
}
</style>