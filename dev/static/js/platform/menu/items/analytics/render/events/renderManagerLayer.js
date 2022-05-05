import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class RenderManagerLayer {
  init(props) {
    const { pack } = props;
    const {
      analytics,
      managers,
      filter,
    } = pack;
    const { managers: managersData } = analytics;
    const { general, months } = managersData;

    this.setManagerRowName(managers, general, months, filter);
  }

  setManagerRowName(managers, general, months) {
    const wrapper = document.querySelector('.analytic__wrapper-board');

    const rows = wrapper.querySelectorAll('[total-row]');
    const metricsRows = document.querySelectorAll('.analytic-board__values .analytic__row.metric');

    const items = [rows, metricsRows];

    items.forEach((item) => {
      this.setManagerBoards(item);
    });

    this.setManagers(managers, general, months);
  }

  setManagerBoards(rows) {
    rows.forEach((item) => {
      const metricType = item.classList[item.classList.length - 1];
      const div = document.createElement('div');
      div.classList.add('analytic__row');
      div.classList.add('manager-board');

      if (metricType === 'rating') {
        div.classList.add('board-rating');
      }

      div.classList.add(metricType);

      item.parentNode.insertBefore(div, item.nextElementSibling);
    });
  }

  setManagers(managers, general, months) {
    const managersItems = Object.entries(managers);

    const boards = document.querySelectorAll('.analytic__wrapper-board .analytic__row.manager-board');

    const items = [boards];

    items.forEach((item) => {
      this.setManagerNameRow(item, managersItems);
    });

    this.setManagerTotal(managersItems, general, months);

    const managerMetric = document.querySelectorAll('.analytic-board__values .manager-board');
    const monthsItems = Object.entries(months);

    this.setManagersMetric(monthsItems, managerMetric);
  }

  setManagerNameRow(boards, managerItems) {
    boards.forEach((elem) => {
      managerItems.forEach((item) => {
        this.setManagerItem(item, elem);
      });
    });
  }

  setManagerItem(item, elem) {
    const id = item[0];
    const manager = item[1];

    const div = document.createElement('div');
    div.classList.add('analytic__row');
    div.classList.add('manager__row');
    div.setAttribute('data-id', id);

    const name = document.createElement('div');
    name.classList.add('analytic-board__name');
    name.classList.add('manager__name');
    name.classList.add('manager__name--analytic');
    name.innerText = manager.name;

    div.appendChild(name);

    elem.appendChild(div);
  }

  setManagerTotal(managers, general) {
    const rows = document.querySelectorAll('.analytic__wrapper-board .manager-board');

    if (rows.length) {
      const managerLayer = [];

      const generalData = Object.entries(general);

      rows.forEach((item) => {
        const type = item.classList[item.classList.length - 1];

        let board;
        let valuesTotal;

        if (type) {
          generalData.forEach((elem) => {
            const metric = elem[0].split('manager')[1].toLowerCase();
            const values = elem[1];

            if (metric === type.toLowerCase()) {
              board = Array.from(item.children);
              valuesTotal = values;

              const obj = {
                board,
                valuesTotal,
                type,
              };

              managerLayer.push(obj);
            }
          });
        }
      });

      if (managerLayer.length) {
        managerLayer.forEach((elem) => {
          const { board, valuesTotal, type } = elem;

          const values = Object.entries(valuesTotal);

          values.forEach((item) => {
            const value = item[1];
            const currentRow = board.filter((el) => +el.getAttribute('data-id') === value.id)[0];

            const total = document.createElement('div');
            total.classList.add('analytic__column');
            total.classList.add('total');

            const metricType = type[0].toLowerCase() + type.slice(1, type.length);
            total.innerText = metricType === 'rating' ? utils.getSymboRoubles(metricType, value.value !== null ? value.value.toFixed(2) : value.value, false) : utils.getSymboRoubles(metricType, value.value, false);

            currentRow.appendChild(total);
          });
        });
      }
    }
  }

  setManagersMetric(monthsItems, rows) {
    rows.forEach((item) => {
      if (item.classList.contains('rating') && item.previousElementSibling.classList.contains('metric')) {
        item.classList.add('ml_0');
      }

      const metricBoard = !item.classList.contains('rating') ? item.classList[item.classList.length - 1] : item.classList[item.classList.length - 2];
      const type = metricBoard[0].toLowerCase() + metricBoard.slice(1, metricBoard.length);

      const months = monthsItems.filter((el) => {
        const metricType = el[0].split('manager')[1];
        const metric = metricType[0].toLowerCase() + metricType.slice(1, metricType.length);

        if (type === metric) {
          return el[1];
        }
      });

      if (months[0]) {
        const values = months[0][1];

        values.forEach((elem) => {
          const div = document.createElement('div');
          div.classList.add('analytic__row');
          div.classList.add('manager__row');
          div.classList.add('ml_0');
          div.setAttribute('data-id', elem.id);

          elem.value.forEach((subj) => {
            const column = document.createElement('div');
            column.classList.add('analytic__column');
            column.innerText = type === 'rating' ? utils.getSymboRoubles(type, subj !== null ? subj.toFixed(2) : subj, true) : utils.getSymboRoubles(type, subj, true);
            div.appendChild(column);
          });

          item.appendChild(div);
        });
      }
    });
  }
}

export default RenderManagerLayer;
