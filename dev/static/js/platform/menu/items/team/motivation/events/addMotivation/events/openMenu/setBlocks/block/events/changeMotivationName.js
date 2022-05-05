import Utils from '../../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class ChangeMotivationName {
  init(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const nameInput = menu.querySelector('[js-motivation-name]');

    if (nameInput) {
      const name = utils.setCloneElement(nameInput);
      const changeName = this.changeName.bind(this, props);
      name.addEventListener('input', changeName);
    }
  }

  changeName(props, e) {
    const t = e.target;

    const { sendingData } = props;
    const { emptyWage } = sendingData;

    emptyWage.motivationName = t.value;
  }
}

export default ChangeMotivationName;
