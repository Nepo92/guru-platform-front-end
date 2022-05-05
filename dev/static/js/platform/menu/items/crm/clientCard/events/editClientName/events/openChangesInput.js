import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class OpenChangesInput {
  init(clientCardPack) {
    const { menu } = clientCardPack;

    const name = menu.querySelector('[js-client-name]');

    const openInput = this.openInput.bind(this);
    const nameClone = utils.setCloneElement(name);
    nameClone.addEventListener('click', openInput);
  }

  openInput(e) {
    const t = e.target;

    t.classList.add('hide');

    const input = t.parentNode.querySelector('[js-change-client-name]');
    input.value = t.innerText;
    input.classList.remove('hide');
  }
}

export default OpenChangesInput;
