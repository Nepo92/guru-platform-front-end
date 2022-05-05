import PaymentForm from '../menu/items/settings/payment-form/payment-form.js';

const paymentForm = new PaymentForm();

class User {
  init(props) {
    const items = [paymentForm];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  showPagination(props) {
    const { pack } = props;
    const { items } = pack;

    if (items) {
      const { pagesAvailable } = items;

      if (pagesAvailable > 1) {
        const pagination = document.querySelector('.pagination');

        if (pagination) {
          pagination.className = 'platform__pagination pagination';
        }
      }
    }
  }
}

export default User;
