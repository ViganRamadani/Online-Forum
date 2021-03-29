<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <button @click="logUserOut"> LogOut</button>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">Name : {{ user.name }}</li>
              <li class="list-group-item">Email : {{ user.email }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import swal from 'sweetalert2';

export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    getUserDetails() {
      
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
    swal.fire({
    title: 'Do you want to Log Out?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK',
    closeOnConfirm: true,
    closeOnCancel: true
   }).then((result) => { 
      if (result.value===true) { 
        //  $('#logoutform').submit() // this submits the form 
         localStorage.removeItem("jwt");
      this.$router.push("/login");
      } 
   }) 
      // localStorage.removeItem("jwt");
      // this.$router.push("/login");
    }
  },
  created() {
    this.getUserDetails();
  }
};
</script>
<style scoped></style>