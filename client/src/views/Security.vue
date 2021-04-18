<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Title</th>
                        <th>Question</th>
                        <th>Category</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in Categories" :key="category._id">
                        <div v-if="category.selected === 'Security'">
                        <td >{{ category.title }}</td>
                        <td>{{ category.question }}</td>
                        <td>{{ category.selected }}</td>
                        <td>{{ category.author }}</td>
                        <td>
                            <!-- <router-link :to="{name: 'edit', params: { id: category._id }}" class="btn btn-success">Edit
                            </router-link> -->
                            <button @click.prevent="deleteCategory(category._id)" class="btn btn-danger">Delete</button>
                        </td>
                        </div>
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
                Categories: []
            }
        },
        created() {
            axios.get('http://localhost:3000/api').then(res => {
                this.Categories = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteCategory(id){
                let apiURL = `http://localhost:3000/api/delete-categoryPost/${id}`;
                console.log("");
                let indexOfArrayItem = this.Categories.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Categories.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error+" definder Vigan")  
                    });
                }
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>