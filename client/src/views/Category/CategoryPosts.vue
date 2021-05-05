<template>
    <div class="template">
        <!-- <h1 style="text-align:center;">{{postData[0].selected.toUpperCase()}} Questions</h1> -->
        <div class="header">
            <a href="../createcategorypost">Create Your Own Question</a>
        </div>
        <div  v-for="post in postData" :key="post._id">
            <!-- <h1>{{post.selected.toUpperCase()}} Questions</h1> -->
            <div class="post row">
              

                <div class="content" >
                    <div class="content-top">
                         <div class=" row">
                   
                        <div class="author col-sm-3">  <p>{{post.author.toUpperCase()}} says:</p></div>
                        <div class="col-sm-6"> <h2>{{post.title}}</h2></div>
                        <div class="time col-sm-3">  <h3>{{post.createdAt}}</h3></div>

                    </div>
                    </div>
                    <hr>
                    <p class="question">{{post.question}}</p>
                    <hr>
                    <div class="respond row">
                    <div class="like col-sm-6">
                        <p>LIKE</p>
                    </div>
                    <div class="comment col-sm-6">
                        <p>COMMENT  </p>
                    </div>
                </div>

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
    .header{
        background-color: rgb(41, 35, 35);
         text-align: center  ;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;

        border-top-left-radius: 25px;
        border-top-right-radius: 25px;


    }
    .header p {
        color: white;
        text-decoration: none;
        font: larger;
    }
    .post {
        /* border: 1px solid black; */
        text-align: center  ;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        /* margin: 3%;
        margin-left: 3%; */
          box-shadow: 5px 5px 5px 5px rgba(0, 0, 255, .2);
        background-color: rgb(245, 243, 243);
/* 
        margin-right: 3%; */
        /* border-radius: 20px; */
          /* box-shadow: 5px 5px 5px 2px gray */
    }
    .content {
        border: 1px solid rgb(223, 223, 223);
        width: 100%;
        background-color: white;
        text-align: center  ;

        margin: 2% 5% 2% 5%;
        /* margin-left: 5%;
        margin-right: 5%; */
        border-radius: 20px;
        /* background-color: var(--card-light); */
        /* box-shadow: 10px 5px 5px gray */
          box-shadow: 5px 5px 5px 5px rgba(0, 0, 255, .2);
    }
    /* .content-top{
        background-color: rgba(255, 136, 0, 0.6);
         box-shadow: 5px 5px 5px 5px rgba(247, 163, 9, .55);
         border-radius: 5px;
        padding: 1px;


    } */
    .content h3{
        text-align: center;
        font-size: 15px;
    }
     .content h2{
         margin-top: 10px;
        font-size: 26px;
    }
    .question{
        text-align: center;
        font-size: 18px;
    }
    .col-sm-3{
        text-align: right;
        font-size: 18px;
    }
    .like{
        border-right:1px solid lightgray ;
        width: 90%;
    }
    .like:hover{
         background-image: linear-gradient(to right, rgb(255, 250, 250) ,white,rgb(233, 227, 227));
        /* border-radius: 30px; */
        color: rgb(184, 6, 6);
    }
    .comment:hover{
         background-image: linear-gradient(to right, rgb(226, 225, 225) ,white,rgb(247, 244, 244));
        /* border-radius: 30px; */
                color: rgb(184, 6, 6);

    }
    .author p{
       margin-top:5% ;
    }
     .time h3{
       margin-top:6% ;
    }
  
</style>
