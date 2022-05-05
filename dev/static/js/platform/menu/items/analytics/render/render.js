import RenderMainTable from './events/renderMainTable.js';
import RenderManagerLayer from './events/renderManagerLayer.js';

const renderMainTable = new RenderMainTable();
const renderMangerLayer = new RenderManagerLayer();

class Render {
  init(props) {
    const items = [renderMainTable, renderMangerLayer];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default Render;
