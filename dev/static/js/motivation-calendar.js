$(document).ready(() => {
  setCalendar();
  setCalendarInfo();
});

function startSettings() {
  $($.makeArray($('.calendar-year__select').find('option')).filter(el => +$(el).attr('value') === 2021)[0]).prop('selected', true);
}


function setCalendar() {
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октярь', 'Ноябрь', 'Декабрь'];
  const month = $.map(months, (item, index) => {
    return `
      <div class="m-calendar__item">
        <div class="m-calendar__info">
          <p class="m-calendar__name">${item}</p>
          <span class="m-calendar__indicator"></span>
        </div>
        <p class="m-calendar__description">
          <span class="m-calendar__roles">Настроено ролей <span class="m-calendar__roles--value"></span></span>
          <span class="m-calendar__roles--value"></span>
        </p>
        <input month-id type="hidden" value="${index + 1}">
      </div>
    `;
  });

  $('[js-motivation-calendar]').append(month);
}

function setCalendarInfo() {
  const packs = allPacks.concat();

  let motivation = [];

  $.each($('.m-calendar__item'), (index, item) => {

    $.each(packs, (count, elem) => {
      const month = elem.months.filter(el => el === +$(item).find('[month-id]').attr('value'));
      if (month[0] !== undefined) {
        motivation.push(month[0]);
      };
    });
  });
};
