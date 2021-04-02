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
              <button v-if="user" @click="logUserOut">LogOut</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; 

// import VueJwtDecode from "vue-jwt-decode";

  export default {
    // name: "navbar"
    data(){
      return{ 

      }
    },
    methods: {
      logUserOut() {
        localStorage.removeItem("jwt");
        this.$router.push("/login");
      }
    },
    computed: {
      // ...mapState([
      //   'user',
      // ]),
      ...mapGetters([
        'user'
      ])
    },
  }
</script>

<style lang="scss" scoped>

</style>