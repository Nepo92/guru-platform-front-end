import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class AfterCompleteTask {
  init(props) {
    if (props.pack.items) {
      const currentDeal = props.pack.items.find((el) => el.id === props.deal.id);

      if (currentDeal) {
        currentDeal.reminders = currentDeal.reminders.map((el) => {
          if (el.id === props.completedTask) {
            el.done = true;
          }

          return el;
        });
      } else {
        this.#doneReminderInDeal(props);
      }
    } else {
      this.#doneReminderInDeal(props);
    }

    const updateInDealCard = props.dealObs.init.bind(props.dealObs);
    updateInDealCard(props);

    const access = ['deals', 'transactions', 'head-manager-transactions'];

    if (access.includes(utils.getPage())) {
      props.updateInTable(props);
    }
  }

  #doneReminderInDeal(props) {
    const currentDeal = props.deals.find((el) => el.id === props.deal.id);

    currentDeal.reminders = currentDeal.reminders.map((el) => {
      if (el.id === props.completedTask) {
        el.done = true;
      }

      return el;
    });
  }
}

export default AfterCompleteTask;
