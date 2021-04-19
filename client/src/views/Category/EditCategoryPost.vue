<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Update Post</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="updatedPost.title" :placeholder='currentPost.title'>
                </div>
                <div class="form-group">
                    <label>Question</label>
                    <input type="text" class="form-control" v-model="updatedPost.question" :placeholder='currentPost.question'>
                </div>
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
            currentPost: '',
            updatedPost:{ 
                title: null,
                description: '',
            }
        }
    },
    created() {
        axios.get('http://localhost:3000/category/categoryPost/' + this.$route.params.id)
            .then(res => {
                this.currentPost = res.data;
                console.log(this.currentPost);
            })
    },
    methods: {
        handleUpdateForm() {
            axios.patch('http://localhost:3000/category/updatePost/' + this.$route.params.id, this.updatedPost)
                .then(res => {
                    console.log(res.data)
                    this.$swal({
                        title: 'Post Updated!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    }).then(() => {
                        this.$router.push("/listCategoryPost");
                    })
                })
        }
    }
}
</script>