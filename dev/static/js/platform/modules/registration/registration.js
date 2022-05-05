import ChangePaymentMenu from './events/changeMenu/changePaymentMenu.js';

const changePaymentMenu = new ChangePaymentMenu();

class Registration {
  init(props) {
    this.listenerToMargin(props);

    const idCompany = document.querySelector('[id-company]');

    if (idCompany) {
      idCompany.value = props.pack.form.idCompany;
    }

    const listenerToMargin = this.listenerToMargin.bind(this, props);

    window.onresize = listenerToMargin;

    const items = [changePaymentMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  listenerToMargin() {
    const name = document.querySelector('.tariff__name--value');

    if (name) {
      const wrapperWidth = document.body.clientWidth - 100;

      let width;

      if (document.body.clientWidth > 411 && document.body.clientWidth < 611) {
        width = document.body.clientWidth - 100 - 140 - 145;
      } else {
        width = wrapperWidth - 100;
      }

      if (wrapperWidth - name.clientWidth < width) {
        name.style.marginLeft = '0';
      } else {
        name.style.marginLeft = '5px';
      }
    }
  }
}

export default Registration;
