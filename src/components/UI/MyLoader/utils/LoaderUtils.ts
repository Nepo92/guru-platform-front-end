import { Ref } from "vue";

class LoaderUtils {
  showLoader(loader: Ref<HTMLElement> | null) {
    if (!loader) return false;

    console.log(loader);
    console.log(loader.value);

    loader.value.classList.add("show");
  }

  hideLoader(loader: Ref<HTMLElement> | null) {
    if (!loader) return false;

    loader.value.classList.remove("show");
  }
}

export default LoaderUtils;
