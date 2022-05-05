import Utils from '../../../../../../../../../../utils/utils.js';
import BlockTemplates from './templates/blockTemplates.js';
import OpenBlockMenu from './events/openBlockMenu/openBlockMenu.js';
import SetActive from './events/setActive/setActive.js';

const utils = new Utils();
const blockTemplates = new BlockTemplates();
const openBlockMenu = new OpenBlockMenu();
const setActive = new SetActive();

class Block {
  init(props) {
    const render = this.render.bind(this, props);

    render().then(() => {
      const items = [openBlockMenu, setActive];

      const getBlockData = this.getBlockData.bind(this);
      props.blockProps.getBlockData = getBlockData;

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }

  async render(props) {
    const { sendingData, blockProps } = props;
    const { menu } = blockProps;
    const { emptyWage } = sendingData;
    const { blocks } = emptyWage;

    const wrapper = menu.querySelector('[js-motivation-add-blocks]');

    const blocksSorted = blocks.sort((a, b) => a.id - b.id);

    if (blocksSorted.length) {
      utils.removeChildren(wrapper);

      for (let index = 0; index < blocksSorted.length; index++) {
        const item = blocks[index];

        const div = document.createElement('div');
        div.classList.add('motivation__block');
        div.classList.add(`motivation-${item.className}-${item.typeCode}`);
        div.innerHTML = blockTemplates.blockTemplate(item);
        wrapper.appendChild(div);
      }
    }
  }

  getBlockData(props) {
    const { blockProps } = props;
    const { target } = blockProps;

    const block = utils.getParent(target, 'motivation__block') ? utils.getParent(target, 'motivation__block') : target;

    const name = block.classList[1].split('-')[1];
    const type = +block.classList[1].split('-')[2];

    return [name, type, block];
  }
}

export default Block;
