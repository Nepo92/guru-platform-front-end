import Utils from '../../../../../../utils/utils.js';
import Popup from '../../../../../../modules/popup/popup.js';
import SettingsContract from '../../settingsContract/settingsContract.js';
import IContractTemplate from '../iTemplates/iContractsTemplates.js';
import Select from '../../../../../../modules/select/select.js';

const utils = new Utils();
const popup = new Popup();
const settingsContract = new SettingsContract();
const iContractTemplate = new IContractTemplate();
const select = new Select();

class IEditContract {
  init(props) {
    const wrapper = document.querySelector('[contracts]');

    if (wrapper) {
      const dispatchWrapperClick = this.#dispatchWrapperClick.bind(this, props);
      const dispatchWrapperChange = this.#dispatchWrapperChange.bind(this, props);

      if (wrapper) {
        wrapper.addEventListener('click', dispatchWrapperClick);
        wrapper.addEventListener('change', dispatchWrapperChange);
      }
    }
  }

  #dispatchWrapperClick(props, e) {
    const t = e.target;

    props.target = t;

    const contractId = +utils.getParent(props.target, 'contract__row')?.getAttribute('data-id');
    props.contractId = contractId;

    const editContract = this.#editContract.bind(this, props);
    const removeContract = this.#removeContract.bind(this, props);

    const types = [
      {
        type: 'edit-contract',
        class: 'edit-contract__edit-icon',
      },
      {
        type: 'remove-contract',
        class: 'edit-contract__remove-icon',
      },
    ];

    const actions = [
      {
        type: 'edit-contract',
        action: editContract,
      },
      {
        type: 'remove-contract',
        action: removeContract,
      },
    ];

    const currentClass = types.find((el) => t.classList.contains(el.class));

    if (currentClass) {
      const currentAction = actions.find((el) => el.type === currentClass.type);

      currentAction.action(props);
    }
  }

  #dispatchWrapperChange(props, e) {
    const t = e.target;

    props.target = t;

    settingsContract.changeContractStatus(props);
  }

  #editContract(props) {
    const menu = document.querySelector('[contract-menu]');
    props.menu = menu;

    utils.openModalAnimation(menu, true);
    this.#setData(props);

    const updateBtn = menu.querySelector('[js-save-contract]');

    if (updateBtn) {
      updateBtn.innerText = 'Редактировать';
      const cloneUpdate = utils.setCloneElement(updateBtn);

      const updateContract = settingsContract.editContract.bind(settingsContract, props);

      cloneUpdate.addEventListener('click', updateContract);
    }
  }

  #removeContract(props) {
    const { target } = props;

    const removeContract = settingsContract.removeContract.bind(settingsContract, props);

    const popupProps = {
      title: null,
      settings: null,
      text: 'Вы действительно хотите удалить этот договор?',
      ok: removeContract,
      cancel: null,
      target,
    };

    popup.init(popupProps);
  }

  #setData(props) {
    const { pack, target, menu } = props;
    const { contracts } = pack;

    const wrapper = menu.querySelector('[contract-menu-content]');

    const name = menu.querySelector('.menu-header__title');

    if (name) {
      name.innerText = 'Редактировать договор';
    }

    utils.removeChildren(wrapper);

    const currentContractId = +utils.getParent(target, 'contract__row').getAttribute('data-id');

    if (currentContractId) {
      const currentContract = contracts.find((el) => el.id === currentContractId);
      props.currentContract = currentContract;

      const content = iContractTemplate.settingsContractMenuTemplate(currentContract);

      wrapper.insertAdjacentHTML('afterbegin', content);

      const getSelectProps = this.getSelectProps(props);

      getSelectProps.then(() => {
        select.init(props);
      });
    }
  }

  async getSelectProps(props) {
    const { menu, currentContract } = props;

    props.selectsArray = [];

    const selectItems = menu.querySelectorAll('[select-here]');

    if (selectItems) {
      const isSelectContractType = currentContract.type === 0 ? 'Договор оферты' : 'Политика конфиденциальности';
      const isSelectContractStatus = currentContract.active ? 'Активен' : 'Не активен';

      selectItems.forEach(async (item) => {
        const type = item.getAttribute('data-select-type');

        const selectProps = {
          type,
          openUp: false,
          placeholder: type === 'select-contract' ? 'Выберите тип договора' : 'Выберите статус договора',
          defaultValue: type === 'select-contract' ? `${currentContract.type}` : currentContract.active,
          defaultPlaceholder: type === 'select-contract' ? isSelectContractType : isSelectContractStatus,
          required: true,
          item,
          mode: 'custom',
        };

        await props.selectsArray.push(selectProps);
      });
    }
  }
}

export default IEditContract;
