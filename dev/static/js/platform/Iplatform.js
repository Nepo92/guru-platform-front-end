import '../../css/platform/platform.scss';
import PageData from './utils/pageData/pageData.js';
import state from './store/store.js';

const pageData = new PageData();

const LOGIN = 'login';
const BILL_PAYMENT = 'bill-payment';
const PUBLIC_REGISTRATION = 'public-registration';
const PAYMENT_FORM_PUBLIC = 'payment-form-public';

class Router {
  init(props) {
    const page = pageData.getPage();

    props.page = page;

    const modules = this.#getModules;

    const currentModule = modules.find((el) => el.page === page);

    if (currentModule) {
      currentModule.getModule().then((module) => {
        module.default.prototype.init(props);
      });
    } else {
      const platform = modules.find((el) => el.page === null);

      platform.getModule().then((module) => {
        module.default.prototype.init(props);
      });
    }
  }

  get #getModules() {
    return [
      {
        page: LOGIN,
        getModule() {
          return import('./modules/login/Ipassword.js');
        },
      },
      {
        page: BILL_PAYMENT,
        getModule() {
          return import('./modules/bill-payment/bill-payment.js');
        },
      },
      {
        page: PUBLIC_REGISTRATION,
        getModule() {
          return import('./modules/registration/registration.js');
        },
      },
      {
        page: PAYMENT_FORM_PUBLIC,
        getModule() {
          return import('./menu/items/settings/payment-form/public/public.js');
        },
      },
      {
        page: null,
        getModule() {
          return import('./platform.js');
        },
      },
    ];
  }
}

const router = new Router();

state.then((props) => {
  router.init(props);
});
