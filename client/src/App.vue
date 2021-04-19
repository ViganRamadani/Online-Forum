<template>
  <div id="app">
    <header>
      <Navbar></Navbar>
    </header>
    <router-view />
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