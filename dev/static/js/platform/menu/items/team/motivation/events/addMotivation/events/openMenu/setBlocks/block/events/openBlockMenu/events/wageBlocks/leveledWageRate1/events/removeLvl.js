import Utils from '../../../../../../../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class RemoveLevel {
  init(props) {
    const { blockProps } = props;
    const { menu, updatingBox } = blockProps;
    const { valueField } = updatingBox;

    valueField.deletedLevels = [];

    blockProps.removeLevelRating$ = new RemoveLevel();

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

    level.remove();

    this.removeFromHTML();
  }

  removeFromData(level, currentBlock, valueField) {
    const removingLevel = +level.querySelector('.level-id').value;

    const levelItem = currentBlock.levels.filter((el) => el.id === removingLevel)[0];

    valueField.deletedLevels.push(levelItem.id);

    currentBlock.levels = [...currentBlock.levels].filter((el) => el.id !== removingLevel);

    currentBlock.levels.forEach((item, index) => {
      item.level = index + 1;
    });
  }

  removeFromHTML() {
    const counters = document.querySelectorAll('.level-id__count');

    if (counters.length) {
      counters.forEach((item, index) => {
        item.innerText = ++index;
      });
    }
  }
}

export default RemoveLevel;
