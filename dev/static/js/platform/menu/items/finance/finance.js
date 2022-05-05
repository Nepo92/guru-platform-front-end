import WorkersSalary from './workers-salary/workersSalary.js';

const workersSalary = new WorkersSalary();

class Finance {
  init(props) {
    const items = [workersSalary];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default Finance;
