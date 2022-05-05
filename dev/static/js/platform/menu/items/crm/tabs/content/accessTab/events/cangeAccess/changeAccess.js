import Utils from '../../../../../../../../utils/utils.js';
import ChangeAccessProduct from './events/changeAccessProduct/changeAccessProduct.js';
import ChangeAccessBlock from './events/changeAccessBlock/changeAccessBlock.js';
import ChangeAccessModule from './events/changeAccessModules.js';

const utils = new Utils();
const changeAccessProduct = new ChangeAccessProduct();
const changeAccessBlock = new ChangeAccessBlock();
const changeAccessModule = new ChangeAccessModule();

class ChangeAccess {
  init(tabPack) {
    const accessProps = this.getProps(tabPack);

    const { wrapper } = accessProps;

    if (wrapper) {
      const dispatchWrapper = this.dispatchWrapper.bind(this, accessProps);
      wrapper.addEventListener('click', dispatchWrapper);
    }
  }

  dispatchWrapper(props, e) {
    const { deal } = props;
    const t = e.target;

    const changeProductAccess = t.hasAttribute('product-access') ? 'access-product' : '';
    const changeBlockAccess = t.hasAttribute('access-block') ? 'access-block' : '';
    const changeModuleAccess = t.classList.contains('module__item') ? 'access-module' : '';

    const toggle = changeProductAccess || changeBlockAccess || changeModuleAccess;

    switch (toggle) {
      case 'access-module': {
        changeAccessModule.init(false, deal, props, e);
        break;
      }
      case 'access-block': {
        changeAccessBlock.init(props, deal, props, e);
        break;
      }
      case 'access-product': {
        changeAccessProduct.init(props, e);
        break;
      }
      default: {
        break;
      }
    }
  }

  getProps(tabPack) {
    const wrapper = document.querySelector('.access__wrapper');

    const props = utils.getDeepCopy(tabPack);
    props.wrapper = wrapper;

    return props;
  }
}

export default ChangeAccess;
