import Utils from '../../../utils/utils.js';
import { dealAPI } from '../../../api/api.js';

const utils = new Utils();

class SelectHover {
  init(hoverSelectProps) {
    const {
      props,
      targetSelect,
      e,
    } = hoverSelectProps;

    if (targetSelect) {
      props.targetSelect = targetSelect;

      const header = targetSelect.querySelector('[select-head]');

      if (header) {
        this.openSelect(props, e);
      }
    }
  }

  openSelect(props, e) {
    this.closeOthersSelect(props);

    const current = props.targetSelect;

    if (current) {
      const body = current.querySelector('.select__body');

      const selectInViewPort = this.selectBodyInViewPort(e);

      const selectProps = {
        body,
        current,
      };

      if (selectInViewPort) {
        this.bodyOpenUp(selectProps);
      } else {
        this.bodyOpenDown(selectProps);
      }

      props.selectBody = body;
      this.selectOption(props);

      this.closeSelect();
    }
  }

  selectBodyInViewPort(e) {
    return window.innerHeight - 280 < e.clientY;
  }

  closeOthersSelect() {
    const selects = document.querySelectorAll('.select__body');

    if (selects.length) {
      selects.forEach((item) => {
        item.style.display = 'none';
      });
    }
  }

  bodyOpenUp(selectProps) {
    const { body, current } = selectProps;

    body.style.position = 'fixed';
    body.style.left = `calc(${current.getBoundingClientRect().left}px)`;
    body.style.top = `${current.getBoundingClientRect().top}px`;
    body.style.transform = 'translateY(calc(-100%))';
    body.style.width = `${current.offsetWidth}px`;
    body.style.display = 'flex';
  }

  bodyOpenDown(selectProps) {
    const { body, current } = selectProps;

    body.style.position = 'fixed';
    body.style.left = `calc(${current.getBoundingClientRect().left}px)`;
    body.style.top = `${current.getBoundingClientRect().top + current.offsetHeight}px`;
    body.style.display = 'flex';
    body.style.width = `${current.offsetWidth}px`;
  }

  closeSelect() {
    const selects = document.querySelectorAll('.select');

    const leaveSelectHead = this.leaveSelectHead.bind(this);

    selects.forEach((item) => {
      item.addEventListener('mouseleave', leaveSelectHead);
    });

    const closeSelectLeave = this.closeSelectLeave.bind(this);
    document.body.addEventListener('mouseleave', closeSelectLeave);
  }

  leaveSelectHead(e) {
    const t = e.target;

    const body = t.querySelector('.select__body');

    body.style.display = 'none';
    t.classList.remove('open');
  }

  closeSelectLeave() {
    const bodies = document.querySelectorAll('.select__body');

    bodies.forEach((item) => {
      item.style.display = 'none';
    });
  }

  selectOption(props) {
    const { selectBody } = props;
    const options = selectBody.querySelectorAll('.select__option--status');

    if (options.length) {
      const setOptionSelected = this.setOptionSelected.bind(this, props);

      options.forEach((item) => {
        const option = utils.setCloneElement(item);
        option.addEventListener('click', setOptionSelected);
      });
    }
  }

  setOptionSelected(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    const selectItem = utils.getParent(t, 'select');
    const header = selectItem.querySelector('.select__head');
    const selected = t;

    const changes = utils.getParent(t, 'select').classList[1].split('_');

    const statusChanges = changes[changes.length - 1];

    header.querySelector('.select-head__placeholder').innerText = selected.innerText.trim();
    header.setAttribute('data-code', selected.getAttribute('data-code'));
    header.style.width = '100%';
    header.style.transform = 'translate(0, 0)';

    selectItem.className = 'select select-deal__status';

    selectItem.classList.add(`deal-status__form_${selected.getAttribute('data-code')}`);

    const data = {
      id: utils.getParent(t, 'platform-table__row').getAttribute('data-deal'),
      code: t.getAttribute('data-code'),
      status: t.getAttribute('value'),
      statusChanges,
    };

    dealAPI.changeDealStatus(data).then(() => {
      this.closeOthersSelect();
    });
  }
}

export default SelectHover;
