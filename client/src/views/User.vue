<template>
  <div class="user-profile-container">
    <div @click="reveal = !reveal, change();" class="profile">
      <img v-if="userData.profilePath" id="profilePic" :src="require('../../../server/uploads/' + userData.profilePath)">
      <div class="change-profile-main">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="changeProfile bi bi-person-bounding-box" viewBox="0 0 16 16">
          <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        </svg>
      </div>
    </div>

    <div @click="reveal = !reveal, change();" v-show="reveal" class="new-profile-main">
      <div class="profile-containter">
        <form @submit.prevent='changeProfile'>
          <p style='text-align: center;'>Profile Preview Settings</p>
          
          <div v-if="!url" class="current-profile">
            <img v-if="userData.profilePath" id="currentProfilePic" :src="require('../../../server/uploads/' + userData.profilePath)">
          </div>

          <div v-else class="new-profile">
            <img :src="url" alt="New Profile Pic">
          </div>

          <div v-if="!userData.profilePath" class="submit-photo" >
            <button v-if="!url" @click.prevent='profileTrigger' type="submit" ref="submit" class="btn btn-outline-success">Select Profile Picture</button>
            <button v-if="url" type="submit" ref="submit" class="btn btn-outline-success">Create Profile Picture</button>
            <button v-if="url" @click.prevent='profileTrigger' class="btn btn-outline-dark">This aint it chief</button>
            <input hidden id="forum-Description" class="form-control" type="file" @change="selectFile" ref='file' name='file'/>
          </div>

          <div v-else class="submit-photo" >
            <button type="submit" ref="submit" class="btn btn-outline-success">yee</button>
            <button @click.prevent='profileTrigger' class="btn btn-outline-dark">Change Profile</button>
            <input hidden id="forum-Description" class="form-control" type="file" @change="selectFile" ref='file' name='file'/>
          </div>
        </form>
      </div>
    </div>
    <h1 style="text-align:center; margin: 25px 0;">Users Posts</h1>
    <div v-if="postLength != 0" class="all-posts-main">
      <div class="post" v-for="post in userData.allPosts" :key="post.postId">
          <div class="flex-row top-main">
            <router-link class="username" :to="userData.username">
              <img class="postProfile" v-if="userData.profilePath" :src="require('../../../server/uploads/' + userData.profilePath)">
            </router-link>
            <div class="flex-column px-2">
              <span >{{ post.forum }}</span>
              <h2 style="margin: 0;">{{ post.postTitle }}</h2>
              <h5> {{ post.description }}</h5>
            </div>
            <div ref="dropDownMenu" class="dropdown-main">
              <button class="toggle-menu">···</button>
              <ul class="menu-list">
                <li class="menu-button"><button class="menu-report" @click="reportPost(post.postId)">Report Post</button></li>
                <li class="menu-button"><button class="menu-remove" @click="deletePost(post.postId)">Delete Post</button></li>
              </ul>
            </div>
          </div>
          <div class="content-main" v-if="post.imagePath">
            <img :src="require('../../../server/uploads/' + post.imagePath)">
          </div>
          <div class="bottom-main">
            <div v-if="likedPosts.includes(post.postId)" class="unlike-main">
              <button @click='dislike(post.postId, post.forum)' class="btn-like flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                </svg>
                <p class="like-count">Like {{ post.likeCount }}</p>
              </button>
            </div>

            <div class="like-main" v-else>
              <button @click='like(post.postId, post.forum)' class="btn-unlike flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                </svg> 
                <p class="like-count">Like {{ post.likeCount }}</p>
              </button>
            </div>
            <!-- {{likedPosts}} -->
            <!-- Toggle Comment -->
            <div class="comment-main">
              <button @click="toggleForm" class="btn-comment">Comment {{post.commentCount}}</button>
            </div>
          </div>

          <div class="comments-main">
            <vue-slide-up-down :active="showCommentForm">
              <div>
                <form enctype="multipart/form-data" ref="addPost" @submit.prevent="comment">
                  <div class="col-md-16 p-2 px-4" style="display: flex;">
                    <textarea ref="commentArea" @input='resize($event)' id="comment" @keyup.enter="comment(post.forum, $event, post.postId);" v-model="commentForm.commentDescription" placeholder="Write your comment Here :]"></textarea>
                  </div>
                </form>
              </div>
            </vue-slide-up-down>
            <div class="post-comment" v-for="comment in post.comments" :key="comment.id">
              <div class="flex-column">
                <router-link :to="'/user/' + comment.commentedBy ">{{ comment.commentedBy }}</router-link>
                <h5 class="comment-description">{{ comment.commentDescription }}</h5>  
              </div>
              <div v-if="comment.commentedBy == user.data.displayName || userData.isAdmin" class="dropdown-main">
                <button class="toggle-menu">···</button>
                <ul class="menu-list">
                  <li class="menu-button"><button class="menu-remove" @click="deleteComment(post.postId, post.forum, comment._id, comment.commentedBy, userData.username)">Delete Comment</button></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div v-else ><h1 style="text-align:center; margin: 25px 0;">Hurr Durr</h1></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import $ from 'jquery'

export default {
  data() {
    return {
      commentForm: {
        commentDescription: '',
      },
      showCommentForm: false,
      isLiked: false,
      likesLength: {},
      comments: {},
      likedPosts: [],
      currentUser: {},
      reveal: false,
      username: this.$route.params.username,
      userData: {},
      postLength: {},
      file: '',
      url: null,
      postForm: {
        profilePath: '',
        username: '',
      }
    };
  },
  methods: {
    change() {
      if (this.reveal) {
        $('.dropdown-main').css("z-index", "-1")
      } else {
        $('.dropdown-main').css("z-index", "1")
      }
    },
    async changeProfile() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await axios.post('http://localhost:3000/user/profilePic', formData)
          .then(async res => {
            this.postForm.profilePath = res.data.file.filename;
            this.postForm.username = this.user.data.displayName
            // console.log(this.postForm);
            await axios.patch('http://localhost:3000/user/addProfile', this.postForm)

            // @ This forces a refresh so that you'll see the change in the profile
            // window.location = "/user/" + this.user.data.displayName;
            window.location.reload();
          })
      } catch(err) {
        console.log(err);
      }
    },
    reportPost(id){
      this.$router.push('/user/reportPost/' + this.$route.params.username + '&' + id);
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
        }),
        await axios
        .get("http://localhost:3000/user/" + this.username)
        .then(async res => {
          this.userData = await res.data
          // this.postLength = this.userData.allPosts.length
        });
      })
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      // console.log(this.file)
      // To preview the file
      const filePreview = this.$refs.file.files[0];
      this.url = URL.createObjectURL(filePreview);
    },
    profileTrigger() {
      this.$refs.file.click()
      this.currentProfile = !this.currentProfile;
      this.newProfile = !this.newProfile;
    },
    toggleForm(){
      this.showCommentForm = !this.showCommentForm;
    },
    resize(e){
      e.target.style.height = '38px'; //@ Idk what's with javascript but this was the best short lazy way and I still don't know why it works.
                                      //@ ok found it it offsets the hight of the element because of the borders, try removing them completly.
      e.target.style.height = (e.target.scrollHeight) + 'px' ;
    },
    async comment(forum, e, postId){
      console.log(forum, e);
      if (e.keyCode === 13 && !e.shiftKey || e.type == 'click') {
        e.preventDefault();
        // console.log("submit"),
        // const pId = postId
        const obj = {
          commentedBy: this.user.data.displayName,
          forumTopic: forum,
          commentDescription: this.commentForm.commentDescription
        };
        // console.log(obj);
        axios.post('http://localhost:3000/user/comment/' + this.$route.params.username + "&" + postId, obj)
        .then(res =>{

          console.log(res.data);
          // this.post.comments.push(res.data)
          let postIndex;
          console.log(this.userData);
          for (let i = 0; i < this.userData.allPosts.length; i++) {
            if (this.userData.allPosts[i].postId == postId) {
              postIndex = i;
              break;
            }
          }
          console.log(postIndex);
          this.userData.allPosts[postIndex].comments.push(res.data)
          // for (let i = 0; i < this.userData.allPosts[postIndex].comments.length; i++) {
          //   if (this.userData.allPosts[postIndex].comments[i] == res.data._id) {
              
          //   }
          // }
        })
      } 
    },
    deleteComment(pId, forum, cId, commentedBy, author) {
      const obj = {
        forumTopic: forum,
        commentId: cId,
        postAuthor: author,
      }
      console.log(pId, forum, cId, commentedBy, author)
      axios.put('http://localhost:3000/user/deleteComment/' + commentedBy + '&' + pId, obj)
      .then((newData) => {
        let index;
        // let commentIndex
        console.log(newData, "NEW");
        for (var i = 0; i < newData.data.allPosts.length; i++) {
          if(newData.data.allPosts[i].postId == pId){
            index = i
            console.log(index)
            break;
          }
        }
        // for (let i = 0; i < newData.data.allPosts[index].comments.length; i++) {
        //   if (newData.data.allposts[index].comments[i]._id == cId) {
        //     // commentIndex = i
            
        //     break;
        //   }
        // }
        // console.log(commentIndex)
        // this.userData.allPosts[index].comments.splice(commentIndex, 1)

        this.userData = newData.data;
      })
    },
    like(postId, forum){
      const obj = {
        likedBy: this.user.data.displayName,
        forumTopic: forum,
      }
      console.log(forum)
      console.log(postId);
      axios.put('http://localhost:3000/user/like/'+ this.$route.params.username + "&" + postId, obj)
        .then(res => {
          console.log(res.data, "newDATA")

          const newPosts = res.data.allPosts
          let i
          for (let index = 0; index < newPosts.length; index++) {
            if (newPosts[index].postId == postId) {
              i = index
              console.log(newPosts[i].postId, "found ", i)
            }
          }
          this.userData = res.data
          this.likedPosts.push(postId)
        })
    },
    dislike(postId, forum){
      console.log("dislike")
      const obj = {
        likedBy: this.user.data.displayName,
        forumTopic: forum
      }
      console.log(obj)
      axios.put('http://localhost:3000/user/unlike/'+ this.$route.params.username + "&"+ postId, obj)
        .then(res => {
          console.log(res.data, "newDATA")
      //     let index;
          const newPosts = res.data.allPosts
          let i

          for (let index = 0; index < newPosts.length; index++) {
            if (newPosts[index].postId == postId) {
              i = index
              console.log(newPosts[i].postId, "found", i)
            }
          }
          this.userData = res.data
          // this.likedPosts.push(postId)
          console.log(this.likedPosts, "og");

          this.likedPosts = this.likedPosts.filter(item => item != postId)

          console.log(this.likedPosts, "filtered");
        })
    },
  },
  async created() {
    this.currentUser = this.user.data.displayName
    console.log(this.currentUser)
    await axios
      .get("http://localhost:3000/user/" + this.username)
      .then(async res => {
        this.userData = await res.data
        console.log(this.userData)
        // this.postLength = this.userData.allPosts.length

        for (let index = 0; index < this.userData.allPosts.length; index++) {
          for (let j = 0; j < this.userData.allPosts[index].likes.length; j++) {
            if(this.user.data.displayName == this.userData.allPosts[index].likes[j].likedBy) {
              console.log("Liked", this.userData.allPosts[index].postId);
              this.likedPosts.push(this.userData.allPosts[index].postId)
            }
          }
        }
      });
    // console.log(this.userData);
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  }
};
</script>

<style scoped>
.user-profile-container {
  position: relative;
}

.profile {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 2px solid gray;
  justify-content: center;  
  align-items: center;
  overflow: hidden;
  transition: all 0.8s;
  cursor: pointer;
}
.test {
  position:absolute;
  width: 100%;
  height: 100%;
  transition: all 0.8s;

}
.profile:hover .test {
  background-color: rgba(0, 0, 0, 0.192);
}

.profile:hover .changeProfile  {
  width: 75px;
  opacity: 100%;
}

#profilePic {
  height: -webkit-fill-available;
  width: auto;
  object-fit: fill;
}


.new-profile-main {
  z-index: 0;
  position:absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: calc(100vh - 77px);
  background-color: rgba(109, 109, 109, 0.15);
  top: 0;
}
.profile-containter {
  z-index: 5;
  width: 600px;
  height: 700px; 
  padding: 25px; 
  margin: 0 auto;
  background-color: #fff;
  border-radius: 25px;
}

.profile-containter form {
  width: auto;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.new-profile, .current-profile {
  display: flex;
  width: auto;
  height: 85%;
  margin-bottom: 25px;
} .new-profile img, #currentProfilePic{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.submit-photo {
  display: flex;
  justify-content: center;
}

.submit-photo button {
  margin: 0 10px;
  border: none;

}
.changeProfile {
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 50px;
  opacity: 0;
  transition: all 0.5s;
}

.all-posts-main {
  display: flex;
  width: fit-content;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;

}

.post {
  display: flex;
  flex-direction: column;
  width: 750px;
  height: 100%;
  margin-bottom: 25px;
  background-color: #fff;
  border-radius: 25px;
}

.top-main {
  display: flex;
  padding: 15px 20px 0;
} .top-main h5, .comment-description {
  word-break: break-all;
}

.postProfile {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.content-main {
  display: flex;
  justify-content: center;
  /* width: 100%; */
  /* height: 75%; */
  max-height: 603px;
} .content-main > img {
  object-fit: contain;
  width: 100%;
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
  white-space: pre-line
}

/* DROPDOWN */
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

.toggle-menu:focus + .menu-list {
  z-index: 10;
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
.admin-title {
  content: 'yes';
}
/* Responsiveness */
@media screen and (max-width: 1032px){
  .toggle-menu:focus + .menu-list, .menu-list:hover {
    opacity: 1;
    pointer-events: all;
    transform: translate(-150px, 50px);
  }
}
@media screen and (max-width: 767px) {
  .all-posts-main {
    width: 100%;
    padding: 0 5px;
  } .post {
    width: auto;
  }
}
@media screen and (max-width: 991px) {
  
}

</style>
