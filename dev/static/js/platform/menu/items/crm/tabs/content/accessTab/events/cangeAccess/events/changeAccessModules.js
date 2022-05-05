import { dealAPI, homeworkAPI } from '../../../../../../../../../api/api.js';

class ChangeAccessModule {
  async init(module, deal, props, e) {
    let moduleItem;
    let changeAuto;

    if (e) {
      moduleItem = e.target;
      changeAuto = false;
    } else {
      moduleItem = module;
      changeAuto = true;
    }

    let toggle;

    const { pack } = props;

    const moduleProps = {
      pack,
      deal,
      moduleItem,
    };

    if (changeAuto) {
      const { target } = props;

      const isActiveProduct = target.classList.contains('active');
      const isActiveModule = moduleItem.classList.contains('active');

      toggle = !isActiveProduct === isActiveModule;

      if (toggle) {
        await this.sendRequestToChangeModule(moduleProps);
      }
    } else {
      await this.sendRequestToChangeModule(moduleProps);
    }
  }

  async sendRequestToChangeModule(moduleProps) {
    const {
      pack,
      deal,
      moduleItem,
    } = moduleProps;

    const data = {
      idDeal: deal.id || deal,
      idModule: +moduleItem.getAttribute('data-module'),
      idClient: moduleItem.getAttribute('data-client'),
      value: !moduleItem.classList.contains('active'),
    };

    if (pack.role === 'ROLE_CURATOR') {
      await homeworkAPI.changeAccessToModules(data);
    } else {
      await dealAPI.changeAccessToModules(data);
    }

    if (moduleItem.classList.contains('active')) {
      moduleItem.classList.remove('active');
    } else {
      moduleItem.classList.add('active');
    }
  }
}

export default ChangeAccessModule;
