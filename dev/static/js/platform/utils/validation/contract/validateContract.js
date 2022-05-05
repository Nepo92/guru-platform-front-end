import ValidationWrapper from '../../validationWrapper.js';

class ValidateContract extends ValidationWrapper {
  init(props, isUpdate) {
    const { pack, menu } = props;
    const { contracts } = pack;

    if (contracts.length && !isUpdate) {
      const checkUniqName = this.checkUniqName(contracts, menu);

      if (!checkUniqName) {
        return checkUniqName;
      }
    }

    const required = Array.from(menu.querySelectorAll('[required]'));

    const validate = required.every((el) => el.value);

    if (validate) return true;

    required.forEach((item) => {
      if (!item.value) {
        this.setError(item);
      }
    });

    return false;
  }

  checkUniqName(contracts, menu) {
    const names = contracts.map((el) => {
      return el.name.toLowerCase();
    });

    const nameInput = menu.querySelector('[contract-name]');

    const nameInputValue = nameInput.value.trim().toLowerCase();

    const notUniq = names.includes(nameInputValue);

    if (notUniq) {
      this.setError(nameInput, 'Имя должно быть уникальным');

      return false;
    }

    return true;
  }

  validateLink() {
    const link = document.querySelector('.dialog__wrapper [doc-link]');

    if (!link.value) {
      this.setError(link);
    }

    return Boolean(link.value);
  }
}

export default ValidateContract;
