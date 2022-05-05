import Utils from '../../../../../../../../../../../../../../../utils/utils.js';
import BlockTemplates from '../../../../../templates/blockTemplates.js';
import WageBlocks from '../wageBlocks.js';
import AddLevel from './events/addLevel.js';
import RemoveLevel from './events/removeLevel.js';
import SetData from '../leveledWageRate1/events/setData.js';

const utils = new Utils();
const blockTemplates = new BlockTemplates();
const addLevel = new AddLevel();
const removeLevel = new RemoveLevel();
const setData = new SetData();

class TypedLeveledWageRate5 extends WageBlocks {
  init(props) {
    const render = this.render.bind(this, props);

    render().then(() => {
      const items = [addLevel, removeLevel, setData];

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
    div.innerHTML = blockTemplates.settingsTypedLeveledWageRate5Block(currentBlock);
    await wrapper.appendChild(div);
  }
}

export default TypedLeveledWageRate5;
