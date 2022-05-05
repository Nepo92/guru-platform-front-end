import ChooseFormType from '../../chooseFormType.js';

const chooseFormType = new ChooseFormType();

class SetData {
  init(props) {
    const { menu, currentForm } = props;
    props.isChanged = false;

    this.setType(props);

    const items = [chooseFormType];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });

    if (menu && currentForm) {
      const name = menu.querySelector('[payment-form-name]');
      name.value = currentForm.name;
    }
  }

  setType(props) {
    const { currentForm, menu } = props;

    const forms = Array.from(menu.querySelectorAll('[form-choice]'));

    forms.forEach((item) => {
      item.checked = false;
      item.removeAttribute('checked');
    });

    if (currentForm.withChoice) {
      const type = forms.filter((el) => el.getAttribute('data-type') !== 'without-choice')[0];
      type.checked = true;
    }

    if (!currentForm.withChoice) {
      const type = forms.filter((el) => el.getAttribute('data-type') !== 'with-choice')[0];
      type.checked = true;
    }
  }
}

export default SetData;
