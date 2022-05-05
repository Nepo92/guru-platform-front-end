class TemplateData {
  getPatterns() {
    const patterns = [];

    const layers = document.querySelectorAll('.layers__item');

    layers.forEach((item) => {
      const pattern = {};

      const isPercent = item.querySelector('[js-bill-layer-value]').value.split('%').length > 1;

      if (isPercent) {
        pattern.percent = item.querySelector('[js-bill-layer-value]').value.split('%')[0].trim();
      } else {
        pattern.value = item.querySelector('[js-bill-layer-value]').value.trim();
      }

      pattern.dayStep = +item.querySelector('[js-bill-layer-date]').value;

      patterns.push(pattern);
    });

    return patterns;
  }
}

export default TemplateData;
