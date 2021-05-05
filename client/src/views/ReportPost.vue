<template>
  <div>
    <h1 class="text-center">Report Post</h1>
    <form class="col-md-4" @submit.prevent="reportPost">
      <label :for="this.$route.params.username">Poster's Username</label>
      <input disabled :placeholder="this.$route.params.username" class="col text-center p-1">
      <label for="reportReason">Report Reason</label>
      <select autofocus class="form-control" v-model="report.reportReason" >
          <option></option>
          <option>Innapropriate Content!</option>
          <option>Discrimination!</option>
          <option>Public shaming!</option>
          <option>Spam!</option>
          <option>Contains illegal content or activity!</option>
          <option>Violation of someone's privacy!</option>
      </select>
      <div class="col text-center mt-2">
        <button type="submit" class="btn btn-danger">Report</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        report: {
          reportReason: '',
        },
        forumTopic: this.$route.params.forumTopic,
      }
    },
    methods: {
      async reportPost(){
      // console.log(this.$route.params.username + '&' + id);
      // console.log(this.$route.params.postId)
      axios.post('http://localhost:3000/user/report/' + this.$route.params.username + '&' + this.$route.params.postId, this.report)
        .then(res => {
          // console.log(res.data);
          this.$swal({
            toast: true,
            html: `<h1>Report Created!</h1><h5>ReportId:</h5> 
                   <p>${res.data.postId}</p>`,
            footer: `<h5 style="text-align:center;">We Will Get back to this post as soon as possible!</h5>`,
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.$router.push('../../forums/' + this.forumTopic)
          })
        })
      }
    },
    created(){
      console.log(this.forumTopic)
    }
}
</script>

<style scoped>
form{
  margin: 0 auto;
}
</style>