import Utils from '../utils/utils.js';
import StateFromAJAX from './settings/stateFromAJAX.js';
import StateFromHTML from './settings/stateFromHTML.js';

const utils = new Utils();
const htmlData = new StateFromHTML();
const ajaxData = new StateFromAJAX();

class Store {
  async setState(pageState) {
    if (!Array.isArray(pageState)) return false;

    const [html, ajax] = pageState;

    html.createState();

    const ajaxProps = {
      page: utils.getPage(),
      html: html.getState(),
    };

    await ajax.createState(ajaxProps);

    const ajaxState = ajax.getState();
    const htmlState = html.getState();

    return {
      ...htmlState,
      ...ajaxState,
      selectObsArr: [],
    };
  }
}

const store = new Store();

const state = store.setState([htmlData, ajaxData]);

export default state;
