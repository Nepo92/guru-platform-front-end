import Utils from '../../../../../../../../../../../utils/utils.js';
import Validation from '../../../../../../../../../../../utils/validation.js';
import { motivationAPI } from '../../../../../../../../../../../api/api.js';

const utils = new Utils();
const validation = new Validation();

class SaveMotivation {
  init(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const saveBtn = menu.querySelector('[js-motivation-save]');

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);
      const saveMotivation = this.saveMotivation.bind(this, props);
      save.addEventListener('click', saveMotivation);
    }
  }

  saveMotivation(props, e) {
    const t = e.target;
    const { sendingData, blockProps } = props;
    const { menu } = blockProps;
    const { emptyWage } = sendingData;
    const { months } = emptyWage;
    const { updatingBox } = blockProps;

    const [dep, pos, emp, year] = blockProps.motivationSettings();

    emptyWage.idDepartment = +dep.getAttribute('value');
    emptyWage.idPosition = +pos.getAttribute('value');
    emptyWage.forSelfEmployed = emp.getAttribute('value') === 'true';
    emptyWage.year = +year.getAttribute('value');

    months.length = 0;

    const monthsInMenu = menu.querySelectorAll('.motivation-months__checkbox');

    if (monthsInMenu.length) {
      monthsInMenu.forEach((item) => {
        if (item.checked) {
          months.push(+item.getAttribute('value'));
        }
      });
    }

    if (validation.validationWage(emptyWage, menu)) {
      updatingBox.keyField = emptyWage;

      t.style.pointerEvents = 'none';

      const saveMotivation = motivationAPI.saveWageRate(updatingBox);

      const showLoader = setTimeout(() => {
        utils.showLoader();
      }, 400);

      saveMotivation.then(() => {
        clearTimeout(showLoader);
        utils.hideLoader();

        t.style.pointerEvents = 'all';

        const wrapper = menu.querySelector('.platform-modal__wrapper');

        utils.closeModalAnimation(menu, wrapper, false, true, false, false);

        blockProps.motivation$.init(props);
      }, () => {
        clearTimeout(showLoader);
        utils.hideLoader();
        t.style.pointerEvents = 'all';
      });
    }
  }
}

export default SaveMotivation;
