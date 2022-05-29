import { Ref } from "vue";

export interface iLoginProps {
  form: interfaceLoginForm;
  loader: Ref<HTMLElement>;
}

export interface interfaceLoginForm {
  username: {
    required: Boolean;
    value: string | Blob;
    validateError: boolean;
    validateErrorMessage: String;
  };
  password: {
    required: Boolean;
    value: string | Blob;
    validateError: boolean;
    validateErrorMessage: String;
  };
  errorMessage: string | Blob;
  "remember-me": boolean;
  validate: Boolean;
}
