import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class CopyAccess {
  init(clientCardPack) {
    const clientCard = document.querySelector('[js-menu-client-card]');

    const copy = this.copyAccess.bind(this, clientCardPack);

    const copyBtn = clientCard.querySelector('.platform-access__copy');

    if (copyBtn) {
      const cloneCopy = utils.setCloneElement(copyBtn);
      cloneCopy.addEventListener('click', copy);
    }
  }

  copyAccess() {
    const clientCard = document.querySelector('[js-menu-client-card]');

    const accessContainer = Array.from(clientCard.querySelectorAll('.platform-access__item'));

    const copiedText = accessContainer.map((item) => {
      const children = Array.from(item.children);

      if (children.length) {
        let name = children.filter((el) => el.classList.contains('platform-access__name'))[0].innerText.trim();
        const value = children.filter((el) => el.classList.contains('platform-access__value'))[0].innerText.trim();

        const nameBracketStart = name.indexOf('(');
        const nameBracketEnd = name.indexOf(')');

        if (nameBracketStart !== -1 && nameBracketEnd !== -1) {
          name = name.slice(0, nameBracketStart) + name.slice(nameBracketEnd, name.length - 1);
        }

        return `${name}\n${value}\n`;
      }
    });

    const tmp = utils.setTextArea();
    const body = document.querySelector('body');

    body.appendChild(tmp);

    tmp.innerHTML = copiedText.join('\n');
    document.querySelector('.tmp').select();

    document.execCommand('copy');
    tmp.remove();
  }
}

export default CopyAccess;
