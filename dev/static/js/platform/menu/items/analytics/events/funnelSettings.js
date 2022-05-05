import Utils from '../../../../utils/utils.js';

const utils = new Utils();

class FunnelSettings {
  init() {
    const settingsBtn = document.querySelector('.top-nav__item_active')?.querySelector('.theme-setting__tab-settings');

    if (settingsBtn) {
      const menu = document.querySelector('[js-menu-funnel-setting]');

      const openSettings = this.openSettings.bind(this, menu);

      const settings = utils.setCloneElement(settingsBtn);
      settings.addEventListener('click', openSettings);

      const closeSettings = document.querySelector('[js-menu-funnel-setting-close-btn]');

      if (closeSettings) {
        const close = this.closeSettings.bind(this, menu);
        closeSettings.addEventListener('click', close);
      }
    }
  }

  openSettings(menu) {
    utils.openModalAnimation(menu, true);
  }

  closeSettings(menu) {
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, false);
  }
}

export default FunnelSettings;
