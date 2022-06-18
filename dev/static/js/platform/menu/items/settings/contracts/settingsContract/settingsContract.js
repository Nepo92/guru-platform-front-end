import Utils from '../../../../../utils/utils.js';
import { contractAPI } from '../../../../../api/api.js';
import ValidateContract from '../../../../../utils/validation/contract/validateContract.js';

const utils = new Utils();
const validateContract = new ValidateContract();

class SettingsContract {
  async addContract(props) {
    let data;

    const validation = validateContract.init(props, false);

    if (validation) {
      data = this.#getContractData(props, false);

      const loader = setTimeout(utils.showLoader, 400);

      const savedId = await contractAPI.saveContract(data);

      clearTimeout(loader);
      utils.hideLoader();

      data.id = savedId;
      data.createDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      data.userName = props.pack.company.name.trim();
      props.pack.contracts.push(data);
    }

    return await data;
  }

  editContract(props) {
    if (validateContract.init(props, true)) {
      const { menu } = props;

      const data = this.#getContractData(props, true);

      const update = contractAPI.updateContract(data);

      const loader = setTimeout(utils.showLoader, 400);

      update.then(() => {
        clearTimeout(loader);
        utils.hideLoader();

        const getContracts = contractAPI.getContracts();

        getContracts.then((agreements) => {
          props.pack.contracts = utils.contractsToArray(agreements);

          const wrapper = menu.querySelector('.platform-modal__wrapper');
          utils.closeModalAnimation(menu, wrapper, false, false);

          props.rerenderContent.init(props);
        });
      });
    }
  }

  removeContract(props) {
    const { contractId } = props;

    const remove = contractAPI.removeContract({
      id: contractId,
    });

    remove.then(() => {
      const currentContract = document.querySelector(`.contract__row[data-id="${contractId}"]`);

      if (currentContract) {
        currentContract.remove();
        props.pack.contracts = props.pack.contracts.filter((el) => el.id !== contractId);
      }
    });
  }

  #getContractData(props, isUpdate) {
    const {
      menu,
      contractId,
    } = props;

    const name = menu.querySelector('[contract-name]')
        .value
        .trim();
    const link = menu.querySelector('[contract-link]')
        .value
        .trim();
    const code = +Array.from(document.querySelectorAll('.platform-tabs__link'))
        .find((el) => el.classList.contains('active'))
        .getAttribute('data-type');
    const { keyField } = props.pack.typesContracts.find((el) => el.keyField === code);

    const type = menu.querySelector('[data-select-type="select-contract"] [id-selected]')?.value;
    const selectedType = type === 'oferta' ? 0 : 1;

    const statusSelectItem = document.querySelector(`.contract__row[data-id="${contractId}"] [type="radio"]`);

    const statusSelectValue = statusSelectItem?.checked;

    const statusSelect = isUpdate ? statusSelectValue : true;

    const data = {
      name,
      link,
      code: keyField,
      active: statusSelect,
      type: selectedType,
    };

    if (isUpdate) {
      data.id = contractId;
    }

    return data;
  }

  changeContractStatus(props) {
    const {
      target,
      pack,
    } = props;

    if (!props.prevTarget) {
      props.prevTarget = target;
    }

    const contractId = +utils.getParent(target, 'contract__row')
        .getAttribute('data-id');

    const currentContract = pack.contracts.find((el) => el.id === contractId);

    if (currentContract) {
      currentContract.active = target.checked;
    }

    const update = contractAPI.updateContract(currentContract);

    const loader = setTimeout(() => {
      utils.showLoader();
    }, 400);

    update.then(() => {
      clearTimeout(loader);
      utils.hideLoader();

      const sameTape = props.pack.contracts.filter((el) => {
        const isSameType = el.type === currentContract.type;
        const isSameCode = el.code === currentContract.code;

        if (isSameCode && isSameType) {
          return el;
        }
      });

      const sameTapeIsActive = sameTape.find((el) => el.active && el.id !== currentContract.id);

      if (sameTapeIsActive) {
        sameTapeIsActive.active = false;

        const updatePrev = contractAPI.updateContract(sameTapeIsActive);

        updatePrev.then(() => {
          this.#rerenderContent(props, loader);
        });
      } else {
        this.#rerenderContent(props, loader);
      }
    });
  }

  #rerenderContent(props, loader) {
    const getContracts = contractAPI.getContracts();

    getContracts.then((treatyies) => {
      clearTimeout(loader);
      utils.hideLoader();

      props.pack.contracts = utils.contractsToArray(treatyies);

      props.rerenderContent.init(props);
    });
  }

  searchContract(props, e) {
    const t = e.target;
    const { value } = t;

    const items = document.querySelectorAll('.contract__row');

    if (items.length) {
      items.forEach((item) => {
        const name = item.querySelector('[contract-name]');

        if (name) {
          if (!(~name.value.trim()
              .toLowerCase()
              .indexOf(value.trim()
                  .toLowerCase()))) {
            item.classList.add('hide');
          } else {
            item.classList.remove('hide');
          }
        }
      });
    }
  }
}

export default SettingsContract;
