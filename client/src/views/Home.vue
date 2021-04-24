<template>
  <div class="home">
    <div class="postContainerMain">
 
    </div>
    <div class="home-main">
      <h1 id="title">Forums</h1>

      <p>Welcome! Have a look around and join the discussions.</p>
    </div>

    <div v-if="forums.length != 0" id="allForums" class="forums-main">
      
      <div class="go-vertical">
          <a id="startHere" href="#allForums">Ask Here!</a>
        <div class="go-horizontal">
          <div class="forum" v-for="forum in forums" :key="forum._id">
            <router-link :to="'forums/' + forum.forumTopic"><img :src="require('../../../server/uploads/' + forum.imagePath)"></router-link>
            <div class="forum-details">
              <router-link :to="'forums/' + forum.forumTopic"><h3>{{ forum.forumTopic }}</h3></router-link>
              <p>{{ forum.forumDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>No forums yet..</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "firebase/auth";
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  name: "Home",
  data() {
    return {
      userData: {},
      forums: {},
      file: '',
      postForm: {
        title: '',
        description: '',
        imagePath: '',
      },
    };
  },
  methods: {
    async addPost() {
      const formData = new FormData();
      formData.append('file', this.file);
        try{
          // console.log(this.file);
          axios.post("http://localhost:3000/user/user/addImage", formData)
            .then(res => {
              this.postForm.imagePath = res.data.file.filename;
              axios.post("http://localhost:3000/user/addPost/" + this.forumTopic, this.postForm)
            })
        } catch(err){
          console.log(err);
        }
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    }
  },
  created() {
      try {
        axios.get("http://localhost:3000/user/getForums")
          .then(res => {
            this.forums = res.data
          })
      } catch (error) {
        console.log(error);
      }
  },
  computed: {
    ...mapGetters({
        // map `this.user` to `this.$store.getters.user`
        user: "user",
      }),
  },
};
</script>

<style scoped>
#startHere {
  margin-right: 25px;
  margin-left: auto;
  color: black;
}


.home-main {
  text-align: center;
  margin: 20px 0;
}
.home-main h1 {
  font-weight: 600;
} .home-main p {
  font-size: 20px;
}

#allForums {
  display: flex;
  flex-direction: column;
}

.forums-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 952px;
  min-height: 350px;
  margin: 0 auto;
}

.go-vertical {
  display: flex;
  flex-direction: column;
}

.go-horizontal {
  width: 100%;
  /* max-width: 952px; */

  flex-flow: row wrap;
  display: flex;
  /* flex-direction: column; */
}

.forum {
  position: relative;
  width:450px;
  min-height: 100%;
  margin: 10px 10px;
  border: 3px solid #fff;
}

.forum img {
  width: 100%;
  /* width:450px; */
  height:450px;
  object-fit: cover;
  object-position: bottom;
}

.forum-details {
  position: absolute;
  bottom: 0;
  top: 65%; /* Adjust this value to move the positioned div up and down */
  /* text-align: center; */
  background: black;
  font-family: Arial,sans-serif;
  color: #f1f1f1;
  width: 100%; /* Set the width of the positioned div */
  padding: 20px;
  font-family: "Montserrat", sans-serif;
}
.forum-details a {
  color: white;
  /* text-decoration: none; */
}

.forum-details p {
  text-align: left;
}

@media screen and (max-width: 939px) {
  .forums-main {
    max-width: 100%;
  }
  .go-vertical {
    max-width: 495px;
    width: 100%;

  }

  .go-horizontal {
    width: 100%;
    /* align-items: center; */
    justify-content: center;
  }
  
}

</style>