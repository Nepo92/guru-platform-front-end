import Utils from '../../../../../../utils/utils.js';
import FunnelTemplates from '../../templates/funnelTemplates.js';
import { dealAPI } from '../../../../../../api/api.js';

const utils = new Utils();
const funnelTemplates = new FunnelTemplates();

class ChangeFunnelPage {
  init(props) {
    const selectType = document.querySelector('[js-select-type]');

    if (selectType) {
      const changeFunnelPage = this.changeFunnelPage.bind(this, props);

      const select = utils.setCloneElement(selectType);
      select.addEventListener('change', changeFunnelPage);

      if (props.defaultType) {
        select.value = props.defaultType;
      }
    }
  }

  changeFunnelPage(props) {
    dealAPI.getFunnels().then((funnels) => {
      props.pack.funnels = funnels;

      funnelTemplates.renderFunnels(props);
    });
  }
}

export default ChangeFunnelPage;
