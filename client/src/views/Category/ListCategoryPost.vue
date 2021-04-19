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
                            <router-link :to="'editCategoryPost/' + post._id" class="btn btn-success">Edit</router-link>
                            <button @click.prevent="deleteCategory(post._id)" class="btn btn-danger">Delete</button>
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

    export default {
        data() {
            return {
                categories: {}
            }
        },
        created() {
            axios.get('http://localhost:3000/category/allCategories').then(res => {
                this.categories = res.data;
                console.log(this.categories);
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteCategory(id){
                console.log(id);
                // let apiURL = `http://localhost:3000/category/delete-categoryPost/${id}`;
                // console.log("");
                // let indexOfArrayItem = this.categories.findIndex(i => i._id === id);

                // if (window.confirm("Do you really want to delete?")) {
                //     axios.delete(apiURL).then(() => {
                //         this.categories.splice(indexOfArrayItem, 1);
                //     }).catch(error => {
                //         console.log(error+" definder Vigan")  
                //     });
                // }
            }
        }
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