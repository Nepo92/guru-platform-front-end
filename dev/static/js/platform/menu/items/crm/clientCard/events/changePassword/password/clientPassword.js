import Popup from '../../../../../../../modules/popup/popup.js';
import { clientAPI } from '../../../../../../../api/api.js';
import PasswordTemplates from './templates/passwordTemplates.js';
import ValidatePassword from '../../../../../../../utils/validation/validatePassword/validatePassword.js';
import AccessDefault from '../../getAccess/accessDefault.js';

const popup = new Popup();
const passwordTemplates = new PasswordTemplates();
const validatePassword = new ValidatePassword();
const accessDefault = new AccessDefault();

class ClientPassword {
  async openPopup(props, e) {
    const updatePassword = this.updatePassword.bind(this, props);
    const t = e.target;

    const popupProps = {
      settings: null,
      title: 'Смена пароля',
      text: '',
      ok: updatePassword,
      cancel: null,
      target: t,
    };

    await popup.init(popupProps);

    const dialogContent = document.querySelector('.dialog__text');
    const content = passwordTemplates.contentPopup();

    await dialogContent.insertAdjacentHTML('afterbegin', content);
    props.generatePassword();
  }

  generatePassword() {
    const generate = clientAPI.generatePassword();

    generate.then((password) => {
      const inputs = document.querySelectorAll('.client-password__input');

      if (inputs.length) {
        inputs.forEach((item, index) => {
          if (index === 0) {
            item.value = password.newPassword;
          } else {
            item.value = '';
          }
        });
      }
    });
  }

  updatePassword(props) {
    const { client } = props;

    const form = document.querySelector('.dialog__wrapper');

    if (validatePassword.init(form)) {
      const data = {
        id: client.id,
        userLogin: client.userLogin,
        userPassword: document.querySelector('.dialog__wrapper .client-password__input').value.trim(),
        idUser: client.idUser,
      };

      const updatePassword = clientAPI.updatePassword(data);

      updatePassword.then(() => {
        props.client.userPassword = data.userPassword;

        accessDefault.init(props);
      });
    } else {
      return 'no-valid';
    }
  }
}

export default ClientPassword;
