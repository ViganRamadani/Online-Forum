<template>
  <div>
    <div class="error" v-if="error">{{ error.message }}</div>
    <form @submit.prevent="userRegistration">
      Register
      <div class="col-md-6">
        <input id="name" type="name" class="form-control" name="name" v-model="formUser.username" placeholder="Username" value required autofocus />
      </div>
      <div class="email">
        <input type="email" v-model="formUser.email" placeholder="email"/>
      </div>
      <div class="password">
        <input type="password" v-model.trim="formUser.password" placeholder="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import axios from "axios"

export default {
  data() {
    return {
      formUser: {
        username: "",
        email: "",
        password: "",
      },
        error: ""
    };
  },
  methods: {
    // onFilePicked(event) {
    //   this.user.profilePic = event.target.files[0];
    // },
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.formUser.email, this.formUser.password)
        .then(userData => {
          userData.user.updateProfile({
            displayName: this.formUser.username,
            });  
            axios.post("http://localhost:3000/user/signUp", this.formUser)
            this.$router.push("/admin")  
        }).catch(err => {
          this.error = err
        });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 18px;
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
</style>