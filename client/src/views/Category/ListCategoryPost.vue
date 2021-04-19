<template>
    <div>
        <h1 style="text-align:center;">Search for questions... or ask them :D</h1>
        <div class="table-main col-md-8">
            <table class="table table-striped ">
                <thead class="thead-dark">
                    <tr>
                        <th>Title:</th>
                        <th>Question:</th>
                        <th>Category:</th>
                        <th>Author:</th>
                        <th>Options:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in categories" :key="post.id">
                        <!-- <div v-if="category.selected === 'Hardware'"> -->
                        <td >{{ post.title }}</td>
                        <td>{{ post.question }}</td>
                        <td>{{ post.selected }}</td>
                        <td>{{ post.author }}</td>
                        <td>
                            <router-link v-if="post.author == user.data.displayName" :to="'editCategoryPost/' + post._id" class="btn btn-success">Edit</router-link>
                            <button v-if="post.author == user.data.displayName" @click.prevent="deleteCategory(post._id, post.author)" class="btn btn-danger">Delete</button>
                        </td>
                        <!-- </div> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import "firebase/auth";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            categories: {},
        }
    },
    created() {
        axios.get('http://localhost:3000/category/allCategories')
        .then(res => {
            this.categories = res.data;
            console.log(this.categories);
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
        deleteCategory(id, author){
            const currentUser = this.user.data.displayName
            if (author == currentUser) {
                // console.log(author);
                // console.log(currentUser)
                try {
                    axios.delete('http://localhost:3000/category/deletePost/' + id)
                    .then(res => {
                        console.log(res, "Post Deleted!");
                        this.$swal({
                            title: 'Post Deleted!',
                            icon: 'success',
                            timer: 1000,
                            showConfirmButton: false,
                        }).then(() => {
                            // this.$router.push("/listCategoryPost");
                            // @ Forces a RELOAD
                            window.location.reload(true);
                        })
                    })
                } catch (err) {
                    console.log(err);
                }
            } else {
                this.$swal({
                    title: 'Access Denied!',
                    icon: 'danger',
                    timer: 1000,
                    showConfirmButton: false,
                })
            }
            
        }
    },
    computed: {
    ...mapGetters({
        // map `this.user` to `this.$store.getters.user`
        user: "user",
      }),
  },
}
</script>

<style>
.btn-success {
    margin-right: 10px;
}
.table-main {
    display: flex;
    justify-content: center;
    margin: 0 auto;
}
</style>