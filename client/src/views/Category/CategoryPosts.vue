<template>
    <div>
        <!-- //<p>{{postData[0].selected}}</p> -->
        <!-- Single POST -->

        <div v-for="post in postData" :key="post._id">
            <table>
                <tr>
                <th>Category</th>
                </tr>
                <tr>
                <td>{{post.selected}}</td>
                </tr>
                
            </table>
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

</style>