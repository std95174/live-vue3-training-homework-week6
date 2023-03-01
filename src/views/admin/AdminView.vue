<template>
  <header>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link active">回首頁</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :to="{name: 'AdminProducts'}" class="nav-link active">管理商品</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :to="{name: 'AdminOrders'}" class="nav-link active">管理訂單</RouterLink>
      </li>
      <li class="nav-item" @click="logout">
        <a class="btn btn-link nav-link active">登出</a>
      </li>
    </ul>
  </header>

  <section class="container">
    <router-view></router-view>
  </section>
</template>

<script>
import {RouterView, RouterLink} from "vue-router";
export default {
  name: "AdminView",
  components: {
    RouterView,
    RouterLink
  },
  methods:{
    logout() {
      this.$router.push({name: 'Index'})

      // remove cookie
      document.cookie = `hexToken=; expires=${new Date()}; path=/`;
    }
  }
}
</script>
