import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class TemplateData {
  getData(company, props, isUpdate, currentTemplate = false) {
    const name = document.querySelector('[bill-template-name]').value.trim();

    let data;

    if (!isUpdate) {
      data = {
        name,
        idCompany: company.id,
        patterns: this.getPatterns(props),
      };
    } else {
      data = {
        keyField: {
          id: currentTemplate.id,
          name,
          idCompany: company.id,
          patterns: this.getPatterns(props, currentTemplate),
        },
        valueField: props.removed,
      };
    }

    return data;
  }

  getPatterns(props, currentTemplate = false) {
    const patterns = [];

    const layers = document.querySelectorAll('.layers__item');

    layers.forEach((item, index) => {
      this.getPatternData(item, index, props, patterns, currentTemplate);
    });

    return patterns;
  }

  getPatternData(item, index, props, patterns, currentTemplate) {
    const pattern = {};

    this.getPatternPercent(item, index, pattern);
    this.getPatternDates(item, pattern, props, patterns);

    pattern.positionIndex = index;

    if (currentTemplate) {
      pattern.commonPatternId = currentTemplate.id;
    }

    patterns.push(pattern);
  }

  getPatternPercent(item, index, pattern) {
    const value = item.querySelector('[js-bill-layer-value]');

    if (index === 0) {
      const isPercent = value.value.split('%').length > 1;

      if (isPercent) {
        pattern.percent = +value.value.split('%')[0].trim();
      } else {
        pattern.value = +value.value.trim();
      }

      if (value.getAttribute('data-id')) {
        pattern.id = +value.getAttribute('data-id');
      }
    } else {
      pattern.percent = value.value.split('%').length > 1 ? +value.value.split('%')[0] : +value.value.trim();

      if (value.getAttribute('data-id')) {
        pattern.id = +value.getAttribute('data-id');
      }
    }
  }

  getPatternDates(item, pattern) {
    const dates = item.querySelector('.layers-item__dates').classList.contains('mt_0');

    if (!dates) {
      const firstItem = Array.from(item.querySelectorAll('[name="date-1"]'));
      const secondItem = Array.from(item.querySelectorAll('[name="date-2"]'));

      if (firstItem.length) {
        const selected = firstItem.find((el) => el.checked);

        if (selected.hasAttribute('today')) {
          pattern.dateIndex = 0;
        } else {
          pattern.dateIndex = 1;
        }
      }

      if (secondItem.length) {
        const selected = secondItem.find((el) => el.checked);

        if (selected?.hasAttribute('date-start-second')) {
          pattern.dateIndex = 1;

          const dateInput = item.querySelector('[js-bill-layer-date]');

          if (!utils.getParent(dateInput, 'layers-item').classList.contains('hide')) {
            pattern.dayStep = +item.querySelector('[js-bill-layer-date]').value || null;
          }
        } else {
          pattern.dateIndex = 2;
          pattern.dayStep = +item.querySelector('[js-bill-layer-date]').value || null;
        }
      }
    } else {
      pattern.dayStep = +item.querySelector('[js-bill-layer-date]').value || null;
      pattern.dateIndex = 2;
    }
  }
}

export default TemplateData;
