import Utils from '../../../../../../../utils/utils.js';
import Select from '../../../../../../../modules/select/select.js';
import Datepicker from '../../../../../../../modules/datepicker/datepicker.js';
import Status from './dealItems/status/status.js';
import Social from './dealItems/social/social.js';
import DateRequest from './dealItems/dateRequest/dateRequest.js';
import DealType from './dealItems/dealType/dealType.js';
import Funnel from './dealItems/funnel/funnel.js';
import Product from './dealItems/product/product.js';
import Tag from './dealItems/tag/tag.js';
import Comment from './dealItems/comment/comment.js';
import DealRequest from '../../requests/dealRequest.js';
import Validation from '../../../../../../../utils/validation.js';

const utils = new Utils();
const select = new Select();
const datepicker = new Datepicker();
const status = new Status();
const social = new Social();
const dateRequest = new DateRequest();
const dealType = new DealType();
const funnel = new Funnel();
const product = new Product();
const tag = new Tag();
const comment = new Comment();
const dealRequest = new DealRequest();
const validation = new Validation();

class AfterGetDeal {
  init(dealPack) {
    const getSelectProps = this.#getSelectProps(dealPack);

    getSelectProps.then(() => {
      const setSelects = select.init(dealPack);

      setSelects.then(() => {
        this.initDealItems(dealPack);
      });
    });
  }

  async #getSelectProps(props) {
    const { menu, deal, pack } = props;

    const selects = menu.querySelectorAll('[select-here]');

    props.selectsArray = [];

    selects.forEach(async (item) => {
      Array.from(item.children).forEach((el, count) => {
        if (count !== 0) {
          el.remove();
        }
      });

      const type = item.getAttribute('data-select-type');

      const selectProps = {
        type,
        item,
        props,
        deal,
        pack,
      };

      await this.#dispatchSelectItem(selectProps);
    });
  }

  #dispatchSelectItem(selectProps) {
    const {
      item,
      type,
      props,
      deal,
      pack,
    } = selectProps;

    const selectItemProps = {
      required: true,
      placeholder: null,
      mode: 'custom',
      type,
    };

    switch (type) {
      case 'select-status': {
        selectItemProps.placeholder = 'Выберите статус';
        selectItemProps.item = item;

        if (deal) {
          selectItemProps.defaultValue = deal.status || '';
          selectItemProps.defaultPlaceholder = deal.statusName || '';
        }
        break;
      }
      case 'select-social': {
        selectItemProps.placeholder = 'Выберите канал связи откуда поступило обращение';
        selectItemProps.item = item;

        if (deal) {
          selectItemProps.defaultValue = deal?.social;
          const isDeal = pack.social.find((el) => el.id === deal?.social)?.title;

          selectItemProps.defaultPlaceholder = deal ? isDeal : false;
        }
        break;
      }
      case 'select-deal-type': {
        selectItemProps.placeholder = 'Выберите тип продажи';
        selectItemProps.item = item;

        if (deal) {
          const value = deal.type === 'Допродажа' || deal.type === 'additional' ? 'База' : 'Трафик';
          selectItemProps.defaultValue = value;
          selectItemProps.defaultPlaceholder = value;
        }
        break;
      }
      case 'select-funnel': {
        selectItemProps.placeholder = 'Выберите воронку';
        selectItemProps.item = item;

        if (deal) {
          selectItemProps.defaultValue = deal.idFunnel;

          const funnels = Object.entries(pack.funnels);

          const currentDealType = utils.getDealType(deal);

          const currentFunnels = funnels.find((el) => el[0] === currentDealType);

          if (currentFunnels) {
            const currentFunnel = currentFunnels[1].find((it) => it.idFunnel === deal.idFunnel);

            if (currentFunnel) {
              selectItemProps.defaultPlaceholder = currentFunnel?.funnelName;
            }
          }
        }
        break;
      }
      case 'select-product': {
        selectItemProps.placeholder = 'Выберите продукт';
        selectItemProps.item = item;

        selectItemProps.defaultValue = deal?.idProduct;

        if (deal) {
          const { products: courses } = pack;

          selectItemProps.defaultPlaceholder = courses.find((el) => el.id === deal.idProduct)?.name;
        }
        break;
      }
      case 'select-tariff': {
        selectItemProps.placeholder = 'Выберите тариф';
        selectItemProps.item = item;

        selectItemProps.defaultValue = deal?.idTariff;

        if (deal) {
          const { tariffs } = pack;

          selectItemProps.defaultPlaceholder = tariffs?.find((el) => el.id === deal.idTariff)?.name;
        }
        break;
      }
      case 'select-stream': {
        selectItemProps.placeholder = 'Выберите дату старта';
        selectItemProps.item = item;

        if (deal) {
          selectItemProps.defaultValue = deal.idStream;
          selectItemProps.defaultPlaceholder = utils.getDateFormatDDMMYYYY(deal.startDate);
        }
        break;
      }
      default: {
        break;
      }
    }

    props.selectsArray.push(selectItemProps);
  }

  searchCurrentFunnel(deal, el) {
    if (Array.isArray(el)) {
      return el;
    }
  }

  initDealItems(dealPack) {
    const { deal } = dealPack;

    const items = [
      datepicker,
      status,
      social,
      dateRequest,
      dealType,
      funnel,
      product,
      tag,
      comment,
    ];

    dealPack.isChangedProduct = false;
    dealPack.isChanged = false;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealPack);
    });

    this.initTabs(dealPack);
    this.setRequest(dealPack, deal);
  }

  initTabs(dealPack) {
    const { tabsObs } = dealPack;

    const tabs = tabsObs.init.bind(tabsObs);

    const tabPackDeal = {
      ...dealPack,
    };

    tabs(tabPackDeal);
  }

  setRequest(dealPack, deal) {
    const { menu } = dealPack;

    const updateBtn = menu.querySelector('[edit-deal]');

    const cloneUpdate = utils.setCloneElement(updateBtn);

    if (updateBtn && deal) {
      const updateDeal = dealRequest.updateDeal.bind(dealRequest, dealPack);
      cloneUpdate.addEventListener('click', updateDeal);

      const toValidationError = validation.toValidationError.bind(validation);
      cloneUpdate.addEventListener('dblclick', toValidationError);
    } else if (updateBtn && !deal) {
      const saveDeal = dealRequest.saveNewDeal.bind(dealRequest, dealPack);
      cloneUpdate.addEventListener('click', saveDeal);

      const toValidationError = validation.toValidationError.bind(validation);
      cloneUpdate.addEventListener('dblclick', toValidationError);
    }
  }
}

export default AfterGetDeal;
