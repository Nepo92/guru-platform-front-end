import DealFields from '../../dealFields.js';
import Utils from '../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class Price extends DealFields {
  constructor() {
    super();
  }

  init(dealPack) {
    const {
      menu,
      isView,
    } = dealPack;

    const priceItem = menu.querySelector('[price-item]');

    if (priceItem) {
      const input = priceItem.querySelector('[price]');
      dealPack.input = input;

      if (priceItem) {
        this.setPriceDefault(dealPack);

        this.setViewMode(isView, input);

        const change = this.change.bind(this, dealPack);
        input.addEventListener('input', change);
      }
    }
  }

  setViewMode(isView, input) {
    if (isView) {
      input.classList.add('disable');
      utils.getParent(input, 'platform-form__item').classList.add('disable');
    } else {
      input.classList.remove('disable');
      utils.getParent(input, 'platform-form__item').classList.remove('disable');
    }
  }

  setPriceDefault(dealPack) {
    const {
      deal,
      input,
      menu,
      pack,
      isChangedProduct,
      isChangedTariff,
    } = dealPack;
    const { tariffs } = pack;

    const productWrapper = menu.querySelector('[data-select-type="select-product"]');

    const products = Array.from(productWrapper.querySelector('[select-body]').children);

    if (products.length && isChangedProduct && !isChangedTariff) {
      const changeProps = {
        menu,
        products,
        tariffs,
        input,
      };

      this.changeProduct(changeProps);
    } else if (!isChangedProduct && !isChangedTariff) {
      this.noChanged(deal, input);
    } else if (!isChangedProduct && isChangedTariff) {
      const changeTariffProps = {
        tariffs,
        input,
      };

      this.changeTariff(changeTariffProps);
    }
  }

  changeProduct(changeProps) {
    const {
      menu,
      products,
      tariffs,
      input,
    } = changeProps;

    const selectedProduct = +menu.querySelector('[data-select-type="select-product"] [id-selected]').value;

    const selected = products.find((el) => +el.getAttribute('value') === selectedProduct);

    if (tariffs.length || !selected) {
      input.value = '';
    } else if (selected || !tariffs.length) {
      input.value = selected.getAttribute('data-price') || '';
    }
  }

  noChanged(deal, input) {
    const { price } = deal;
    input.value = price || '';
  }

  changeTariff(changeTariffProps) {
    const {
      tariffs,
      input,
    } = changeTariffProps;

    const idTariffInput = utils.getParent(input, 'platform-form__items').querySelector('[data-select-type="select-tariff"] [id-selected]');

    if (idTariffInput) {
      const idTariff = +idTariffInput.value;

      const selected = tariffs.find((el) => el.id === idTariff);

      if (selected) {
        input.value = selected.price || '';
      } else {
        input.value = '';
      }
    }
  }
}

export default Price;
