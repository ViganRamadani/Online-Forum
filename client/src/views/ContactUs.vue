<template>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Responsive Contact us form Using HTML and CSS</title>
</head>
<body>
	
<div class="wrapper">
  <div class="title">
    <h1>contact us form</h1>
  </div>
  <div class="contact-form">
    <form @submit.prevent='sendMessage' class="input-fields flex-row">
      <div class="flex-column">
        <input v-model="form.name" type="text" class="input" placeholder="Name">
        <input v-model="form.email" type="text" class="input" placeholder="Email Address">
        <input v-model="form.phoneNumber" type="text" class="input" placeholder="Phone">
        <input v-model="form.subject" type="text" class="input" placeholder="Subject">
      </div>
      <div class="msg flex-column">
        <textarea v-model="form.message" placeholder="Message"></textarea>
        <button type="submit" class="btn btn-submit">send</button>
      </div>
    </form>
  </div>
</div>
</body>
</html>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
      },
    }
  },
  methods: {
    sendMessage(){
      console.log("submitted")
      axios.post('http://localhost:3000/contactUs', this.form)
        .then(data => {
          console.log(data, "done")
        })
    }
  }
}
</script>

<style scoped>
/* .btn-submit {
  
} */

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'Roboto', sans-serif;
  background-color: #303233;
}

body{
  background-size: cover;
  height: 100vh;
  
}

.wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 550px;
  background: rgba(0,0,0,0.8);
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}

.wrapper .title h1{
  color: #c5ecfd;
  text-align: center;
  margin-bottom: 25px;
}

.contact-form{
  display: flex;
}

.input-fields{
  display: flex;
  flex-direction: column;
  margin-right: 4%;
}

.input-fields,
.msg{
  width: 100%;
}

.input-fields .input,
.msg textarea{
  margin: 10px 0;
  background: transparent;
  border: 0px;
  border-bottom: 2px solid #c5ecfd;
  padding: 10px;
  color: #c5ecfd;
  width: 100%;
}

.msg textarea{
  height: 212px;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #c5ecfd;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: #c5ecfd;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: #c5ecfd;
}

.btn {
    background: #39b7dd;
    text-align: center;
    padding: 15px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    text-transform: uppercase;
}

@media screen and (max-width: 600px){
  .contact-form{
    flex-direction: column;
  }
  .msg textarea{
    height: 80px;
  }
  .input-fields,
  .msg{
    width: 100%;
  }
}

</style>

