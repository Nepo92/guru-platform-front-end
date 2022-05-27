import { iModal } from "../interfacesMyModal/interfacesMyModal";

class ModalUtils {
  openMenu(props: iModal) {
    const { modal, wrapper, isOverflowed } = props;

    if (modal && wrapper) {
      modal.value.classList.add("open__wrapper");

      setTimeout(() => {
        modal.value.classList.add("open");
      }, 100);

      setTimeout(() => {
        wrapper.value.classList.add("open");
      }, 0);
    }

    this.#setOverflow(isOverflowed);
  }

  closeMenu(props: iModal) {
    const { modal, wrapper, isOverflowed } = props;

    if (modal && wrapper) {
      setTimeout(() => {
        wrapper.value.classList.remove("open");
      }, 0);

      setTimeout(() => {
        modal.value.classList.remove("open");
      }, 200);

      setTimeout(() => {
        modal.value.classList.remove("open__wrapper");
      }, 400);
    }

    this.#setOverflow(isOverflowed);
  }

  #setOverflow(isOverflowed: boolean) {
    if (isOverflowed) {
      document.body.style.overflow = "hidden";
    } else if (!isOverflowed && isOverflowed !== null) {
      document.body.style.overflow = "auto";
    }
  }
}

export default ModalUtils;
