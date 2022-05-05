import Utils from '../../../../../../../../../../../../../../../utils/utils.js';
import BlockTemplates from '../../../../../templates/blockTemplates.js';
import WageBlocks from '../wageBlocks.js';
import ChangeOneValueWageRate7 from './events/changeOneValueWageRate7.js';

const blockTemplates = new BlockTemplates();
const utils = new Utils();
const changeOneValueWageRate7 = new ChangeOneValueWageRate7();

class OneValueWageRate7 extends WageBlocks {
  init(props) {
    const render = this.render.bind(this, props);

    render().then(() => {
      const items = [changeOneValueWageRate7];

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
    div.classList.add('fixed-homework');
    div.innerHTML = blockTemplates.settingsOneValueWageRate7Block(currentBlock);
    await wrapper.appendChild(div);
  }
}

export default OneValueWageRate7;
