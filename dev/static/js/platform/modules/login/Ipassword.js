import Password from './password/password.js';

const password = new Password();

class IPassword {
  init() {
    this.showPassword();
    this.hidePassword();
  }

  showPassword() {
    const showBtn = document.querySelector('.auth-element__eye-open');

    if (showBtn) {
      const show = password.showPassword.bind(this);
      showBtn.addEventListener('click', show);
    }
  }

  hidePassword() {
    const hideBtn = document.querySelector('.auth-element__eye-closed');

    if (hideBtn) {
      const hide = password.hidePassword.bind(this);
      hideBtn.addEventListener('click', hide);
    }
  }
}

export default IPassword;
