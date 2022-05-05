class Password {
  showPassword(e) {
    const pwd = document.querySelector('#password');

    if (pwd) {
      pwd.setAttribute('type', 'text');
    }

    const closeBtn = document.querySelector('.auth-element__eye-closed');

    if (closeBtn) {
      closeBtn.style.display = 'inline-block';
      e.target.style.display = 'none';
    }
  }

  hidePassword(e) {
    const pwd = document.querySelector('#password');

    if (pwd) {
      pwd.setAttribute('type', 'password');
    }

    const open = document.querySelector('.auth-element__eye-open');

    if (open) {
      open.style.display = 'inline-block';
      e.target.style.display = 'none';
    }
  }
}

export default Password;
