<template>
  <!-- Create/Edit Product Modal -->
  <div class="modal fade" id="updateProductModal" tabindex="-1" aria-labelledby="updateProductModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="updateProductModalLabel">
            {{ `${isNew ? '新增' : '更新'}` }}產品</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <form>
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input type="text" class="form-control" id="title" v-model="selectedProduct.title">
                </div>
                <div class="mb-3">
                  <label for="title" class="form-label">描述</label>
                  <textarea type="text" class="form-control" id="content" v-model="selectedProduct.content"></textarea>
                </div>
                <div class="mb-3">
                  <label for="title" class="form-label">說明</label>
                  <textarea type="text" class="form-control" id="description"
                            v-model="selectedProduct.description"></textarea>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label for="category" class="form-label">分類</label>
                    <input type="text" class="form-control" id="category" v-model="selectedProduct.category">
                  </div>
                  <div class="col">
                    <label for="unit" class="form-label">單位</label>
                    <input type="text" class="form-control" id="unit" v-model="selectedProduct.unit">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label for="origin-price" class="form-label">原價</label>
                    <input type="number" class="form-control" id="origin-price"
                           v-model.number="selectedProduct.origin_price">
                  </div>
                  <div class="col">
                    <label for="price" class="form-label">售價</label>
                    <input type="number" class="form-control" id="price" v-model.number="selectedProduct.price">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label class="form-label">商品評價</label>
                    <div>
                      <a href="#" class="text-decoration-none text-warning" @click.prevent="selectedProduct.rating = n"
                         v-for="n in 5" :key="n"><span
                          class="material-symbols-outlined">{{
                          n <= selectedProduct.rating ? 'stars' : 'star'
                        }}</span></a>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-check form-switch">

                      <label class="form-check-label" for="is-enabled">是否啟用</label>
                      <input class="form-check-input" type="checkbox" id="is-enabled" role="switch" :true-value="1"
                             :false-value="0"
                             v-model="selectedProduct.is_enabled">
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="image-url" class="form-label">產品主圖</label>
                  <div class="col">
                    <input type="text" class="form-control" id="image-url" placeholder="請輸入主圖網址"
                           v-model="selectedProduct.imageUrl">
                  </div>
                  <div class="col input-group">
                    <input type="file" class="form-control" @change="uploadMainImage" ref="image-file">
                    <button type="button" class="btn btn-outline-danger" @click="clearMainImageFile">X</button>
                  </div>
                  <div class="text-center">
                    <img class="img-fluid w-50 mt-3" :src="selectedProduct.imageUrl" alt="產品主圖"
                         v-if="selectedProduct.imageUrl.length > 0">
                  </div>
                </div>
              </form>
            </div>
            <div class="col">
              <div class="text-end mb-3">
                <button type="button" class="btn btn-outline-primary me-3" @click="addImage">新增圖片</button>
                <button type="button" class="btn btn-outline-success" @click="uploadImageFile">上傳圖片</button>
              </div>
              <hr>
              <form>
                <div class="row mb-3">
                  <div class="col-6" v-for="(url, n) in selectedProduct.imagesUrl" :key="url.id">
                    <label :for="`image-url-${n + 1}`" class="form-label">圖片網址 {{ n + 1 }}</label>
                    <div class="input-group">

                      <input type="text" class="form-control" :id="`image-url-${n + 1}`"
                             :placeholder="`請輸入圖片網址 ${n + 1}`"
                             v-model="selectedProduct.imagesUrl[n]">
                      <button type="button" class="btn btn-outline-danger" @click="removeImagesUrl(n)">X</button>
                    </div>
                    <div class="text-start">
                      <img class="img-fluid w-100 mt-3" :src="selectedProduct.imagesUrl[n]" :alt="`產品圖片 ${n}`"
                           v-if="selectedProduct.imagesUrl[n].length">
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateProduct(isNew)">
            {{ isNew ? '新增' : '更新' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {adminProductStore} from "@/stores/adminProductStore";
import {loadingStore} from "@/stores/loadingStore";
import {getToken} from "@/common/token";
import axios from "axios";

export default {
  name: "UpdateProductModal",
  data() {
    return {
      modal:{}
    }
  },
  methods: {
    async updateProduct(isNew) {
      loadingStore().setIsLoading(true)
      this.selectedProduct.origin_price = Number(this.selectedProduct.origin_price)
      this.selectedProduct.price = Number(this.selectedProduct.price)
      if (isNew) {
        try {
          const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/admin/product`, {data: this.selectedProduct},
            {
              headers: {
                Authorization: `${getToken()}`
              }
            }
          )
          if (data.success) {
            await adminProductStore().getProducts()
          }
          alert('產品新增成功')
        } catch (e) {
          alert('產品新增失敗')
        } finally {
          loadingStore().setIsLoading(false)
        }
      } else {
        try {
          const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/admin/product/${this.selectedProduct.id}`, {
            data: this.selectedProduct
          },
              {
                headers: {
                  Authorization: `${getToken()}`
                }
              }
          )
          if (data.success) {
            await adminProductStore().getProducts()
          }
          alert('產品更新成功')
        } catch (e) {
          alert('產品更新失敗')
        } finally {
          loadingStore().setIsLoading(false)
        }
      }
    },
    async uploadMainImage(event) {
      if (event.target.files.length === 0) return
      loadingStore().setIsLoading(true)

      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      try {
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/admin/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.selectedProduct.imageUrl = data.imageUrl
        alert('圖片上傳成功')
      } catch (e) {
        alert('圖片上傳失敗，請重新上傳')
      } finally {
        loadingStore().setIsLoading(false)
      }
    },
    clearMainImageFile() {
      this.$refs['image-file'].value = ''
    },
    addImage() {
      const imagesUrl = this.selectedProduct.imagesUrl
      if (imagesUrl[imagesUrl.length - 1] === '') return
      imagesUrl.push('')
    },
    removeImagesUrl(index) {
      this.selectedProduct.imagesUrl.splice(index, 1)
    },
    async uploadImageFile() {
      // javascript file input
      const input = document.createElement('input')
      input.type = 'file'

      input.addEventListener('change', async (event) => {
        loadingStore().setIsLoading(true)

        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file-to-upload', file)
        try {
          const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/admin/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          const imagesUrl = this.selectedProduct.imagesUrl
          if (imagesUrl[imagesUrl.length - 1] === '') {
            imagesUrl[imagesUrl.length - 1] = data.imageUrl
          } else {
            imagesUrl.push(data.imageUrl)
          }
          alert('圖片上傳成功')
        } catch (e) {
          alert('圖片上傳失敗，請重新上傳')
        } finally {
          loadingStore().setIsLoading(false)
        }
      })
      input.click()
    },
  },
  computed: {
    ...mapState(adminProductStore, ['selectedProduct', 'isNew'])
  }
}
</script>

<style scoped>
</style>
