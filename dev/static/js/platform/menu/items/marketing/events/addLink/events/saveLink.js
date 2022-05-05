import Select from '../../../../../../modules/select/select.js';
import InterfaceDealType from '../../../../crm/dealCard/deal/events/afterGetDeal/interfaces/interfaceDealType.js';
import Utils from '../../../../../../utils/utils.js';

const select = new Select();
const interfaceDealType = new InterfaceDealType();
const utils = new Utils();

class SaveLink {
  init(props) {
    const addLinkProps = {
      ...props,
      menu: document.querySelector('[js-menu-add-outside]'),
    };

    const { menu } = addLinkProps;

    if (menu) {
      utils.openModalAnimation(menu, true);

      const getSelectProps = this.getSelectProps(menu);

      getSelectProps.then((selectsArray) => {
        addLinkProps.selectsArray = selectsArray;

        const setSelect = select.init(addLinkProps);

        setSelect.then(() => {
          interfaceDealType.change(addLinkProps);
        });
      });
    }
  }

  async getSelectProps(menu) {
    const selectsArray = [];

    const selects = menu.querySelectorAll('[select-here]');

    if (selects.length) {
      selects.forEach(async (item) => {
        utils.removeChildren(item, 0);

        const type = item.getAttribute('data-select-type');

        const selectProps = {
          mode: 'custom',
          type,
          required: true,
          placeholder: null,
          item,
        };

        switch (type) {
          case 'select-deal-type': {
            selectProps.placeholder = 'Выберите тип продажи';
            selectProps.name = 'dealType';
            break;
          }
          case 'select-funnel': {
            selectProps.placeholder = 'Выберите воронку';
            selectProps.name = 'funnel';
            break;
          }
          default: {
            break;
          }
        }

        await selectsArray.push(selectProps);
      });
    }

    return selectsArray;
  }
}

export default SaveLink;
