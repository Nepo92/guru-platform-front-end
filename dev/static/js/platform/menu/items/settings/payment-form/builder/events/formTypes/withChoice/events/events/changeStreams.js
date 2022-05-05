import Utils from '../../../../../../../../../../utils/utils.js';
import PaymentFormTemplates from '../../../../../../templates/paymentFormTemplates.js';
import Select from '../../../../../../../../../../modules/select/select.js';
import { dealAPI } from '../../../../../../../../../../api/api.js';

const utils = new Utils();
const paymentFormTemplates = new PaymentFormTemplates();
const select = new Select();

class ChangeStreams {
  init(props) {
    const { menu } = props;

    this.defaultStreams(props);

    const changeDateBtns = menu.querySelectorAll('[streams-choice]');

    if (changeDateBtns.length) {
      const change = this.changeDate.bind(this, props);

      changeDateBtns.forEach((item) => {
        const changeBtn = utils.setCloneElement(item);
        changeBtn.addEventListener('change', change);
      });
    }
  }

  defaultStreams(props) {
    const { menu, currentForm } = props;

    if (currentForm) {
      const dateType = Array.from(menu.querySelectorAll('[streams-choice]'));

      if (dateType.length) {
        dateType.forEach((item) => {
          item.checked = false;
        });

        const oneDate = dateType.filter((el) => el.getAttribute('data-type') === 'one-date')[0];
        oneDate.checked = true;
      }

      if (currentForm.streams?.length > 1) {
        const multiplyDate = dateType.filter((el) => el.getAttribute('data-type') === 'multiply-date')[0];
        multiplyDate.checked = true;

        props.dateType = 'multiply-date';
        this.changeDate(props);
      } else {
        props.dateType = 'one-date';
        this.changeDate(props);
      }
    } else {
      const choice = menu.querySelectorAll('[streams-choice]');

      if (choice.length) {
        const selected = Array.from(choice).filter((el) => el.checked)[0];

        if (selected) {
          const type = selected.getAttribute('data-type');
          props.dateType = type;
          this.changeDate(props);
        }
      }
    }
  }

  changeDate(props, e) {
    const { menu } = props;
    let dateType;

    if (e) {
      const t = e.target;

      dateType = t.getAttribute('data-type');
    } else {
      dateType = props.dateType;
    }

    props.dateType = dateType ?? props.dateType;

    const formData = new FormData();
    formData.set('idCourse', +menu.querySelector('[data-select-type="select-product"] [id-selected]').value);

    dealAPI.getStreams(formData).then((streams) => {
      props.pack.streams = streams;

      if (props.pack.streams?.length) {
        switch (props.dateType) {
          case 'one-date': {
            this.oneDateMode(props);
            break;
          }
          case 'multiply-date': {
            this.multiDateMode(props);
            break;
          }
          default: {
            break;
          }
        }
      } else {
        const wrapper = menu.querySelector('.payment-form__date-wrapper');
        utils.removeChildren(wrapper);

        wrapper.classList.remove('full');
      }
    });
  }

  oneDateMode(props) {
    const { menu, pack } = props;
    const { streams } = pack;

    const wrapper = menu.querySelector('.payment-form__date-wrapper');

    if (streams.length) {
      if (wrapper) {
        utils.removeChildren(wrapper);
        wrapper.classList.add('full');

        streams.forEach((item) => {
          const div = document.createElement('div');
          div.classList.add('payment-form__date');
          div.innerHTML = paymentFormTemplates.startDateCheckbox(item);

          wrapper.appendChild(div);
        });

        this.checkSelectedStream(props);
      }
    } else if (!streams.length) {
      if (wrapper) {
        wrapper.classList.remove('full');
      }
    }
  }

  checkSelectedStream(props) {
    const { menu, currentForm } = props;

    const streamsCb = menu.querySelectorAll('[one-date-select]');

    if (currentForm) {
      streamsCb.forEach((item) => {
        if (+item.getAttribute('data-id') === currentForm?.streams[0]?.id) {
          item.checked = true;
        }
      });
    }
  }

  multiDateMode(props) {
    const { menu, currentForm, pack } = props;
    const { streams } = pack;
    const wrapper = menu.querySelector('.payment-form__date-wrapper');

    if (streams.length) {
      if (wrapper) {
        utils.removeChildren(wrapper);

        wrapper.classList.add('full');

        const div = document.createElement('div');
        div.classList.add('form__angle');
        div.setAttribute('select-here', '');
        div.setAttribute('data-select-type', 'select-multiply-date');
        div.innerHTML = paymentFormTemplates.startDateWihChoice();

        wrapper.appendChild(div);

        const optionsProps = {
          streams,
          menu,
          currentForm,
          props,
        };

        this.setOptionToDateSelect(optionsProps);
      }
    } else if (!streams?.length) {
      if (wrapper) {
        wrapper.classList.remove('full');
      }
    }
  }

  setOptionToDateSelect(optionsProps) {
    const {
      menu,
      props,
    } = optionsProps;

    const selectBody = menu.querySelector('[data-select-type="select-multiply-date"]');

    const streamCounter = props.currentForm ? props.currentForm.streams?.length : null;

    props.selectsArray = [
      {
        mode: 'custom',
        required: true,
        placeholder: 'Выберите количество дат',
        openUp: false,
        item: selectBody,
        type: 'select-multiply-date',
        defaultValue: streamCounter,
        defaultPlaceholder: streamCounter,
      },
    ];

    select.init(props);
  }
}

export default ChangeStreams;
