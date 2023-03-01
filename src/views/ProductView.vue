<template>
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title fs-5" id="exampleModalToggleLabel">商品資訊</h3>
      </div>
      <div class="modal-body">
        <div class="card">
          <div class="row">
            <div class="card-body col-md-6">
              <img :src="product.imageUrl" class="img-fluid mb-3" alt="product image">
              <div class="ms-3">

                <h1 class="card-title">{{ product.title }}</h1>
                <span class="badge rounded-pill bg-success text-light">{{ product.category }}</span>
              </div>
            </div>
            <div class="card-body col-md-6">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <h5>商品內容</h5>
                  <p>{{ product.content }}</p>
                </li>
                <li class="list-group-item">
                  <h5>商品描述</h5>
                  <p>{{ product.description }}</p>
                </li>
                <li class="list-group-item">
                  <h5>商品價格</h5>
                  <del class="h6">原價 {{ product.origin_price }} 元</del>
                  <div class="h5">現在只要 {{ product.price }} 元</div>
                </li>
              </ul>
              <div class="input-group mb-3">
                <input type="number" min="1" class="form-control" placeholder="請輸入數量"
                       aria-label="Recipient's username"
                       aria-describedby="button-addon2" v-model.number="amount">
                <button class="btn btn-outline-primary" type="button" id="button-addon2"
                        @click="addProductToCart(product, amount)">
                  <i class="fas fa-spinner fa-pulse" v-if="product.isCartLoading"></i>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions} from "pinia";
import {productStore} from "@/stores/productStore";

export default {
  name: "ProductModal",
  data() {
    return {
      amount: 1,
      product: {}
    };
  },
  methods: {
    ...mapActions(productStore, ['addProductToCart']),
  },
  async mounted() {
    await axios.get(`${import.meta.env.VITE_API_URL}/product/${this.$route.params.id}`)
        .then((res) => {
          this.product = res.data.product
        })
        .catch((err) => {
          console.log(err)
        })
  },
}
</script>

<style scoped>

</style>
