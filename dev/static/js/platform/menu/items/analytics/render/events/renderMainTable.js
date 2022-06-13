import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class RenderMainTable {
  init(props) {
    const { pack } = props;
    const { analytics, filter } = pack;
    const {
      company,
      showedPeriod,
      colors,
    } = analytics;
    const { months } = company;

    this.#setValuesWrapper();

    if (showedPeriod.length) {
      const wrapper = document.querySelector('.analytic-board__values');

      this.#setValuesHeader(showedPeriod, wrapper);
      this.#setMetricValues(months, wrapper, colors, filter);
    }
  }

  #setValuesWrapper() {
    const board = document.querySelector('[analytics-board]');

    const div = document.createElement('div');
    div.classList.add('analytic-board__values');
    div.classList.add('overflowX');

    board.appendChild(div);
  }

  #setValuesHeader(period, wrapper) {
    const div = document.createElement('div');
    div.classList.add('analytic-board__header-values');
    div.classList.add('right');

    wrapper.appendChild(div);

    const header = document.querySelector('.analytic-board__header-values');

    period.forEach((item) => {
      const column = document.createElement('div');
      column.classList.add('analytic__column');
      column.innerText = item.name;
      header.appendChild(column);
    });
  }

  #setMetricValues(months, wrapper, colors, filter) {
    const monthsItems = Object.entries(months);

    if (monthsItems.length) {
      monthsItems.forEach((item) => {
        const key = item[0];
        const values = item[1];

        const blockName = utils.getBlockName(key, filter);

        const page = utils.getPage();

        if (filter.visableSetting[blockName] && page === 'traffic') {
          this.#setRows(key, values, wrapper, colors);
        } else if (page !== 'traffic') {
          this.#setRows(key, values, wrapper, colors);
        }
      });
    }
  }

  #setRows(key, values, wrapper, colors) {
    const {
      greens,
      reds,
      blues,
      pink,
      purple,
      yellow,
    } = colors;

    const row = document.createElement('div');
    row.classList.add('analytic__row');
    row.classList.add('metric');

    // eslint-disable-next-line
    const color = greens.includes(key) ? 'green' : reds.includes(key) ? 'red' : blues.includes(key) ? 'blue' : pink.includes(key) ? 'pink' : purple.includes(key) ? 'purple' : yellow.includes(key) ? 'yellow-column' : '';

    row.classList.add(key);

    if (values.length) {
      values.forEach((elem) => {
        const column = document.createElement('div');
        column.classList.add('analytic__column');
        column.innerText = key === 'rating' ? utils.getSymboRoubles(key, elem !== null ? elem.toFixed(2) : elem, true) : utils.getSymboRoubles(key, elem, true);

        row.appendChild(column);
      });

      wrapper.appendChild(row);
    }
  }
}

export default RenderMainTable;
