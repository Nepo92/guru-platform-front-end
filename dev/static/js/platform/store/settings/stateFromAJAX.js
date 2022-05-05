import {
  dealAPI,
  paymentFormAPI,
  bannerAPI,
  billTemplateAPI,
  contractAPI,
} from '../../api/api.js';
import Utils from '../../utils/utils';

const utils = new Utils();

const DEALS = 'deals';
const TRANSACTIONS = 'transactions';
const HEAD_MANAGER_TRANSACTIONS = 'head-manager-transactions';
const FUNNELS = 'funnels';
const PAYMENT_FORM_BUILDER = 'payment-form-builder';
const CLIENTS_LIST = 'clients-list';
const BILLS = 'bills';
const HEAD_MANAGER_BILLS = 'head-manager-bills';
const A_ADVERTISING = 'a-advertising';
const BANNERS_SETTINGS = 'banners-settings';
const PERFORMANCE_ASSESSMENT_RATING = 'rating';
const PERFORMANCE_ASSESSMENT = 'performance-assessment';
const FUNNEL = 'funnel';
const TRAFFIC = 'traffic';
const ADDITIONAL = 'additional';
const BILL_PATTERN = 'bill-pattern';
const PERFORMANCE_ASSESSMENT_DEBATE = 'debate';
const SETTINGS_CONTRACTS = 'settings-contracts';
const HOMEWORK = 'homework';

class StateFromAJAX {
  async createState(props) {
    const { page, html } = props;

    switch (page) {
      case TRANSACTIONS:
      case HEAD_MANAGER_TRANSACTIONS:
      case DEALS:
      case CLIENTS_LIST:
      case BILLS:
      case HEAD_MANAGER_BILLS:
      case PERFORMANCE_ASSESSMENT:
      case PERFORMANCE_ASSESSMENT_DEBATE:
      case PERFORMANCE_ASSESSMENT_RATING: {
        const statuses = await dealAPI.getStatuses();
        const paymentMethods = await dealAPI.getPaymentMethods();
        const products = await dealAPI.getCourses();
        const funnels = await dealAPI.getFunnels();
        const social = await dealAPI.getSocials();

        const changeDealStatusName = this.changeDealStatusName.bind(this);

        const dealStatuses = utils.changeDealStatuses(statuses.map(changeDealStatusName));

        this.state = {
          dealStatuses,
          paymentMethods,
          products,
          funnels,
          social,
        };
        break;
      }
      case FUNNELS:
      case FUNNEL:
      case TRAFFIC:
      case ADDITIONAL:
      case A_ADVERTISING: {
        const funnels = await dealAPI.getFunnels();

        this.state = {
          funnels,
        };
        break;
      }
      case PAYMENT_FORM_BUILDER: {
        const products = await dealAPI.getCourses();
        const funnels = await dealAPI.getFunnels();
        const paymentForms = await paymentFormAPI.getPaymentForms();
        const outsideLinks = await paymentFormAPI.getOutsideLinks();
        const paymentMethods = await dealAPI.getPaymentMethods();

        this.state = {
          products,
          funnels,
          paymentForms,
          outsideLinks,
          paymentMethods,
        };
        break;
      }
      case BANNERS_SETTINGS: {
        const { company } = html;
        const { id } = company;

        const banners = await bannerAPI.getBanners(id);
        const products = await dealAPI.getCourses();

        this.state = {
          banners,
          products,
        };
        break;
      }
      case BILL_PATTERN: {
        const templates = await billTemplateAPI.getBillTemplates();

        this.state = {
          templates,
        };
        break;
      }
      case SETTINGS_CONTRACTS: {
        const contracts = await contractAPI.getContracts();
        const typesContracts = await contractAPI.getTypes();

        const contractsData = utils.contractsToArray(contracts);

        this.state = {
          contracts: contractsData,
          typesContracts,
        };
        break;
      }
      case HOMEWORK: {
        if (html.role !== 'ROLE_CURATOR') {
          const paymentMethods = await dealAPI.getPaymentMethods();

          this.state = {
            paymentMethods,
          };
        }
        break;
      }
      default:
        break;
    }
  }

  getState() {
    return this.state;
  }

  changeDealStatusName(item) {
    item.title = item.title === 'Рассрочка' ? 'Долями' : item.title;

    return item;
  }

  changeArrayStatuses(dealStatuses) {
    const status = dealStatuses.concat();
    const unknow = status.splice(status.length - 1, status.length - 1)[0];
    const startArr = status.splice(0, 4);

    startArr.push(unknow);

    status.forEach((item) => {
      startArr.push(item);
    });

    return startArr;
  }
}

export default StateFromAJAX;
