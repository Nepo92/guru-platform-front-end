import Utils from '../../../../../../../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class ChangeFixedWageRate {
  init(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const regularRate = menu.querySelector('.motivation-modify-template__regular');

    if (regularRate) {
      const reg = utils.setCloneElement(regularRate);
      const changeBlock = this.changeRegular.bind(this, props);
      reg.addEventListener('input', changeBlock);
    }

    const holidayRate = menu.querySelector('.motivation-modify-template__holiday');

    if (holidayRate) {
      const reg = utils.setCloneElement(holidayRate);
      const changeBlock = this.changeHoliday.bind(this, props);
      reg.addEventListener('input', changeBlock);
    }
  }

  changeRegular(props, e) {
    const t = e.target;

    const { value } = t;

    const digits = value.split('.').length === 1 ? !Number.isNaN(+value) : null;
    const fraction = value.split('.').length === 2 ? !Number.isNaN(+value.split('.')[1]) : null;

    const inData = digits ?? fraction;

    if (inData) {
      props.sendingData.currentBlock.regularRate = +t.value;
    } else {
      const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');
      t.value = valueInput;
      props.sendingData.currentBlock.regularRate = +value;
    }
  }

  changeHoliday(props, e) {
    const t = e.target;

    const { value } = t;

    const digits = value.split('.').length === 1 ? !Number.isNaN(+value) : null;
    const fraction = value.split('.').length === 2 ? !Number.isNaN(+value.split('.')[1]) : null;

    const inData = digits ?? fraction;

    if (inData) {
      props.sendingData.currentBlock.holidayRate = +t.value;
    } else {
      const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');
      t.value = valueInput;
      props.sendingData.currentBlock.holidayRate = +value;
    }
  }
}

export default ChangeFixedWageRate;
