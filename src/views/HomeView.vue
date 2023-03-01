<template>
  <header>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link active">首頁</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/products" class="nav-link active">商品列表</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/cart" class="nav-link active">購物車</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/admin" class="nav-link active">管理後台</RouterLink>
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
  name: "HomeView",
  components: {
    RouterView,
    RouterLink
  }
}
</script>
