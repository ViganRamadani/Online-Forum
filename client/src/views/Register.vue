<template>
  <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
      <div class="row d-flex">
        <div class="col-lg-6">
          <div class="card1 pb-5">
            <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
              <img src="../assets/tech.png" class="image" />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card2 card border-0 px-4 py-5">
             <h2>Sign Up</h2>
            <form @submit.prevent="userRegistration">
              <div class="row px-3">
                <label>Full Name</label>
                <input type="name" class="mb-4" placeholder="Username" name="name" v-model="formUser.username" id="name" value required autofocus/>
              </div>
              
              <div class="row px-3">
                <label class="mb-1">
                  <h6 class="mb-0 text-sm">Email Address</h6>
                </label>
                <input class="mb-4" type="text" name="email" v-model="formUser.email" placeholder="Enter a valid email address"/>
              </div>
              <div class="row px-3">
                <label class="mb-1">
                  <h6 class="mb-0 text-sm">Password</h6>
                </label>
                <input minlength="6" type="password" v-model.trim="formUser.password" placeholder="Enter password"/>
              </div>
              <br>
              <div class="row mb-3 px-3">
                <button type="submit" name="Submit" class="btn btn-blue text-center">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import axios from "axios";

export default {
  data() {
    return {
      formUser: {
        username: "",
        email: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.formUser.email,
          this.formUser.password
        )
        .then(userData => {
          userData.user.updateProfile({
            displayName: this.formUser.username
          });
          axios.post("http://localhost:3000/user/signUp", this.formUser);
          this.$swal({
            title: 'Welcome to the Club :D',
            text: 'Redirecting...',
            timer: 2000,
            icon: 'success',
            showConfirmButton: false,
            timerProgressBar: true,
          })
          .then(() => {
            this.$router.push("/admin");
              // window.location = "/";
          })
        })
        .catch(err => {
          // this.error = err;
          console.log(err)
        });
    }
  }
};
</script>
<style scoped src="@/assets/css/Login.css">

</style>
