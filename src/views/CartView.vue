<template>
  <div class="mt-3">
    <div class="text-end" v-if="carts.length!==0">
      <button class="btn btn-outline-danger" type="button" @click="clearCarts">清空購物車</button>
    </div>
    <div v-if="carts.length===0" class="text-center text-decoration-underline">
      購物車還是空的喔！
    </div>
    <table class="table align-middle" v-else>
      <thead>
      <tr>
        <th></th>
        <th class="w-25">商品名稱</th>
        <th class="w-25">數量/單位</th>
        <th class="w-25">小計</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in carts" :key="item.id">
        <td>
          <button type="button" class="btn-close" aria-label="Close" @click="removeCartItem(item)"></button>
        </td>
        <td>
          {{ item.product.title }}
        </td>
        <td class="align-middle">
          <div class="input-group">
            <input type="number" class="form-control" placeholder="請輸入購買數量" aria-label="購買數量"
                   aria-describedby="basic-addon2" min="0" v-model.number="item.qty"
                   @focusout="updateCartItem(item, item.qty)">
            <span class="input-group-text" id="basic-addon2">{{ item.product?.unit }}</span>
          </div>
        </td>
        <td>
          <span v-if="item.qty===0">將自購物車中移除</span>
          <span v-else>
              {{ item.product.price * item.qty }} 元
            </span>
        </td>
      </tr>
      </tbody>
    </table>

    <order-form></order-form>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {productStore} from "@/stores/productStore";
import {loadingStore} from "@/stores/loadingStore";
import OrderForm from "@/components/OrderForm.vue";

export default {
  name: "ShoppingCart",
  components: {OrderForm},
  methods: {
    ...mapActions(productStore, ['clearCarts', 'getCarts', 'removeCartItem', 'updateCartItem']),
    ...mapActions(loadingStore, ['setIsLoading']),
  },
  async mounted() {
    this.setIsLoading(true);
    await this.getCarts();
    this.setIsLoading(false);
  },
  computed: {
    ...mapState(productStore, ['carts'])
  }
}
</script>

<style scoped>

</style>
