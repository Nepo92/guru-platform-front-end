import Utils from '../../../../../../../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class ChangeOneValueWageRate4 {
  init(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const input = menu.querySelector('.motivation-modify-template__deal');

    if (input) {
      const clone = utils.setCloneElement(input);

      const changeRate = this.changeRate.bind(this, props);
      clone.addEventListener('input', changeRate);
    }
  }

  changeRate(props, e) {
    const t = e.target;
    const { sendingData } = props;

    this.validateValue(t, sendingData.currentBlock);
  }

  validateValue(t, elem) {
    const { value } = t;

    const digits = value.split('.').length === 1 ? !Number.isNaN(+value) : null;
    const fraction = value.split('.').length === 2 ? !Number.isNaN(+value.split('.')[1]) : null;

    const inData = digits ?? fraction;

    if (inData) {
      elem.value = +t.value;
    } else {
      const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');
      t.value = valueInput;
      elem.value = +valueInput;
    }
  }
}

export default ChangeOneValueWageRate4;
