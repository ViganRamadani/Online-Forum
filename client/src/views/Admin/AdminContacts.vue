<template>
  <div class="admin-main">
    <AdminSideBar></AdminSideBar>
  <div class="container">
    <!-- <h1>{{contactMessages}}</h1>   -->
    
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
