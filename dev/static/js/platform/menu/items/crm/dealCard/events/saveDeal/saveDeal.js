import Utils from '../../../../../../utils/utils.js';
import AfterSaveDeal from './events/afterSaveDeal.js';
import Validation from '../../../../../../utils/validation.js';
import { dealAPI } from '../../../../../../api/api.js';

const afterSaveDeal = new AfterSaveDeal();
const utils = new Utils();
const validation = new Validation();

class SaveDeal {
  init(dealCardPack) {
    const { menu } = dealCardPack;
    const saveBtn = menu.querySelector('[edit-deal]');

    if (saveBtn) {
      const save = this.saveChanges.bind(this, dealCardPack);
      const saveClone = utils.setCloneElement(saveBtn);
      saveClone.addEventListener('click', save);
    }
  }

  saveChanges(dealCardPack, e) {
    const { pack, deal } = dealCardPack;
    const { idClient, createDate, id } = deal;

    const menu = document.querySelector('[js-menu-deal]');

    const productItem = Array.from(menu.querySelector('[products]')).filter((el) => el.selected);

    const statusValue = +menu.querySelector('[status-deal]').value;
    const socialValue = +menu.querySelector('[status-social]').value;
    const dateRequestValue = menu.querySelector('[date-request]').value;
    const dealTypeValue = menu.querySelector('[deal-type]').value;
    const funnelValue = +menu.querySelector('[funnel]').value;
    const mailingValue = menu.querySelector('[mailing]').checked;
    const productsValue = menu.querySelector('[products]').value;
    const tariffSelect = menu.querySelector('[select-tariff]');
    const tariffValue = tariffSelect ? +tariffSelect.querySelector('[id-tariff]').value : null;
    const streamsValue = menu.querySelector('[streams]').value;
    const trialValue = menu.querySelector('[trial]').checked;
    const priceValue = menu.querySelector('[price]').value;
    const allModulesHomeworkAllowed = menu.querySelector('[stop-lesson]').checked;
    const tagValue = menu.querySelector('[tag]').value;
    const commentValue = menu.querySelector('[comment]').value;

    const isAdmin = pack.role === 'ROLE_ADMIN' ? pack.filter.idManager : null;
    const isManager = pack.manager.id;

    const idManager = isAdmin || isManager;
    const courseValue = productItem[0].getAttribute('data-title');
    const productTypeValue = productItem[0].getAttribute('type');
    const saleTypeValue = productItem[0].getAttribute('data-type');

    const data = {
      id,
      idManager,
      idClient,
      status: statusValue,
      dealDate: dateRequestValue,
      createDate: pack.today ? pack.today : createDate,
      saleType: saleTypeValue,
      idFunnel: funnelValue,
      isMailing: mailingValue || false,
      idProduct: productsValue,
      idTariff: tariffValue || null,
      idStream: streamsValue,
      trial: trialValue || false,
      price: priceValue !== 'undefined' ? priceValue : null,
      allModulesHomeworkAllowed,
      tag: tagValue || null,
      comment: commentValue || null,
      course: courseValue,
      social: socialValue,
      type: dealTypeValue,
      product: productTypeValue || '',
    };

    const { isUpdate } = dealCardPack;

    const form = menu.querySelector('[js-deal-form]');

    if (validation.validateDeal(form)) {
      let request;

      const t = e.target;
      t.style.pointerEvents = 'none';

      if (isUpdate) {
        request = dealAPI.updateDeal(data);
      } else {
        request = dealAPI.createDeal(data);
      }

      request.then(() => {
        const items = [afterSaveDeal];

        items.forEach((item) => {
          const init = item.init.bind(item);
          init(dealCardPack);
        });
      });
    }
  }
}

export default SaveDeal;
