import Utils from '../../../../utils/utils.js';
import { clientCleanerAPI } from '../../../../api/api.js';
import CleanerRender from './render/cleanerRender.js';
import JoinClient from './events/joinClient.js';
import RemoveClient from './events/removeClient.js';
import OpenCoincedence from './events/openCoincedence.js';

const utils = new Utils();
const cleanerRender = new CleanerRender();
const joinClient = new JoinClient();
const removeClient = new RemoveClient();
const openCoincedence = new OpenCoincedence();

class ClientCleaner {
  init(props) {
    const cleanerProps = this.getProps(props);

    const startSearch = document.querySelector('.cleaner-nav__list');

    if (startSearch) {
      cleanerProps.joinArray = [];

      const start = utils.setCloneElement(startSearch);

      start.addEventListener('change', (e) => {
        const t = e.target;

        if (t.classList.contains('cleaner__checkbox')) {
          this.searchRequest(cleanerProps, t);
        }
      });
    }
  }

  searchRequest(props, t) {
    const checkboxs = document.querySelectorAll('.cleaner__checkbox');
    const data = Array.from(checkboxs).find((el) => el.checked)?.value;

    if (data) {
      const getCopies = clientCleanerAPI.getCopies(data);

      t.style.pointerEvents = 'none';

      const loader = setTimeout(utils.showLoader, 400);

      getCopies.then((copies) => {
        clearTimeout(loader);
        utils.hideLoader();

        t.style.pointerEvents = 'all';
        this.afterGetData(props, copies);
      }, () => {
        t.style.pointerEvents = 'all';
      });
    }
  }

  getProps(props) {
    return {
      ...props,
    };
  }

  afterGetData(props, copies) {
    props.copies = utils.getDeepCopy(copies);
    const render = cleanerRender.init(props);

    render.then(() => {
      this.setEvents(props);
    });
  }

  setEvents(props) {
    const wrapper = document.querySelector('[cleaner-list]');

    if (wrapper) {
      const container = utils.setCloneElement(wrapper);

      const dispatchEvents = this.dispatchEvents.bind(this, props);

      container.addEventListener('click', dispatchEvents);
    }
  }

  dispatchEvents(props, e) {
    const t = e.target;

    const open = utils.getParent(t, 'coincedence__item') || t.hasAttribute('coincedence') ? 'open' : '';
    const remove = t.classList.contains('coincedence-client__remove') ? 'remove' : '';
    const join = utils.getParent(t, 'coincedence-client__item') && !t.classList.contains('remove') ? 'join' : '';

    const button = open || remove || join;

    switch (button) {
      case 'open': {
        openCoincedence.init(props, t);
        break;
      }
      case 'remove': {
        removeClient.init(props, t);
        break;
      }
      case 'join': {
        joinClient.init(props, t);
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default ClientCleaner;
