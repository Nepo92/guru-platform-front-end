import ChooseAdvertiser from './events/chooseAdvertiser.js';
import ChooseChannel from './events/chooseChannel.js';
import ChoosePlatform from './events/choosePlatform.js';
import OpenCommunity from './events/openCommunity.js';
import CloseCommunity from './events/closeCommunity.js';

const chooseAdvertiser = new ChooseAdvertiser();
const chooseChannel = new ChooseChannel();
const choosePlatform = new ChoosePlatform();
const openCommunity = new OpenCommunity();
const closeCommunity = new CloseCommunity();

class ChooseAudience {
  init(props) {
    const items = [chooseAdvertiser, chooseChannel, choosePlatform, openCommunity, closeCommunity];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default ChooseAudience;
