import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class AfterRevealDeal {
  init(props) {
    const { target } = props;

    const row = utils.getParent(target, 'platform-table__row');

    const id = +row.getAttribute('data-deal');

    const changeHiddenFlag = this.changeHiddenFlag.bind(this, id);

    props.pack.items = props.pack.items.map(changeHiddenFlag);

    props.rerenderContent.init(props).then(() => {
      props.rowEventsObs.init(props);
      props.clientCardObs.init(props);
    });
  }

  changeHiddenFlag(id, el) {
    if (el.id === id) {
      el.isHidden = false;
    }

    return el;
  }
}

export default AfterRevealDeal;
