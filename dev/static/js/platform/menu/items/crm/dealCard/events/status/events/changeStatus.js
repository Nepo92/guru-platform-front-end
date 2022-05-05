import { dealAPI } from '../../../../../../../api/api.js';
import AfterChangeDealCardStatus from './afterChangeDealCardStatus.js';
import Utils from '../../../../../../../utils/utils.js';
import IndicatorNow from '../../indicator/events/indicatorNow.js';

const afterChangeDealCardStatus = new AfterChangeDealCardStatus();
const utils = new Utils();
const indicatorNow = new IndicatorNow();

class ChangeStatus {
  init(dealCardPack) {
    const { menu } = dealCardPack;

    if (menu) {
      const statuses = menu.querySelectorAll('[data-select-type="status-deal"] [id-selected]');

      if (statuses.length) {
        const changeStatus = this.#changeStatus.bind(this, dealCardPack);

        statuses.forEach((item) => {
          item.addEventListener('change', changeStatus);
        });
      }
    }
  }

  #changeStatus(dealCardPack, e) {
    const t = e.target;
    dealCardPack.target = t;

    const data = this.#getStatusData(dealCardPack);
    dealCardPack.statusCode = data.code;

    if (data.code !== data.statusChanges) {
      const changeStatus = dealAPI.changeDealStatus(data);

      changeStatus.then(() => {
        let currentDeal;

        if (dealCardPack.pack.items) {
          currentDeal = dealCardPack.pack.items.find((el) => el.id === dealCardPack.deal.id);

          if (!currentDeal) {
            currentDeal = dealCardPack.deals.find((el) => el.id === dealCardPack.deal.id);
          }
        } else {
          currentDeal = dealCardPack.deals.find((el) => el.id === dealCardPack.deal.id);
        }

        if (currentDeal) {
          dealCardPack.currentDeal = currentDeal;

          this.#addNewStatusToDeal(dealCardPack, data).then((props) => {
            const after = afterChangeDealCardStatus.init.bind(afterChangeDealCardStatus);
            after(props);

            this.#changeIndictorNow(props);
          });
        }
      });
    }
  }

  async #addNewStatusToDeal(dealCardPack, currentStatus) {
    const { currentDeal } = dealCardPack;

    if (dealCardPack.deals) {
      dealCardPack.deals = await dealCardPack.deals.map((el) => {
        if (el.id === currentDeal.id) {
          el.statusChanges.push(currentStatus);
          el.statusCode = currentStatus.code;
          el.statusName = currentStatus.title;
        }

        return el;
      });
    }

    if (dealCardPack.pack.items) {
      dealCardPack.pack.items = await dealCardPack.pack.items?.map((el) => {
        if (el.id === currentDeal.id) {
          el.statusChanges.push(currentStatus);
          el.statusCode = currentStatus.code;
          el.statusName = currentStatus.title;
        }

        return el;
      });
    }

    return dealCardPack;
  }

  #changeIndictorNow(dealCardPack) {
    const { deals, target } = dealCardPack;

    const idDeal = +utils.getParent(target, 'deal-card').getAttribute('data-deal');

    const currentDeal = deals.find((el) => el.id === idDeal);
    currentDeal.status = +target.value;

    indicatorNow.init(dealCardPack);
  }

  #getStatusData(dealCardPack) {
    const { target, pack } = dealCardPack;
    const { dealStatuses } = pack;

    const dealCard = utils.getParent(target, 'deal-card');

    const selectedStatus = dealStatuses.find((el) => el.id === +target.value);

    const idDeal = dealCard.getAttribute('data-deal');
    const { code } = selectedStatus;
    const status = selectedStatus.id;
    const prevStatus = dealCard.querySelector('[status-previous]').value;

    return {
      id: idDeal,
      code,
      status,
      statusChanges: prevStatus,
      title: dealCardPack.pack.dealStatuses.find((el) => el.id === status).title,
    };
  }
}

export default ChangeStatus;
