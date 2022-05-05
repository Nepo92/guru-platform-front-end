import ChangeFunnelPage from './events/changeFunnelPage/changeFunnelPage.js';
import AddFunnel from './events/addFunnel/addFunnel.js';
import RemoveFunnel from './events/removeFunnel/removeFunnel.js';
import EditFunnel from './events/editFunnel/editFunnel.js';
import Utils from '../../../../utils/utils.js';

const changeFunnelPage = new ChangeFunnelPage();
const addFunnel = new AddFunnel();
const removeFunnel = new RemoveFunnel();
const editFunnel = new EditFunnel();
const utils = new Utils();

class Funnel {
  init(props) {
    if (utils.getPage() === 'funnels') {
      const funnelProps = {
        ...props,
        funnel$: new Funnel(),
      };

      const items = [addFunnel, changeFunnelPage, removeFunnel, editFunnel];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(funnelProps);
      });
    }
  }
}

export default Funnel;
