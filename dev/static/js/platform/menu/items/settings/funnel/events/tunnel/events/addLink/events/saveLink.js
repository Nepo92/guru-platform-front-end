import { tunnelAPI } from '../../../../../../../../../api/api.js';

class SaveLink {
  init() {
    // const addLinkProps = {
    //   ...props,
    //   menu: document.querySelector('[js-menu-add-outside]'),
    // };

    // const { menu } = addLinkProps;

    // const setFunnelsToSelect = funnel.init.bind(funnel, addLinkProps);

    // const select = menu.querySelector('[deal-type]');

    // select.addEventListener('change', setFunnelsToSelect);

    // const addLinkBtn = menu.querySelector('[js-add-outside]');

    // if (addLinkBtn) {
    //   const addLink = utils.setCloneElement(addLinkBtn);
    //   const saveLink = this.saveLink.bind(this, addLinkProps);

    //   addLink.addEventListener('click', saveLink);
    // }
  }

  saveLink(props) {
    const { menu } = props;

    const data = {
      name: menu.querySelector('[link-name]').value,
      dealType: menu.querySelector('[deal-type]').value,
      idFunnel: +menu.querySelector('[funnel]').value,
    };

    const saveLink = tunnelAPI.saveOutsideLink(data);

    saveLink.then(() => {
      // console.log('outsideLink was saved');
    });
  }
}

export default SaveLink;
