import Task from '../../task/task.js';

const task = new Task();

class TaskTabObserver {
  init(taskPack) {
    const items = [task];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(taskPack);
    });
  }
}

export default TaskTabObserver;
