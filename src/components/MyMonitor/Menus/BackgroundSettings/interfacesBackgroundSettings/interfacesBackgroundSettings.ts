import { interfaceCompany } from "@/components/Platform/interfacesPlatform/interfacesPlatform";
import { InputHTMLAttributes, Ref } from "vue";
import { iModal } from "@/components/Platform/MyModal/interfacesMyModal/interfacesMyModal";

export interface saveChangeBackgroundProps {
  company: interfaceCompany;
  inputColor: InputHTMLAttributes;
  loader: Ref<HTMLElement>;
  backgroundSettings: iModal;
}

export interface openMenuProps {
  company: interfaceCompany;
  loader: Ref<HTMLElement>;
  e: MouseEvent;
  inputColor: InputHTMLAttributes;
  backgroundSettings: iModal;
}
