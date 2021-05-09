<template>
  <div>
    <button id="showNav" class="btn btn-open-side-bar" @click="open">Open</button>
    <AdminSideBar></AdminSideBar>
  </div>
</template>

<script>
import AdminSideBar from "@/components/AdminSideBar";
// import "firebase/auth";
import { mapGetters } from "vuex";
// import axios from "axios";
export default {
  name: "adminContacts",
  components: {
    AdminSideBar,
  },
    data(){
      return {

      }
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