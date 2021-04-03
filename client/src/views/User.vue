<template>
  <div>
    <h1>Hello {{ userData.username }}</h1>

    <div>
      <h2>{{ userData.isAdmin }}</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        id: this.$route.params.id,
        userData: {},
      }
    },
    created() {
      axios
      .get('http://localhost:3000/user/' + this.id)
      .then(respose => ( this.userData = respose.data ))
      console.log(this.userData)
    },
    computed: {
    ...mapGetters({
        // map `this.user` to `this.$store.getters.user`
        user: "user",
      }),
  },
  }
</script>

<style lang="scss" scoped>

</style>