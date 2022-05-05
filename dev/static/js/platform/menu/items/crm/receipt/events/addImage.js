import Utils from '../../../../../utils/utils.js';
import BillTemplates from '../../bill/templates/billTemplates.js';
import { checkAPI } from '../../../../../api/api.js';
import Popup from '../../../../../modules/popup/popup.js';

const utils = new Utils();
const billTemplates = new BillTemplates();
const popup = new Popup();

class AddImage {
  init(props) {
    const { menu, isView } = props;

    const input = menu.querySelector('#pay');
    props.addImage = new AddImage();

    if (input && !isView) {
      const upload = this.uploadImage.bind(this, props);

      const file = utils.setCloneElement(input);
      file.addEventListener('change', upload);
    }

    const clearInput = menu.querySelector('.preview_update');

    if (clearInput && !isView) {
      const clear = utils.setCloneElement(clearInput);

      const setPopup = this.setPopup.bind(this, props);
      clear.addEventListener('click', setPopup);
    }
  }

  setPopup(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;
    props.event = e;

    const removeImage = this.clearInput.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удилть это изображение чека?',
      settings: null,
      title: null,
      ok: removeImage,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  uploadImage(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    const { menu } = props;

    if (t.files.length) {
      const clear = menu.querySelector('.platform-form__input-full');
      clear.style.opacity = '1';

      if (t.value) {
        this.addPreloader(t);

        const clearInput = menu.querySelector('.preview_update');

        if (clearInput) {
          const remove = utils.setCloneElement(clearInput);

          props.event = e;

          const removeImage = this.clearInput.bind(this, props);
          remove.addEventListener('click', removeImage);
        }
      }
    }

    const payBillBtn = menu.querySelector('.pay__save');
    payBillBtn.classList.remove('disable');
  }

  addPreloader(t) {
    const tmpPath = URL.createObjectURL(t.files[0]);
    const link = document.createElement('a');
    link.setAttribute('data-fancybox', '');
    link.setAttribute('href', tmpPath);
    link.classList.add('bill-image__image');
    link.innerHTML = billTemplates.getPreloaderPayImageTemplate(tmpPath);

    const billImage = document.querySelector('.bill-image');
    billImage.querySelector('label').remove();

    billImage.appendChild(link);
  }

  clearInput(props, event) {
    const { bill, event: e } = props;
    const { billImage } = bill;

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const t = e.target;

    const { menu } = props;

    const file = menu.querySelector('#pay');

    if (file) {
      file.value = '';

      t.style.opacity = '0';

      const link = utils.getParent(t, 'bill-image').querySelector('.bill-image__image');

      if (link) {
        link.remove();
        props.getInputFile(props);
      }
    } else {
      const link = utils.getParent(t, 'bill-image').querySelector('.bill-image__wrapper-link');

      if (link) {
        link.remove();
        props.getInputFile(props);
      }
    }

    if (billImage) {
      const formData = new FormData();
      formData.set('idBill', bill.id);

      const removeImage = checkAPI.removeImage(formData);

      removeImage.then(() => {
        bill.billImage = null;

        const eventChange = new Event('change');
        const input = menu.querySelector('[type="file"]');
        input.dispatchEvent(eventChange);
      });
    }

    props.addImage.init(props);
  }
}

export default AddImage;
