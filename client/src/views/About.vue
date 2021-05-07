<template>
<div class="main">
  <div id="aboutus" class="row">
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
  <div  class="row">
    
    <div class="right-top col-sm-6">
      <h3>Who we are</h3>
      
      <h1>Helping developers and technologists write the script of the future.</h1>
      <h4>Our public platform serves 100 million people every month, making it one of the 50 most popular websites in the world.
Our asynchronous knowledge management and collaboration offering Online Forum for Teams, is transforming how people work.</h4>
    </div>
    <div class="top col-sm-6">
     <img  src="../../public/tech.png" alt="">
    </div>
    <div>
  </div>
 
    <div class="team">
       <hr>
      <div class="row">
        <div class="photo col-sm-3"><img src="../../public/team1.jpg" alt="PIC1"></div>
        <div class="photo col-sm-3"><img src="../../public/team2.jpg" alt="PIC2"></div>
        <div class="photo col-sm-3"><img src="../../public/team3.jpg" alt="PIC3"></div>
        <div class="photo col-sm-3"><img src="../../public/team4.jpg" alt="PIC4"></div>
      </div>
      <div class="row">
        <div class="col-sm-3">Name surname</div>
        <div class="col-sm-3">Name surname</div>
        <div class="col-sm-3">Name surname</div>
        <div class="col-sm-3">Name surname</div>
      </div>
    </div>
   
    <div class="team">
        <br>
    <br>
    <br>
    <hr>
    <br>
    <br>
      <div class="row">
        <div class=" col-sm-4"><img src="../../public/heart.png" alt="PIC1"></div>
        <div class=" col-sm-4"><img src="../../public/hand.png" alt="PIC2"></div>
        <div class=" col-sm-4"><img src="../../public/compas.png" alt="PIC3"></div>
      </div>
      <div class="row">
        <div class="col-sm-4"> <b> Adopt a customer-first mindset</b></div>
        <div class="col-sm-4"><b>Be flexible and inclusive</b></div>
        <div class="col-sm-4"><b>Be transparent</b></div>
      </div>
       <div class="row">
        <div class="col-sm-4">Authentically serve our customers by empowering, listening and collaborating with our fellow Stackers.</div>
        <div class="col-sm-4">
Authentically serve our customers by empowering, listening and collaborating with our fellow Stackers.
Be flexible and inclusive. We do our best work when a diverse group of people collaborate in an environment of respect and trust</div>
        <div class="col-sm-4">Communicate openly and honestly, both inside and outside the company.</div>
      </div>
     <br>
    <br>
    <br>

        <div class="row">
        <div class=" col-sm-4"><img src="../../public/link.png" alt="PIC1"></div>
        <div class=" col-sm-4"><img src="../../public/chat.png" alt="PIC2"></div>
        <div class=" col-sm-4"><img src="../../public/line.png" alt="PIC3"></div>
      </div>
      <div class="row">
        <div class="col-sm-4"><b>Empower people to deliver outstanding results</b></div>
        <div class="col-sm-4"><b>Keep community at our center</b></div>
        <div class="col-sm-4"><b>Learn, share, grow</b></div>
      </div>
       <div class="row">
        <div class="col-sm-4">Give people space to get their job done, support them when they need it, and practice blameless accountability.</div>
        <div class="col-sm-4">Community is at the heart of everything we do. Nurture healthy communities where everyone is encouraged to learn and give back.</div>
        <div class="col-sm-4">Adopt a Growth Mindset. Be curious and eager to learn. Aim for ethical, sustainable, long-term growth, both personally and in the company.</div>
      </div>
    </div>
</div>
</div>
</template>
<script>
export default {
  el:"#aboutus"
};
</script>





<style>
* {
  box-sizing: border-box;
}
.main{
  width: 95%;
  margin-left:auto ;
  margin-right:auto;
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
.col-sm-3{
  border-right: 1px solid black;
}
.right-top h1{
  text-align: center;
  margin-top: 11%;
  font-size:25px;
}
.right-top h4{
  text-align: center;
    margin-top: 11%;
  font-size:20px;

}
/* Style the header */
.header {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  font-size: 35px;
}
.photo{
   grid-area: photo;
  
  
}
.photo img{
   object-fit: cover;
  width: 100%
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
.team{
  width: 90%;
  margin-left: auto;
  margin-right:auto;
}
/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>



