import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class BillTemplates {
  renderBill(billPack) {
    const {
      pack,
      bill,
      menu,
      isView,
      deal,
      apiCode,
      bills,
    } = billPack;

    let canEdit;

    if (pack) {
      const accessToEdit = ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_HEAD_MANAGER'];
      canEdit = accessToEdit.includes(pack.role) && menu.hasAttribute('js-menu-deal');
    }

    const payd = bill.payDate || bill.billImage || bill.comment;

    const payInfoPack = {
      bill,
      payd,
      canEdit,
      isView,
      apiCode,
      bills,
    };

    const buttonPaymentState = this.noPaydTemplates(payInfoPack);

    const billDate = utils.getDateFormatDDMMYYYY(bill.billDate);
    const payDate = utils.getDateFormatDDMMYYYY(bill.payDate || bill.billDate);

    return `
          <form class="bill__form">
            <div class="bill__info">
              <div class="bill__status ${payd ? 'active' : ''}"></div>
              <div class="bill__create-info">
                ${payd ? `
                  <div class="bill__tooltip">
                    <p class="bill__exhibited">Выставлен:</p>
                    <p class="bill__exhibited-date">${billDate}</p>
                  </div>
                ` : ''}
                <p class="info__title">${payd ? 'Оплачен' : 'Выставлен'}</p>
                <div class="info__when">
                  <span class="info__when--day ${isView ? 'disabled' : ''}">
                    ${payd ? payDate : billDate}
                  </span>
                  <span class="info__when--time"></span>
                </div>
              </div>
            </div>
          ${bill.paymentMethod ? `
            <div class="bill__methods">
              <div class="methods__select paymentmethods ${bill.paymentMethodCode}" title="${bill.paymentMethod}">
                <span class="methods__select--value">${bill.paymentMethod}</span>
              </div>
            </div>
            ` : `
              <div class="bill__methods">
                <span class="methods__select--value">Метод оплаты не выбран</span>
              </div>
            `
      }
          <div class="bill__manager">
              <p class="manager__title">Менеджер</p>
              <p class="manager__name" title="${bill.manager || 'Нет'}">${bill.manager || 'Нет'}</p>
            </div>
          ${buttonPaymentState}
          <div class="bill__price">
              <p class="price__title">Сумма</p>
              <p class="price__value ${((bill.sum > deal?.price) || (bill.sum < 0)) ? 'bill-error' : ''}" title="${bill.sum} ₽">${bill.sum} ₽</p>
          </div>
          </form>
          ${!isView && !payd ? '<span class="bill__remove"></span>' : ''}
      `;
  }

  noPaydTemplates(payInfoPack) {
    const {
      bill,
      canEdit,
      isView,
      apiCode,
      payd,
      bills,
    } = payInfoPack;

    const haveReceipt = bill.comment || bill.billImage;

    const receiptProps = {
      bills,
      bill,
      isView,
      isReceipt: true,
    };

    const notEquaring = haveReceipt ? this.receipt(receiptProps) : this.buttonReceipt(receiptProps);

    const equaringProps = {
      bill,
      isView,
      payd,
      bills,
      isReceipt: false,
    };

    const canEditTemplate = apiCode !== 0 ? this.equaringTemplate(equaringProps) : notEquaring;

    return !canEdit ? this.noEditTemplate(bill) : canEditTemplate;
  }

  receipt(receiptProps) {
    const {
      isView,
    } = receiptProps;

    return `<div class="bill__link receipt">
      <div class="link__btn payoff bill__redemption ${isView ? 'disabled' : ''}">
        Счет погашен
      </div>
    </div>`;
  }

  buttonReceipt(receiptProps) {
    const {
      isView,
    } = receiptProps;

    return `
      <div class="bill__link receipt">
        <div class="link__btn payoff ${isView ? 'disabled' : ''}">Погасить счет</div>
      </div>
      `;
  }

  noEditTemplate(bill) {
    return `
      <div class="bill__deal" >
        <p class="deal__title">Сделка</p>
        <p class="deal__name" title="${bill.course}">${bill.course}</p>
      </div>
      `;
  }

  equaringTemplate(equaringProps) {
    const {
      bill,
      isView,
      payd,
    } = equaringProps;

    return `<div class="bill__link">
      <a href="${bill.leeLooLink}" target="_blank" rel="noopener noreferrer" class="link__btn ${isView || payd ? 'disabled' : ''}">
        Ссылка на оплату
        <span class="bill__copy"></span>
      </a>
    </div> `;
  }

  #checkDisable(disableProps) {
    const {
      bills,
      bill,
    } = disableProps;

    const currentBillIndex = bills.indexOf(bill);

    const prevBill = currentBillIndex !== 0 ? bills[currentBillIndex - 1] : false;

    if (prevBill) {
      const paid = prevBill.billImage || prevBill.comment || prevBill.payDate;

      const prevBillPaid = prevBill && paid;

      return !prevBillPaid;
    }
  }

  setPaymentOptions(paymentMethods) {
    return paymentMethods.map((item) => {
      return `<option value = "${item.title}" class="bills__payment--option" data - code="${item.code}">${item.title}</option> `;
    });
  }

  updateMenu() {
    return `
      <p class="update-menu__text" > Применить изменения ?</p>
      <div update class="update-menu__ok">Применить</div>
      <div cancel class="update-menu__cancel">Отмена<div>
    `;
  }

  AddBillMenuBillTemplate(counter) {
    return `
        <div class="add-bill__item bill__rouble--icon">
          <p class="add-bill__name">Счет <span add-bill__counter>${counter}</span> *</p>
          <input bill-value type="text" class="platform-form__input">
        </div>
        <div class="add-bill__item">
          <p class="add-bill__name">Дата *</p>
          <input bill-date type="text" class="platform-form__input datepicker-here">
        </div>
        <div clas="add-bill__nav">
          <span class="add-bill__remove-level"></span>
        </div>
    `;
  }

  getPreloaderPayImageTemplate(tmpPath) {
    return `
      <img src="${tmpPath}">
      <span class="file-loader__delete preview_update"></span>
    `;
  }

  addBillMenuBillTemplate(counter, item, index) {
    return `
      <div class="bill-layer__item">
        <p bill-counter class="bill-layer__name">${counter || index + 1} счет *</p>
        <input required js-bill-sum class="bill-layer__input platform-form__input update-deal__input mt_5" type="text" placeholder="Введите сумму" value="${item?.sum || ''}">
      </div>
      <div class="bill-layer__item">
        <p class="bill-layer__name">Дата оплаты *</p>
        <input required js-bill-planned-date class="datepicker-here-start bill-layer__input platform-form__input update-deal__input mt_5" type="text" placeholder="Введите дату" value="${item?.plannedPayDate || ''}">
      </div>
      <div class="bill-layer__remove"></div>
    `;
  }
}

export default BillTemplates;
