import Utils from '../../../../../../../../../../../../../../../../utils/utils.js';
import BlockTemplates from '../../../../../../templates/blockTemplates.js';

const utils = new Utils();
const blockTemplates = new BlockTemplates();

class AddLevel {
  init(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const addAdditionalBtn = menu.querySelector('.level-additional__button--add');

    if (addAdditionalBtn) {
      const addAdditional = this.addAdditional.bind(this, props);

      const addBtn = utils.setCloneElement(addAdditionalBtn);
      addBtn.addEventListener('click', addAdditional);
    }

    const addTrafficBtn = menu.querySelector('.level-traffic__button--add');

    if (addTrafficBtn) {
      const addTraffic = this.addTraffic.bind(this, props);

      const addBtn = utils.setCloneElement(addTrafficBtn);
      addBtn.addEventListener('click', addTraffic);
    }
  }

  addAdditional(props, e) {
    const t = e.target;
    const { sendingData, blockProps } = props;
    const { currentBlock } = sendingData;
    const { levels } = currentBlock;

    const item = utils.getParent(t, 'levels-additional').querySelector('.levels-additional__list');

    const level = {
      level: currentBlock.levels.additional.length + 1,
      valueFrom: null,
      valueTo: null,
      multiplier: null,
    };

    levels.additional.push(level);

    const li = document.createElement('div');
    li.classList.add('levels__item');
    li.innerHTML = blockTemplates.levelLeveledWageBlock(level);

    item.appendChild(li);

    blockProps.removeLevelPerson$.init(props);
    blockProps.setRatingData$.init(props);
  }

  addTraffic(props, e) {
    const t = e.target;
    const { sendingData, blockProps } = props;
    const { currentBlock } = sendingData;
    const { levels } = currentBlock;

    const item = utils.getParent(t, 'levels-traffic').querySelector('.levels-traffic__list');

    const level = {
      level: currentBlock.levels.traffic.length + 1,
      valueFrom: null,
      valueTo: null,
      multiplier: null,
    };

    levels.traffic.push(level);

    const li = document.createElement('div');
    li.classList.add('levels__item');
    li.innerHTML = blockTemplates.levelLeveledWageBlock(level);

    item.appendChild(li);

    blockProps.removeLevelPerson$.init(props);
    blockProps.setRatingData$.init(props);
  }
}

export default AddLevel;
