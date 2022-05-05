class BlockTemplates {
  blockTemplate(elem) {
    return `
      <div class="motivation__image motivation-${elem.className}-${elem.typeCode}__image"></div>
      <div class="motivation__info">
        <span class="motivation__title">${elem.typeName}</span>
        <div class="motivation__control">
          <input type="checkbox" class="motivation-add__checkbox motivation__checkbox" value="${elem.className}" id="${`${elem.className}_${elem.typeCode}`} + '_add'" ${(elem.active) ? 'checked' : ''}>
          <label for="${`${elem.className}_${elem.typeCode}`} + '_add'" class="motivation-add__toggle motivation__toggle"></label>
          <input type="hidden" class="motivation__type" value="${elem.typeCode}">
        </div>
      </div>
    `;
  }

  settingsFixedWageRate0Block(currentBlock) {
    const { holidayRate, regularRate } = currentBlock;

    const regular = regularRate || '';
    const holiday = holidayRate || '';

    return `
      <span class="fixed-item__icon">&#8381;</span>
        <div class="motivation-modify-template__title motivation-wage__title regular-title">Ставка в час <span class="motivation-modify-template__icon"></span></div>
        <input autocomplete="off" placeholder="0" class="motivation-modify-template__regular menu-input__input menu-wage__input menu-input__input_small motivation__input input-number" value="${regular}" type="text" name="regularRate">
      </div>
      <div class="fixed-item">
        <span class="fixed-item__icon">&#8381;</span>
        <div class="motivation-modify-template__title motivation-wage__title">
          Ставка в час праздничная <span class="motivation-modify-template__icon"></span>
        </div>
        <input autocomplete="off" placeholder="0" class="motivation-modify-template__holiday menu-input__input menu-wage__input menu-input__input_small motivation__input input-number" value="${holiday}" type="text" name="holidayRate">
      </div>
    `;
  }

  settingsOneValueWageRate7Block(currentBlock) {
    const { value } = currentBlock;

    return `
      <span class="fixed-item__icon">&#8381;</span>
      <div class="motivation-modify-template__title motivation-wage__title regular-title">Коэффициент</div>
      <input autocomplete="off" placeholder="0" class="motivation-modify-template__coef menu-input__input menu-wage__input menu-input__input_small input-number" value="${value || ''}" type="text" name="value">
    `;
  }

  settingsOneValueWageRate3Block(currentBlock) {
    const { value } = currentBlock;

    return `
      <span class="fixed-item__icon">&#8381;</span>
      <div class="motivation-modify-template__title motivation-wage__title regular-title">Ставка за одно проверенное ДЗ</div>
      <input autocomplete="off" placeholder="0" class="motivation-modify-template__homework menu-input__input menu-wage__input menu-input__input_small input-number" value="${value || ''}" type="text" name="value">
    `;
  }

  settingsOneValueWageRate4Block(currentBlock) {
    const { value } = currentBlock;

    return `
      <span class="fixed-item__icon">&#8381;</span>
      <div class="motivation-modify-template__title motivation-wage__title regular-title">Ставка за одну проверенную сделку</div>
      <input autocomplete="off" placeholder="0" class="motivation-modify-template__deal menu-input__input menu-wage__input menu-input__input_small input-number" value="${value || ''}" type="text" name="value">
    `;
  }

  leveledWageRate1Block(currentBlock, settings) {
    const sortedLevels = currentBlock.levels.sort((a, b) => a.level - b.level);

    const levels = sortedLevels.map((item) => {
      return `
          <li class="levels__item">
            ${this.levelLeveledWageBlock(item, settings)}
          </li>
        `;
    });

    return `
        <div class="levels__top">
          <span class="levels__title"></span>
          <span class="levels__delete"></span>
        </div>
        <ul class="levels__list">
          ${levels.join('')}
        </ul>
        <div class="levels__bottom">
          <a class="levels-bottom__btn--modify">Добавить уровень</a>
        </div>
    `;
  }

  levelLeveledWageBlock(item, settings) {
    let from;
    let to;
    let coeff;

    if (settings === 'rating') {
      from = 'Балы от';
      to = 'Балы до';
      coeff = 'Коэф';
    } else if (settings === 'advertiser') {
      from = '% от';
      to = '% до';
      coeff = 'Награда';
    } else if (settings === 'plan') {
      from = '% выполн. от';
      to = '% выполн. до';
      coeff = 'Награда';
    } else {
      from = 'Сумма от';
      to = 'Сумма до';
      coeff = 'Награда';
    }

    return `
        <form class="level">
          <input type="hidden" class="level-id" value="${item ? item.id : ''}">
          <div class="level__id">
            <div class="level-id__title">Lvl</div>
            <div class="level-id__count">${item.level ? item.level : ''}</div>
          </div>
          <div class="level__value-from">
            <div class="value-from__title">${from}</div>
            <input autocomplete="off"  class="value-from__value input-number" name="valueFrom" type="text" value="${item.valueFrom ? item.valueFrom : ''}" placeholder="0">
          </div>
          <span class="levels-interval__icon"></span>
          <div class="level__value-to">
            <div class="value-to__title">${to}</div>
            <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" value="${item.valueTo ? item.valueTo : ''}" placeholder="0">
          </div>
          <div class="level__reward">
            <div class="value-reward__title">${coeff}</div>
            <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" value="${item.multiplier ? item.multiplier : ''}" placeholder="0">
          </div>
          <div class="level__delete--modify"></div>
        </form>
    `;
  }

  settingsTypedLeveledWageRate5Block(currentBlock) {
    const levelsAdditional = currentBlock.levels.additional.map((item) => {
      return `
          <li class="levels__item">
            ${this.levelLeveledWageBlock(item)}
          </li>
        `;
    });

    const levelsTraffic = currentBlock.levels.traffic.map((item) => {
      return `
          <li class="levels__item">
            ${this.levelLeveledWageBlock(item)}
          </li>
        `;
    });

    return `
      <div class="levels">
        <div class="levels-additional">
          <div class="levels-additional__top">
            <span class="levels-additional__title">База</span>
          </div>
          <ul class="levels-additional__list">
            ${levelsAdditional.join('')}
          </ul>
          <div class="level-additional__add">
            <a class="level-additional__button--add">
              Добавить уровень
            </a>
          </div>
        </div>
        <div class="levels-traffic">
          <div class="levels-traffic__top">
            <span class="levels-traffic__title">Траффик</span>
          </div>
          <ul class="levels-traffic__list">
            ${levelsTraffic.join('')}
          </ul>
        <div class="level-traffic__add">
          <a class="level-traffic__button--add">
            Добавить уровень
          </a>
        </div>
      </div>
    `;
  }
}

export default BlockTemplates;
