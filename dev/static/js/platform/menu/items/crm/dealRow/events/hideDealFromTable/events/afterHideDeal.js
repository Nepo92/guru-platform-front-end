import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class AfterHideDeal {
  init(props) {
    const { target } = props;

    const row = utils.getParent(target, 'platform-table__row');

    const id = +row.getAttribute('data-deal');

    const changeHideFlag = this.changeHideFlag.bind(this, id);

    props.pack.items = [...props.pack.items.map(changeHideFlag)];

    props.rerenderContent.init(props).then(() => {
      props.rowEventsObs.init(props);
      props.clientCardObs.init(props);
    });
  }

  changeHideFlag(id, el) {
    if (el.id === id) {
      el.isHidden = true;
    }

    return el;
  }
}

export default AfterHideDeal;
