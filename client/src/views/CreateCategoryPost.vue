<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Question</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="categoryPost.title" required>
                </div>

                <div class="form-group">
                    <label>Question</label>
                    <input type="text" class="form-control" v-model="categoryPost.question" required>
                </div>
                <div class="form-group" style="text-align:center">
                    <label>Category:Choose one</label>

                    <div id="v-model-select" class="demo">
                    <select v-model="categoryPost.selected" >
                        <option>operation system</option>
                        <option>mobile</option>
                        <option>security</option>
                        <option>web</option>
                        <option>hardware</option>
                         

                    </select>
                    </div>
                 </div> 

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                categoryPost: {
                   title: '',
                   question: '',
                   selected: '',
                   author:''
                }
            }
        },
        methods: {
            
            handleSubmitForm() {
              try{
                this.categoryPost.author = this.user.data.displayName;
                axios.post('http://localhost:3000/category/createcategorypost', this.categoryPost)
                .then((data) => {
                    console.log(data);
                //  this.$router.push('/listcategorypost')
                //   this.CategoryPost = {
                //     title: '',
                //     question: '',
                //     selected: ''
                //   }
                })
                }catch(err){
                    console.log(err);
                }
            } 
        },
        computed: {
  ...mapGetters({
      // map this.user to this.$store.getters.user
      user: "user"
    })
  }
    }
</script>