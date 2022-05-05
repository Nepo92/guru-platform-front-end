import { dealAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class AfterSaveComment {
  init(props) {
    const { menu, target, openReceiptMenuBtn } = props;

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, true, false);

    const billWrapper = document.querySelectorAll('[js-client-bills]');

    billWrapper.forEach((item) => {
      Array.from(item.children).forEach((elem) => {
        elem.remove();
      });
    });

    const updateMenuWrapper = document.querySelector('.update-menu');

    if (updateMenuWrapper && updateMenuWrapper.classList.contains('active')) {
      updateMenuWrapper.classList.remove('active');
    }

    const tabProps = {
      ...props,
      menu: document.querySelector('[js-menu-deal]'),
    };

    target.classList.remove('disable');

    if (tabProps.tabBillObs) {
      tabProps.tabBillObs.init(tabProps);
    }

    if (openReceiptMenuBtn) {
      setTimeout(() => {
        /* eslint-disable-next-line */
        location.reload();
      }, 400);
    }

    this.updateBill(props);
  }

  updateBill(props) {
    const id = props.client?.id || props.deal.idClient;

    dealAPI.getDeals(id).then((deals) => {
      const currentDeal = deals.find((el) => el.id === props.deal.id);

      if (currentDeal) {
        const card = document.querySelector(`.deal-card[data-deal="${currentDeal.id}"]`);

        if (card) {
          const dealPaid = card.querySelector('.deal-price__value--black');
          dealPaid.innerText = `${currentDeal.paid} ₽`;
        }
      }
    });
  }
}

export default AfterSaveComment;
