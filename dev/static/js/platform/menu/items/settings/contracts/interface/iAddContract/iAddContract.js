import Utils from '../../../../../../utils/utils.js';
import IContractTemplate from '../iTemplates/iContractsTemplates.js';
import Select from '../../../../../../modules/select/select.js';
import SettingsContract from '../../settingsContract/settingsContract.js';
import { contractAPI } from '../../../../../../api/api.js';

const utils = new Utils();
const interfaceCTemplate = new IContractTemplate();
const select = new Select();
const settingsContract = new SettingsContract();

class IAddContract {
  init(props) {
    const button = document.querySelector('[upload-contract]');

    if (button) {
      const addContract = this.#openAddContractMenu.bind(this, props);

      button.addEventListener('click', addContract);
    }
  }

  #openAddContractMenu(props) {
    const menu = document.querySelector('[contract-menu]');
    props.menu = menu;

    utils.openModalAnimation(menu, true);

    const name = menu.querySelector('.menu-header__title');

    if (name) {
      name.innerText = 'Добавить договор';
    }

    const wrapper = menu.querySelector('[contract-menu-content]');

    if (wrapper) {
      utils.removeChildren(wrapper);

      const content = interfaceCTemplate.settingsContractMenuTemplate();

      wrapper.insertAdjacentHTML('afterbegin', content);
    }

    const selectItem = menu.querySelector('[select-here]');
    const type = selectItem.getAttribute('data-select-type');

    const selectProps = {
      type,
      mode: 'custom',
      openUp: false,
      item: selectItem,
      placeholder: 'Выберите тип договора',
      required: true,
    };

    props.selectsArray = [];
    props.selectsArray.push(selectProps);

    const initSelectItems = select.init(props);

    initSelectItems.then(() => {
      const addBtn = menu.querySelector('[js-save-contract]');

      if (addBtn) {
        addBtn.innerText = 'Добавить';

        const addContract = this.addContract.bind(this, props);
        const add = utils.setCloneElement(addBtn);
        add.addEventListener('click', addContract);
      }
    });
  }

  addContract(props) {
    const addContract = settingsContract.addContract.bind(settingsContract);

    addContract(props).then((savedContract) => {
      this.#afterSaveContract(props, savedContract);
    });
  }

  #afterSaveContract(props, savedContract) {
    if (!savedContract) return false;

    const { menu } = props;

    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, false);

    const getAgreements = contractAPI.getContracts();

    getAgreements.then((contractsData) => {
      props.pack.contracts = utils.contractsToArray(contractsData);

      const sameType = props.pack.contracts.filter((el) => el.type === savedContract.type);
      const sameTypeIsActive = sameType.find((el) => el.active && el.id !== savedContract.id);

      if (sameTypeIsActive) {
        this.#updateOlderContract(props, sameTypeIsActive);
      } else {
        props.rerenderContent.init(props);
      }
    });
  }

  #updateOlderContract(props, sameTypeIsActive) {
    sameTypeIsActive.active = false;

    const updateActiveContract = contractAPI.updateContract(sameTypeIsActive);

    updateActiveContract.then(() => {
      const getContracts = contractAPI.getContracts();

      getContracts.then((contracts) => {
        props.pack.contracts = utils.contractsToArray(contracts);

        props.rerenderContent.init(props);
      });
    });
  }
}

export default IAddContract;
