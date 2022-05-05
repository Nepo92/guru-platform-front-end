import ClientCardEvents from './clientCardEvents.js';
import AfterUpdateInfo from './events/changeClientObserver/changeClientObserver.js';

const clientCardEvents = new ClientCardEvents();
const afterUpdateInfo = new AfterUpdateInfo();

class ClientCard {
  init(clientCardData) {
    const {
      pack,
      client,
      clientObs,
      user,
      clientCardObs,
      rowEventsObs,
      rerenderContent,
    } = clientCardData;

    const props = {
      pack,
      menu: document.querySelector('[js-menu-client-card]'),
      client,
      defaultTab: 'Сделки',
      activeTab: 'Сделки',
      clientObs,
      user,
      clientCardObs,
      rowEventsObs,
      rerenderContent,
    };

    const events = this.events.bind(this);

    events(props);
  }

  events(clientCardPack) {
    const setEvents = clientCardEvents.init.bind(clientCardEvents);

    if (!clientCardPack.clientObs) {
      clientCardPack.clientObs = afterUpdateInfo;
    }

    setEvents(clientCardPack);
  }
}

export default ClientCard;
