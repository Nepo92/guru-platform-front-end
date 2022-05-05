import EnableUpdateButton from './enableUpdateButton.js';
import UpdateRequest from './updateRequest.js';

const updateRequest = new UpdateRequest();
const enableUpdateButton = new EnableUpdateButton();

class UpdateClient {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const accessArray = ['ROLE_MANAGER', 'ROLE_HEAD_MANAGER', 'ROLE_ADMIN'];

    if (accessArray.includes(props.pack.role)) {
      const items = [enableUpdateButton, updateRequest];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    }
  }
}

export default UpdateClient;
