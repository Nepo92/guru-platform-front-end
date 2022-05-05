import Utils from '../../../../../../../../../../../../../../../utils/utils.js';
import WageBlocks from '../wageBlocks.js';
import BlockTemplates from '../../../../../templates/blockTemplates.js';
import ChangeOneValueWageRate3 from './events/changeOneValueWageRate3.js';

const utils = new Utils();
const blockTemplates = new BlockTemplates();
const changeOneValueWageRate3 = new ChangeOneValueWageRate3();

class OneValueWageRate3 extends WageBlocks {
  init(props) {
    const render = this.render.bind(this);

    render(props).then(() => {
      const items = [changeOneValueWageRate3];

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
    const { blockProps, sendingData } = props;
    const { menu } = blockProps;
    const { currentBlock } = sendingData;

    menu.querySelector('[modify-title]').innerText = currentBlock.typeName;

    const wrapper = menu.querySelector('[menu-modify-template__form]');

    utils.removeChildren(wrapper);

    const div = document.createElement('div');
    div.classList.add('fixed-item');
    div.classList.add('fixed-homework');
    div.innerHTML = blockTemplates.settingsOneValueWageRate3Block(currentBlock);

    await wrapper.appendChild(div);
  }
}

export default OneValueWageRate3;
