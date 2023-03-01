<template>
  <div class="container mt-3">
    <div class="text-end">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateProductModal"
              @click="setIsNew(true); clearProduct()">
        建立新產品
      </button>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col">原價</th>
        <th scope="col">售價</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <th>{{ product.category }}</th>
        <td>{{ product.title }}</td>
        <td>{{ product.origin_price }}</td>
        <td>{{ product.price }}</td>
        <td :class="product.is_enabled?'text-success':''">{{ product.is_enabled ? '已啟用' : '未啟用' }}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-3" data-bs-toggle="modal"
                  data-bs-target="#updateProductModal" @click="showUpdateProductModal(product)">編輯
          </button>
          <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteProductModal"
                  @click="showDeleteProductModal(product)">刪除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <pagination ></pagination>
  </div>

  <!--  Update Product Modal -->
  <update-product-modal ref="update-product-modal"></update-product-modal>

  <!-- Delete Product Modal -->
  <delete-product-modal ref="delete-product-modal"></delete-product-modal>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {adminProductStore} from "@/stores/adminProductStore";
import Pagination from "../../components/PaginationComponent.vue";
import DeleteProductModal from "../../components/DeleteProductModal.vue";
import UpdateProductModal from "../../components/UpdateProductModal.vue";

export default {
  name: "AdminProductsView",
  components: {Pagination, DeleteProductModal, UpdateProductModal},
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(adminProductStore, ['clearProduct', 'getProducts', 'selectProduct', 'setIsNew']),
    showUpdateProductModal(product) {
      this.selectProduct({...product});
      this.setIsNew(false);
    },
    showDeleteProductModal(product) {
      this.selectProduct(product);
    }
  },
  computed: {
    ...mapState(adminProductStore, ['products', 'pagination', 'selectedProduct', 'isNew'])
  },
  async mounted() {
    await this.getProducts();
  },
}
</script>

<style scoped>

</style>
