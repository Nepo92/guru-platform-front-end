import AlertConfirm from './types/alert-confirm/alertConfirm.js';
import AlertClose from './types/alert-close/alertClose.js';
import AlertCopy from './types/alert-copy/alertCopy.js';
import AlertContent from './types/alert-content/alertContent.js';
import Utils from '../../utils/utils.js';

const alertConfirm = new AlertConfirm();
const alertCopy = new AlertCopy();
const alertClose = new AlertClose();
const alertContent = new AlertContent();
const utils = new Utils();

class Popup {
  async init(props) {
    const overflow = utils.getCssProperty(document.body, 'overflow');

    if (overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
      props.overflow = overflow;
    } else {
      props.overflow = overflow;
    }

    const dialog = document.querySelector('[dialog-window]');

    if (!dialog) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('dialog');
      wrapper.setAttribute('dialog-window', '');

      props.wrapper = wrapper;

      document.body.appendChild(wrapper);
    } else {
      props.wrapper = dialog;
    }

    this.setPopupTemplate(props);
  }

  setPopupTemplate(templateProps) {
    const {
      settings,
    } = templateProps;

    switch (settings) {
      case null: {
        alertConfirm.init(templateProps);
        break;
      }
      case 'copy': {
        alertCopy.init(templateProps);
        break;
      }
      case 'alert-close': {
        alertClose.init(templateProps);
        break;
      }
      case 'content': {
        alertContent.init(templateProps);
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default Popup;
