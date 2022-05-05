import Utils from '../../../../../../../../utils/utils.js';
import { billAPI } from '../../../../../../../../api/api.js';
import Popup from '../../../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class SaveBillWithoutTemplate {
  init(billDate) {
    const [menu, deal, props, target] = billDate;

    const bills = Array.from(menu.querySelectorAll('.bill-layer'));

    const paymentMethod = menu.querySelector('[js-bill-payment-method]');
    const paymentMethodValue = utils.getSelected(paymentMethod).innerText.trim();
    const paymentMethodCode = utils.getSelected(paymentMethod).getAttribute('data-code').trim();
    const idDeal = deal.id || deal;

    const { pack } = props;
    const { paymentMethods } = pack;

    const paymentMethodId = paymentMethods.find((el) => el.title === paymentMethodValue)?.id;

    const data = {
      paymentMethodId: paymentMethodId || null,
      paymentMethod: paymentMethodValue || null,
      paymentMethodCode: paymentMethodCode || null,
      idDeal,
      accountNumber: null,
    };

    if (bills.length) {
      const saveBillProps = {
        bills,
        menu,
        props,
        data,
      };

      const saveBills = this.saveBills(saveBillProps);

      const loader = setTimeout(utils.showLoader, 400);
      target.classList.add('off');

      saveBills.then(() => {
        clearTimeout(loader);
        utils.hideLoader();
        target.classList.remove('off');

        const wrapper = menu.querySelector('.platform-modal__wrapper');

        utils.closeModalAnimation(menu, wrapper, false, true, false);

        const billWrapper = document.querySelectorAll('[js-client-bills]');

        billWrapper.forEach((elem) => {
          Array.from(elem.children).forEach((subj) => {
            subj.remove();
          });
        });

        const updateMenuWrapper = document.querySelector('.update-menu');

        if (updateMenuWrapper?.classList.contains('active')) {
          updateMenuWrapper.classList.remove('active');
        }

        const tabProps = {
          ...props,
          menu: document.querySelector('[js-menu-deal]'),
        };

        tabProps.tabBillObs.init(tabProps);
      }, () => {
        target.classList.remove('off');

        const popupProps = {
          text: 'Ошибка! Попробуйте еще раз или обратитесь в тех. поддержку.',
          settings: 'alert-close',
        };

        popup.init(popupProps);
      });
    }
  }

  async saveBills(saveBillProps) {
    const {
      bills,
      menu,
      props,
      data,
    } = saveBillProps;

    if (bills.length) {
      await this.saveBill(data, menu, props, bills);
    } else {
      return await 'Запросы отправлены успешно';
    }
  }

  async saveBill(data, menu, props, bills) {
    const item = bills.shift();

    const sum = item.querySelector('[js-bill-sum]');
    const plannedPayDate = item.querySelector('[js-bill-planned-date]').value;
    const plannedArr = plannedPayDate.split('.');
    const plannedType = item.querySelector('[js-bill-planned-date]').hasAttribute('first-payment') ? 'Новый клиент' : 'Доплата';

    data.paymentType = plannedType;
    data.sum = sum.value ? sum.value.trim() : null;
    data.plannedPayDate = plannedPayDate ? `${plannedArr[2]}-${plannedArr[1]}-${plannedArr[0]}` : null;

    await billAPI.saveBill(data);

    const saveProps = {
      bills,
      menu,
      props,
      data,
    };

    return await this.saveBills(saveProps);
  }

  getValidBills(bills, deal) {
    const { startDate: start } = deal;

    /* eslint-disable-next-line */
    const validBills = bills.filter((el, index) => {
      const checkSum = el.sum <= deal.price && el.sum > 0;
      const first = checkSum && utils.compareDates(start, el.plannedPayDate);
      const other = checkSum;

      return index === 0 ? first : other;
    });

    return validBills;
  }

  saveBillNewEdition(props) {
    const { menu, deal } = props;

    const levels = menu.querySelectorAll('.bill__level');

    const accountNumber = menu.querySelector('[js-menu-bill-number]').value;
    const paymentMethod = +menu.querySelector('[bill-payment-methods]').value;

    const data = {
      levels: [],
      idDeal: deal.id,
      accountNumber: accountNumber || null,
      paymentMethod: paymentMethod || null,
    };

    if (levels.length) {
      levels.forEach((item) => {
        const value = +item.querySelector('[bill-value]').value;
        const date = item.querySelector('[bill-date]').value;

        if (value || date) {
          const level = {
            value: value || null,
            date: date || null,
          };

          data.levels.push(level);
        }
      });
    }
  }
}

export default SaveBillWithoutTemplate;
