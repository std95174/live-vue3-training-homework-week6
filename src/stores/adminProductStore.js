import {defineStore} from "pinia";
import axios from "axios";
import {loadingStore} from "./loadingStore.js";
import {getToken} from "@/common/token";

export const adminProductStore = defineStore('adminProductStore', {
    state: () => ({
        products: [],
        selectedProduct: {
            category: "",
            content: "",
            description: "",
            id: "",
            imageUrl: "",
            imagesUrl: [],
            is_enabled: 0,
            origin_price: 0,
            price: 0,
            title: "",
            unit: "單位",
            num: 0,
            rating: 0
        },
        pagination: {
            total_pages: 1,
            current_page: 1,
        },
        isNew: true
    }),
    getters: {},
    actions: {
        async getProducts(page = 1) {
            loadingStore().setIsLoading(true)
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/admin/products?page=${page}`,
                    {headers: {Authorization: `${getToken()}`}}
                );
                this.products = data.products
                this.pagination = data.pagination
            } catch (e) {
                alert(e.response.data.message)
            } finally {
                loadingStore().setIsLoading(false)
            }
        },
        selectProduct(product) {
            this.selectedProduct = product
        },
        clearProduct() {
            this.selectedProduct = {
                category: "",
                content: "",
                description: "",
                id: "",
                imageUrl: "",
                imagesUrl: [],
                is_enabled: 0,
                origin_price: 0,
                price: 0,
                title: "",
                unit: "單位",
                num: 0,
                rating: 0
            }
        },
        setIsNew(isNew) {
            this.isNew = isNew
        }
    },
})
