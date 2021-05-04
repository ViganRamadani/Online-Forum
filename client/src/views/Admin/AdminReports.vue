<template>
  <div class="admin-main">
    <AdminSideBar></AdminSideBar>
    <div class="container">
      <!-- <div v-if="userData.length !== 0 && currentUser.isAdmin === true " class="users-table-main"> -->
      <div id="admin">
        <h1>Manage Reports</h1>
      </div>
      <div class="users-table-main">
        <table class="table">
          <thead>
            <tr>
              <th>
                Reporter:
              </th>
              <th>
                PostId:
              </th>
              <th>
                Report Reason:
              </th>
              <th>
                Options:
              </th>
            </tr>
          </thead>
          <tbody style="width: max-content;">
            <tr v-for="report in reports" :key="report._id">
              <td>
                <router-link :to="'/user/' + report.author">{{report.author}}</router-link>
              </td>
              <td>
                <router-link :to="'/user/post/' + report.author + '&' + report.postId">{{report.postId}}</router-link>
              </td>
              <td>
                {{ report.reportReason }}
              </td>
              <td>
                <button class="btn btn-remove" @click='removeReport(report._id)'>Remove Report</button> |
                <button class="btn btn-remove" @click='removePost(report.author, report.postId, report._id)'>Remove Post</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideBar from "@/components/AdminSideBar";
import "firebase/auth";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "adminReports",
  components: {
    AdminSideBar,
  },
  data(){
    return {
      reports: {},
    }
  },
  methods: {
    async removePost(username, pId, id){
      // console.log(id)
      await axios.delete("http://localhost:3000/user/deletePost/" + username + '&' + pId)
        .then(() => {
          console.log("Post Removed!");
          this.updateList(id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeReport(id){
      axios.delete("http://localhost:3000/user/deleteReport/" + id)
      .then(() => {
        this.updateList(id)
      })
    },
    updateList(id){
      console.log(id)
      for (let i = 0; i < this.reports.length; i++) {
        if(this.reports[i]._id == id) {
          return this.reports.splice(i, 1)
        }
      }
    }
  },
  created(){
    axios.get("http://localhost:3000/user/reports")
      .then(allReports => {
        this.reports = allReports.data
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

<style scoped src="@/static/admin.css"></style>
