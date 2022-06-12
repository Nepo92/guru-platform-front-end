import AdvertiserEvents from './events/advertiserEvents.js';

const advertiserEvents = new AdvertiserEvents();

class Advertiser {
  init(props) {
    const items = [advertiserEvents];

    items.forEach((item) => {
      item.init(props);
    });
  }
}

export default Advertiser;
