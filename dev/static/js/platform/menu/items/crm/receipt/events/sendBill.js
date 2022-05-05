import Utils from '../../../../../utils/utils.js';
import Validation from '../../../../../utils/validation.js';
import SaveImage from '../saveImage/saveImage.js';

const utils = new Utils();
const validation = new Validation();
const saveImage = new SaveImage();

class SendBill {
  init(props) {
    const { menu } = props;

    const sendBtn = menu.querySelector('.pay__save');

    if (sendBtn) {
      const sendBill = this.sendBill.bind(this, props);

      const send = utils.setCloneElement(sendBtn);
      send.addEventListener('click', sendBill);
    }
  }

  sendBill(props, e) {
    const t = e.target;
    const { menu } = props;

    const form = menu.querySelector('[pay-form]');

    if (validation.validatePayBill(form)) {
      t.classList.add('disable');

      const saveCheck = saveImage.init.bind(saveImage);
      props.target = t;

      saveCheck(props);
    }
  }
}

export default SendBill;
