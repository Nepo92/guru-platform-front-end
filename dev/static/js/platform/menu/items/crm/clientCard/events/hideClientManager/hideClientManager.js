import Popup from '../../../../../../modules/popup/popup.js';
import Utils from '../../../../../../utils/utils.js';
import { clientAPI } from '../../../../../../api/api.js';
import AfterChangeClientHide from './events/afterChangeClientHide.js';

const popup = new Popup();
const utils = new Utils();
const afterChangeClientHide = new AfterChangeClientHide();

class HideClientManager {
  init(props) {
    const { menu, pack, client } = props;
    const { manager } = pack;

    const toggleHide = menu.querySelector('[client-recover]') || menu.querySelector('[client-remove]');

    if (toggleHide) {
      const acces = ['ROLE_MANAGER', 'ROLE_HEAD_MANAGER'];

      if (acces.includes(pack.role) && client?.idManager !== manager?.id) {
        toggleHide.classList.add('hide');
      } else {
        toggleHide.classList.remove('hide');
      }

      if (!toggleHide.classList.contains('hide')) {
        const btn = utils.setCloneElement(toggleHide);

        const changeHideClient = this.changeHideClient.bind(this, props);
        btn.addEventListener('click', changeHideClient);
      }
    }
  }

  changeHideClient(props, e) {
    const t = e.target;

    const popupProps = {
      settings: null,
      title: null,
      cancel: null,
      target: t,
    };

    const propsForHideManager = {
      t,
      props,
      popupProps,
    };

    this.getPopupProps(propsForHideManager);

    popup.init(popupProps);
  }

  getPopupProps(propsForHideManager) {
    const {
      t,
      props,
      popupProps,
    } = propsForHideManager;

    if (t.classList.contains('client-nav__remove')) {
      const removeClientRequest = this.changeClientHide.bind(this, props);

      popupProps.text = 'Вы действительно хотите удалить этого клиента?';
      popupProps.ok = removeClientRequest;
    } else {
      const recoverClientRequest = this.changeClientHide.bind(this, props);

      popupProps.text = 'Вы действительно хотите восстановить этого клиента?';
      popupProps.ok = recoverClientRequest;
    }
  }

  changeClientHide(props) {
    const { client } = props;

    const data = {
      id: client.id,
      hidden: !client.hidden,
    };

    const request = clientAPI.hideClient(data);

    const loader = setTimeout(utils.showLoader, 400);

    request.then(() => {
      clearTimeout(loader);
      utils.hideLoader();

      props.client.hidden = data.hidden;

      afterChangeClientHide.init(props);
    }, () => {
      clearTimeout(loader);
      utils.hideLoader();
    });
  }
}

export default HideClientManager;
