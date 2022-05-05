import Utils from '../../../../../../../../utils/utils.js';
import { billAPI } from '../../../../../../../../api/api.js';
import Validation from '../../../../../../../../utils/validation.js';
import Popup from '../../../../../../../../modules/popup/popup.js';

const utils = new Utils();
const validation = new Validation();
const popup = new Popup();

class SaveBill {
  init(props) {
    const { menu, bill } = props;

    const saveBtn = menu.querySelector('.bill__save');

    const save = utils.setCloneElement(saveBtn);

    if (saveBtn && bill?.id > 0) {
      const updateBill = this.updateBill.bind(this, props);

      save.addEventListener('click', updateBill);
    } else if (saveBtn && bill?.id < 0) {
      const saveBill = this.saveBill.bind(this, props);

      save.addEventListener('click', saveBill);
    }

    const toValidationError = validation.toValidationError.bind(validation);
    save.addEventListener('dblclick', toValidationError);
  }

  saveBill(props, e) {
    const t = e.target;

    const { menu, bill } = props;

    const form = menu.querySelector('form');

    const validate = validation.validateUpdateBill(props);

    const data = this.getUpdateData(props, form, true);

    props.needRemoveBillId = bill.id;

    if (validate) {
      const saveBill = billAPI.saveBill(data);
      t.style.pointerEvents = 'none';

      saveBill.then(
        () => {
          t.style.pointerEvents = 'all';
          props.notValidBills = [...props.notValidBills].filter((el) => el.id !== bill.id);

          this.afterUpdateBill(props);
        },
        () => {
          t.style.pointerEvents = 'all';

          const popupProps = {
            text: 'Ошибка! Попробуйте заново или сообщите администратору.',
            settings: 'alert-close',
          };

          popup.init(popupProps);
        },
      );
    }
  }

  updateBill(props, e) {
    const t = e.target;
    const {
      menu,
    } = props;

    const form = menu.querySelector('form');

    const data = this.getUpdateData(props, form, false);

    const validate = validation.validateUpdateBill(props);

    if (validate) {
      props.needRemoveBillId = null;

      const updateBill = billAPI.updateBill(data);
      t.style.pointerEvents = 'none';

      updateBill.then(
        () => {
          t.style.pointerEvents = 'all';

          this.afterUpdateBill(props);
        },
        () => {
          t.style.pointerEvents = 'all';

          const popupProps = {
            text: 'Ошибка! Счет не сохранен, попробуйте заново или обратитесь к администратору',
            settings: 'alert-close',
          };

          popup.init(popupProps);
        },
      );
    }
  }

  getUpdateData(props, form, isSave) {
    const { target, menu, pack } = props;
    const { paymentMethods } = pack;

    const billItem = utils.getParent(target, 'bill__item') ? utils.getParent(target, 'bill__item') : target;

    const createBillBtn = billItem.classList.contains('bill__create');

    if (!createBillBtn) {
      const id = billItem.getAttribute('data-bill') > 0 ? billItem.getAttribute('data-bill') : 0;
      const idDeal = billItem.getAttribute('data-deal');

      const billDate = billItem.querySelector('.info__when--day').innerText.trim();

      const paymentMethod = form.querySelector('[js-bill-payment-method]');
      const method = paymentMethod.value;

      const code = utils.getSelected(paymentMethod).getAttribute('data-code');

      const sumValue = form.querySelector('[js-bill-sum-update]');
      const acn = form.querySelector('[js-bill-account-number]');

      const plannedPayDate = menu.querySelector('[js-bill-planned-date-update]').value;
      const plannedPayDateArr = plannedPayDate.split('.');

      const save = isSave ? `${plannedPayDateArr[2]}-${plannedPayDateArr[1]}-${plannedPayDateArr[0]}` : plannedPayDate;

      let paymentMethodId;

      paymentMethods.forEach((item) => {
          if (item.title === method) {
            paymentMethodId = item.id;
          }
      });

      return {
        id: id || null,
        idDeal: idDeal || null,
        billDate: billDate || null,
        paymentMethodId: paymentMethodId || null,
        paymentMethod: method || null,
        paymentMethodCode: code || null,
        sum: sumValue ? sumValue.value : null,
        accountNumber: acn ? acn.value : null,
        plannedPayDate: plannedPayDate ? save : null,
      };
    }
  }

  afterUpdateBill(props) {
    const { menu } = props;
    const billWrapper = document.querySelectorAll('[js-client-bills]');

    billWrapper.forEach((item) => {
      Array.from(item.children).forEach((elem) => {
        elem.remove();
      });
    });

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, true);

    const billTabProps = {
      ...props,
      menu: utils.getActiveMenu(),
    };

    props.tabBillObs.init(billTabProps);
  }
}

export default SaveBill;
