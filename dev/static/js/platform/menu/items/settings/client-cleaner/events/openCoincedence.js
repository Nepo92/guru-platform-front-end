import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class OpenCoincedence {
  init(props, target) {
    const item = utils.getParent(target, 'coincedence__item') || target;

    const list = item.nextElementSibling;
    const toggle = item.querySelector('.coincedence__toggle');

    if (item.classList.contains('open')) {
      item.classList.remove('open');
      list.classList.remove('open');
      toggle.classList.remove('open');
    } else {
      document.querySelectorAll('.coincedence__item').forEach((elem) => {
        elem.classList.remove('open');
        elem.nextElementSibling.classList.remove('open');
        elem.nextElementSibling.style.maxHeight = 0;
        elem.querySelector('.coincedence__toggle').classList.remove('open');
      });

      item.classList.add('open');
      list.classList.add('open');
      toggle.classList.add('open');
    }

    if (list.classList.contains('open')) {
      const height = Array.from(list.children).reduce((prev, current) => prev + parseInt(utils.getCssProperty(current, 'height'), 10), 0);

      list.style.maxHeight = `${height + 40}px`;
    } else {
      list.style.maxHeight = 0;
    }
  }
}

export default OpenCoincedence;
