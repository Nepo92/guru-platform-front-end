import ValidationWrapper from '../../validationWrapper';

class ValidatePlanFunnel extends ValidationWrapper {
  init(props) {
    const managers = Array.from(document.querySelectorAll('[manager-id]'));
    props.managerCheckboxs = managers;

    const managerIsChoosen = managers.some((el) => el.checked);

    const funnelSelect = document.querySelector('[js-funnel-name]');

    let validate = true;

    if (!managerIsChoosen) {
      validate = false;

      const wrapper = document.querySelector('.plans-funnel__managers-list');

      this.setError(wrapper, 'Выберите хоть одного менеджера');
    }

    if (funnelSelect.value === '0') {
      validate = false;

      this.setError(funnelSelect, 'Выберите воронку');
    }

    return validate;
  }
}

export default ValidatePlanFunnel;
