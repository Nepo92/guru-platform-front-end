import Utils from '../../../../utils/utils.js';
import { monitorAPI } from '../../../../api/api.js';

const utils = new Utils();

class MonitorBackground {
  init(props) {
      /* Настраиваем бэкграунд монитора */
      const monitorSettingsBtn = document.querySelector('[js-update-background]');

      const monitorSettingsMenu = document.querySelector('[js-menu-update-background]');

      if (monitorSettingsMenu) {
          if (monitorSettingsBtn) {
              const changeBackground = this.changeBackground.bind(this, monitorSettingsMenu, props);
              monitorSettingsBtn.addEventListener('click', changeBackground);
          }

          /* Закрываем меню обновления фона монитора */
          const closeBtn = monitorSettingsMenu.querySelector('[js-menu-update-background-close-btn]');

          const closeMonitorUpdate = this.closeMonitorUpdate.bind(this, monitorSettingsMenu);
          closeBtn.addEventListener('click', closeMonitorUpdate);

          /* Сохраняем новый фон */
          const saveBtn = monitorSettingsMenu.querySelector('[js-save-background]');

          const saveBackground = this.saveBackground.bind(this, monitorSettingsMenu, props);
          const save = utils.setCloneElement(saveBtn);
          save.addEventListener('click', saveBackground);
      }
  }

  closeMonitorUpdate(menu, button) {
      const wrapper = menu.querySelector('.platform-modal__wrapper');

      utils.closeModalAnimation(menu, wrapper, false, false, false, button);
  }

  saveBackground(menu, props, e) {
      const t = e.target;

      const data = {
          idCompany: props.pack.filter.idCompany,
          color: menu.querySelector('[name="color"]').value,
      };

      const changeBackground = monitorAPI.changeBackground(data);
      utils.showLoader();

      t.style.pointerEvents = 'none';

      changeBackground.then(
          () => {
              const monitor = document.querySelector('body');

              monitor.style.backgroundColor = `${data.color}`;

              this.closeMonitorUpdate(menu, t);
              document.body.style.overflow = 'auto';
              utils.hideLoader();
              t.style.pointerEvents = 'all';
          },
          () => {
              utils.hideLoader();
              t.style.pointerEvents = 'all';
              document.body.style.overflow = 'auto';
          },
          );
  }

  changeBackground(menu, props) {
      const data = {
          id: props.pack.filter.idCompany,
      };

      const openMenu = monitorAPI.getCompanyBg(data);

      openMenu.then((bgData) => {
          utils.hideLoader();

          const background = menu.querySelector('[background-color]');
          background.value = bgData.color;

          utils.openModalAnimation(menu, true);
      });
  }
}

export default MonitorBackground;
