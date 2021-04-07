<template>
  <div id="app">
    <header>
      <Navbar></Navbar>
    </header>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/NavBar";
export default {
  components: {
    Navbar: Navbar
  },
  data() {
    return {};
  }
};
</script>
