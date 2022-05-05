import Utils from '../../../../../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class WageBlocks {
  initSave(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const saveBtn = menu.querySelector('[save-block]');

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);
      const saveChanges = this.saveChanges.bind(this, props);
      save.addEventListener('click', saveChanges);
    }
  }

  saveChanges(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    this.changeSavedBlock(props);

    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, true, true, false);
  }

  changeSavedBlock(props) {
    const { sendingData, blockProps } = props;
    const { emptyWage, currentBlock } = sendingData;
    const { blockName, blockType } = blockProps;

    const block = emptyWage.blocks;

    const notChange = block.filter((el) => el.className !== blockName || el.typeCode !== blockType);

    notChange.push(currentBlock);

    emptyWage.blocks = notChange;
  }

  initCancel(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const cancelBtn = menu.querySelector('[cancel-block]');

    if (cancelBtn) {
      const cancel = utils.setCloneElement(cancelBtn);
      const cancelChanges = this.cancelChanges.bind(this, props);

      cancel.addEventListener('click', cancelChanges);
    }

    const closeBtn = menu.querySelector('[close-motivation-modify-template-menu]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);
      const cancelChanges = this.cancelChanges.bind(this, props);

      close.addEventListener('click', cancelChanges);
    }
  }

  cancelChanges(props) {
    const { sendingData } = props;
    let { currentBlock } = sendingData;
    const { emptyWage } = sendingData;
    const { typeCode, className } = currentBlock;
    const { blocks } = emptyWage;
    const { blockProps } = props;
    const { menu } = blockProps;

    const oldBlock = blocks.filter((el) => el.typeCode === typeCode && el.className === className);
    currentBlock = oldBlock;

    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, true, true, false);
  }
}

export default WageBlocks;
