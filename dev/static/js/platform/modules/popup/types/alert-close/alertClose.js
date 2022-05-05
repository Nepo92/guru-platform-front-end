import Utils from '../../../../utils/utils.js';
import PopupWrapper from '../popupWrapper.js';
import PopupTemplate from '../../template/popupTemplate.js';

const utils = new Utils();
const popupTemplate = new PopupTemplate();

class AlertClose extends PopupWrapper {
  init(props) {
    const {
      wrapper,
      cancel,
      target,
      title,
      text,
    } = props;

    wrapper.innerHTML = popupTemplate.alertClose(title, text);

    const cancelBtn = wrapper.querySelector('[close-dialog]');

    if (cancelBtn) {
      const cancelClone = utils.setCloneElement(cancelBtn);

      if (cancel) {
        const cancelFunc = cancel.bind(cancel);
        cancelClone.addEventListener('click', cancelFunc);
      } else {
        const removePopup = this.removePopup.bind(this, target, props);
        cancelClone.addEventListener('click', removePopup);
      }
    }
  }
}

export default AlertClose;
