import Utils from '../../../../../../../../../../../../../../../../utils/utils.js';

const utils = new Utils();

class SetData {
  init(props) {
    const inputValueTo = document.querySelectorAll('.value-to__value');
    const inputValueFrom = document.querySelectorAll('.value-from__value');
    const inputMultplier = document.querySelectorAll('.value-reward__value');
    props.blockProps.setRatingData$ = new SetData();

    if (inputValueTo.length) {
      const setValueTo = this.setValueTo.bind(this, props);

      inputValueTo.forEach((item) => {
        const input = utils.setCloneElement(item);
        input.addEventListener('input', setValueTo);
      });
    }

    if (inputValueFrom.length) {
      const setValueFrom = this.setValueFrom.bind(this, props);

      inputValueFrom.forEach((item) => {
        const input = utils.setCloneElement(item);
        input.addEventListener('input', setValueFrom);
      });
    }

    if (inputMultplier.length) {
      const setMultplier = this.setMultplier.bind(this, props);

      inputMultplier.forEach((item) => {
        const input = utils.setCloneElement(item);
        input.addEventListener('input', setMultplier);
      });
    }
  }

  setValueTo(props, e) {
    const { sendingData } = props;
    const { currentBlock } = sendingData;

    const t = e.target;
    const item = utils.getParent(t, 'levels__item');

    const isAdditional = utils.getParent(item, 'levels-additional') ? 'additional' : null;
    const isTraffic = utils.getParent(item, 'levels-traffic') ? 'traffic' : 'rating';

    const wrapper = isAdditional ?? isTraffic;

    const index = +item.querySelector('.level-id__count').innerText;

    if (wrapper === 'additional') {
      currentBlock.levels.additional = [...currentBlock.levels.additional].map((elem) => {
        if (elem.level === index) {
          this.validateValueTo(t, elem);
        }

        return elem;
      });
    } else if (wrapper === 'traffic') {
      currentBlock.levels.traffic = [...currentBlock.levels.traffic].map((elem) => {
        if (elem.level === index) {
          this.validateValueTo(t, elem);
        }

        return elem;
      });
    } else if (wrapper === 'rating') {
      currentBlock.levels = [...currentBlock.levels].map((elem) => {
        if (elem.level === index) {
          this.validateValueTo(t, elem);
        }

        return elem;
      });
    }
  }

  setValueFrom(props, e) {
    const { sendingData } = props;
    const { currentBlock } = sendingData;
    const t = e.target;
    const item = utils.getParent(t, 'levels__item');

    const index = +item.querySelector('.level-id__count').innerText;

    const isAdditional = utils.getParent(item, 'levels-additional') ? 'additional' : null;
    const isTraffic = utils.getParent(item, 'levels-traffic') ? 'traffic' : 'rating';

    const wrapper = isAdditional ?? isTraffic;

    if (wrapper === 'additional') {
      currentBlock.levels.additional = [...currentBlock.levels.additional].map((elem) => {
        if (elem.level === index) {
          this.validateValueFrom(t, elem);
        }

        return elem;
      });
    } else if (wrapper === 'traffic') {
      currentBlock.levels.traffic = [...currentBlock.levels.traffic].map((elem) => {
        if (elem.level === index) {
          this.validateValueFrom(t, elem);
        }

        return elem;
      });
    } else if (wrapper === 'rating') {
      currentBlock.levels = [...currentBlock.levels].map((elem) => {
        if (elem.level === index) {
          this.validateValueFrom(t, elem);
        }

        return elem;
      });
    }
  }

  setMultplier(props, e) {
    const { sendingData } = props;
    const { currentBlock } = sendingData;
    const t = e.target;
    const item = utils.getParent(t, 'levels__item');

    const index = +item.querySelector('.level-id__count').innerText;

    const isAdditional = utils.getParent(item, 'levels-additional') ? 'additional' : null;
    const isTraffic = utils.getParent(item, 'levels-traffic') ? 'traffic' : 'rating';

    const wrapper = isAdditional ?? isTraffic;

    if (wrapper === 'additional') {
      currentBlock.levels.additional = [...currentBlock.levels.additional].map((elem) => {
        if (elem.level === index) {
          this.validateValueMultiplier(t, elem);
        }

        return elem;
      });
    } else if (wrapper === 'traffic') {
      currentBlock.levels.traffic = [...currentBlock.levels.traffic].map((elem) => {
        if (elem.level === index) {
          this.validateValueMultiplier(t, elem);
        }

        return elem;
      });
    } else if (wrapper === 'rating') {
      currentBlock.levels = [...currentBlock.levels].map((elem) => {
        if (elem.level === index) {
          this.validateValueMultiplier(t, elem);
        }

        return elem;
      });
    }
  }

  validateValueTo(t, elem) {
    const { value } = t;

    const digits = value.split('.').length === 1 ? !Number.isNaN(+value) : null;
    const fraction = value.split('.').length === 2 ? !Number.isNaN(+value.split('.')[1]) : null;

    const inData = digits ?? fraction;

    if (inData) {
      elem.valueTo = +t.value;
    } else {
      const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');
      t.value = valueInput;
      elem.valueTo = +valueInput;
    }
  }

  validateValueFrom(t, elem) {
    const { value } = t;

    const digits = value.split('.').length === 1 ? !Number.isNaN(+value) : null;
    const fraction = value.split('.').length === 2 ? !Number.isNaN(+value.split('.')[1]) : null;

    const inData = digits ?? fraction;

    if (inData) {
      elem.valueFrom = +t.value;
    } else {
      const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');
      t.value = valueInput;
      elem.valueFrom = +valueInput;
    }
  }

  validateValueMultiplier(t, elem) {
    const { value } = t;

    const digits = value.split('.').length === 1 ? !Number.isNaN(+value) : null;
    const fraction = value.split('.').length === 2 ? !Number.isNaN(+value.split('.')[1]) : null;

    const inData = digits ?? fraction;

    if (inData) {
      elem.multiplier = +t.value;
    } else {
      const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');
      t.value = valueInput;
      elem.multiplier = +valueInput;
    }
  }
}

export default SetData;
