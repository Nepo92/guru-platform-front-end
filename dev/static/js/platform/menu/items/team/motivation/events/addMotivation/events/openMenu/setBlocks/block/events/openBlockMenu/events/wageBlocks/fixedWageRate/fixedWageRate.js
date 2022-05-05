import BlockTemplates from '../../../../../templates/blockTemplates.js';
import Utils from '../../../../../../../../../../../../../../../utils/utils.js';
import ChangeFixedWageRate from './events/changeFixedWageRate.js';
import WageBlocks from '../wageBlocks.js';

const blockTemplates = new BlockTemplates();
const utils = new Utils();
const changeFixedWageRate = new ChangeFixedWageRate();

class FixedWageRate extends WageBlocks {
  init(props) {
    const render = this.render.bind(this);
    render(props).then(() => {
      const items = [changeFixedWageRate];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });

      const save = this.initSave.bind(this);
      const cancel = this.initCancel.bind(this);

      save(props);
      cancel(props);
    });
  }

  async render(props) {
    const { blockProps } = props;
    const { menu } = blockProps;
    const { sendingData } = props;
    const { currentBlock } = sendingData;

    menu.querySelector('[modify-title]').innerText = currentBlock.typeName;

    const wrapper = menu.querySelector('[menu-modify-template__form]');

    utils.removeChildren(wrapper);

    const div = document.createElement('div');
    div.classList.add('fixed-item');
    div.innerHTML = blockTemplates.settingsFixedWageRate0Block(currentBlock);
    wrapper.appendChild(div);
  }
}

export default FixedWageRate;
