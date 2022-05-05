import SetClientIcons from './events/setClientIcons.js';
import CopyLink from './events/copyLink.js';
import GoLink from './events/goLinks.js';

const setClientIcons = new SetClientIcons();
const copyLink = new CopyLink();
const goLink = new GoLink();

class ClientIcons {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const setEvents = this.setEvents.bind(this);
    setEvents(props);
  }

  setEvents(props) {
    const clientEventsData = {
      ...props,
    };

    const items = [setClientIcons, copyLink, goLink];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(clientEventsData);
    });
  }
}

export default ClientIcons;
