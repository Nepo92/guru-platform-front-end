import Utils from '../../../../../../../../../../../../../../../utils/utils.js';
import WageBlocks from '../wageBlocks.js';
import BlockTemplates from '../../../../../templates/blockTemplates.js';
import AddLevel from './events/addLevel.js';
import RemoveLevel from './events/removeLvl.js';
import SetData from './events/setData.js';

const utils = new Utils();
const blockTemplates = new BlockTemplates();
const addLevel = new AddLevel();
const removeLevel = new RemoveLevel();
const setData = new SetData();

class LeveledWageRate1 extends WageBlocks {
  init(props) {
    const render = this.render.bind(this);

    render(props).then(() => {
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
    const { blockProps, sendingData } = props;
    const { menu } = blockProps;
    const { currentBlock } = sendingData;

    menu.querySelector('[modify-title]').innerText = currentBlock.typeName;

    const wrapper = menu.querySelector('[menu-modify-template__form]');

    utils.removeChildren(wrapper);

    const div = document.createElement('div');
    div.classList.add('levels-rate');

    const settings = props.wageRole ?? 'rating';

    div.innerHTML = blockTemplates.leveledWageRate1Block(currentBlock, settings);

    await wrapper.appendChild(div);
  }
}

export default LeveledWageRate1;
