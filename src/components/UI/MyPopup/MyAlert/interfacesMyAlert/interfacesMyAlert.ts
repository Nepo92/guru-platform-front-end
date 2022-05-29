import { Ref } from "vue";

export interface iMyAlert {
  popup: Ref<HTMLElement>;
  title: string;
  description: string;
}
