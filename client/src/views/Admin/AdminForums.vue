<template>
  <div class="admin-main">
    <AdminSideBar></AdminSideBar>
    <div class="container">
      <div class="admin-title">
        <h1>Manage your Forums</h1>
      </div>
      <div v-if="forums.length != 0 && currentUser.isAdmin === true " class="users-table-main">
        <table class="table">
          <thead>
            <tr>
              <th>
                Forum Topic:
              </th>
              <th>
                Overall Posts:
              </th>
              <th>
                Options:
              </th>
            </tr>
          </thead>
          <tbody style="width: max-content;">
            <tr v-for="forum in forums" :key="forum._id">
              <td>
                <router-link :to="'user/' + forum.forumTopic">{{forum.forumTopic}}</router-link>
              </td>
              <td>
                <span>{{forum.postsSum}}</span>
              </td>
 
              <td>
                <button class="btn btn-remove" @click='deleteForum(forum.forumTopic);'>Delete Forum</button> 
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No forums yet..</p>
      </div>
    <hr style="border-top: 1px solid black">

      <div class="admin-title">
        <h1>Create a Forum Here :D</h1>
      </div>
      <div class="forum-container-main">
        <div class="forum-container">
          <form @submit.prevent="createForum">
            <label for="forum-topic">Forum Topic</label>
            <input id="forum-topic" class="form-control" type="text" v-model="postForm.forumTopic" placeholder="Type here" required/>
            <label for="forum-description">Forum Description</label>
            <input id="forum-description" class="form-control" type="text" v-model="postForm.forumDescription" placeholder="Type here" required/>
            <div class="flex-column">
              <input hidden id="forum-picture" class="form-control" type="file" @change="selectFile" ref='file' name='file'/>
              <div class='flex-row'>
                <button type="button" @click.prevent="choosePic" class="btn btn-primary">Select Picture</button>
                <button v-if="url" type="submit" class="btn btn-success">Create Forum</button>
              </div>
            </div>
          </form>
        </div>
        <div v-if="url" id="imgPreview">
            <p>Preview for the image.</p>
            <img :src="url" alt="Your Image will load here...">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideBar from "@/components/AdminSideBar";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "adminForums",
  components: {
    AdminSideBar,
  },
  data(){
    return {
      postForm: {
        forumTopic: '',
        forumDescription: '',
        imagePath: '',
      },
      url: null,
      file: '',
      forums: '',
      currentUser: {},
      userRole: {
        isAdmin: false
      },
    }
  },
  methods: {
    async createForum() {
      const formData = new FormData();
      formData.append('file', this.file);
        try{
          axios.post("http://localhost:3000/user/admin/forumImg", formData)
            .then(res => {
              this.postForm.imagePath = res.data.file.filename;
              axios.post("http://localhost:3000/user/admin/createForum", this.postForm)
                .then(res => {
                  console.log(res.data, "DATA");
                  const newForum = res.data;
                  this.forums.push(newForum);

                  this.$swal({
                    title: "Forum Created",
                    icon: 'success',
                    toast: true,
                    showConfirmButton: false,
                    timer: 1250,
                    timerProgressBar: false,
                  }).then(() => {
                    this.postForm = '';
                  })
                }).catch(err => {
                  alert("Some Error occurred.", err.message)
                  console.log(err.message)
                })
            })
        } catch(err){
          console.log(err);
        }
    },
    async deleteForum(forumTopic){
      await axios.delete('http://localhost:3000/user/admin/forumTopic/' + forumTopic)
        .then(() => {
          this.updateList(forumTopic)
        })
    },
    updateList(forumTopic){
      console.log(forumTopic)
      for (let i = 0; i < this.forums.length; i++) {
        if(this.forums[i].forumTopic == forumTopic) {
          return this.forums.splice(i, 1)
        }
      }
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      // To preview the file
      const filePreview = this.$refs.file.files[0];
      this.url = URL.createObjectURL(filePreview);
    },
    choosePic() {
      this.$refs.file.click()
    },
  },
  async mounted(){
    await axios.get('http://localhost:3000/user/' + this.user.data.displayName)
      .then(async newData => {
        this.currentUser = await newData.data
        console.log(this.currentUser)
      }).then(async () => {
        // @ Check if the current logged In user is an Admin
        if (!this.currentUser) {
          this.$router.push({name: 'home'})
          // window.location = "/";
          console.log("Access Denied!")
        } else if (this.currentUser.isAdmin === null || this.currentUser.isAdmin != true) {
          // window.location = "/";
          this.$router.push({name: 'home'})
          console.log("Access Denied!")
        } else {
          return console.log("Access Granted!"),
          axios
          .get('http://localhost:3000/user/allUsers')
            .then(async res => { 
              this.userData = await res.data 
              console.log(this.userData)
              await axios.get("http://localhost:3000/user/getForums")
                .then(res => {
                  this.forums = res.data
                })
                .catch(err => {
                  alert("Something went wrong.")
                  console.log(err)
            })
          })
        }
      })
        
  },
  computed: {
  ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
    user: "user"
    })
  },  
}
</script>
<style scoped>
.table th {
  padding-left: 0.35rem;
  padding-right: 0.35rem;
}
.home-main {
  text-align: center;
  margin: 20px 0;
}
.home-main h1 {
  font-weight: 600;
} .home-main p {
  font-size: 20px;
}

#allForums {
  display: flex;
  flex-direction: column;
}

.forums-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 952px;
  min-height: 350px;
  margin: 0 auto;
}

.go-vertical {
  display: flex;
  flex-direction: column;
}

.go-horizontal {
  width: 100%;
  /* max-width: 952px; */

  flex-flow: row wrap;
  display: flex;
  /* flex-direction: column; */
}

.forum {
  position: relative;
  width:450px;
  min-height: 100%;
  margin: 10px 10px;
  border: 3px solid #fff;
}

.forum img {
  width: 100%;
  /* width:450px; */
  height:450px;
  object-fit: cover;
  object-position: bottom;
}

.forum-details {
  position: absolute;
  bottom: 0;
  top: 65%; /* Adjust this value to move the positioned div up and down */
  /* text-align: center; */
  background: black;
  font-family: Arial,sans-serif;
  color: #f1f1f1;
  width: 100%; /* Set the width of the positioned div */
  padding: 20px;
  font-family: "Montserrat", sans-serif;
}
.forum-details a {
  color: white;
  /* text-decoration: none; */
}

.forum-details p {
  text-align: left;
}

@media screen and (max-width: 939px) {
  .forums-main {
    max-width: 100%;
  }
  .go-vertical {
    max-width: 495px;
    width: 100%;
  }
  
  .go-horizontal {
    width: 100%;
    justify-content: center;
  }
  
}
</style>
<style scoped src="@/static/admin.css"></style>
