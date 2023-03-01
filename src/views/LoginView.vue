<template>
  <div class="d-flex align-items-center h-100">
    <form class="w-25 mx-auto">
      <div class="form-group mb-3">
        <label for="username">帳號</label>
        <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="請輸入帳號"
               v-model="user.username">
      </div>
      <div class="form-group mb-3">
        <label for="password">密碼</label>
        <input type="password" class="form-control" id="password" @keydown.enter="login" placeholder="請輸入密碼"
               v-model="user.password">
      </div>
      <span :class="isSuccess?'text-success':'text-danger'">{{ message }}</span>
      <div class="text-center">
        <button type="button" class="btn btn-primary" @click="login" :disabled="isBtnDisabled">登入</button>
      </div>
    </form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      message: "",
      isSuccess: false,
      isBtnDisabled: false
    };
  },
  methods: {
    async login() {
      try {
        const {data} = await axios.post(`https://vue3-course-api.hexschool.io/v2/admin/signin`, this.user);
        console.log(data)
        // store to cookie
        if (data.success) {
          const {token, expired} = data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
          this.message = '登入成功'
          this.isBtnDisabled = true
          this.isSuccess = true
          // redirect to admin page
          await this.$router.push({name: "AdminProducts"});
        } else {
          this.message = '登入失敗，請確認帳號密碼'
        }
      } catch (e) {
        if (e) {
          this.message = '登入失敗，請確認帳號密碼'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
