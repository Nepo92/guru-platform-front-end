import SetColor from './events/setColor.js';
import SetLetter from './events/setLetter.js';

const setColor = new SetColor();
const setLetter = new SetLetter();

class SetRandomCircle {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const items = [setColor, setLetter];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default SetRandomCircle;
