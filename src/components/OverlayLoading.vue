<template>
  <div class="position-absolute h-100 w-100 loading">
    <div class="spinner-grow position-absolute top-50 start-50 " role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {loadingStore} from "@/stores/loadingStore";

export default {
  name: "OverlayLoading",
  computed: {
    ...mapState(loadingStore, ['isLoading'])
  }
}
</script>

<style scoped>
.loading {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
}
</style>
