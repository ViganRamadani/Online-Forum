<template>
  <div id="app">
    
    <header id="mainHeader">
      <Navbar></Navbar>
    </header>

    <router-view />
    <div id="report"></div>
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

<style src="./static/main.css"></style>