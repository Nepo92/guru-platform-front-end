import SelectHover from './selects/selectHover.js';
import SelectCustom from './selects/selectCustom/selectCustom.js';
import TempateSelect from './template/templateSelect.js';
import Utils from '../../utils/utils.js';

const selectCustom = new SelectCustom();
const selectHover = new SelectHover();
const templateSelect = new TempateSelect();
const utils = new Utils();

class Select {
  async init(props) {
    const { pack } = props;
    const { selectsArray } = props;

    if (selectsArray?.length) {
      await this.renderSelects(selectsArray, pack);
      this.setSelecHelpersProps(props);

      const dispatchSelectType = this.dispatchSelectType.bind(this, props);

      if (pack.selectObsArr.length < 1) {
        document.body.addEventListener('click', dispatchSelectType);
        pack.selectObsArr.push(true);
      }
    }
  }

  setSelecHelpersProps(props) {
    props.closeSelect = this.closeSelect.bind(this, props);
    props.scrollWrapper = this.scrollWrapper.bind(this);
  }

  dispatchSelectType(props, e) {
    if (props.targetSelect) {
      props.prev = props.targetSelect;
    }

    const t = e.target;

    const parentSelect = utils.getParent(t, 'select') ? utils.getParent(t, 'select') : false;
    const isSelect = t.classList.contains('select') ? t : false;

    const targetSelect = parentSelect || isSelect;

    if (targetSelect) {
      const mode = targetSelect.getAttribute('data-mode');

      switch (mode) {
        case 'hover-close': {
          const hoverSelectProps = {
            props,
            targetSelect,
            e,
          };

          selectHover.init(hoverSelectProps);
          break;
        }
        case 'custom': {
          const customSelectProps = {
            props,
            targetSelect,
          };

          selectCustom.init(customSelectProps, e);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  async renderSelects(selects, pack) {
    for (let index = 0; index < selects.length; index++) {
      const element = selects[index];

      const { item } = element;

      utils.removeChildren(item, 0);

      const wrapper = document.createElement('div');
      wrapper.classList.add('platform-select__wrapper');

      if (element.mode === 'hover-close') {
        wrapper.classList.add('no-icon');
      }

      if (element.type === 'status-deal') {
        wrapper.classList.add('select-deal-card');
      }

      wrapper.innerHTML = templateSelect.customSelectTemplate(element, pack);

      await item.appendChild(wrapper);
    }
  }

  closeSelect(props, e) {
    if (e) {
      const t = e.target;

      const parentSelectWrapper = utils.getParent(t, 'platform-select__wrapper');
      const isSelectWrapper = t.classList.contains('platform-select__wrapper');

      if (!parentSelectWrapper || !isSelectWrapper) {
        this.closeBodies(props);
      }
    } else {
      this.closeBodies(props);
    }

    props.selectIsOpen = false;
  }

  closeBodies(props) {
    const bodies = document.querySelectorAll('[select-body]');

    if (bodies.length) {
      bodies.forEach((item) => item.classList.remove('open'));
    }

    document.body.removeEventListener('click', props.closeSelect);
  }

  scrollWrapper(select) {
    const body = select.querySelector('.select__body');

    body.style.top = `calc(${body.parentNode.getBoundingClientRect().bottom}px - 2px)`;
  }
}

export default Select;
