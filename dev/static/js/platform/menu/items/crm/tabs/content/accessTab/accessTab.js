import AccessEvents from './events/accessEvents.js';
import RenderAccess from './render/render.js';

const accessEvents = new AccessEvents();
const renderAccess = new RenderAccess();

class AccessTab {
  init(tabPack) {
    const render = renderAccess.render(tabPack);

    render.then(() => {
      const items = [accessEvents];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(tabPack);
      });
    });
  }
}

export default AccessTab;
