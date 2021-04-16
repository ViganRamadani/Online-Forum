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
            <div class="row mb-4 px-3">
              <h6 class="mb-0 mr-4 mt-2">Sign in with</h6>
              <div class="facebook text-center mr-3" >
                <div class="fa fa-facebook"></div>
              </div>
              <div class="twitter text-center mr-3">
                <div class="fa fa-google" @click="googleSignIn"></div>
              </div>
              <div class="linkedin text-center mr-3" >
                <div class="fa fa-linkedin"></div>
              </div>
            </div>
            <div class="row px-3 mb-4">
              <div class="line"></div>
              <small class="or text-center">Or</small>
              <div class="line"></div>
            </div>
            
            <form @submit.prevent="userLogin">
             
              <div class="row px-3">
                <label class="mb-1">
                  <h6 class="mb-0 text-sm">Email Address</h6>
                </label>
                <input class="mb-4" type="email" name="email" v-model="user.email" placeholder="Enter a valid email address" />
              </div>
              <div class="row px-3">
                <label class="mb-1">
                  <h6 class="mb-0 text-sm">Password</h6>
                </label>
                <input type="password" name="password" v-model="user.password" placeholder="Enter password"/>
              </div>
              <br>
              <div class="row mb-3 px-3">
                <button type="submit" name="Submit" class="btn btn-blue text-center">
                  Login
                </button>
              </div>
              <div class="row mb-4 px-3">
                <small class="font-weight-bold" >Don't have an account? <router-link style="color:#1A237E;" class="bt" to="/register">Sign Up</router-link></small >
                <!--<router-link class="menu-items" to="/about">About</router-link>-->
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

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      
      error: ""
    };
  },
  name: "SignUp",
  methods: {
    googleSignIn: function() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(token); // Token
          console.log(user); // User that was authenticated
        })
        .catch(err => {
          console.log(err); // This will give you all the information needed to further debug any errors
        });
    },
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)

        .then(() => {
          this.$swal({
            title: 'Login Successful! :D',
            text: 'Redirecting...',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1250,
            timerProgressBar: true,
          }).then(() => {
              // this.$router.push({ name: 'admin' })
              window.location = "/";
          })
        })
        .catch(err => {
         this.$swal("Error", "Something Went Wrong", "error");
          console.log(err.response);
        });
    }
  }
};


</script>

<style scoped src="@/assets/css/Login.css">

</style>
