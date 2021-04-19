<template>
  <div id="app">
    <header>
      <Navbar></Navbar>
    </header>
   
     <!-- Router view -->
      <router-view></router-view>
    
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "./components/NavBar";

import Footer from "./components/Footer";
export default {
  components: {
    Navbar: Navbar,
    Footer: Footer
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
header, footer {
  width:auto;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
</style>
