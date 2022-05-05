import Utils from '../../../../../../../../utils/utils.js';
import Validation from '../../../../../../../../utils/validation.js';

const utils = new Utils();
const validation = new Validation();

class BillLevelWrapper {
  changeBillPrice(props) {
    const { menu, arrayBillInputs } = props;

    props.price = menu.querySelectorAll('[js-bill-sum]');
    props.remains = menu.querySelector('[bill-value-remains]');

    if (!arrayBillInputs.length) {
      this.fullArrayBillInputs(arrayBillInputs, props);
    }

    if (props.price.length) {
      const keyDown = this.resultFunc.bind(this, props, true);
      const pressBtn = this.debounce(keyDown, 230);

      props.price.forEach((item, index) => {
        arrayBillInputs[index].index = index;

        const priceInput = utils.setCloneElement(item);

        priceInput.addEventListener('input', pressBtn.bind(pressBtn, index));
      });
    }
  }

  fullArrayBillInputs(arrayBillInputs, props) {
    props.price.forEach(() => {
      arrayBillInputs.push({
        index: null,
        prevValue: [],
      });
    });
  }

  debounce(callback, delay) {
    let timer;

    return function timeOuter(index, e) {
      validation.validationInputNuber(e.target);

      const callbackTarget = callback.bind(callback, index, e);

      clearTimeout(timer);

      timer = setTimeout(callbackTarget, delay);
    };
  }

  resultFunc(props, isAdd) {
    const { menu, deal } = props;

    const showProps = {
      deal,
      menu,
      isAdd,
    };

    this.showRemainBills(showProps);
  }

  showRemainBills(showProps) {
    const {
      deal,
      menu,
      isAdd,
    } = showProps;

    const billItems = document.querySelectorAll('.bill__item');

    const billsArray = Array.from(billItems).filter((el) => !el.classList.contains('bill__create'));

    let billSum = 0;

    billsArray.forEach((item) => {
      billSum += parseInt(item.querySelector('.price__value').innerText, 10);
    });

    const levels = Array.from(menu.querySelectorAll('[js-bill-sum]'));

    const remain = deal.price - billSum;

    if (levels.length) {
      const levelValues = levels.map((el) => +el.value);
      showProps.sum = levelValues.reduce((prev, current) => prev + current);
    } else {
      showProps.sum = remain;
    }

    const addBill = remain - showProps.sum > 0 ? remain - showProps.sum : 0;
    const removeBill = remain - showProps.sum > 0 ? remain - showProps.sum : remain;

    const showRemains = isAdd ? addBill : removeBill;

    const remainCounter = menu.querySelector('[bill-value-remains]');

    remainCounter.innerText = `${showRemains} ₽`;

    this.toggleAddLayerButton(showRemains, menu);
  }

  toggleAddLayerButton(showRemains, menu) {
    const btn = menu.querySelector('.add-layer');

    const bills = menu.querySelectorAll('.bill-layer');

    if (bills.length) {
      btn.classList.add('mt_20');
    } else {
      btn.classList.remove('mt_20');
    }

    if (showRemains > 0) {
      btn.classList.remove('hide');
    } else {
      btn.classList.add('hide');
    }
  }
}

export default BillLevelWrapper;
