<template>
  <div class="login custom-scroll" :style="{ backgroundImage: background }">
    <form ref="loginForm" class="login__form">
      <h1 class="login__title">Вход</h1>
      <ul class="login__list">
        <li class="login__item username">
          <p class="login__name">Логин</p>
          <input
            v-model="form.username.value"
            type="text"
            name="username"
            class="login__input username__input"
            placeholder="Введите логин"
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
            v-model="form.password.value"
            :type="toggleType"
            name="password"
            class="login__input"
            placeholder="Введите пароль"
          />
          <ValidateError
            v-if="form.password.validateError"
            :props="form.password"
          />
        </li>
        <li class="login__item remember">
          <MyCheckbox
            :id="`${checkboxProps.id}`"
            :text="checkboxProps.text"
            :onChange="checkboxProps.onChange"
          />
        </li>
      </ul>
      <div class="login__nav">
        <div v-if="form.errorMessage" class="login__error">
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
import "./MyLogin.scss";
import { loginStore } from "./loginStore/loginStore";
import { mapActions, storeToRefs } from "pinia";
import { computed, reactive, Ref } from "vue";
import LoginUser from "./LoginUser/LoginUser";
import MyCheckbox from "@/components/UI/MyCheckbox/MyCheckBox.vue";
import MyLoader from "../UI/MyLoader/MyLoader.vue";
import ValidateError from "../UI/ValidateError/ValidateError.vue";

const loginUser = new LoginUser();

const store = loginStore();

const { background, hidePassword, form } = storeToRefs(store);
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
    let loader: Ref<HTMLElement>;

    const toggleIcon = computed(() => {
      return hidePassword.value ? "" : "close";
    });

    const toggleType = computed(() => {
      return hidePassword.value ? "password" : "text";
    });

    let createLoader = (e: Ref<HTMLElement>) => {
      loader = e;
    };

    const isNeedRemember = (e: Event) => {
      let t = e.target as HTMLInputElement;

      form.value["remember-me"] = t.checked;
    };

    const onChange = isNeedRemember.bind(this);

    const checkboxProps = reactive({
      text: "Запомнить меня",
      id: "remember",
      onChange,
    });

    const loginInPlatform = (e: MouseEvent) => {
      const loginProps = {
        form: form.value,
        loader,
      };

      loginUser.init(loginProps, e);
    };

    return {
      background,
      hidePassword,
      сhangeDisplayPassword,
      toggleIcon,
      toggleType,
      loginInPlatform,
      form,
      checkboxProps,
      createLoader,
      isNeedRemember,
    };
  },
};
</script>
