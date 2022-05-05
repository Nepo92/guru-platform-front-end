import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class TabWrapper {
  noProduct(wrapper) {
    utils.removeChildren(wrapper);

    const spanEmpty = document.createElement('span');
    spanEmpty.classList.add('platform__empty');
    spanEmpty.innerText = 'Нет продукта';

    wrapper.appendChild(spanEmpty);
  }
}

export default TabWrapper;
