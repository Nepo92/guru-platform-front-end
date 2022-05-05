import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class CopyClientPhone {
  init(pack) {
    const copyLinkButtons = document.querySelectorAll('[copy-phone]');

    if (copyLinkButtons) {
      const copyLink = this.copyLink.bind(this, pack);

      copyLinkButtons.forEach((item) => {
        const copy = utils.setCloneElement(item);
        copy.addEventListener('click', copyLink);
      });
    }
  }

  copyLink(pack, e) {
    const t = e.target;

    const tmp = utils.setTextArea();
    const body = document.querySelector('body');

    body.appendChild(tmp);

    tmp.innerHTML = t.getAttribute('data-phone');

    document.querySelector('.tmp').select();

    document.execCommand('copy');
    tmp.remove();
  }
}

export default CopyClientPhone;
