import Utils from '../../../../../../../../../../../../../utils/utils.js';
import FixedWageRate from './wageBlocks/fixedWageRate/fixedWageRate.js';
import OneValueWageRate7 from './wageBlocks/oneValueWageRate7/oneValueWageRate7.js';
import OneValueWageRate3 from './wageBlocks/oneValueWageRate3/oneValueWageRate3.js';
import OneValueWageRate4 from './wageBlocks/oneValueWageRate4/oneValueWageRate4.js';
import LeveledWageRate1 from './wageBlocks/leveledWageRate1/leveledWageRate1.js';
import TypedLeveledWageRate5 from './wageBlocks/typedLeveledWageRate5/typedLeveledWageRate5.js';

const fixedWageRate = new FixedWageRate();
const oneValueWageRate7 = new OneValueWageRate7();
const oneValueWageRate3 = new OneValueWageRate3();
const oneValueWageRate4 = new OneValueWageRate4();
const leveledWageRate1 = new LeveledWageRate1();
const typedLeveledWageRate5 = new TypedLeveledWageRate5();
const utils = new Utils();

// Одинаковый контент у блоков '% от общей' и '% от личной выручки', и 'Выполнение плана менеджером'
// также одинаковый контент у блоков 'Рейтинг' и '% рекламного бюджета от выручки'
// поэтому для них один класс соответсвенно

class SetData {
  init(props) {
    const dataProps = props;

    dataProps.blockProps = {
      ...props.blockProps,
    };

    const [name, type, block] = dataProps.blockProps.getBlockData(dataProps);

    dataProps.blockProps.blockName = name;
    dataProps.blockProps.blockType = type;
    dataProps.blockProps.blockClassName = block;

    this.blockSettings(dataProps);
  }

  blockSettings(props) {
    const { blockProps } = props;
    const { blockName, blockType } = blockProps;
    const { sendingData } = props;
    const { emptyWage } = sendingData;
    const { blocks } = emptyWage;

    const block = `${blockName}-${blockType}`;

    const items = [
      {
        item: fixedWageRate,
        name: 'FixedWageRate-0',
      },
      {
        item: oneValueWageRate7,
        name: 'OneValueWageRate-7',
      },
      {
        item: oneValueWageRate3,
        name: 'OneValueWageRate-3',
      },
      {
        item: oneValueWageRate4,
        name: 'OneValueWageRate-4',
      },
      {
        item: leveledWageRate1,
        name: 'LeveledWageRate-1',
      },
      {
        item: typedLeveledWageRate5,
        name: 'TypedLeveledWageRate-5',
      },
      {
        item: typedLeveledWageRate5,
        name: 'TypedLeveledWageRate-6',
      },
      {
        item: leveledWageRate1,
        name: 'LeveledWageRate-2',
      },
      {
        item: typedLeveledWageRate5,
        name: 'TypedLeveledWageRate-8',
      },
    ];

    sendingData.currentBlock = {
      ...blocks.filter((el) => el.typeCode === blockType && el.className === blockName)[0],
    };

    const current = items.filter((el) => el.name === block)[0];

    if (current) {
      const { item } = current;

      const init = item.init.bind(item);

      if (current.name === 'LeveledWageRate-2') {
        props.wageRole = 'advertiser';
      }

      init(props);
    } else {
      this.clearMenu(props);
    }
  }

  clearMenu(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const wrapper = menu.querySelector('[menu-modify-template__form]');

    utils.removeChildren(wrapper);
  }
}

export default SetData;
