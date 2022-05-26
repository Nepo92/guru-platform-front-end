<template>
  <div class="login custom-scroll" :style="{ backgroundImage: background }">
    <form ref="loginForm" class="login__form">
      <h1 class="login__title">Вход</h1>
      <ul class="login__list">
        <li class="login__item username">
          <p class="login__name">Логин</p>
          <input
            type="text"
            name="username"
            class="login__input username__input"
            placeholder="Введите логин"
            @input="(e) => inputLogin(e)"
          />
          <ValidateError
            v-if="form.username.validateError"
            :props="form.username"
          />
        </li>
        <li class="login__item password">
          <p class="login__name">Пароль</p>
          <span
            :class="toggleIcon"
            class="password__icon"
            @click="() => сhangeDisplayPassword()"
          />
          <input
            :type="toggleType"
            name="password"
            class="login__input"
            placeholder="Введите пароль"
            @input="(e) => inputPassword(e)"
          />
          <ValidateError
            v-if="form.password.validateError"
            :props="form.password"
          />
        </li>
        <li class="login__item remember">
          <MyCheckbox :props="checkboxProps" @need-remember="isNeedRemember" />
        </li>
      </ul>
      <div class="login__nav">
        <div class="login__error" v-if="form.errorMessage">
          {{ form.errorMessage }}
        </div>
        <button
          type="button"
          class="login__button login__button--icon"
          @click="(e) => loginInPlatform(e)"
        >
          Войти
        </button>
      </div>
      <p class="login__forgot">
        Забыли пароль ? Пишите
        <a
          class="login__forgot--link"
          href="https://vk.com/app5898182_-185779370#s=425692"
          target="_blank"
        >
          сюда
        </a>
      </p>
    </form>
  </div>
  <MyLoader @create-loader="createLoader" />
</template>

<script lang="ts">
// styles
import "./MyLogin.scss";

// store
import { loginStore } from "./LoginStore/LoginStore";
import { mapActions, storeToRefs } from "pinia";

// vue
import { computed, InputHTMLAttributes, reactive, Ref } from "vue";

// utils
import LoginUser from "./LoginUser/LoginUser";

// components
import MyCheckbox from "@/components/UI/MyCheckbox/MyCheckBox.vue";
import MyLoader from "../UI/MyLoader/MyLoader.vue";
import ValidateError from "../UI/ValidateError/ValidateError.vue";

// interfaces
import { interfaceLoginForm } from "./interfaces/interfacesMyLogin";

const loginUser = new LoginUser();

const store = loginStore();

const { background, hidePassword } = storeToRefs(store);
const { сhangeDisplayPassword } = mapActions(loginStore, [
  "сhangeDisplayPassword",
]);

export default {
  components: {
    MyCheckbox,
    MyLoader,
    ValidateError,
  },
  setup() {
    const form: interfaceLoginForm = reactive({
      username: {
        required: true,
        value: "",
        validateError: false,
        validateErrorMessage: "",
      },
      password: {
        required: true,
        value: "",
        validateError: false,
        validateErrorMessage: "",
      },
      errorMessage: "",
      loader: null,
      "remember-me": false,
      validate: false,
    });

    const toggleIcon = computed(() => {
      return hidePassword.value ? "" : "close";
    });

    const toggleType = computed(() => {
      return hidePassword.value ? "password" : "text";
    });

    const inputLogin = (e: InputEvent) => {
      const t = e.target;

      const value: string = (t as InputHTMLAttributes).value;
      form.username.value = value.trim();
    };

    const inputPassword = (e: InputEvent) => {
      const t = e.target;

      const value: string = (t as InputHTMLAttributes).value;

      form.password.value = value.trim();
    };

    let createLoader = (e: Ref<HTMLElement>) => {
      form.loader = e;
    };

    const isNeedRemember = (e: Event) => {
      let t = e.target as HTMLInputElement;

      form["remember-me"] = t.checked;
    };

    const checkboxProps = reactive({
      text: "Запомнить меня",
      id: "remember",
      onChange: isNeedRemember,
    });

    const loginInPlatform = (e: any) => {
      loginUser.init(form, e);
    };

    return {
      background,
      hidePassword,
      сhangeDisplayPassword,
      toggleIcon,
      toggleType,
      loginInPlatform,
      inputLogin,
      inputPassword,
      form,
      checkboxProps,
      createLoader,
      isNeedRemember,
    };
  },
};
</script>
