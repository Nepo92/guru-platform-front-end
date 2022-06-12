import Analytics from '../../../menu/items/analytics/analytics';
import Filter from '../../../modules/filter/filter';
import ContentManager from '../../../contentManager/contentManager';

const analytics = new Analytics();
const filter = new Filter();
const contentManager = new ContentManager();

class AdvertiserEvents {
  init(props) {
    const items = [contentManager, analytics, filter];

    items.forEach((item) => {
      item.init(props);
    });
  }
}

export default AdvertiserEvents;
