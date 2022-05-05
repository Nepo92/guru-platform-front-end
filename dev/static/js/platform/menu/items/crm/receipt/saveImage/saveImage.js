import { billAPI } from '../../../../../api/api.js';
import AfterSendImage from './events/afterSendImage.js';
import SendComment from '../sendComment/sendComment.js';
import Popup from '../../../../../modules/popup/popup.js';

const afterSendImage = new AfterSendImage();
const sendComment = new SendComment();
const popup = new Popup();

class SaveImage {
  init(props) {
    const { menu } = props;

    const fileInput = menu.querySelector('[pay-menu-file]');

    if (fileInput?.files.length) {
      this.requestSaveImage(props);
    } else {
      sendComment.init(props);
    }
  }

  requestSaveImage(props) {
    const { target } = props;
    const data = this.getData(props);
    const uploadImg = billAPI.uploadCheck(data);

    uploadImg.then((check) => {
      target.classList.remove('disable');
      props.bill = check;

      const items = [afterSendImage];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    }, () => {
      target.classList.remove('disable');

      const popupProps = {
        text: 'Ошибка! Изображение чека не добавилось, попробуйте заново',
        settings: 'alert-close',
      };

      popup.init(popupProps);
    });
  }

  getData(props) {
    const { menu, bill } = props;

    const fileInput = menu.querySelector('[pay-menu-file]');

    const data = new FormData();
    data.append('isHidden', bill.isHidden);
    data.append('idDeal', bill.idDeal);
    data.append('id', bill.id);
    data.append('file', fileInput.files[0]);

    const row = document.querySelector(`.platform-table__row[data-bill="${bill.id}"]`);

    let billSum;

    if (row) {
      billSum = parseInt(row.querySelector('[name="sum"]').value, 10);
    }

    data.append('sum', bill.sum || billSum);

    return data;
  }
}

export default SaveImage;
