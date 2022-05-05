const DATEPICKER_HERE = 'datepicker-here';
const DATEPICKER_HERE_DEAL = 'datepicker-here-deal';
const DATEPICKER_HERE_MONTHS = 'datepicker-here-months';
const DATEPICKER_HERE_F = 'datepicker-here-f';
const DATEPICKER_HERE_START = 'datepicker-here-start';

class Datepicker {
  init() {
    const datepickers = this.getDatepickers();

    const types = this.#getTypes();

    datepickers.forEach((item) => {
      const currentType = types.find((el) => item.type === el.type);

      if (currentType) {
        const values = [];

        if (item.value.length) {
          item.value.forEach((elem) => {
            values.push(elem.value);
            currentType.callback(elem);
          });

          item.value.forEach((elem, index) => {
            values.forEach((el, count) => {
              if (index === count) {
                elem.value = el;
              }
            });
          });
        }
      }
    });
  }

  #getTypes() {
    const datepickerStandart = this.datepickerStandart.bind(this);
    const datepickerDeal = this.datepickerDeal.bind(this);
    const datepickerMonth = this.datepickerMonth.bind(this);
    const datepickerF = this.datepickerFilter.bind(this);
    const datepickerStart = this.datepickerStart.bind(this);

    return [
      {
        type: DATEPICKER_HERE,
        callback: datepickerStandart,
      },
      {
        type: DATEPICKER_HERE_DEAL,
        callback: datepickerDeal,
      },
      {
        type: DATEPICKER_HERE_MONTHS,
        callback: datepickerMonth,
      },
      {
        type: DATEPICKER_HERE_F,
        callback: datepickerF,
      },
      {
        type: DATEPICKER_HERE_START,
        callback: datepickerStart,
      },
    ];
  }

  datepickerStandart(item) {
    $(item).datepicker({
      autoClose: true,
      position: 'bottom left',
    });
  }

  datepickerDeal(item) {
    $(item).datepicker({
      autoClose: true,
      position: 'bottom left',
      maxDate: new Date(),
    });
  }

  datepickerMonth(item) {
    $(item).datepicker({
      view: 'months',
    });
  }

  datepickerFilter(item) {
    $(item).datepicker({
      autoClose: true,
      position: 'bottom left',
    });
  }

  datepickerStart(item) {
    $(item).datepicker({
      autoClose: true,
      position: 'bottom left',
      minDate: new Date(),
    });
  }

  getDatepickers() {
    const datepickers = {
      type: DATEPICKER_HERE,
      value: Array.from(document.querySelectorAll('.datepicker-here')),
    };

    const datepickerDeal = {
      type: DATEPICKER_HERE_DEAL,
      value: Array.from(document.querySelectorAll('.datepicker-here-deal')),
    };

    const datepickerMonths = {
      type: DATEPICKER_HERE_MONTHS,
      value: Array.from(document.querySelectorAll('.datepicker-here-months')),
    };

    const datepickerFilter = {
      type: DATEPICKER_HERE_F,
      value: Array.from(document.querySelectorAll('.datepicker-here-f')),
    };

    const datepickerStart = {
      type: DATEPICKER_HERE_START,
      value: Array.from(document.querySelectorAll('.datepicker-here-start')),
    };

    return [datepickers, datepickerDeal, datepickerMonths, datepickerFilter, datepickerStart];
  }
}

export default Datepicker;
