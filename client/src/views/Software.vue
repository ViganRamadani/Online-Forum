<template>
  <div>
    <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/createcategorypost">Create Student</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/listcategorypost">View Students</router-link>
          </li>
        </ul>
         <div class="container mt-5">
        <router-view></router-view>
         </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  }
};
</script>