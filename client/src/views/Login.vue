<template>
  <div>
    <h3>Login</h3>
    <form @submit.prevent="userLogin">
      <div class="login">
        <input type="text" placeholder="login" v-model="user.email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="user.password" />
      </div>
      <button>Login</button>
    </form>
    <div class="error" v-if="error">{{error.message}}</div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import swal from "sweetalert";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
        error: "",
    };
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push('/')
          // this.$router.push({ name: 'admin' });
          swal('Success', 'Login Successful', 'success') 
        })
        .catch(err => {
          swal('Error', 'Something Went Wrong', 'error') 
          console.log(err.response) 
        });
    },
  }
};
</script>

<style >
div {
  color: inherit;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
.error {
  color: red;
}
</style>