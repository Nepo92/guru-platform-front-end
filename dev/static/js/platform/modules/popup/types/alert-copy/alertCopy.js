import PopupTemplate from '../../template/popupTemplate.js';
import Utils from '../../../../utils/utils.js';
import PopupWrapper from '../popupWrapper.js';

const popupTemplate = new PopupTemplate();
const utils = new Utils();

class AlertCopy extends PopupWrapper {
  init(props) {
    const {
      wrapper,
      title,
      text,
    } = props;

    wrapper.innerHTML = popupTemplate.alertCopy(title, text);

    const copyBtn = wrapper.querySelector('[copy-dialog]');

    if (copyBtn) {
      const copy = utils.setCloneElement(copyBtn);

      const copyAlertInner = this.copyAlertInner.bind(this, props);
      copy.addEventListener('click', copyAlertInner);
    }
  }

  copyAlertInner(props, e) {
    const { target, text } = props;
    e.preventDefault();
    e.stopPropagation();

    utils.copyLink(text);
    this.removePopup(target, props);
  }
}

export default AlertCopy;
