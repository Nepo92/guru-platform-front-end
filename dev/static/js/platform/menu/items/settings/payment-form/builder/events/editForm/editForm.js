import Utils from '../../../../../../../utils/utils.js';
import OpenMenuGeneral from '../openMenuGeneral.js';
import { paymentFormAPI } from '../../../../../../../api/api.js';
import SetData from './events/setData.js';
import EditForm from './events/editForm.js';

const utils = new Utils();
const setData = new SetData();
const editForm = new EditForm();

class EditPaymentForm extends OpenMenuGeneral {
  init(props) {
    const forms = document.querySelectorAll('.payment-form');

    if (forms.length) {
      const openMenu = this.openMenu.bind(this, props);

      forms.forEach((item) => {
        item.addEventListener('click', openMenu);
      });
    }
  }

  openMenu(props, e) {
    const t = e.target;

    const icons = ['payment-form__cut', 'payment-form__copy'];

    if (icons.includes(t.classList[0])) return false;

    e.preventDefault();
    e.stopPropagation();

    const { menu } = props;
    props.target = t;

    menu.querySelector('.menu-header__title').innerText = 'Редактировать форму оплаты';
    menu.querySelector('[js-save-form]').innerText = 'Редактировать форму';

    this.clearMenu(props);

    utils.openModalAnimation(menu, true);

    const data = utils.getParent(t, 'payment-form') ? +utils.getParent(t, 'payment-form').getAttribute('data-id') : +t.getAttribute('data-id');

    paymentFormAPI.getPaymentForm(data).then((form) => {
      props.currentForm = form;
      props.isPaymentForm = true;
      props.isChangedProduct = false;

      const items = [setData, editForm];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }
}

export default EditPaymentForm;
