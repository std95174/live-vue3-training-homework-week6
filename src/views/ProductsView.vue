<template>
  <div class="mt-4">
    <table class="table align-middle">
      <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td class="w-10">
          <img :src="product.imageUrl" alt="product picture" width="100" class="img-fluid"/>
        </td>
        <td>
          {{ product.title }}
        </td>
        <td>
          <del class="h6">原價 {{ product.origin_price }} 元</del>
          <div class="h5">現在只要 {{ product.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary" @click="showProduct(product)">
              <i class="fas fa-spinner fa-pulse"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger" @click="addProductToCart(product, 1)"
                    :disabled="product.isCartLoading">
              <i class="fas fa-spinner fa-pulse" v-if="product.isCartLoading"></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {productStore} from "@/stores/productStore";
import {loadingStore} from "@/stores/loadingStore";

export default {
  name: "ProductsView",
  methods: {
    ...mapActions(productStore, ['selectProduct', 'addProductToCart', 'getProducts']),
    ...mapActions(loadingStore, ['setIsLoading']),
    showProduct(product) {
      this.$router.push({name: 'Product', params: {id: product.id}}
      )
    },
  },
  async mounted() {
    this.setIsLoading(true);
    await this.getProducts();
    this.setIsLoading(false);
  },
  computed: {
    ...mapState(productStore, ['products'])
  }
}
</script>

<style scoped>

</style>
