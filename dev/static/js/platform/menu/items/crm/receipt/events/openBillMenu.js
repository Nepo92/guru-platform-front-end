import Utils from '../../../../../utils/utils.js';
import AddImage from './addImage.js';
import SendBill from './sendBill.js';

const utils = new Utils();
const addImage = new AddImage();
const sendBill = new SendBill();

class OpenBillMenu {
  init(props, e) {
    const { bills } = props;

    const t = e.target;

    if (t.hasAttribute('js-check-add')) {
      props.openReceiptMenuBtn = t;
    } else {
      props.openReceiptMenuBtn = false;
    }

    const payPack = {
      ...props,
      menu: document.querySelector('[js-pay-menu]'),
    };

    utils.openModalAnimation(payPack.menu, true);

    payPack.payMenu = document.querySelector('[js-pay-menu]');
    const saveBtn = document.querySelector('.pay__save');
    saveBtn.classList.add('disable');
    payPack.saveBtn = saveBtn;

    payPack.bill = this.getBill(bills, t, payPack);

    const billImage = document.querySelector('.bill-image__image');

    if (billImage) {
      billImage.remove();
    }

    if (payPack.bill?.billImage) {
      this.getImage(payPack);
    } else {
      this.getInputFile(payPack);
    }

    if (payPack.bill?.comment) {
      document.querySelector('[pay-menu-textarea]').value = payPack.bill.comment;
    } else {
      document.querySelector('[pay-menu-textarea]').value = '';
    }

    payPack.getImage = this.getImage.bind(this);
    payPack.getInputFile = this.getInputFile.bind(this);

    const items = [addImage, sendBill];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(payPack);
    });

    const commentTextArea = payPack.menu.querySelector('[pay-menu-textarea]');

    if (commentTextArea) {
      const setActivePayBtn = this.setActivePayBtn.bind(this, payPack);

      const cloneArea = utils.setCloneElement(commentTextArea);
      cloneArea.addEventListener('input', setActivePayBtn);
    }
  }

  setActivePayBtn(payPack) {
    const { menu, isView } = payPack;

    if (!isView) {
      const payBillBtn = menu.querySelector('.pay__save');

      if (payBillBtn.classList.contains('disable')) {
        payBillBtn.classList.remove('disable');
      }
    }
  }

  setActiveButton(payPack) {
    const { saveBtn } = payPack;

    if (saveBtn.classList.contains('disable')) {
      saveBtn.classList.remove('disable');
    }
  }

  getBill(bills, t, payPack) {
    const { payMenu, saveBtn } = payPack;
    let bill;

    if (bills) {
      const billId = +utils.getParent(t, 'bill__item').getAttribute('data-bill');
      bill = bills.find((el) => el.id === billId);
    } else {
      const row = utils.getParent(t, 'platform-table__row') || utils.getParent(t, 'custom-table__body-row');

      if (row) {
        bill = {
          id: row.getAttribute('data-bill'),
          idDeal: row.getAttribute('data-deal'),
          idClient: row.getAttribute('data-client'),
          isHidden: row.getAttribute('data-hidden'),
          comment: row.querySelector('[js-check-add]').getAttribute('data-comment'),
          billImage: row.querySelector('[js-check-add]').getAttribute('data-billimage'),
        };
      } else {
        payPack.bill = bill;

        if (bill?.billImage || bill?.comment) {
          this.getImage(payPack);
        } else {
          this.getInputFile(payPack);
        }

        if (payMenu?.querySelector('.platform-form__input-full.active')) {
          payMenu.querySelector('.platform-form__input-full.active').style.opacity = '0';
          payMenu.querySelector('.platform-form__input-full.active').style.pointerEvents = 'none';
        }

        const textArea = payPack.menu.querySelector('[pay-menu-textarea]');
        textArea.value = bill?.comment ? bill?.comment : '';
      }
    }

    const acces = ['transaction'];

    if (acces.includes(utils.getPage())) {
      if (saveBtn) {
        saveBtn.style.display = 'none';
      }
    }

    return bill;
  }

  getImage(props) {
    const { bill } = props;

    const menu = document.querySelector('[js-pay-menu]');

    const a = document.createElement('a');
    a.setAttribute('data-fancybox', '');
    a.setAttribute('href', `/${bill.billImage}`);
    a.classList.add('bill-image__wrapper-link');

    const image = document.createElement('img');
    image.setAttribute('src', `/${bill.billImage}`);
    image.classList.add('bill-image__image');
    image.classList.add('mt_0');

    a.appendChild(image);

    const label = menu.querySelector('.bill-image__label');

    const removeBtn = document.createElement('span');
    removeBtn.classList.add('file-loader__delete');
    removeBtn.classList.add('preview_update');
    removeBtn.classList.add('active');
    a.appendChild(removeBtn);

    if (label) {
      label.remove();
    }

    const fileInput = menu.querySelector('#pay');

    if (fileInput) {
      fileInput.remove();
    }

    const imageMenu = menu.querySelector('.bill-image__wrapper-link');

    if (imageMenu) {
      imageMenu.remove();
    }

    const imageWrapper = menu.querySelector('.bill-image');

    if (imageWrapper) {
      imageWrapper.appendChild(a);
      $('[data-fancybox]').fancybox();
    }
  }

  getInputFile() {
    const menu = document.querySelector('[js-pay-menu]');

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.classList.add('platform__checkbox');
    input.setAttribute('id', 'pay');
    input.setAttribute('accept', '.png,.svg,.jpg,.jpeg,.webp,.avif');
    input.setAttribute('pay-menu-file', '');
    input.setAttribute('name', 'file');

    const label = document.createElement('label');
    label.classList.add('bill-image__label');
    label.setAttribute('for', 'pay');

    const removeBtn = document.createElement('span');
    removeBtn.classList.add('platform-form__input-full');
    label.appendChild(removeBtn);

    const image = menu.querySelector('.bill-image__wrapper-link');

    if (image) {
      image.remove();
    }

    const labelMenu = menu.querySelector('.bill-image__label');

    if (labelMenu) {
      labelMenu.remove();
    }

    const fileInput = menu.querySelector('#pay');

    if (fileInput) {
      fileInput.remove();
    }

    const wrapper = menu.querySelector('.bill-image');

    if (wrapper) {
      wrapper.appendChild(input);
      wrapper.appendChild(label);
    }
  }
}

export default OpenBillMenu;
