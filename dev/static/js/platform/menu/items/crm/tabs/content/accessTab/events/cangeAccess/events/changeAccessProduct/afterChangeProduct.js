import ChangeAccessBlock from '../changeAccessBlock/changeAccessBlock.js';
import AfterChangeAccessBlock from '../changeAccessBlock/afterChangeAccessBlock.js';

const changeAccessBlock = new ChangeAccessBlock();
const changeModules = new AfterChangeAccessBlock();

class AfterChangeProduct {
  init(tabPack) {
    const { wrapper, deal, activeProduct } = tabPack;

    const blocks = wrapper.querySelectorAll('[access-block]');

    if (blocks.length) {
      this.changeAccessBlocks(blocks, deal, activeProduct, tabPack);
    } else {
      const modules = wrapper.querySelectorAll('.module__item');

      const change = changeModules.changeAccessToModales.bind(changeModules);

      change(tabPack, modules);
    }
  }

  async changeAccessBlocks(blocks, deal, activeProduct, props) {
    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];
      await this.changeAccess(activeProduct, block, deal, props);
    }
  }

  async changeAccess(activeProduct, block, deal, props) {
    if (activeProduct && !block.classList.contains('active')) {
      await changeAccessBlock.init(block, deal, props);
    } else if (!activeProduct && block.classList.contains('active')) {
      await changeAccessBlock.init(block, deal, props);
    }
  }
}

export default AfterChangeProduct;
