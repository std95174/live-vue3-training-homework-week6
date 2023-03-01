<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="pageChange( pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{active: pagination.current_page === i}" v-for="i in pagination.total_pages"
          :key="i">
        <a class="page-link" href="#" @click.prevent="pageChange(i)"> {{ i }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="pageChange(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapState} from "pinia";
import {adminProductStore} from "@/stores/adminProductStore";

export default {
  name: "PaginationComponent",
  props: {
    // pagination: {
    //   type: Object,
    //   required: true
    // }
  },
  methods: {
    async pageChange(page) {
      if (page !== this.pagination.current_page || page >= 0 || page <= this.pagination.total_pages) {
        await adminProductStore().getProducts(page)
      }
    }
  },
  computed: {
    ...mapState(adminProductStore, ['pagination'])
  }
}
</script>

<style scoped>

</style>
