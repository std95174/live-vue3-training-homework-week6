<template>
  <h1>這是訂單頁面</h1>
  <!--  bs table-->
  <table class="table">
    <thead>
    <tr>
      <th scope="col">消費者</th>
      <th scope="col">已付款/尚未付款</th>
      <th scope="col">留言</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in orders" :key="order.id">
      <th>{{ order.user.name }}</th>
      <td>
        <span class="badge rounded-pill bg-success ms-2" v-if="order.is_paid">已付款</span>
        <span class="badge rounded-pill bg-danger ms-2" v-else>尚未付款</span>
      </td>
      <td>{{ order.message }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
import {getToken} from "@/common/token";

export default {
  name: "AdminOrdersView",
  data() {
    return {
      orders: []
    };
  },
  methods: {},
  computed: {},
  async mounted() {
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`, {
      headers: {
        Authorization: `${getToken()}`
      }
    })
    this.orders = data.orders;
  },
};
</script>
