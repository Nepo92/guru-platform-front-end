import Utils from '../../../../../../utils/utils.js';
import SendComment from '../../sendComment/sendComment.js';

const sendComment = new SendComment();
const utils = new Utils();

class AfterSendImage {
  init(props) {
    const {
      menu,
      bill,
      target,
      openReceiptMenuBtn,
    } = props;

    const a = document.createElement('a');
    a.setAttribute('data-fancybox', '');
    a.setAttribute('href', `/${bill.billImage}`);
    a.classList.add('bill-image__wrapper-link');

    const image = document.createElement('img');
    image.setAttribute('src', `/${bill.billImage}`);
    image.classList.add('bill-image__image');

    a.appendChild(image);

    const label = menu.querySelector('.bill-image__label');
    const imageWrapper = menu.querySelector('.bill-image');

    imageWrapper.insertBefore(a, label);

    const fileInput = menu.querySelector('#pay');

    if (label) {
      label.remove();
    }

    if (fileInput) {
      fileInput.remove();
    }

    const oldImage = menu.querySelector('.bill-image__image');

    if (oldImage) {
      oldImage.remove();
    }

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    const comment = menu.querySelector('[pay-menu-textarea]').value;

    if (!comment && comment === bill.comment) {
      utils.closeModalAnimation(menu, wrapper, false, true);
      target.classList.remove('disable');
    } else {
      sendComment.init(props);
    }

    if (openReceiptMenuBtn) {
      setTimeout(() => {
        /* eslint-disable-next-line */
        location.reload();
      }, 400);
    }
  }
}

export default AfterSendImage;
