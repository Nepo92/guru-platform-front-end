import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class CopyClientLink {
  init(pack) {
    const copyLinkButtons = document.querySelectorAll('.platform__copy--table');

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

    tmp.innerHTML = t.getAttribute('data-link');
    document.querySelector('.tmp').select();

    document.execCommand('copy');
    tmp.remove();
  }
}

export default CopyClientLink;
