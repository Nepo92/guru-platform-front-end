import DealTemplates from '../../dealCard/templates/templates.js';

const dealTemplates = new DealTemplates();

class TaskObserver {
  updateInTable(props) {
    const {
      deal,
      pack,
      rowEventsObs,
      clientCardObs,
      rerenderContent,
    } = props;

    const renderData = {
      deal,
      pack,
    };

    const tr = document.createElement('tr');
    tr.classList.add('platform-table__row');
    tr.setAttribute('data-deal', deal.id);
    tr.setAttribute('data-client', deal.idClient);
    tr.innerHTML = dealTemplates.dealRow(renderData);

    if (rowEventsObs && clientCardObs && rerenderContent) {
      rerenderContent.init(props).then(() => {
        rowEventsObs.init(props);
        clientCardObs.init(props);
      });
    }
  }
}

export default TaskObserver;
