import Utils from "../../../../../../../utils/utils.js";
import SaveFunnel from "./saveFunnel.js";
import FunnelTemplates from "../../../templates/funnelTemplates.js";

const utils = new Utils();
const saveFunnel = new SaveFunnel();
const funnelTemplates = new FunnelTemplates();

class OpenMenu {
  init(props) {
    const addBtn = document.querySelector("[js-funnels-add]");

    if (addBtn) {
      const openAddMenu = this.openAddMenu.bind(this, props);

      const add = utils.setCloneElement(addBtn);
      add.addEventListener("click", openAddMenu);
    }
  }

  openAddMenu(props) {
    const { menu } = props;

    this.clearFunnelMenu(props);

    utils.openModalAnimation(menu, true);

    const items = [saveFunnel];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  clearFunnelMenu(props) {
    const { menu } = props;

    const form = menu.querySelector("[js-funnel-form]");

    if (form) {
      Array.from(form.children).forEach((item) => item.remove());

      form.insertAdjacentHTML("afterbegin", funnelTemplates.addFunnelMenu());
    }
  }
}

export default OpenMenu;
