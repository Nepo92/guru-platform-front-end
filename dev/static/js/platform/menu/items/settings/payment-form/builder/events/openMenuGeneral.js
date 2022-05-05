class OpenMenuGeneral {
  clearMenu(props) {
    this.clearFormTypes(props);
  }

  clearFormTypes(props) {
    const { menu } = props;

    const formsTypes = Array.from(menu.querySelectorAll('[form-choice]'));

    if (formsTypes.length) {
      formsTypes.forEach((item) => {
        item.checked = false;
      });

      const withChoice = formsTypes.filter((el) => el.getAttribute('data-type') === 'with-choice')[0];

      if (withChoice) {
        withChoice.checked = true;
        withChoice.setAttribute('checked', '');
      }
    }
  }
}

export default OpenMenuGeneral;
