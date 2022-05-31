import Utils from '../../../../../../utils/utils.js';
import FunnelTemplates from '../../templates/funnelTemplates.js';
import FunnelRequests from '../../requests/funnelRequests.js';

const utils = new Utils();
const funnelTemplates = new FunnelTemplates();
const funnelRequests = new FunnelRequests();

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

  openFunnelMenu(props, e) {
    const t = e.target;
    const menu = document.querySelector('[js-menu-funnel-add]');
    const form = menu.querySelector('[js-funnel-form]');

    const funnelItem = utils.getParent(t, 'funnels-funnel__item');
    const funnelElement = funnelItem ?? t;

    const isDeleteBtn = t.classList.contains('funnels-funnel__delete');

    if (funnelElement !== null && !isDeleteBtn) {
      const name = funnelElement
        .querySelector('.funnels-funnel__title')
        .innerText.trim();

      const id = +funnelElement.querySelector('[funnels-id]').value;

      const funnel = {
        name,
        id,
        tildaId: null,
      };

      if (form) {
        Array.from(form.children).forEach((item) => item.remove());

        form.insertAdjacentHTML(
          'afterbegin',
          funnelTemplates.addFunnelMenu(funnel),
        );

        funnelRequests.getTildaForm(funnel.id).then(() => {
          utils.openModalAnimation(menu, true);
        });
      }
    }
  }
}

export default EditFunnel;
