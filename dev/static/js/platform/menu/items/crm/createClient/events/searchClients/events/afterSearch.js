import Render from './render.js';
import AfterRender from './afterRender.js';

const render = new Render();
const afterRender = new AfterRender();

class AfterSearch {
  init(props) {
    const renderClients = render.render.bind(render);

    renderClients(props).then(() => {
      const after = afterRender.init.bind(afterRender);
      after(props);
    });
  }
}

export default AfterSearch;
