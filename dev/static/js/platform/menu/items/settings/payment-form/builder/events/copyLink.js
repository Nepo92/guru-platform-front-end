import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class CopyLink {
  init() {
    const forms = document.querySelectorAll('.payment-form');

    if (forms.length) {
      const copyLink = this.copyLink.bind(this);

      forms.forEach((item) => {
        const copy = item.querySelector('.payment-form__copy');

        if (copy) {
          copy.addEventListener('click', copyLink);
        }
      });
    }
  }

  copyLink(e) {
    const t = e.target;

    const value = t.getAttribute('data-link');

    utils.copyLink(value);
  }
}

export default CopyLink;
