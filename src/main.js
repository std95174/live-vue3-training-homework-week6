import {createApp} from 'vue'
import {createPinia} from 'pinia'
import './assets/all.scss';
import 'bootstrap';

import App from './App.vue'
import router from './router'

// import VeeValidate
import * as VeeValidate from 'vee-validate';
import VeeValidateRules from '@vee-validate/rules';
import * as VeeValidateI18n from '@vee-validate/i18n';

import zh_TW from './assets/zh_TW.json'

Object.keys(VeeValidateRules).forEach(rule => {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
});

VeeValidate.defineRule('tw-phone-number', value => {
    const regex = /^09\d{8}$/;
    if (!regex.test(value)) {
        return '請輸入正確的手機號碼，應為 09 開頭'
    }
    return true
});

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW', zh_TW),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
    .component('VForm', VeeValidate.Form)
    .component('VField', VeeValidate.Field)
    .component('ErrorMessage', VeeValidate.ErrorMessage)

app.mount('#app')
