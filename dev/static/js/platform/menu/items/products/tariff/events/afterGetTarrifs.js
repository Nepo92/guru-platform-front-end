import Utils from '../../../../../utils/utils.js';
import TariffTemplates from '../templates/tariffTemplates.js';
import AddNewTariff from './addNewTariff/addNewTariff.js';
import UpdateTariff from './updateTariff/updateTariff.js';

const utils = new Utils();
const tariffTemplates = new TariffTemplates();
const addNewTariff = new AddNewTariff();
const updateTariff = new UpdateTariff();

class AfterGetTariffs {
  init(props) {
    const { tariffs } = props;

    const render = this.renderTariffs(tariffs);

    render.then(() => {
      const addButton = this.addNewTariffButton();

      addButton.then(() => {
        const items = [addNewTariff, updateTariff];

        props.addButton = document.querySelector('.create-tariff');

        items.forEach((item) => {
          const init = item.init.bind(item);
          init(props);
        });
      });
    });
  }

  async renderTariffs(tariffs) {
    const wrapper = document.querySelector('[tariffs-list]');

    utils.removeChildren(wrapper);

    tariffs.reverse().forEach(async (item) => {
      const div = document.createElement('div');
      div.classList.add('tariff-block');
      div.innerHTML = tariffTemplates.tariffBlock(item);
      await wrapper.appendChild(div);
    });
  }

  async addNewTariffButton() {
    const wrapper = document.querySelector('[tariffs-list]');

    if (!document.querySelector('.create-tariff')) {
      const div = document.createElement('div');
      div.setAttribute('new-tariff', '');
      div.classList.add('tariff-block');
      div.classList.add('create-tariff');
      div.innerHTML = tariffTemplates.newTariffButton();

      await wrapper.appendChild(div);
    }
  }
}

export default AfterGetTariffs;
