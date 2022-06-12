import ClientCard from '../../../menu/items/crm/clientCard/clientCard.js';
import DealCard from '../../../menu/items/crm/dealCard/dealCard.js';
import Monitor from '../../../menu/items/monitor/monitor.js';
import Filter from '../../../modules/filter/filter.js';
import DealRowEvents from '../../../menu/items/crm/dealRow/dealRowEvents.js';
import Funnel from '../../../menu/items/settings/funnel/funnel.js';
import Banner from '../../../menu/items/settings/banner/banner.js';
import PaymentForm from '../../../menu/items/settings/payment-form/payment-form.js';
import Analytics from '../../../menu/items/analytics/analytics.js';
import Downloads from '../../../modules/downloads/downloads.js';
import BillTemplates from '../../../menu/items/settings/bill-templates/billTemplates.js';
import ClientCleaner from '../../../menu/items/settings/client-cleaner/clientCleaner.js';
import SearchClient from '../../../menu/items/crm/searchClient/searchClient.js';
import ISettingsContracts from '../../../menu/items/settings/contracts/interface/iSettingsContracts.js';
import ContentManager from '../../../contentManager/contentManager.js';
import Motivation from '../../../menu/items/team/motivation/motivation.js';
import Actions from '../../../menu/items/team/actions/actions.js';
import Companies from '../../../menu/items/settings/companies/companies.js';
import IPlan from '../../../menu/items/settings/plan/iPlan.js';
import Finance from '../../../menu/items/finance/finance.js';

const clientCard = new ClientCard();
const dealCard = new DealCard();
const monitor = new Monitor();
const filter = new Filter();
const dealRowEvents = new DealRowEvents();
const funnel = new Funnel();
const banner = new Banner();
const paymentForm = new PaymentForm();
const analytics = new Analytics();
const downloads = new Downloads();
const billTemplates = new BillTemplates();
const clientCleaner = new ClientCleaner();
const searchClient = new SearchClient();
const iSettingsContracts = new ISettingsContracts();
const motivation = new Motivation();
const actions = new Actions();
const companies = new Companies();
const iPlan = new IPlan();
const finance = new Finance();

class AdminEvents {
  init(props) {
    const items = [
      clientCard,
      dealCard,
      monitor,
      filter,
      dealRowEvents,
      funnel,
      analytics,
      downloads,
      banner,
      paymentForm,
      billTemplates,
      clientCleaner,
      searchClient,
      iSettingsContracts,
      motivation,
      actions,
      companies,
      iPlan,
      finance,
    ];

    props.rowEventsObs = dealRowEvents;
    props.clientCardObs = clientCard;
    props.rerenderContent = new ContentManager();

    items.forEach((item) => {
      item.init(props);
    });
  }
}

export default AdminEvents;
