import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/router";
import { createPinia } from "pinia";

const platform = createApp(App);
platform.use(createPinia());

platform.use(router).mount("#app");
