import Utils from '../../../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class SetActive {
  init(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const activeCheckbox = menu.querySelectorAll('.motivation-add__checkbox');

    if (activeCheckbox.length) {
      const changwActive = this.changeActive.bind(this, props);
      activeCheckbox.forEach((item) => {
        const checkbox = utils.setCloneElement(item);
        checkbox.addEventListener('click', changwActive);
      });
    }
  }

  changeActive(props, e) {
    const t = e.target;
    const { blockProps, sendingData } = props;
    const { getBlockData } = blockProps;
    const { emptyWage } = sendingData;

    blockProps.target = t;

    const [name, type] = getBlockData(props);

    emptyWage.blocks = [...emptyWage.blocks].map((item) => {
      if (item.className === name && item.typeCode === type) {
        item.active = t.checked;
      }

      return item;
    });
  }
}

export default SetActive;
