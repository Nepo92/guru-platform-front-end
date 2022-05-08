import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/Router.js'
import { createPinia } from 'pinia'

const platform = createApp(App);

platform.use(createPinia());

platform.use(router).mount('#app')
