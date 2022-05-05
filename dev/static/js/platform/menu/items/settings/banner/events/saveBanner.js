import Utils from '../../../../../utils/utils.js';
import { bannerAPI } from '../../../../../api/api.js';
import Validation from '../../../../../utils/validation.js';

const utils = new Utils();
const valiadtion = new Validation();

class SaveBanner {
  init(props) {
    const saveBtn = document.querySelector('.banner__save');

    if (saveBtn) {
      const saveBanner = this.saveBanner.bind(this, props);

      const save = utils.setCloneElement(saveBtn);

      save.addEventListener('click', saveBanner);
    }
  }

  saveBanner(props) {
    if (valiadtion.validateCourseBanner()) {
      const { pack } = props;
      const { company } = pack;
      const { id } = company;

      const formData = new FormData();

      const link = document.querySelector('.banner__link').value;
      const name = document.querySelector('.banner__name').value;
      const mobileImg = document.querySelector('#banner-mobile').files[0];
      const mainImg = document.querySelector('#banner-desktop').files[0];

      const data = {
        link,
        idCompany: id,
        name,
      };

      formData.append('banner', new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }));

      formData.append('mobileImg', mobileImg);
      formData.append('mainImg', mainImg);

      const saveBanner = bannerAPI.saveBanner(formData);

      utils.showLoader();

      saveBanner.then(() => {
        const getBanners = bannerAPI.getBanners(id);

        getBanners.then((banners) => {
          utils.hideLoader();

          props.pack.banners = banners;
          props.banners$.init(props);
        });
      });
    }
  }
}

export default SaveBanner;
