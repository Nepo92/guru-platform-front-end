import PaymentFormTemplates from '../../../../templates/paymentFormTemplates.js';
import SetData from './events/setData.js';
import Select from '../../../../../../../../modules/select/select.js';
import InterfaceDealType from '../../../../../../crm/dealCard/deal/events/afterGetDeal/interfaces/interfaceDealType.js';
import InterfaceProductPaymentForm from '../../../../interfaces/interfaceProductPaymentForm.js';

const paymentFormTemplates = new PaymentFormTemplates();
const setData = new SetData();
const select = new Select();
const interfaceDealType = new InterfaceDealType();
const interfaceProductPaymentForm = new InterfaceProductPaymentForm();

class WithChoiceProduct {
  init(props) {
    const { menu } = props;
    const render = this.#render.bind(this);

    render(props).then(() => {
      const items = [setData];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props, menu);
      });

      interfaceDealType.change(props);
      interfaceProductPaymentForm.change(props);
    });
  }

  async #render(props) {
    const { menu } = props;
    const wrapper = menu.querySelector('.payment-form__list');

    if (wrapper) {
      wrapper.remove();
    }

    const list = menu.querySelector('.payment-form__menu--content');

    if (list) {
      const ul = document.createElement('ul');
      ul.classList.add('payment-form__list');

      ul.innerHTML = paymentFormTemplates.menuWithChoiceProduct();

      list.appendChild(ul);

      await this.#initSelectItems(props);
    }
  }

  async #initSelectItems(props) {
    const { menu } = props;

    const selects = menu.querySelectorAll('[select-here]');

    if (selects.length) {
      selects.forEach((item) => {
        Array.from(item.children).forEach((el, count) => {
          if (count !== 0) {
            el.remove();
          }
        });
      });

      props.selectsArray = [];

      for (let index = 0; index < selects.length; index++) {
        const item = selects[index];

        await this.#dispatchSelectItem(item, props);
      }

      await select.init(props);
    }
  }

  #dispatchSelectItem(item, props) {
    const { selectsArray, currentForm, pack } = props;

    const type = item.getAttribute('data-select-type');

    const statusProps = {
      required: true,
      placeholder: null,
      mode: 'custom',
      item,
      defaultValue: null,
      defaultPlaceholder: null,
      type: type.trim(),
      openUp: false,
    };

    switch (type) {
      case 'select-deal-type': {
        statusProps.placeholder = 'Выберите тип продажи';
        statusProps.defaultValue = currentForm?.dealType;

        const editFormMode = currentForm?.dealType === 'additional' ? 'База' : 'Трафик';
        statusProps.defaultPlaceholder = currentForm ? editFormMode : false;
        break;
      }
      case 'select-funnel': {
        statusProps.placeholder = 'Выберите воронку';
        statusProps.defaultValue = currentForm?.funnel.idFunnel;
        statusProps.defaultPlaceholder = currentForm?.funnel.funnelName;
        break;
      }
      case 'select-product': {
        statusProps.placeholder = 'Выберите продукт';
        statusProps.defaultValue = currentForm?.course.id;
        statusProps.defaultPlaceholder = currentForm?.course.name;
        break;
      }
      case 'select-tariff': {
        statusProps.placeholder = 'Выберите тариф';
        statusProps.defaultValue = currentForm?.tariff?.id;
        statusProps.defaultPlaceholder = currentForm?.tariff?.name;
        break;
      }
      case 'select-payment-method': {
        const { paymentMethods: methods } = pack;
        statusProps.placeholder = 'Выберите метод оплаты';

        if (currentForm) {
          const { idPaymentMethod } = currentForm;
          statusProps.defaultValue = idPaymentMethod;
          statusProps.defaultPlaceholder = methods.find((el) => el.id === idPaymentMethod)?.title;
        }
        break;
      }
      default: {
        break;
      }
    }

    selectsArray.push(statusProps);
  }
}

export default WithChoiceProduct;
