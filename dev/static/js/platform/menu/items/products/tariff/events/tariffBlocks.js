import TariffTemplates from '../templates/tariffTemplates.js';
import Utils from '../../../../../utils/utils.js';
import { blockAPI } from '../../../../../api/api.js';

const tariffTemplates = new TariffTemplates();
const utils = new Utils();

class TariffBlocks {
  async getBlocks(props) {
    const { id } = props;

    const formData = new FormData();
    formData.set('id', id);

    const blocks = await blockAPI.getBlocks(formData);

    return blocks;
  }

  renderBlocksToMenu(props) {
    const { blocks, menu } = props;

    const blockWrapper = menu.querySelector('.menu-tariff__blocks');

    if (blocks && !blocks.length && blockWrapper) {
      blockWrapper.remove();
    } else {
      const menuList = menu.querySelector('.tariff-menu__list');

      if (!blockWrapper) {
        const wrapper = this.getTariffWrapper();

        menuList.appendChild(wrapper);
      }

      this.setBlocks(props, menu.querySelector('.menu-tariff__blocks'));
      this.setBlockActive(props);
    }
  }

  getTariffWrapper() {
    const div = document.createElement('div');
    div.classList.add('menu-input');
    div.classList.add('menu-input_msmall');
    div.classList.add('menu-tariff__blocks');
    div.innerHTML = tariffTemplates.getTariffWrapper();

    return div;
  }

  setBlocks(props, wrapper) {
    const { blocks } = props;

    utils.removeChildren(wrapper);

    if (blocks && blocks.length) {
      blocks.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('block__checkbox');
        div.innerHTML = tariffTemplates.blockInMenu(item, index);

        wrapper.appendChild(div);
      });
    }
  }

  setBlockActive(props) {
    const { blocks, tariff, menu } = props;

    if (tariff) {
      const { courseBlocks } = tariff;

      if (blocks && blocks.length && courseBlocks && courseBlocks.length) {
        const checkbox = menu.querySelectorAll('[block-checbox]');

        checkbox.forEach((item) => {
          courseBlocks.forEach((elem) => {
            if (+item.getAttribute('data-id') === elem.id) {
              item.checked = true;
            }
          });
        });
      }
    }
  }
}

export default TariffBlocks;
