import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class EditFunnel {
  init(props) {
    const funnels = document.querySelectorAll('[funnels-item]');

    if (funnels.length) {
      const openFunnelMenu = this.openFunnelMenu.bind(this, props);

      funnels.forEach((item) => {
        const funnel = utils.setCloneElement(item);
        funnel.addEventListener('click', openFunnelMenu);
      });
    }
  }

  openFunnelMenu() {}
}

export default EditFunnel;
