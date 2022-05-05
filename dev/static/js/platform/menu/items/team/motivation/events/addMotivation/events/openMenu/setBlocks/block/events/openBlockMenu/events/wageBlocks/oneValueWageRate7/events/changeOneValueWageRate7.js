import Utils from '../../../../../../../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class ChangeOneValueWageRate7 {
  init(props) {
    const { sendingData } = props;
    const { blockProps } = props;
    const { menu } = blockProps;
    const { currentBlock } = sendingData;

    const coeff = menu.querySelector('.motivation-modify-template__coef');
    coeff.value = currentBlock.value ? +currentBlock.value : '';

    if (coeff) {
      const input = utils.setCloneElement(coeff);
      const changeCoef = this.changeCoef.bind(this, props);
      input.addEventListener('input', changeCoef);
    }
  }

  changeCoef(props, e) {
    const t = e.target;
    const { sendingData } = props;
    const { currentBlock } = sendingData;
    this.validateValue(t, currentBlock);
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

export default ChangeOneValueWageRate7;
