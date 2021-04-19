<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Update Student</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="category.title" >
                </div>

                <div class="form-group">
                    <label>Question</label>
                    <input type="email" class="form-control" v-model="category.question" required>
                </div>

                <!-- <div class="form-group">
                    <label>Category</label>
                    <input type="text" class="form-control" v-model="category.selected" required>
                </div> -->

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            category: { }
        }
    },
    created() {
        let apiURL = `http://localhost:3000/category/edit-categoryPost/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.category = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/category/update-categoryPost/${this.$route.params.id}`;

            axios.post(apiURL, this.category).then((res) => {
                console.log(res)
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>