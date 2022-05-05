import Utils from '../../../../../../../../../../utils/utils.js';
import ChangeAccessModule from '../changeAccessModules.js';

const utils = new Utils();
const changeAccessModule = new ChangeAccessModule();

class AfterChangeAccessBlock {
  async init(props) {
    const { blockLabel } = props;
    const modules = utils.getParent(blockLabel, 'access-block').querySelectorAll('.module__item');

    if (modules.length) {
      await this.changeAccessToModales(props, modules);
    }
  }

  changeAccessToModales(props, modules) {
    const { deal } = props;

    return new Promise((res) => {
      let i = 0;

      const timer = setInterval(() => {
        if (i >= modules.length) {
          clearInterval(timer);
          res();
        } else {
          const module = modules[i];

          if (module) {
            this.changeAccess(module, deal, props);
          }

          i++;
        }
      }, 10);
    });
  }

  async changeAccess(module, deal, props) {
    await changeAccessModule.init(module, deal, props);
  }
}

export default AfterChangeAccessBlock;
