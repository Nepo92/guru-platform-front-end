import PopupTemplate from '../../template/popupTemplate.js';
import Utils from '../../../../utils/utils.js';
import PopupWrapper from '../popupWrapper.js';

const popupTemplate = new PopupTemplate();
const utils = new Utils();

class AlertContent extends PopupWrapper {
  init(props) {
    const {
      wrapper,
      title,
      text,
      ok,
      target,
      contentCreator,
    } = props;

    wrapper.innerHTML = popupTemplate.popupTemplateContent(title, text, contentCreator);

    if (ok) {
      const accept = wrapper.querySelector('[accept-dialog]');

      if (accept) {
        const acceptClone = utils.setCloneElement(accept);
        const setAcceptAction = this.setAcceptAction.bind(this, props);

        acceptClone.addEventListener('click', setAcceptAction);
      }
    }

    const cancelBtn = wrapper.querySelector('[close-dialog]');

    if (cancelBtn) {
      const cancelClone = utils.setCloneElement(cancelBtn);
      const removePopup = this.removePopup.bind(this, target);
      cancelClone.addEventListener('click', removePopup);
    }
  }

  setAcceptAction(props) {
    const { ok, target } = props;
    const result = ok();
    const isPromise = result instanceof Promise;

    if (result !== 'no-valid') {
      if (isPromise) {
        result.then(() => {
          this.removePopup(target, props);
        }, () => {
          this.removePopup(target, props);
        });
      } else {
        this.removePopup(target, props);
      }
    }
  }
}

export default AlertContent;
