<template>
    <div class="template">
        <!-- <h1 style="text-align:center;">{{postData[0].selected.toUpperCase()}} Questions</h1> -->
   
        <div  v-for="post in postData" :key="post._id">
            <!-- <h1>{{post.selected.toUpperCase()}} Questions</h1> -->
            <div class="post row">
                <div class="author col-sm-1">
                    <h1>{{post.author.toUpperCase()}}</h1>
                    <p></p> 
                </div>

                <div class="content col-sm-11" >
                    <div class="content-top">
                    <h2>{{post.title}}</h2>
                    </div>
                    <hr>
                    <p>{{post.question}}</p>
                    <h3>{{post.createdAt}}</h3>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            postData:{}
        }
    },
    created(){
        axios.get('http://localhost:3000/category/'+this.$route.params.selected)
            .then(res =>{
                console.log(res.data);
                this.postData = res.data;
            })
    }
}
</script>
<style scoped>
/* .template{
    background-color: lightgray;
} */
    .post {
        /* border: 1px solid black; */
        text-align: center  ;
        width: 90%;
        margin: 3%;
        margin-left: 3%;
          box-shadow: 5px 5px 5px 5px rgba(0, 0, 255, .2);
        background-color: rgb(245, 243, 243);

        margin-right: 3%;
        /* border-radius: 20px; */
          /* box-shadow: 5px 5px 5px 2px gray */
    }
    .content {
        border: 1px solid rgb(223, 223, 223);
        width: 100%;
        background-color: white;
        margin: 6px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 20px;
        /* background-color: var(--card-light); */
        /* box-shadow: 10px 5px 5px gray */
          box-shadow: 5px 5px 5px 5px rgba(0, 0, 255, .2);
    }
    .content-top{
        background-color: rgba(255, 136, 0, 0.6);
         box-shadow: 5px 5px 5px 5px rgba(247, 163, 9, .55);
         border-radius: 5px;
        padding: 1px;


    }
    .content h3{
        text-align: right;
        font-size: 10px;
    }
     .content h2{
         margin-top: 10px;
        font-size: 26px;
    }
    .author h1 {
        font-size: 14px;
    }
    .author h3 {
        font-size: 13px;
    }

</style>
