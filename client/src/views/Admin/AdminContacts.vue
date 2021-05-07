<template>
  <div class="admin-main">
    <AdminSideBar></AdminSideBar>
  <div class="container">
    <!-- <h1>{{contactMessages}}</h1>   -->
    <div class="container">
      <div class="admin-title">
        <h1>Menage Message</h1>
      </div>
      
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
              Message:
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
                |
                <button class="btn btn-remove" @click='deleteUser(user.username); column();'>Delete</button>
                <!-- <a href=""></a> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
     
        <p>No message yeet.</p>
      </div>
    
  </div>
  
</template>

<script>
import AdminSideBar from "@/components/AdminSideBar";
// import "firebase/auth";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "adminContacts",
  components: {
    AdminSideBar,
  },
    data(){
      return {
        contactMessages: {},
      }
    },
    created(){
      axios.get('http://localhost:3000/getContactUs')
        .then(async res =>{
          // console.log(res.data)
          this.contactMessages = await res.data
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

</style>
<style scoped src="@/static/admin.css"></style>
