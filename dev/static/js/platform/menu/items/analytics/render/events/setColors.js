class SetColors {
  init(props) {
    const { pack } = props;
    const { analytics } = pack;
    const { kpdColor, ratingColor } = analytics;

    this.setColorsToColumnTotal(kpdColor, ratingColor);
    this.setColorToManagers(kpdColor, ratingColor);
  }

  setColorsToColumnTotal(kpdColor, ratingColor) {
    const shareAdvExpensesTrafficPage = {
      rows: document.querySelectorAll('[total-row].shareAdvExpensesTrafficPage'),
      limits: [35, 25, 0],
    };

    const kpd = {
      rows: document.querySelectorAll('.analytic__row.kpd'),
      limits: [kpdColor?.doubleRed, kpdColor?.doubleYellow, kpdColor?.doubleGreen],
    };

    const rating = {
      rows: document.querySelectorAll('.analytic__row.rating'),
      limits: [ratingColor?.doubleRed, ratingColor?.doubleYellow, ratingColor?.doubleGreen],
    };

    const items = [shareAdvExpensesTrafficPage, kpd, rating];

    items.forEach((item) => {
      this.setColors(item);
    });
  }

  setColorToManagers(kpdColor, ratingColor) {
    const shareAdvExpensesTrafficPage = {
      columns: document.querySelectorAll('.manager-board.shareAdvExpensesTrafficPage .analytic__column'),
      limits: [35, 25, 0],
    };

    const kpd = {
      columns: document.querySelectorAll('.manager-board.kpd .analytic__column'),
      limits: [kpdColor?.doubleRed, kpdColor?.doubleYellow, kpdColor?.doubleGreen],
    };

    const rating = {
      columns: document.querySelectorAll('.manager-board.rating .analytic__column'),
      limits: [ratingColor?.doubleRed, ratingColor?.doubleYellow, ratingColor?.doubleGreen],
    };

    const items = [rating, shareAdvExpensesTrafficPage, kpd];

    items.forEach((item) => {
      this.setColors(item);
    });
  }

  setColors(data) {
    const { limits } = data;

    if (data.rows?.length) {
      data.rows.forEach((item) => {
        const columns = item.querySelectorAll('.analytic__column');

        if (columns.length) {
          columns.forEach((elem) => {
            this.setColorForMetric(elem, limits);
          });
        }
      });
    }

    if (data.columns?.length) {
      data.columns.forEach((elem) => {
        this.setColorForMetric(elem, limits);
      });
    }
  }

  setColorForMetric(item, values) {
    const [red, yellow, green] = values;

    const checkNumber = parseInt(item.innerText, 10);

    if (!Number.isNaN(checkNumber) && checkNumber > red) {
      item.classList.add('red');
    } else if (!Number.isNaN(checkNumber) && checkNumber > yellow) {
      item.classList.add('yellow');
    } else if (!Number.isNaN(checkNumber) && checkNumber >= green) {
      item.classList.add('green');
    }
  }
}

export default SetColors;
