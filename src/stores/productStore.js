import {defineStore} from 'pinia';
import axios from "axios";

export const productStore = defineStore('productStore', {
    state: () => ({
        products: [],
        selectedProduct: {},
        carts: []
    }),
    actions: {
        selectProduct(product) {
            this.selectedProduct = product;
        },
        async getProducts() {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/all`)
            this.products = data.products.map(product => {
                return {
                    ...product,
                    isCartLoading: false,
                    isInfoLoading: false
                }
            });
        },
        async addProductToCart(product, amount) {
            product.isCartLoading = true
            const index = this.carts.findIndex(item => item.product_id === product.id)
            if(index !== -1) {
                await this.updateCartItem(this.carts[index], this.carts[index].qty + amount)
                product.isCartLoading = false
                return
            }
            await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
                data: {
                    product_id: product.id,
                    qty: amount
                }
            })
            await this.getCarts()
            product.isCartLoading = false;
            window.alert('已加入購物車');
        },
        async clearCarts() {
            await axios.delete(`${import.meta.env.VITE_API_URL}/carts`);
            await this.getCarts()
            window.alert('購物車已清空');
        },
        async removeCartItem(cartItem) {
            await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${cartItem.id}`);
            await this.getCarts()
            window.alert('已從購物車移除');
        },
        async getCarts() {
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`);
                this.carts = data.data.carts;
            } catch (e) {
                if (e.response.status === 400) {
                    this.carts = []
                }
                throw e
            }
        },
        async updateCartItem(item, amount) {
            if (amount === 0) {
                await this.removeCartItem(item)
                await this.getCarts()
                return
            }
            await axios.put(`${import.meta.env.VITE_API_URL}/cart/${item.id}`, {
                data: {
                    product_id: item.product_id,
                    qty: amount
                }
            })
            await this.getCarts()
            window.alert('已更新購物車');
        },
        async submitOrder(order) {
            if (this.carts.length === 0) {
                window.alert('購物車是空的');
                return
            }
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/order`, {
                    data: order
                })
                await this.getCarts()
                window.alert('訂單已送出');
            } catch (e) {
                window.alert(e.response.data.message);
            }
        }
    },
    getters: {},
})
