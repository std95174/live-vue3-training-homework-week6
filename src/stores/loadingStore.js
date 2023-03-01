import {defineStore} from "pinia";

export const loadingStore = defineStore('loadingStore', {
    state: () => ({isLoading: false}),
    getters: {},
    actions: {
        setIsLoading(isLoading) {
            this.isLoading = isLoading
        },
    },
})
