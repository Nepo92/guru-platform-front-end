import Utils from '../../../../../../../../../../utils/utils.js';
import { dealAPI, homeworkAPI } from '../../../../../../../../../../api/api.js';
import AfterChangeProduct from './afterChangeProduct.js';

const afterChangeProduct = new AfterChangeProduct();
const utils = new Utils();

class ChangeAccessProduct {
  init(tabPack, e) {
    const t = e.target;
    const { menu } = tabPack;
    tabPack.target = utils.getParent(t, 'platform__toggle') || t;

    const toggle = menu.querySelector('[access-product-tab]');

    if (toggle) {
      const change = this.changeAccess.bind(this, tabPack);
      const toggleAccess = utils.setCloneElement(toggle);

      toggleAccess.addEventListener('change', change);
    }
  }

  changeAccess(tabPack, e) {
    const { deal, pack } = tabPack;
    const t = e.target;

    const data = {
      id: deal.id || deal,
      idClient: deal.idClient,
      value: t.checked,
    };

    const label = utils.getParent(t, 'right__access').querySelector('label');

    const classData = {
      label,
      data,
      tabPack,
    };

    this.toggleClassActive(classData);

    label.style.pointerEvents = 'none';

    const { role } = pack;

    let changeProduct;

    if (role === 'ROLE_CURATOR') {
      changeProduct = homeworkAPI.changeAccessToDeal(data);
    } else {
      changeProduct = dealAPI.changeAccessToDeal(data);
    }

    const loader = setTimeout(utils.showLoader, 400);

    changeProduct.then(() => {
      clearTimeout(loader);
      utils.hideLoader();

      label.style.pointerEvents = 'all';

      const items = [afterChangeProduct];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(tabPack);
      });
    }, () => {
      label.style.pointerEvents = 'all';
    });
  }

  toggleClassActive(classData) {
    const { label, data, tabPack } = classData;

    if (data.value) {
      label.classList.add('active');
      tabPack.activeProduct = true;
    } else {
      label.classList.remove('active');
      tabPack.activeProduct = false;
    }
  }
}

export default ChangeAccessProduct;
