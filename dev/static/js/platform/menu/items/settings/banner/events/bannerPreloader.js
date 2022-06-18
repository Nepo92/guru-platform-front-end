import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class BannerPreloader {
  init(props) {
    const desktopInput = document.querySelector('#banner-desktop');
    const mobileInput = document.querySelector('#banner-mobile');

    const items = [desktopInput, mobileInput];

    props.removePreloader = this.removePreloader.bind(this);

    const addPreloader = this.addPreloader.bind(this, props);

    items.forEach((item) => {
      if (item) {
        const input = utils.setCloneElement(item);
        input.addEventListener('change', addPreloader);
      }
    });
  }

  addPreloader(props, e) {
    const t = e.target;

    if (t.value) {
      const tmpPath = URL.createObjectURL(t.files[0]);

      const a = document.createElement('a');
      a.setAttribute('data-fancybox', t.value.split('\\').pop());

      const img = document.createElement('img');
      img.classList.add('banner__img');
      img.setAttribute('src', tmpPath);

      const remove = document.createElement('span');
      remove.classList.add('banner__remove-preloader');

      const wrapper = utils.getParent(t, 'platform-form__item');

      const label = wrapper.querySelector('label');

      if (label) {
        label.remove();
      }

      const image = wrapper.querySelector('img');

      if (image) {
        image.remove();
      }

      wrapper.appendChild(img);
      wrapper.appendChild(remove);

      remove.addEventListener('click', props.removePreloader);
    }
  }

  removePreloader(e) {
    const t = e.target;
    const wrapper = utils.getParent(t, 'platform-form__item');
    const img = wrapper.querySelector('img');
    img.remove();

    const input = wrapper.querySelector('input');
    input.value = '';
    const type = input.getAttribute('id');

    const label = document.createElement('label');
    label.setAttribute('for', type);
    label.classList.add('platform__label');
    label.classList.add('banner__label');

    const span = document.createElement('span');
    span.classList.add('banner__icon');

    if (type === 'banner-desktop') {
      label.innerText = 'Загрузить десктоп версию 1180х350';
    } else {
      label.innerText = 'Загрузить мобильную версию 640х440';
    }

    label.appendChild(span);

    wrapper.appendChild(label);
    t.remove();
  }
}

export default BannerPreloader;
