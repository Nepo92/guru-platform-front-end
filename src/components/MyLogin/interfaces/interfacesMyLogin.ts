import { Ref } from "vue";

export interface interfaceLoginForm {
  username: {
    required: Boolean;
    value: string | Blob;
    validateError: Boolean;
    validateErrorMessage: String;
  };
  password: {
    required: Boolean;
    value: string | Blob;
    validateError: Boolean;
    validateErrorMessage: String;
  };
  errorMessage: string | Blob;
  loader: Ref<HTMLElement> | null;
  "remember-me": boolean;
  validate: Boolean;
}
