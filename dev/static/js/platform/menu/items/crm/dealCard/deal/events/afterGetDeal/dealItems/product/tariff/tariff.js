import Utils from '../../../../../../../../../../utils/utils.js';
import DealFields from '../../dealFields.js';
import Price from '../price/price.js';
import SelectOptions from '../../../../../../../../../../utils/selectOptions/selectOptions.js';

const utils = new Utils();
const price = new Price();
const selectOptions = new SelectOptions();

class Tariff extends DealFields {
  init(props) {
    const {
      menu,
      isView,
      deal,
      pack,
    } = props;
    const { tariffs } = pack;

    const tariffItem = menu.querySelector('[data-select-type="select-tariff"]');

    props.tariffItem = tariffItem;

    const tariffProps = {
      tariffItem,
      tariffs,
      props,
      deal,
    };

    this.toggleTariff(tariffProps);
    this.dispatchViewWrapper(isView, tariffItem);
    this.changeTariffSelect(props);
  }

  dispatchViewWrapper(isView, tariffItem) {
    if (isView) {
      tariffItem.classList.add('disable');
    } else {
      tariffItem.classList.remove('disable');
    }
  }

  changeTariffSelect(props) {
    const { tariffItem } = props;

    const idSelected = tariffItem.querySelector('[id-selected]');

    if (idSelected) {
      const cloneInputId = utils.setCloneElement(idSelected);

      const changeTariff = this.changeTariff.bind(this, props);

      cloneInputId.addEventListener('change', changeTariff);
    }
  }

  toggleTariff(tariffProps) {
    const {
      tariffItem,
      tariffs,
      props,
      deal,
    } = tariffProps;
    const { menu } = props;

    const statusDeal = menu.querySelector('[data-select-type="select-status"] [id-selected]')?.value;

    const noChangeProduct = !props.isChangedProduct;
    const dealStatus = !props.isPaymentForm ? deal?.status !== 1 || statusDeal !== 1 : 2;
    const changeProduct = props.isChangedProduct && tariffItem && dealStatus;

    if (noChangeProduct) {
      if (tariffItem && tariffs?.length && (deal?.status !== 1 || statusDeal !== 1)) {
        tariffItem.classList.remove('hide');
        this.setTariffOption(props, tariffItem);
      } else if (tariffItem && !tariffs?.length) {
        tariffItem.classList.add('hide');
      }
    } else if (changeProduct && tariffs.length) {
      tariffItem.classList.remove('hide');
      this.setTariffOption(props, tariffItem);
    } else if (changeProduct && !tariffs.length) {
      tariffItem.classList.add('hide');
    }
  }

  getProps(props) {
    if (props.currentForm) {
      props.deal = {
        ...props.currentForm,
      };
    }

    return utils.getDeepCopy(props);
  }

  changeTariff(props) {
    props.isChangedTariff = true;
    props.isChangedProduct = false;

    this.change(props);
    price.init(props);
  }

  setTariffOption(props, tariffItem) {
    const { deal, pack, currentForm: form } = props;
    const { tariffs } = pack;
    const body = tariffItem.querySelector('.select__body');

    utils.removeChildren(body, 0);

    const setTariffsOptions = selectOptions.setTariffsOptions.bind(selectOptions);
    const options = props.pack.tariffs.map(setTariffsOptions);

    if (body.children.length) {
      body.children[body.children.length - 1].insertAdjacentHTML('afterend', options.join(''));
    } else {
      body.insertAdjacentHTML('afterbegin', options);
    }

    const isDeal = deal ? tariffs.find((el) => el.id === deal.idTariff) : false;
    const isPaymentForm = form ? tariffs.find((el) => el.id === form.tariff.id) : false;

    const selectedTariff = isDeal || isPaymentForm;

    if (selectedTariff) {
      const header = tariffItem.querySelector('.select__head');

      if (selectedTariff && !props.isChangedProduct) {
        const tariffName = Array.from(body.children).find((el) => +el.getAttribute('value') === deal.idTariff)?.innerHTML;

        header.setAttribute('title', tariffName);
        header.querySelector('.select-head__placeholder').innerHTML = tariffName;
      } else if (props.isChangedProduct) {
        const tariffName = Array.from(body.children)[0]?.innerHTML;
        header.setAttribute('title', tariffName);
        header.querySelector('.select-head__placeholder').innerHTML = tariffName;
      }
    }
  }
}

export default Tariff;
