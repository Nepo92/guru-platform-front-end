import Utils from "../../../../../../../utils/utils.js";
import FunnelRequests from "../../../requests/funnelRequests.js";
import ValidateFunnel from "../../../../../../../utils/validation/funnel/ValidateFunnel.js";

const utils = new Utils();
const funnelRequests = new FunnelRequests();
const validateFunnel = new ValidateFunnel();

class SaveFunnel {
  init(props) {
    const { menu } = props;

    const saveBtn = menu.querySelector("[save-funnel]");

    if (saveBtn) {
      const saveFunnel = this.saveFunnel.bind(this, props);

      const save = utils.setCloneElement(saveBtn);

      save.addEventListener("click", saveFunnel);
    }
  }

  saveFunnel(props) {
    const { menu } = props;

    const funnelName = menu.querySelector("[js-funnel-name]").value;
    const dealType = document.querySelector("[js-select-type]").value;

    props.newFunnelData = {
      funnelName,
      dealType,
    };

    if (funnelName === "" || +dealType.value === 0) return false;

    if (validateFunnel.init(menu)) {
      funnelRequests.saveRequest(props).then((idFunnel) => {
        const wrapper = menu.querySelector(".platform-modal__wrapper");

        utils.closeModalAnimation(menu, wrapper, false, false, false);
        props.defaultType = dealType;
        props.funnel$.init(props);

        const idTilda = +menu.querySelector("[id-tilda]").value;

        if (idTilda && idFunnel) {
          const data = {
            keyField: idTilda,
            valueField: idFunnel,
          };

          funnelRequests.saveTildaFunnel(data);
        }
      });
    }
  }
}

export default SaveFunnel;
