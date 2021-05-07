<template>
<div>
  <div class="row">
    <div class="top col-sm-6">
     <img  src="../../public/forum.jpg" alt="">
    </div>
    <div class="right-top col-sm-6">
      <h3>Who we are</h3>
      <h1>Helping developers and technologists write the script of the future.</h1>
      <h4>Our public platform serves 100 million people every month, making it one of the 50 most popular websites in the world.

Our asynchronous knowledge management and collaboration offering Online Forum for Teams, is transforming how people work.</h4>
    </div>
  </div>
</div>



</template>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}
.right-top h3{
  text-align: center;
    margin-top: 11%;
    font: 22px bold;
    color: gray;
}
.right-top h1{
  text-align: center;
    margin-top: 11%;
}
.right-top h4{
  text-align: center;
    margin-top: 11%;
}
/* Style the header */
.header {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  font-size: 35px;
}
.top img{
  width:100%;
  height:95%;
  margin-left: auto;
  margin-right: auto;

}

/* Create three equal columns that floats next to each other */
.column {
  float: left;
  width: 33.33%;
  padding: 0px;
  height: 300px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the footer */
.footer {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>
<script>
export default {

}
</script>

<style>

</style>



