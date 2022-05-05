import EditPlanTabs from './editPlanTabs.js';
import Utils from '../../../../../../utils/utils.js';
import RenderPlanFunnels from '../render/renderPlanFunnels.js';
import IPlanFunnel from '../planFunnel/iPlanFunnel.js';
import IManagerPlan from '../managerPlan/iManagerPlan.js';
import IRemovePlanFunnel from '../planFunnel/removePlanFunnel/iRemovePlanFunnel.js';

const editPlanTabs = new EditPlanTabs();
const utils = new Utils();
const renderPlanFunnels = new RenderPlanFunnels();
const iPlanFunnel = new IPlanFunnel();
const iManagerPlan = new IManagerPlan();
const iRemovePlanFunnel = new IRemovePlanFunnel();

class IEditPlanTabs {
  init(props) {
    const items = [editPlanTabs];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });

    const tabItems = editPlanTabs.getTabItems;
    props.hideBoards = this.#hideActionsBoard.bind(this, props);

    if (tabItems.length) {
      const changeActiveTab = this.#changeActiveTab.bind(this, props);

      tabItems.forEach((item) => {
        const cloneTab = utils.setCloneElement(item);
        cloneTab.addEventListener('click', changeActiveTab);
      });
    }
  }

  #changeActiveTab(props, e) {
    const t = e.target;

    const tabItems = editPlanTabs.getTabItems;

    if (tabItems.length) {
      tabItems.forEach((item) => item.classList.remove('active'));
    }

    t.classList.add('active');

    props.activeTab = t.getAttribute('data-type');

    editPlanTabs.init(props);
    const render = renderPlanFunnels.renderFunnelPlans(props);

    this.#hideActionsBoard(props);

    render.then(() => {
      const items = [
        iManagerPlan,
        iPlanFunnel,
        iRemovePlanFunnel,
      ];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }

  #hideActionsBoard(props) {
    props.saveBoard = document.querySelector('[save-board]');
    props.deleteBoard = document.querySelector('[delete-board]');
    props.deleteManagerBoard = document.querySelector('[delete-manager-board]');
    props.contentWrapper = document.querySelector('.plans-add__content');

    const {
      deleteBoard,
      deleteManagerBoard,
      saveBoard,
      contentWrapper,
    } = props;

    [deleteBoard, saveBoard, deleteManagerBoard, contentWrapper].forEach((item) => {
      item.classList.remove('open');
    });
  }
}

export default IEditPlanTabs;
