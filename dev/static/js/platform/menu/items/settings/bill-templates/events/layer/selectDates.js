import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class SelectDates {
  init(props) {
    const { menu } = props;

    const today = menu.querySelector('[today]');

    if (today) {
      const todayRadio = utils.setCloneElement(today);

      const selectToday = this.selectToday.bind(this, menu);
      todayRadio.addEventListener('change', selectToday);
    }

    const dateStart = menu.querySelector('[date-start]');

    if (dateStart) {
      const start = utils.setCloneElement(dateStart);
      const selectStartDate = this.selectStartDate.bind(this, menu);
      start.addEventListener('change', selectStartDate);
    }

    const dateStartSecondPayment = menu.querySelector('[date-start-second]');

    if (dateStartSecondPayment) {
      const secondDateStart = utils.setCloneElement(dateStartSecondPayment);
      const selectSecondStartDate = this.selectSecondStartDate.bind(this, menu);
      secondDateStart.addEventListener('change', selectSecondStartDate);
    }

    const secondOtherDate = menu.querySelector('[date-start-second-other]');

    if (secondOtherDate) {
      const secondOther = utils.setCloneElement(secondOtherDate);
      const selectOtherSecondDate = this.selectOtherSecondDate.bind(this, menu);

      secondOther.addEventListener('change', selectOtherSecondDate);
    }
  }

  selectOtherSecondDate(menu, e) {
    const t = e.target;

    if (t.checked) {
      const secondPaymentStep = menu.querySelector('[step-item="2"]');

      secondPaymentStep.classList.remove('hide');
    }
  }

  selectSecondStartDate(menu, e) {
    const t = e.target;

    if (t.checked) {
      const secondPaymentStep = menu.querySelector('[step-item="2"]');

      secondPaymentStep.classList.add('hide');
    }
  }

  selectToday(menu, e) {
    const t = e.target;

    if (t.checked) {
      const secondPaymentDates = menu.querySelector('[second-layer-dates]');

      if (secondPaymentDates) {
        secondPaymentDates.classList.remove('hide');
      }
    }
  }

  selectStartDate(menu, e) {
    const t = e.target;

    if (t.checked) {
      const secondPaymentDates = menu.querySelector('[second-layer-dates]');
      const secondStep = menu.querySelector('.second-pattern').querySelector('[step-item="2"]');
      const dateStartSecondOther = menu.querySelector('[date-start-second-other]');

      if (secondPaymentDates) {
        secondPaymentDates.classList.add('hide');
        secondStep.classList.remove('hide');
        dateStartSecondOther.checked = true;
      }
    }
  }
}

export default SelectDates;
