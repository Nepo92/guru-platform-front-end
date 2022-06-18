import BannerDefault from './events/bannerDefault.js';
import SaveBanner from './events/saveBanner.js';
import BannersRemove from './events/bannersRemove.js';
import SearchBanner from './events/searchBanner.js';
import BannersModal from './events/bannersModal';

const bannerDefault = new BannerDefault();
const saveBanner = new SaveBanner();
const bannersRemove = new BannersRemove();
const searchBanner = new SearchBanner();
const bannersModal = new BannersModal();

class Banner {
  init(props) {
    const items = [
      bannerDefault,
      saveBanner,
      bannersRemove,
      searchBanner,
      bannersModal,
    ];

    props.banners$ = new Banner();

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default Banner;
