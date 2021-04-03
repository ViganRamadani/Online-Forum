<template>
  <div id="dropdown">
    <div class="menu-items" @click="isOpen = !isOpen">
      <a href="#">{{ title }}</a>
      <svg viewBox="0 0 1030 638" width="10">
        <path
          d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
          fill="#FFF"
        ></path>
      </svg>

      <transition name="fade" appear>
        <div class="sub-menu" v-if="isOpen">
          <div v-for="(item, i) in items" :key="i" class="menu-items">
            <a :href="item.link">{{ item.title }}</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: ["title", "items"],
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style>
nav .menu-items svg {
  width: 10px;
  margin-left: 10px;
}

nav .menu-items .sub-menu {
  position: absolute;
  background-color: #222;
  top: calc(100% + 18px);
  left: 15%;
  transform: translateX(-15%);
  width: max-content;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>