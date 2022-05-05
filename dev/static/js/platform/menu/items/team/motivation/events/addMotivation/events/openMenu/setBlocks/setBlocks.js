import Utils from '../../../../../../../../../utils/utils.js';
import { motivationAPI } from '../../../../../../../../../api/api.js';
import Block from './block/block.js';
import SaveMotivation from './block/events/saveMotivation.js';
import ChangeMotivationName from './block/events/changeMotivationName.js';
import EditMonths from '../../../../editMotivation/events/editMonths.js';
import RemoveMotivation from '../../../../editMotivation/events/removeMotivation.js';

const utils = new Utils();
const block = new Block();
const saveMotivation = new SaveMotivation();
const changeMotivationName = new ChangeMotivationName();
const editMonths = new EditMonths();
const removeMotivation = new RemoveMotivation();

class SetBlocks {
  init(props) {
    const blocksProps = {
      ...props,
    };

    const { menu, target } = blocksProps;
    const wrapper = menu.querySelector('[js-motivation-add-blocks]');

    if (wrapper) {
      utils.removeChildren(wrapper);

      const isEdit = target.classList.contains('motivation-now__block');

      if (isEdit) {
        this.isEditMotivation(blocksProps);
      } else {
        this.isNewMotivation(blocksProps);
      }
    }
  }

  isEditMotivation(blocksProps) {
    const { currentWage } = blocksProps;

    const editWageProps = {
      sendingData: {
        emptyWage: currentWage,
      },
      blockProps: {
        ...blocksProps,
        menu: document.querySelector('[js-menu-motivation-add]'),
      },
    };

    const items = [block, saveMotivation, changeMotivationName, editMonths, removeMotivation];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(editWageProps);
    });
  }

  isNewMotivation(blocksProps) {
    const settings = blocksProps.motivationSettings();
    const { company } = blocksProps;
    const dep = settings[0];
    const pos = settings[1];
    const year = settings[3];

    const data = {
      idCompany: company.id,
      idDepartment: +dep.getAttribute('value'),
      idPosition: +pos.getAttribute('value'),
      year: year.getAttribute('value'),
    };

    const getEmptyWage = motivationAPI.getEmptyWage(data);

    getEmptyWage.then((emptyWage) => {
      const emptyWageProps = {
        sendingData: {
          emptyWage,
        },
        blockProps: {
          ...blocksProps,
          menu: document.querySelector('[js-menu-motivation-add]'),
        },
      };

      const items = [block, saveMotivation, changeMotivationName, editMonths];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(emptyWageProps);
      });
    });
  }
}

export default SetBlocks;
