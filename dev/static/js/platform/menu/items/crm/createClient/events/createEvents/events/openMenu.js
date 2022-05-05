import Utils from '../../../../../../../utils/utils.js';
import CreateClient from './createClient.js';

const utils = new Utils();
const createClient = new CreateClient();

class OpenMenu {
  init(props) {
    const createData = {
      ...props,
    };

    const { menu } = createData;

    const createClientBtn = menu.querySelector('[js-create-client]');

    createClientBtn.disabled = false;

    const create = this.createClient.bind(this, createData);
    const cloneCreate = utils.setCloneElement(createClientBtn);
    cloneCreate.addEventListener('click', create);
  }

  createClient(createData) {
    const createNewClient = createClient.init.bind(createClient);
    createNewClient(createData);
  }
}

export default OpenMenu;
