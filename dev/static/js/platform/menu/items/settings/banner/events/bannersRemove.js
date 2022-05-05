import { bannerAPI } from '../../../../../api/api.js';
import Utils from '../../../../../utils/utils.js';
import Popup from '../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class BannersRemove {
  init(props) {
    const removeBtn = document.querySelectorAll('.checklist-item__remove');

    if (removeBtn) {
      const deleteBanner = this.deleteBannerPopup.bind(this, props);

      removeBtn.forEach((item) => {
        const remove = utils.setCloneElement(item);
        remove.addEventListener('click', deleteBanner);
      });
    }
  }

  deleteBannerPopup(props, e) {
    const t = e.target;

    props.target = t;

    const removeBanner = this.removeBanner.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить этот баннер?',
      settings: null,
      title: null,
      ok: removeBanner,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  removeBanner(props) {
    const { target, pack } = props;
    const { company } = pack;
    const { id } = company;

    const idBanner = +utils.getParent(target, 'banner__checklist-item').getAttribute('data-id');
    const remove = bannerAPI.removeBanner(idBanner);

    remove.then(() => {
      const bannerItems = Array.from(document.querySelectorAll('.banner__checklist-item'));
      const removedItem = bannerItems.filter((el) => +el.getAttribute('data-id') === idBanner)[0];

      if (removedItem) {
        removedItem.remove();
      }

      const getBanners = bannerAPI.getBanners(id);

      getBanners.then((banners) => {
        if (!banners.length) {
          document.querySelector('.banner__checklist')?.remove();
        }

        props.pack.banners = banners;
        props.banners$.init(props);
      });
    });
  }
}

export default BannersRemove;
