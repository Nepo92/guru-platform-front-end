import Utils from '../../../../utils/utils.js';
import MeasureDistanceSelect from '../../measureDistance/measureDistanceSelect.js';

const utils = new Utils();
const measureDistanceSelect = new MeasureDistanceSelect();

class SelectCustom {
  init(customSelectProps, e) {
    const { targetSelect, props } = customSelectProps;
    if (targetSelect) {
      props.targetSelect = targetSelect;

      const customSelect = targetSelect.querySelector('[select-head]');
      if (customSelect) {
        this.openSelect(props, e);
      }
    }
  }

  openSelect(props) {
    this.closeAllBodies(props).then(() => {
      const { targetSelect } = props;
      const body = targetSelect.querySelector('.select__body');

      const bodies = document.querySelectorAll('.select__body');
      const someBodyIsOpen = Array.from(bodies).some((el) => el.classList.contains('open'));

      if (!someBodyIsOpen && !props.selectIsOpen) {
        this.setBodyStyle(body, targetSelect);
        this.chooseOptionEvents(body, props);
        props.selectIsOpen = true;

        document.body.addEventListener('click', props.closeSelect);
      } else {
        props.selectIsOpen = false;
      }

      this.scrollPage(props);
    });
  }

  getSelectItem(t) {
    const targetIsSelect = t.classList.contains('select') ? t : false;
    const parentIsSelect = utils.getParent(t, 'select') ? utils.getParent(t, 'select') : false;

    return targetIsSelect || parentIsSelect;
  }

  getSelectBody(selectItem) {
    return selectItem.querySelector('.select__body');
  }

  setBodyStyle(body, selectItem) {
    const selectWrapper = utils.getParent(selectItem, 'dialog-select__wrapper') || utils.getParent(selectItem, 'status')?.querySelector('[select-here]');

    const absolute = ['select-contract-item'];

    if (absolute.includes(selectWrapper?.getAttribute('data-select-type'))) {
      body.style.position = 'absolute';
      body.style.left = `calc(${selectItem.getBoundingClientRect().left}px)`;
      body.style.top = `${selectItem.getBoundingClientRect().bottom - 2}`;
    } else {
      body.style.position = 'fixed';
      body.style.left = `calc(${selectItem.getBoundingClientRect().left}px)`;
      body.style.top = `${selectItem.getBoundingClientRect().bottom - 2}px`;
    }

    body.classList.add('open');
    body.style.maxWidth = `${selectItem.offsetWidth}px`;
    body.style.maxHeight = '250px';

    const scrollWrapper = utils.getParent(selectItem, 'custom-scroll');

    const beetwenBottom = measureDistanceSelect.getDistanceBetweenBottom(selectItem, scrollWrapper);
    const notDistanseBetweenBottom = measureDistanceSelect.measureFromBottom(body, beetwenBottom);

    const openProps = {
      body,
      selectItem,
      scrollWrapper,
    };

    if (notDistanseBetweenBottom && selectItem.getAttribute('data-select-adaptive') === 'true') {
      this.openOnTop(openProps);
    } else {
      this.openOnBottom(openProps);
    }
  }

  openOnTop(openProps) {
    const {
      body,
      selectItem,
      scrollWrapper,
    } = openProps;

    const beetwenBottom = measureDistanceSelect.getDistanceBetweenBottom(selectItem, scrollWrapper);
    const beetwenTop = measureDistanceSelect.getDistanceBetweenTop(beetwenBottom);

    body.style.maxHeight = beetwenTop - 130;

    body.style.top = selectItem.getBoundingClientRect().top - body.offsetHeight;
  }

  openOnBottom(openProps) {
    const {
      body,
      selectItem,
      scrollWrapper,
    } = openProps;

    const beetwenBottom = measureDistanceSelect.getDistanceBetweenBottom(selectItem, scrollWrapper);

    const notDistanseBetweenBottom = measureDistanceSelect.measureFromBottom(body, beetwenBottom);

    body.style.top = selectItem.getBoundingClientRect().bottom - 2;

    const isAdaptive = selectItem.hasAttribute('data-select-adaptive') && selectItem.getAttribute('data-select-adaptive') === 'true';

    if (notDistanseBetweenBottom && isAdaptive) {
      body.style.maxHeight = beetwenBottom - 50;
    }
  }

  async closeAllBodies(props) {
    const bodies = document.querySelectorAll('[select-body]');

    if (bodies.length) {
      for (let index = 0; index < bodies.length; index++) {
        const element = bodies[index];
        await element.classList.remove('open');
      }

      await document.body.removeEventListener('click', props.closeSelect);
    }
  }

  chooseOptionEvents(body, props) {
    if (body && body.classList.contains('open')) {
      body.scrollTop = 0;

      const options = Array.from(body.children);

      if (options.length) {
        const chooseOption = this.chooseOption.bind(this, props);

        options.forEach((item) => {
          const option = utils.setCloneElement(item);
          option.addEventListener('click', chooseOption);
        });
      }
    }
  }

  chooseOption(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    const selectWrapper = utils.getParent(t, 'platform-select__wrapper');

    if (selectWrapper) {
      const header = utils.getParent(t, 'platform-select__wrapper').querySelector('[select-head]');
      const placeholder = selectWrapper.querySelector('[select-body]').children[0].innerText;

      const headerPlaceholder = header.children[0];

      headerPlaceholder.innerText = '';

      const inputValue = selectWrapper.querySelector('[id-selected]');

      inputValue.value = t.getAttribute('data-id');

      const option = (t.classList.contains('select__option') ? t : '') || utils.getParent(t, 'select__option');

      const value = option.hasAttribute('value') ? +option.getAttribute('value') !== 0 : '';

      if (value) {
        this.selectOption(headerPlaceholder, inputValue, option);
      } else {
        this.selectPlaceholder(headerPlaceholder, placeholder, inputValue);
      }

      const event = new Event('change');
      inputValue.dispatchEvent(event);

      props.closeSelect(e);
    }
  }

  selectOption(header, inputValue, option) {
    const optionName = option.innerHTML;
    header.innerHTML = optionName;

    if (optionName.split('</').length > 1) {
      const textFromHTMLTag = this.textFromHTMLTag.bind(this, optionName);
      header.parentNode.setAttribute('title', textFromHTMLTag().trim());
    } else {
      header.parentNode.setAttribute('title', optionName.trim());
    }

    inputValue.value = option.getAttribute('value');
  }

  textFromHTMLTag(optionName) {
    const str = optionName.replace(/<[^>]+>/g, '');

    let i;

    for (let index = 0; index < str.length; index++) {
      const item = str[index];

      /* eslint-disable-next-line */
      if (!window.isNaN(+item)) {
        i = index;
        break;
      }
    }

    const result = `${str.slice(0, i)} ${str.slice(i, str.length)}`;

    return result;
  }

  selectPlaceholder(header, placeholder, inputValue) {
    header.innerText = placeholder;

    let placeholderValue;

    if (placeholder === 'Все воронки') {
      placeholderValue = '0';
    } else {
      placeholderValue = '';
    }

    header.parentNode.setAttribute('title', placeholder.trim());

    inputValue.value = placeholderValue;
  }

  scrollPage(props) {
    const { selectIsOpen } = props;

    const wrapper = utils.getParent(props.targetSelect, 'custom-scroll');

    if (selectIsOpen) {
      const scrollWrapper = props.scrollWrapper.bind(props.scrollWrapper, props.targetSelect);

      wrapper.addEventListener('scroll', scrollWrapper);
    }
  }
}

export default SelectCustom;
