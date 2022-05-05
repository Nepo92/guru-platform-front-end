import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class BillTemplatesTemplates {
  setBillTemplates(props) {
    const { pack } = props;
    const { templates } = pack;

    if (templates.length) {
      const templateItems = templates.map((item) => {
        return `
          <div class="templates__item" data-id="${item.id}">
            ${this.templateItems(item)}
          </div>`;
      });

      const wrapper = document.querySelector('.templates__content');
      wrapper.innerHTML = templateItems.join('');
    }
  }

  templateItems(item) {
    return `
        <p class="templates__name">${item.name}</p>
        <div class="templates__structure">
          ${item.patterns.length ? `${item.patterns.length} ${utils.declOfNum(item.patterns.length, ['счет', 'счета', 'счетов'])} ` : ''}
        </div>
    `;
  }

  setBillLayerTemplate(layerData) {
    const [item, counter, props, patterns] = layerData;
    const { idCounter } = props;

    return `
    <div class="layers-item__wrapper">
      <div class="layers-item ${(counter + 1) > 1 ? 'percent-icon' : ''}">
        <p class="layers-item__name">${counter + 1} счет</p>
        <input data-id="${item.id || ''}" js-bill-layer-value autocomplete="off" class="menu-input__input menu-input__input_small layers__input" placeholder="0" value="${(item.value) || (item.percent ? item.percent : '') || ''}" required/>
      </div>
      <div class="layers-item ${idCounter === 1 ? 'hide' : ''}" step-item="${idCounter}">
        <p class="layers-item__name">Шаг</p>
          <input data-id="${item.id || ''}" value="${item.dayStep || ''}" js-bill-layer-date autocomplete="off" class="menu-input__input menu-input__input_small layers__input" placeholder="Количество дней" required/>
      </div>
      <div class="layers-item__delete"></div>
      ${(counter + 1 === 1)
        ? `<div class="layers__info">
          <div class="layers-info__tooltip">
          Первый счет в ₽ или %.<br>Если требуется использовать первый счет в процентах, в конце значения ставится символ %. Пример - 50 %<br><br>Если в рублях, тогда в конце значения ничего не добавляется. Пример - 500<br><br>Допустим сумма покупки 1500 ₽<br>Первый счет в рублях - 1000<br>Чтобы поделить счет на части, необходимо из суммы покупки вычесть значение первого счета (1500 - 1000 = 500) - это будет 100% от оставшейся суммы.<br> Далее необходимо эти 100% разделить на счета, главное чтобы сумма полученных счетов была равна 100% (не включая первый).<br><br>Если первый счет в процентах, то не надо вычитать из суммы покупки значение первого счета. А нужно сразу делить на несколько счетов. Тут тоже главное, чтобы сумма всех значений счетов (включая первый) была равна 100 %
          </div>
          ?
        </div>` : ''
      }
    </div>
    <div class="layers-item__dates ${(item.startDateSelected || (patterns && patterns[0]?.dateIndex === 1 && idCounter === 2)) ? 'hide' : ''} ${idCounter > 2 ? 'mt_0' : ''}" ${idCounter === 2 ? 'second-layer-dates' : ''}>
      ${
        /* eslint-disable-next-line */
        idCounter === 1 ? `
          <div class="layers-item__date mr_10">
            <input type="radio" ${idCounter === 1 ? 'today' : ''} ${item.dateIndex === 0 ? 'checked' : ''} id="date-${idCounter}-${counter}" name="date-${idCounter}" value="0" class="platform__checkbox">
            <label class="platform-checkbox__label" for="date-${idCounter}-${counter}">
              <span class="platform__checkbox--fake radio-fake mr_10"></span>
              Сегодня
            </label>
          </div>
          ${idCounter === 1 ? `
          <div class="layers-item__date">
            <input type="radio" ${idCounter === 1 ? 'date-start' : ''} ${item.dateIndex === 1 ? 'checked' : ''} id="date-${idCounter}-${counter + 1}" name="date-${idCounter}" value="1" class="platform__checkbox">
            <label class="platform-checkbox__label" for="date-${idCounter}-${counter + 1}">
              <span class="platform__checkbox--fake radio-fake mr_5"></span>
              Дата старта
            </label>
          </div>
          ` : ''}
        ` : idCounter === 2 ? `
          <div class="layers-item__date mr_10">
            <input type="radio" ${idCounter === 2 ? 'date-start-second' : ''} ${item.dateIndex === 1 ? 'checked' : ''} id="date-${idCounter}-${counter + 1}" name="date-${idCounter}" value="1" class="platform__checkbox">
            <label class="platform-checkbox__label" for="date-${idCounter}-${counter + 1}">
              <span class="platform__checkbox--fake radio-fake mr_5"></span>
              Дата старта
            </label>
          </div>
          <div class="layers-item__date">
            <input type="radio" ${idCounter === 2 ? 'date-start-second-other' : ''} ${item.dateIndex === 2 ? 'checked' : ''} id="date-${idCounter}-${counter + 2}" value="2" name="date-${idCounter}" class="platform__checkbox">
            <label class="platform-checkbox__label" for="date-${idCounter}-${counter + 2}">
              <span class="platform__checkbox--fake radio-fake mr_5"></span>
              Другая
            </label>
          </div>
          `
        : ''}
      </div>
    `;
  }
}

export default BillTemplatesTemplates;
