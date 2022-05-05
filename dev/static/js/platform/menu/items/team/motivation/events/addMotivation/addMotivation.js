import ChangeSettings from './events/changeSettings.js';

const changeSettings = new ChangeSettings();

class AddMotivation {
  init(props) {
    const items = [changeSettings];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default AddMotivation;
