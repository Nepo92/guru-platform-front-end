import ClientPassword from './password/clientPassword.js';
import Utils from '../../../../../../utils/utils.js';

const clientPassword = new ClientPassword();
const utils = new Utils();

class IChangePassword {
  init(props) {
    this.openPopup(props);
    this.generatePassword();
  }

  openPopup(props) {
    const { menu } = props;

    const btn = menu.querySelector('.client-password__btn');

    if (btn) {
      const cloneBtn = utils.setCloneElement(btn);

      props.generatePassword = this.generatePassword.bind(this);

      const openPopup = clientPassword.openPopup.bind(clientPassword, props);

      if (props.pack.role === 'ROLE_CURATOR') {
        cloneBtn.classList.add('hide');
      } else {
        cloneBtn.classList.remove('hide');
        cloneBtn.addEventListener('click', openPopup);
      }
    }
  }

  generatePassword(props) {
    const icon = document.querySelector('.client-password__generate');

    if (icon) {
      const clone = utils.setCloneElement(icon);

      const generatePassword = clientPassword.generatePassword.bind(clientPassword, props);

      clone.addEventListener('click', generatePassword);
    }
  }
}

export default IChangePassword;
