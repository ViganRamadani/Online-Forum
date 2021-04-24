<template>
  <div class="admin-main">
    <div id="admin">
      <h1>Admin</h1>
    </div>
    <div class="container">
      <div v-if="userData.length !== 0 && currentUser.isAdmin === true " class="users-table-main">
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
                Is Admin:
              </th>
              <th>
                Options:
              </th>
            </tr>
          </thead>
          <tbody style="width: max-content;">
            <tr v-for="user in userData" :key="user._id">
              <td>
                <router-link :to="'user/' + user.username">{{user.username}}</router-link>
              </td>
              <td>
                {{ user.email }}
              </td>
              <td>
                {{ user.isAdmin }}
              </td>
              <td>
                <button class="btn" @click='editUser(user.username); cancelButton();'>Edit</button> |
                <router-link class="btn" :to="'user/' + user.username">Details</router-link> |
                <button class="btn" @click='deleteUser(user.username); swalTest();'>Delete</button>
                <!-- <a href=""></a> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No users yeet.</p>
      </div>
      <hr style="border-top: 3px solid black;">
          <!-- <button class="btn btn-primary" @click="sortBy('username')">Sort</button> -->
      
      <h2 style="text-align: center">Create a Forum Here :D</h2>

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
                <button @click.prevent="choosePic" class="btn btn-primary">Select Picture</button>
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
import "firebase/auth";
import { mapGetters } from "vuex";
import axios from "axios";
import $ from 'jquery'

export default {
  name: "admin",
  data() {
    return {
      url: null,
      userData: {},
      currentUser: {},
      file: '',
      userRole: {
        isAdmin: false
      },
      postForm: {
        forumTopic: "",
        forumDescription: "",
        imagePath: '',
      },
      selectedUser: {},
    };
  },
  methods: {
    // sortBy(prop){
    //   this.userData.sort((a,b) =>  a[prop] < b[prop] ? -1 : 1 );
    // },
    // descending(userData) {
    //   userData.sort((a, b) => {
    //     return b.isAdmin - a.isAdmin; //@ returning the array of object based on the propperty isAdmin
    //     // return a.isAdmin - b.isAdmin;
    //   });
    //   console.log(userData)
    // },
    async createForum() {
      const formData = new FormData();
      formData.append('file', this.file);
        try{
          // console.log(this.file);
          axios.post("http://localhost:3000/user/admin/forumImg", formData)
            .then(res => {
              this.postForm.imagePath = res.data.file.filename;
              axios.post("http://localhost:3000/user/admin/createForum", this.postForm)
              this.postForm = ''
              this.$swal({
                title: "Forum Created",
                icon: 'success',
                toast: true,
                showConfirmButton: false,
                timer: 1250,
                timerProgressBar: false,
              })
            })
        } catch(err){
          console.log(err);
        }
    },
    logHere() {
      console.log(this.userRole.isAdmin)
    },
    editUser(username) {
      // console.log(username)
      document.querySelector('#app').style.position = 'absolute'
      this.$swal.fire({
        title: 'Edit User Role',
        html: `<input disabled type="text" class="form-control text-center fs-5" placeholder="Edit ${username}'s Role">`,
        showConfirmButton: true,
        confirmButtonText: `True`,
        showDenyButton: true,
        denyButtonText: `False`,
        showCancelButton: true,
        customClass: {
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then(res => {
        console.log(res)
        this.userRole.isAdmin = res.value;
        console.log(this.userRole)
        if (res.dismiss) {
          return null
        } else if (this.userRole.isAdmin === null || this.userRole.isAdmin === undefined){
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Try again or Contact the Administration.',
          })
        } else {
        console.log(this.userRole)
          axios.patch("http://localhost:3000/user/admin/editUserRole/" + username, this.userRole)
          .then(res => {
            console.log(res)
            return this.$swal({
              icon: 'success',
              title: `User ` + username + "'s Role Changed successfully!",
            }).then(() => { 
              setTimeout(() => document.querySelector('#app').style.position =  '' , 250);
            })
          }).catch(err =>{
            console.log(err)
          })
        }
      }).then(() => { })
    },
    async deleteUser(username) {
      console.log(username);
      this.$swal({
        icon: 'warning',
        toast: true,
        html: `<div id="swalAdmin">
                <h1 style="margin: 10px 0;">Are you sure?</h1>
              </div>
              <style></style>
              <h3 style="margin: 10px 0;">You won't be able to revert this!</h3>`,
        showCancelButton: true,
        confirmButtonText: `<span style="color: #000">Proceed!</span>`,
        confirmButtonColor: '#fff',
        cancelButtonColor: '#d33',
        customClass: {
          content: 'swal-test',
          container: 'swal-admin',
          popup: 'swal-admin-popup',
          header: 'swal-admin-header',
        }
      },).then(async (result) => {
        if (result.isConfirmed) {
          // console.log("Confirmed")
          await axios.delete("http://localhost:3000/user/admin/deleteUser/" + username)
          .then(async res => {
            console.log(res);
              await this.$swal({
                icon: 'success',
                toast: true,
                html: `<h3 style="margin: 10px 10px">User: ${username} is Deleted!</h3>`,
                customClass: {
                  container: 'swal-admin',
                  popup: 'swal-admin-popup',
                },
                showConfirmButton: false,
                timer: 2500,
              })
              .then(() => {
              axios
                .get('http://localhost:3000/user/allUsers')
                .then(newData => { 
                  this.userData = newData.data 
              });
            })
          }).catch(err => {
            console.log(err);
            this.$swal({
              // icon: 'error',
              toast: true,
              html: `<h3 style='color:red; font-weight:bold;'>Something went Wrong!</h3>`,
              footer: `<h5 style="text-align:center;">We Will get back at this problem as soon as possible!</h5>`,
              showConfirmButton: false,
              timer: 3000,
              customClass: {
                container: 'admin',
                htmlContainer:'admin'
              },
            })
          })
        }
      })
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      // To preview the file
      const filePreview = this.$refs.file.files[0];
      this.url = URL.createObjectURL(filePreview);
    },
    choosePic() {
      this.$refs.file.click()
    },
    swalTest() {
      $(".swal-admin .swal-admin-popup").css('flex-direction', 'column');
    },
    cancelButton(){
      $(".swal2-cancel").css('margin-right', 'auto');
    },
  },
  async created() {
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
          });
        }
      })
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
};
</script>

<style scoped src="@/static/admin.css"></style>
