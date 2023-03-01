<template>
  <overlay-loading v-if="isLoading"></overlay-loading>
  <router-view></router-view>
</template>

<script>
import {RouterView} from 'vue-router'
import OverlayLoading from "@/components/OverlayLoading.vue";
import {mapState} from "pinia";
import {loadingStore} from "@/stores/loadingStore";

export default {
  name: 'App',
  components: {
    RouterView,
    OverlayLoading
  },
  computed: {
    ...mapState(loadingStore, ['isLoading'])
  }
}
</script>

