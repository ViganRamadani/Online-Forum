<template>
  <div id="dropdown">
    <!-- @click="isOpen = !isOpen" -->
    <button id="dropdownToggle" class="menu-items" >
      <router-link :to="dropDownLink"> {{ title }} </router-link>
      <svg viewBox="0 0 1030 638" width="10">
        <path
          d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
          fill="#FFF"
        ></path>
      </svg>

      <transition name="fade" appear>
        <div class="sub-menu">
          <div v-for="(item, i) in items" :key="i" class="menu-items">
            <a :href="item.link">{{ item.title }}</a>
          </div>
        </div>
      </transition>
    </button>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: ["title", "items", "dropDownLink"], //@ Passing the propperty to be filled on NavBar.vue
  data() {
    return {
      isOpen: false
    };
  },
};
</script>

<style >
#dropdown {
  z-index: 1;
  padding: 0.5rem 0;
} 

#dropdownToggle {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
}#dropdownToggle:focus-within > .sub-menu{
  opacity: 100;
  pointer-events: all;
}

nav .menu-items svg {
  width: 10px;
  margin-left: 10px;
}

.sub-menu {
  position: absolute;
  background-color: #222;
  opacity: 0;
  pointer-events: none;
  top: calc(100% + 18px);
  left: 15%;
  transform: translateX(-15%);
  width: max-content;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
  transition: all 0.2s;
}
</style>
