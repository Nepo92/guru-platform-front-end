class SetData {
  init(props) {
    const dataProps = {
      ...props,
      menu: document.querySelector('[js-menu-motivation-add]'),
    };

    dataProps.motivationInfo = dataProps.motivationSettings();

    this.setData(dataProps);
    this.setMonths(dataProps);
  }

  setData(props) {
    const { menu, motivationInfo } = props;

    const [department, position, employed, year, motivationName] = motivationInfo;

    const name = menu.querySelector('[js-motivation-name]');
    name.value = motivationName ?? '';

    const depertmentSelect = menu.querySelector('[js-motivation-department]');
    depertmentSelect.value = department.innerText.trim();

    const positionSelect = menu.querySelector('.motivation-add__position-menu');
    positionSelect.value = position.innerText.trim();

    const employedSelect = document.querySelector('[js-motivation-employment]');
    employedSelect.value = employed.innerText.trim();

    const yearSelect = document.querySelector('.motivation-add__year-menu');
    yearSelect.value = year.innerText.trim();
  }

  setMonths(props) {
    const { motivations, motivationInfo } = props;
    const [department, position, employed, yearInfo] = motivationInfo;

    const depId = +department.getAttribute('value');
    const posId = +position.getAttribute('value');
    const emp = employed.getAttribute('value') === 'true';
    const year = +yearInfo.getAttribute('value');

    props.usedMonths = [];

    motivations.forEach((item) => {
      const thisDep = item.idDepartment === depId;
      const thisPos = item.idPosition === posId;
      const thisEmp = item.forSelfEmployed === emp;
      const thisYear = item.year === year;

      if (thisDep && thisPos && thisEmp && thisYear) {
        item.months.forEach((elem) => {
          props.usedMonths.push(elem);
        });
      }
    });

    this.setMonthsDisabled(props);
    this.setMonthsChecked(props);
  }

  setMonthsDisabled(props) {
    const { menu, usedMonths } = props;

    const months = menu.querySelectorAll('.motivation-months__checkbox');

    months.forEach((item) => {
      item.disabled = false;
      item.checked = false;
    });

    if (usedMonths?.length) {
      months.forEach((item) => {
        usedMonths.forEach((elem) => {
          const month = +item.getAttribute('value');
          if (month === elem) {
            item.disabled = true;
          }
        });
      });
    }
  }

  setMonthsChecked(props) {
    if (props.currentWage) {
      const { currentWage, menu } = props;

      const months = menu.querySelectorAll('.motivation-months__checkbox');

      months.forEach((item) => {
        currentWage.months.forEach((elem) => {
          if (+item.getAttribute('value') === elem) {
            item.disabled = false;
            item.checked = true;
          }
        });
      });
    }
  }
}

export default SetData;
