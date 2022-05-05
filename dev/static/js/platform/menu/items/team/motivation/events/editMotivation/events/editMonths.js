import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class EditMonths {
  init(props) {
    const { blockProps } = props;
    const { updatingBox } = blockProps;
    const { valueField } = updatingBox;

    valueField.deletedMonths = [];

    const months = document.querySelectorAll('.motivation-months__checkbox');

    if (months.length) {
      const removeMonth = this.removeMonth.bind(this, props);

      months.forEach((item) => {
        const month = utils.setCloneElement(item);
        month.addEventListener('change', removeMonth);
      });
    }
  }

  removeMonth(props, e) {
    const { blockProps, sendingData } = props;
    const { updatingBox } = blockProps;
    const { emptyWage } = sendingData;
    const { valueField } = updatingBox;

    const t = e.target;

    const current = +t.getAttribute('value');

    const monthsInMotivation = emptyWage.months;

    if (!t.checked && monthsInMotivation.includes(current)) {
      updatingBox.valueField.deletedMonths.push(current);
    } if (t.checked && valueField.deletedMonths.includes(current)) {
      valueField.deletedMonths = [...valueField.deletedMonths].filter((el) => el !== current);
    }
  }
}

export default EditMonths;
