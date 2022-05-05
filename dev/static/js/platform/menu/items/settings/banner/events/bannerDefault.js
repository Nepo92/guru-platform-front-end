import Utils from '../../../../../utils/utils.js';
import BannerTemplates from '../templates/bannersTemplates.js';
import BannerPreloader from './bannerPreloader.js';

const utils = new Utils();
const bannerTemplates = new BannerTemplates();
const bannerPreloader = new BannerPreloader();

class BannerDefault {
  init(props) {
    const wrapper = document.querySelector('.banner__files');

    if (wrapper) {
      utils.removeChildren(wrapper);

      this.setBanners(props);
      this.setEmptyBanners(props, wrapper);

      bannerPreloader.init(props);
    }
  }

  setBanners(props) {
    const chekList = document.querySelector('.managment__checklist');

    if (chekList) {
      chekList.remove();
    }

    const { pack } = props;
    const { banners } = pack;

    if (!banners.length && chekList) {
      chekList.remove();
    } else if (banners.length) {
      this.renderBannersList(banners);
    }
  }

  renderBannersList(banners) {
    const wrapper = document.querySelector('.banner__managment');

    const wrapperCheckList = document.createElement('div');
    wrapperCheckList.classList.add('managment__checklist');

    wrapper.appendChild(wrapperCheckList);

    const bannerCheckList = document.createElement('ul');
    bannerCheckList.classList.add('banner__checklist');
    bannerCheckList.classList.add('custom-scroll');

    const search = document.createElement('div');
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Поиск баннера...');
    searchInput.classList.add('banner__search');
    searchInput.classList.add('banner-preview');

    search.appendChild(searchInput);
    wrapperCheckList.appendChild(search);

    wrapperCheckList.appendChild(bannerCheckList);

    const sortedBanners = banners.sort((a, b) => b.id - a.id);

    const check = document.querySelector('.banner__checklist');

    sortedBanners.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.innerText = item.name;
      listItem.classList.add('banner__checklist-item');
      listItem.setAttribute('data-id', item.id);
      listItem.innerHTML = bannerTemplates.getListItemTemplate(item);

      check.appendChild(listItem);
    });
  }

  setEmptyBanners(props, wrapper) {
    const link = document.querySelector('.banner__link');
    link.value = '';

    const name = document.querySelector('.banner__name');
    name.value = '';

    const addBanner = document.querySelector('.banner__save');
    addBanner.classList.remove('disabled');

    wrapper.innerHTML = bannerTemplates.emptyBanners();
  }
}

export default BannerDefault;
