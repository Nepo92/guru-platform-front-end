import Utils from '../../../../../../../../../../../../../../../../utils/utils.js';
import BlockTemplates from '../../../../../../templates/blockTemplates.js';

const utils = new Utils();
const blockTemplates = new BlockTemplates();

class AddLevel {
  init(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const addLevelBtn = menu.querySelector('.levels-bottom__btn--modify');

    if (addLevelBtn) {
      const add = utils.setCloneElement(addLevelBtn);
      const addLevel = this.addLevel.bind(this, props);
      add.addEventListener('click', addLevel);
    }
  }

  addLevel(props) {
    const { blockProps, sendingData } = props;
    const { menu } = blockProps;
    const { currentBlock } = sendingData;

    const wrapper = menu.querySelector('.levels__list');

    const li = document.createElement('li');
    li.classList.add('levels__item');

    const level = {
      level: document.querySelectorAll('.level-id__count').length + 1,
      valueFrom: null,
      valueTo: null,
      multiplier: null,
    };

    /* Добавляем в объект блока */
    currentBlock.levels.push(level);

    const settings = props.wageRole ?? 'rating';

    /* Добавляем на страницу */
    li.innerHTML = blockTemplates.levelLeveledWageBlock(level, settings);
    wrapper.appendChild(li);

    blockProps.removeLevelRating$.init(props);
    blockProps.setRatingData$.init(props);
  }
}

export default AddLevel;
