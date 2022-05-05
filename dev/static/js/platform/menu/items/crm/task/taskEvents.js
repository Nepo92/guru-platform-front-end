import AddTask from './events/addTask/addTask.js';
import DoneTask from './events/doneTask/doneTask.js';
import RemoveTask from './events/removeTask/removeTask.js';

const addTask = new AddTask();
const doneTask = new DoneTask();
const removeTask = new RemoveTask();

class TaskEvents {
  init(props) {
    const items = [addTask, doneTask, removeTask];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default TaskEvents;
