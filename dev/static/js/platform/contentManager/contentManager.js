import Utils from '../utils/utils.js';
import DealTemplates from '../menu/items/crm/dealCard/templates/templates.js';
import FunnelTemplates from '../menu/items/settings/funnel/templates/funnelTemplates.js';
import PaymentFormTemplates from '../menu/items/settings/payment-form/templates/paymentFormTemplates.js';
import BillTemplatesTemplates from '../menu/items/settings/bill-templates/templates/billTemplatesTemplates.js';
import IContractTemplate from '../menu/items/settings/contracts/interface/iTemplates/iContractsTemplates.js';
import LessonConstructor from '../menu/items/products/courses/lessonConstuctor.js';
import Courses from '../menu/items/products/courses/courses.js';
import Marketing from '../menu/items/marketing/marketing.js';
import SMSChecks from '../menu/items/crm/checks/checks.js';
import Actions from '../menu/items/team/actions/actions.js';
import PaymentMethods from '../menu/items/settings/payment-methods/paymentMethods.js';
import Homework from '../menu/items/products/homework/homework.js';
import Control from '../menu/items/control/control.js';
import PlanRender from '../menu/items/settings/plan/render/planRender.js';

const dealTemplates = new DealTemplates();
const funnelTemplates = new FunnelTemplates();
const payFormTemplates = new PaymentFormTemplates();
const utils = new Utils();
const billTemplatesTemplates = new BillTemplatesTemplates();
const interfaceCTemplate = new IContractTemplate();
const courses = new Courses();
const lessonConstuctor = new LessonConstructor();
const marketing = new Marketing();
const smsChecks = new SMSChecks();
const actions = new Actions();
const paymentMethods = new PaymentMethods();
const homework = new Homework();
const control = new Control();
const planRender = new PlanRender();

const DEALS = 'deals';
const TRANSACTIONS = 'transactions';
const HEAD_MANAGER_TRANSACTIONS = 'head-manager-transactions';
const PAYMENT_FORM_BUILDER = 'payment-form-builder';
const FUNNELS = 'funnels';
const PUBLIC_REGISTRATION = 'public-registration';
const PAYMENT_FORM_PUBLIC = 'payment-form-public';
const BILL_PATTERN = 'bill-pattern';
const SETTINGS_CONTRACTS = 'settings-contracts';
const COURSES = 'courses';
const A_ADVERTISING = 'a-advertising';
const SMS_CHECKS = 'sms-checks';
const ACTIONS = 'actions';
const COMMON_PLANS = 'common-plans';
const PAYMENT_METHOD = 'payment-method';
const HOMEWORK = 'homework';
const RATING = 'rating';
const LINKS = 'links';

class ContentManager {
  async init(data) {
    const page = utils.getPage();
    const prePage = utils.getPage(2);

    await this.checkPage(page, data);
    await this.checkPrePage(prePage, data);
  }

  async checkPage(page, data) {
    switch (page) {
      case COMMON_PLANS: {
        planRender.init(data);

        break;
      }
      case RATING: {
        control.init();
        break;
      }
      case HOMEWORK: {
        homework.init();
        break;
      }
      case PAYMENT_METHOD: {
        paymentMethods.init();
        break;
      }
      case ACTIONS: {
        actions.init();
        break;
      }
      case SMS_CHECKS: {
        smsChecks.init();
        break;
      }
      case LINKS:
      case A_ADVERTISING: {
        marketing.init(data);
        break;
      }
      case COURSES: {
        if (data.pack.role === 'ROLE_ADMIN') {
          courses.init();
          lessonConstuctor.init();
        } else {
          homework.init();
        }
        break;
      }
      case DEALS:
      case TRANSACTIONS:
      case HEAD_MANAGER_TRANSACTIONS: {
        const setDealRow = this.setDealRowToCRM.bind(this);
        await setDealRow(data);
        break;
      }
      case PAYMENT_FORM_BUILDER: {
        const setPaymentForms = this.setPaymentForms.bind(this);
        await setPaymentForms(data);
        break;
      }
      case FUNNELS: {
        const setFunnelsToPage = this.setFunnelsToPage.bind(this);
        await setFunnelsToPage(data);
        break;
      }
      case BILL_PATTERN: {
        const billTemplates = billTemplatesTemplates.setBillTemplates.bind(billTemplatesTemplates);

        await billTemplates(data);
        break;
      }
      case SETTINGS_CONTRACTS: {
        const contractTemplates = interfaceCTemplate.setContract.bind(interfaceCTemplate);

        await contractTemplates(data);
        break;
      }
      default: {
        break;
      }
    }
  }

  async checkPrePage(prePage, data) {
    switch (prePage) {
      case PUBLIC_REGISTRATION: {
        const setRegistrationForm = this.setRegistrationForm.bind(this);

        await setRegistrationForm(data, true);
        break;
      }
      case PAYMENT_FORM_PUBLIC: {
        const setPaymentFormPublic = this.setPaymentFormPublic.bind(this);
        await setPaymentFormPublic(data);
        break;
      }
      default: {
        break;
      }
    }
  }

  async setDealRowToCRM(data) {
    const renderDealRows = await dealTemplates.renderDealRows.bind(dealTemplates);

    return renderDealRows(data);
  }

  async setPaymentForms(data) {
    const renderPaymentForms = await payFormTemplates.renderPaymentForms.bind(payFormTemplates);

    return renderPaymentForms(data);
  }

  async setFunnelsToPage(data) {
    const renderFunnels = await funnelTemplates.renderFunnels.bind(funnelTemplates);

    return renderFunnels(data);
  }

  async setRegistrationForm(data) {
    const setRegistration = await payFormTemplates.setRegistrationTemplate.bind(payFormTemplates);

    return setRegistration(data, true);
  }

  async setPaymentFormPublic(data) {
    const paymentFormPublic = await payFormTemplates.setRegistrationTemplate.bind(payFormTemplates);

    return paymentFormPublic(data, false);
  }

  async setBillPattern(data) {
    const paymentFormPublic = await payFormTemplates.setRegistrationTemplate.bind(payFormTemplates);

    return paymentFormPublic(data, false);
  }
}

export default ContentManager;
