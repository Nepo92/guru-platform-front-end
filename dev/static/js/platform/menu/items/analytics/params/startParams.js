import Utils from '../../../../utils/utils.js';

const utils = new Utils();

class StartParams {
  async init() {
    const period = document.querySelector('[js-period]');

    if (period) {
      const periodData = this.getPeriodData();

      if (periodData) {
        periodData.segmentParams = await this.getSegmentOfPeriod(periodData);

        const params = this.getParams(periodData);
        params.sep = periodData.sep;

        return params;
      }
    }
  }

  getPeriodData() {
    const startDate = document.querySelector('.nav-left__start [js-start-date]')?.value;
    const endDate = document.querySelector('.nav-left__end [js-end-date]')?.value;

    if (startDate && endDate) {
      const start = utils.dateParse(startDate);
      const end = utils.dateParse(endDate);

      const diff = new Date(end - start);

      const period = document.querySelector('[js-period]');

      if (period) {
        const sep = +period.value;

        return {
          sep,
          start,
          end,
          diff,
          segment: null,
        };
      }
    }
  }

  getSegmentOfPeriod(periodData) {
    const {
      sep,
      start,
      end,
      diff,
    } = periodData;
    let { segment } = periodData;

    const day = 1000 * 60 * 60 * 24;

    switch (sep) {
      case 0: {
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();

        const startMonths = start.getMonth();
        const endMonths = end.getDate() === 1 ? end.getMonth() - 1 : end.getMonth();

        segment = Math.floor((endYear - startYear) * 12 + (endMonths - startMonths) + 1);

        return {
          segment,
          start,
          end,
          sep,
          diff,
        };
      }
      case 1: {
        segment = Math.ceil(diff / (day * 7));

        return {
          segment,
          start,
          end,
          sep,
          diff,
        };
      }
      case 2: {
        segment = Math.floor(diff / day);

        return {
          segment,
          start,
          end,
          sep,
          diff,
        };
      }
      default: {
        break;
      }
    }
  }

  getParams(periodData) {
    const { segmentParams } = periodData;

    if (segmentParams) {
      const {
        start,
        end,
        segment,
        diff,
        sep,
      } = segmentParams;

      return {
        showedPeriod: [],
        segment,
        start,
        end,
        diff,
        sep,
      };
    }
  }
}

export default StartParams;
