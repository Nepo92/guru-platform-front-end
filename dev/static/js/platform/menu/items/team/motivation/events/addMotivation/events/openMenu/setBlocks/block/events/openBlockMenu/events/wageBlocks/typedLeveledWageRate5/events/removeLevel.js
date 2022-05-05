import Utils from '../../../../../../../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class RemoveLevel {
  init(props) {
    const { blockProps } = props;
    const { menu, updatingBox } = blockProps;
    const { valueField } = updatingBox;

    valueField.deletedLevels = [];

    blockProps.removeLevelPerson$ = new RemoveLevel();

    const removeBtns = menu.querySelectorAll('.level__delete--modify');

    if (removeBtns.length) {
      const removeLevel = this.removeLevel.bind(this, props);

      removeBtns.forEach((item) => {
        const remove = utils.setCloneElement(item);

        remove.addEventListener('click', removeLevel);
      });
    }
  }

  removeLevel(props, e) {
    const { sendingData, blockProps } = props;
    const { currentBlock } = sendingData;
    const { updatingBox } = blockProps;
    const { valueField } = updatingBox;
    const t = e.target;

    const level = utils.getParent(t, 'levels__item');

    this.removeFromData(level, currentBlock, valueField);

    this.removeFromHTML(e, level, currentBlock);
  }

  removeFromData(level, currentBlock, valueField) {
    const removingLevel = +level.querySelector('.level-id').value;

    const type = utils.getParent(level, 'levels-additional') ? 'additional' : 'traffic';

    valueField.deletedLevels.push(removingLevel);

    if (type === 'additional') {
      const additionals = currentBlock.levels.additional;
      currentBlock.levels.additional = [...additionals].filter((el) => el.id !== removingLevel);

      currentBlock.levels.additional.forEach((item, index) => {
        item.level = index + 1;
      });
    } else {
      const trafficLevels = currentBlock.levels.traffic;
      currentBlock.levels.traffic = [...trafficLevels].filter((el) => el.id !== removingLevel);

      currentBlock.levels.traffic.forEach((item, index) => {
        item.level = index + 1;
      });
    }
  }

  removeFromHTML(e, level, currentBlock) {
    const t = e.target;

    const wrapper = utils.getParent(t, 'levels-traffic') ? utils.getParent(t, 'levels-traffic') : utils.getParent(t, 'levels-additional');

    const type = utils.getParent(level, 'levels-additional') ? 'additional' : 'traffic';

    const lvl = +level.querySelector('.level-id__count').innerText;

    currentBlock.levels[type] = [...currentBlock.levels[type]].filter((el) => el.level !== lvl);

    currentBlock.levels[type].forEach((item, index) => {
      item.level = ++index;
    });

    level.remove();

    const counters = wrapper.querySelectorAll('.level-id__count');

    if (counters.length) {
      counters.forEach((item, index) => {
        item.innerText = ++index;
      });
    }
  }
}

export default RemoveLevel;
