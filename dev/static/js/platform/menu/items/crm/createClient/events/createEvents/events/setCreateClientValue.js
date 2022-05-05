import Utils from '../../../../../../../utils/utils.js';
import EnableUpdateButton from '../../../../clientCard/events/enableUpdateButton.js';
import SaveNewClientRequest from './saveNewClientRequest.js';
import Validation from '../../../../../../../utils/validation.js';

const utils = new Utils();
const enableUpdateButton = new EnableUpdateButton();
const saveNewClientRequest = new SaveNewClientRequest();
const validation = new Validation();

class SetCreateClientValue {
  init(createClientPack) {
    const props = {
      ...createClientPack,
    };

    const { menu, pack } = props;
    const { today, manager } = pack;

    const when = menu.querySelector('[when-create]');
    when.innerText = utils.getDateFormatDDMMYYYY(today);

    const who = menu.querySelector('[who-create]');
    who.innerText = manager.name;

    const inputName = menu.querySelector('[js-change-client-name]');
    inputName.classList.remove('hide');

    const name = menu.querySelector('[js-client-name]');
    name.classList.add('hide');

    const clientInfo = menu.querySelectorAll('.client-edit');

    if (clientInfo.length) {
      const enableBtn = enableUpdateButton.init.bind(enableUpdateButton);
      enableBtn(props);

      this.#setNameToMenu(menu, props);

      const saveBtn = menu.querySelector('[edit-client]');

      if (saveBtn) {
        const save = utils.setCloneElement(saveBtn);
        const saveClient = saveNewClientRequest.init.bind(saveNewClientRequest, props);

        save.addEventListener('click', saveClient);

        const wrapper = menu.querySelector('.platform-form__items');

        const toValidationError = validation.toValidationError.bind(validation, wrapper);

        save.addEventListener('dblclick', toValidationError);
      }
    }
  }

  #setNameToMenu(menu, props) {
    const { clientSearched } = props;

    const inputName = menu.querySelector('[js-change-client-name]');

    if (inputName) {
      inputName.value = clientSearched.search;
    }
  }
}

export default SetCreateClientValue;
