<template>
  <div class="login" custom-scroll :style="{ backgroundImage: background }">
    <form class="login__form" action="/perform_login" method="POST">
      <h1 class="login__title">Вход</h1>
      <ul class="login__list">
        <li class="login__item username">
          <p class="login__name">Логин</p>
          <input
            type="text"
            name="username"
            class="login__input username__input"
            placeholder="Введите логин"
          />
        </li>
        <li class="login__item password">
          <p class="login__name">Пароль</p>
          <span :class="toggleIcon" class="password__icon" @click="сhangeDisplayPassword;" />
          <input
            :type="toggleType"
            name="password"
            class="login__input"
            placeholder="Введите пароль"
          />
        </li>
        <li class="login__item remember">
          <input id="remember" type="checkbox" class="checkbox" />
          <label class="checkbox__label" for="remember">
            <span class="checkbox__fake" />
            <span class="checkbox__text remember__text">Запомнить меня</span>
          </label>
        </li>
      </ul>
      <div class="login__nav">
        <button type="submit" class="login__button login__button--icon">Войти</button>
      </div>
      <p class="login__forgot">
        Забыли пароль ? Пишите
        <a class="login__forgot--link" href="https://vk.com/app5898182_-185779370#s=425692">сюда</a>
      </p>
    </form>
  </div>
</template>

<script>
import "@/assets/scss/checkbox.scss";
import "./MyLogin.scss";
import { loginStore } from "./loginStore/loginStore.js";
import { mapActions, storeToRefs } from "pinia";

export default {
  setup() {
    const store = loginStore();

    const { background, hidePassword } = storeToRefs(store);
    const { сhangeDisplayPassword } = mapActions(loginStore, ["сhangeDisplayPassword"]);

    return {
      background,
      hidePassword,
      сhangeDisplayPassword,
    };
  },
  computed: {
    toggleIcon() {
      return this.hidePassword ? "" : "close";
    },
    toggleType() {
      return this.hidePassword ? "password" : "text";
    },
  },
};
</script>
