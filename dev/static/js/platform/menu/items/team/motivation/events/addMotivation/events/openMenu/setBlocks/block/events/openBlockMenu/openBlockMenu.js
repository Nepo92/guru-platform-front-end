import Utils from '../../../../../../../../../../../../utils/utils.js';
import SetData from './events/setData.js';

const utils = new Utils();
const setData = new SetData();

class OpenBlockMenu {
  init(props) {
    const data = {
      ...props,
      blockProps: {
        ...props.blockProps,
        menu: document.querySelector('[js-menu-motivation-modify-template]'),
      },
    };

    const blocks = document.querySelectorAll('.motivation__block');

    if (blocks.length) {
      const openMenu = this.openMenu.bind(this, data);

      blocks.forEach((item) => {
        const block = utils.setCloneElement(item);
        block.addEventListener('click', openMenu);
      });
    }
  }

  openMenu(props, e) {
    const { blockProps } = props;
    const t = e.target;

    if (t.classList.contains('motivation__toggle') || t.classList.contains('motivation__control') || t.classList.contains('motivation__checkbox')) {
      return false;
    }

    const { menu } = blockProps;

    utils.openModalAnimation(menu, true);

    const items = [setData];

    blockProps.target = t;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default OpenBlockMenu;
