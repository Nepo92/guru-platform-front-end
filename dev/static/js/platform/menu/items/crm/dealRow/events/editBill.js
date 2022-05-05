import Utils from '../../../../../utils/utils.js';
import { billAPI } from '../../../../../api/api.js';
import Popup from '../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class EditBill {
  init(props) {
    const editBills = document.querySelectorAll('[js-edit-bill]');

    if (editBills.length) {
      const editBill = this.editBill.bind(this, props);

      editBills.forEach((item) => {
        const edit = utils.setCloneElement(item);
        edit.addEventListener('click', editBill);
      });
    }

    const changePaymentMethodSelect = document.querySelectorAll('.bills__select--payment');

    if (changePaymentMethodSelect.length) {
      const changePaymentMethod = this.changePaymentMethod.bind(this);

      changePaymentMethodSelect.forEach((item) => {
        const select = utils.setCloneElement(item);
        select.addEventListener('change', changePaymentMethod);
      });
    }
  }

  editBill(props, e) {
    const t = e.target;
    const row = utils.getParent(t, 'platform-table__row');

    if (row) {
      const paymentMethod = row.querySelector('[b-pm-wrapper]');

      if (paymentMethod) {
        paymentMethod.classList.remove('disabled');
        paymentMethod.querySelector('[b-pm-selector]').removeAttribute('disabled');
      }

      const accNumber = row.querySelector('[bills-account-number]');

      if (accNumber) {
        accNumber.removeAttribute('disabled');
      }

      const summ = row.querySelector('[b-sum]');

      if (summ) {
        summ.removeAttribute('disabled');
      }

      const payDate = row.querySelector('[b-pay-date]');

      if (payDate) {
        payDate.removeAttribute('disabled');
      }

      const acceptEdit = row.querySelector('[js-edit-bill-accept]');
      const accept = utils.setCloneElement(acceptEdit);

      const updateBill = this.updateBillPopup.bind(this, props);

      accept.addEventListener('click', updateBill);

      const closeNav = this.closeNav.bind(this);
      const closeBtn = row.querySelector('[js-edit-bill-cancel]');

      const close = utils.setCloneElement(closeBtn);
      close.addEventListener('click', closeNav);
    }

    const nav = utils.getParent(t, 'bills__nav');

    if (nav) {
      nav.style.display = 'none';
    }

    const navEditable = utils.getParent(t, 'bills__settings').querySelector('.bills__nav--edit');

    if (navEditable) {
      navEditable.style.display = 'flex';
    }
  }

  updateBillPopup(props, e) {
    const t = e.target;

    const acceptRequest = this.acceptEdit.bind(this, props, t);

    const popupProps = {
      text: 'Вы действительно хотите обновить этот счет ?',
      settings: null,
      title: null,
      ok: acceptRequest,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  acceptEdit(props, t) {
    const billItem = utils.getParent(t, 'platform-table__row');

    if (billItem) {
      const paymentSelect = billItem.querySelector('[b-pm-selector]');

      const paymentMethod = paymentSelect.value.trim();
      const paymentMethodCode = utils.getSelected(paymentSelect).getAttribute('data-code').trim();
      const paymentMethodId = utils.getSelected(paymentSelect).getAttribute('data-id')?.trim();
      const accountNumber = billItem.querySelector('[b-account-number]').value.trim();
      const sum = billItem.querySelector('[b-sum]').value.split('₽')[0].trim();
      const payDate = billItem.querySelector('[b-pay-date]').value.trim();
      const plannedPayDate = billItem.querySelector('[bill-planned-pay-date]')?.value.trim();

      const data = {
        id: billItem.getAttribute('data-bill'),
        paymentMethod: paymentMethod || null,
        paymentMethodCode: paymentMethodCode || null,
        accountNumber: accountNumber || null,
        paymentMethodId,
        sum: sum || null,
        payDate: payDate || null,
        plannedPayDate: plannedPayDate || null,
      };

      const update = billAPI.updateBill(data);

      update.then(() => {
        const popupElem = document.querySelector('.platform-remove__wrapper');

        if (popupElem) {
          popup.removePopup();
        }

        this.setDisabledToItems(props, t);

        setTimeout(() => {
          /* eslint-disable-next-line */
          location.reload();
        }, 100);
      });
    }
  }

  setDisabledToItems(props, t) {
    const billItem = utils.getParent(t, 'platform-table__row');

    if (billItem) {
      const paymentMethod = billItem.querySelector('[b-pm-wrapper]');

      if (paymentMethod) {
        paymentMethod.classList.add('disabled');
        paymentMethod.querySelector('[b-pm-selector]').setAttribute('disabled', '');
      }

      const accNumber = billItem.querySelector('[bills-account-number]');

      if (accNumber) {
        accNumber.setAttribute('disabled', '');
      }

      const summ = billItem.querySelector('[b-sum]');

      if (summ) {
        summ.setAttribute('disabled', '');
      }

      const payDate = billItem.querySelector('[b-pay-date]');

      if (payDate) {
        payDate.setAttribute('disabled', '');
      }
    }

    this.closeNav(t);
  }

  closeNav(e) {
    const t = e.target ? e.target : e;

    const navEditable = utils.getParent(t, 'bills__nav--edit');

    if (navEditable) {
      navEditable.style.display = 'none';
    }

    const nav = utils.getParent(t, 'bills__settings').querySelector('.opened');

    if (nav) {
      nav.style.display = 'flex';
    }
  }

  changePaymentMethod(e) {
    const t = e.target;

    const code = utils.getSelected(t)?.getAttribute('data-code');

    if (code) {
      t.className = 'bills__select--payment bills__payment';
      t.classList.add(`pmethod_${code}`);
    }
  }
}

export default EditBill;
