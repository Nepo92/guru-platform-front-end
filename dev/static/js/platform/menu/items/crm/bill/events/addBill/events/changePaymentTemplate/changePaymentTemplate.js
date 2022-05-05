import Utils from '../../../../../../../../utils/utils.js';
import { billAPI } from '../../../../../../../../api/api.js';
import BillLevelWrapper from '../billLevel/billLevelWrapper.js';
import AddBillLevel from '../billLevel/addBillLevel.js';
import BillLevel from '../billLevel/billLevel.js';

const utils = new Utils();
const billLevelWrapper = new BillLevelWrapper();
const addBillLevel = new AddBillLevel();
const billLevel = new BillLevel();

class ChangePaymentTemplate {
  init(props) {
    const { menu } = props;

    const select = menu.querySelector('[js-bill-payment-template]');

    if (select) {
      const selectTemplate = this.selectTemplate.bind(this, props);

      const selectTemp = utils.setCloneElement(select);

      selectTemp.addEventListener('change', selectTemplate);
    }
  }

  selectTemplate(props) {
    const { menu, deal, arrayBillInputs } = props;

    const selectItem = menu.querySelector('[js-bill-payment-template]');
    const addBillBtn = menu.querySelector('.add-layer');

    this.clearBillList(menu);

    if (selectItem.value) {
      const generateProps = {
        deal,
        addBillBtn,
        selectItem,
        menu,
        arrayBillInputs,
      };

      this.generateTemplate(generateProps);
    } else {
      addBillBtn.classList.remove('hide');
      const remainsValue = menu.querySelector('[bill-value-remains]');
      remainsValue.innerText = `${deal.price} ₽`;
    }
  }

  clearBillList(menu) {
    const billList = menu.querySelector('.bills-layers__list');
    billList.querySelectorAll('.bill-layer').forEach((item) => item.remove());

    const addBtn = menu.querySelector('.add-layer');
    addBtn.classList.remove('mt_20');
  }

  generateTemplate(props) {
    const {
      deal,
      selectItem,
    } = props;

    const generate = billAPI.generateBills(deal.id || deal, selectItem.value);

    const loader = setTimeout(utils.showLoader, 400);

    generate.then((templates) => {
      clearTimeout(loader);
      utils.hideLoader();

      this.afterGenerateBillTemplates(props, templates);
    });
  }

  afterGenerateBillTemplates(props, templates) {
    const { addBillBtn, menu, deal } = props;

    const templateItems = this.#getTemplateData(deal, templates);

    if (templates.length) {
      props.templates = templateItems;

      this.renderTemplateItems(props).then(() => {
        const price = this.calculateTemplatePrice(templateItems);

        const remainsProps = {
          deal,
          addBillBtn,
          menu,
          price,
        };

        this.showBillRemains(remainsProps);

        props.billTemplateMode = true;
        props.currentTemplate = false;
        billLevel.init(props);

        billLevelWrapper.changeBillPrice(props);
      });
    }
  }

  #getTemplateData(deal, templates) {
    const { price } = deal;

    const [first] = templates;
    const { sum } = first;

    if (price < sum) {
      first.sum = price;
    }

    return price > sum ? templates : [first];
  }

  calculatePrice(prev, current) {
    return (prev.sum ? prev.sum : prev) + current.sum;
  }

  calculateTemplatePrice(templates) {
    const calculatePrice = this.calculatePrice.bind(this);

    const oneTemplate = templates.length === 1;

    return oneTemplate ? templates[0].sum : templates.reduce(calculatePrice);
  }

  showBillRemains(props) {
    const {
      deal,
      addBillBtn,
      menu,
      price,
    } = props;

    const billRemains = menu.querySelector('[bill-value-remains]');

    if (billRemains) {
      const diff = deal.price - price <= 0 ? 0 : deal.price - price;

      billRemains.innerText = `${diff} ₽`;

      if (diff <= 0) {
        addBillBtn.classList.add('hide');
      }
    }
  }

  async renderTemplateItems(props) {
    const { templates } = props;

    const setBillTemplate = this.setBillTemplate.bind(this, props);
    await templates.forEach(setBillTemplate);
  }

  async setBillTemplate(props, item) {
    props.currentTemplate = item;
    await addBillLevel.init(props);
  }
}

export default ChangePaymentTemplate;
