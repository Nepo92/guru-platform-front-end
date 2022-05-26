import { Ref } from "vue";

export interface iModal {
  modal: Ref<HTMLElement>;
  wrapper: Ref<HTMLElement>;
  isOverflowed: boolean;
}

export interface iModalWrapper {
  applyText: string;
  apply(e: MouseEvent): void;
  title: string;
  hasCancel: boolean;
  cancel(): void;
  cancelText: string;
  nested: boolean;
}
