import Utils from '../../../../utils/utils.js';

const utils = new Utils();

class ToggleRows {
  init(props) {
    const togglesLeft = document.querySelectorAll('[total-row]');
    const togglesRight = document.querySelectorAll('.metric');

    if (togglesLeft.length) {
      const openTotalRow = this.openTotalRow.bind(this, props);

      togglesLeft.forEach((item) => {
        const toggle = utils.setCloneElement(item);
        toggle.addEventListener('click', openTotalRow);
      });
    }

    if (togglesRight.length) {
      const openTotalRow = this.openTotalRow.bind(this, props);

      togglesRight.forEach((item) => {
        const toggle = utils.setCloneElement(item);
        toggle.addEventListener('click', openTotalRow);
      });
    }
  }

  openTotalRow(props, e) {
    const t = e.target;

    const row = utils.getParent(t, 'analytic__row') ? utils.getParent(t, 'analytic__row') : t;
    const part = row.classList[row.classList.length - 1];

    const currentPeriod = Array.from(document.querySelectorAll(`.manager-board.${part}`));

    const periods = document.querySelectorAll('.manager-board');

    const isOpen = currentPeriod.every((el) => el.classList.contains('open'));

    periods.forEach((item) => {
      item.style.maxHeight = null;
      item.classList.remove('open');
    });

    const totalRow = document.querySelector(`.${part}[total-row]`);

    document.querySelectorAll('.analytic__row').forEach((item) => {
      item.classList.remove('open');
    });

    if (isOpen) {
      currentPeriod.forEach((item) => {
        item.style.maxHeight = null;
        item.classList.remove('open');
      });

      totalRow.classList.remove('open');
    } else {
      currentPeriod.forEach((item) => {
        item.style.maxHeight = `${item.scrollHeight + 30}px`;
        item.classList.add('open');
      });

      totalRow.classList.add('open');
    }
  }
}

export default ToggleRows;
