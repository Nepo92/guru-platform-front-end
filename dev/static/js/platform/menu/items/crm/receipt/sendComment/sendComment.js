import { checkAPI } from '../../../../../api/api.js';
import AfterSaveComment from './events/afterSaveComment.js';
import Utils from '../../../../../utils/utils.js';
import Popup from '../../../../../modules/popup/popup.js';

const afterSaveComment = new AfterSaveComment();
const utils = new Utils();
const popup = new Popup();

class SendComment {
  init(props) {
    const { menu, bill } = props;

    const comment = menu.querySelector('[pay-menu-textarea]').value;

    if (comment && comment !== bill.comment) {
      this.sendComment(props);
    } else if (!comment) {
      checkAPI.unSelectSMS(bill.id).then(() => {
        checkAPI.getUnusedSms().then((checks) => {
          const current = checks.find((el) => el.text === bill.comment);

          this.deleteCheck(props, current);
        });
      });
    } else if (comment && bill.comment === comment) {
      this.afterSaveComment(props);
    }
  }

  deleteCheck(props, current) {
    if (current) {
      checkAPI.deleteSMS(current).then(() => {
        this.afterSaveComment(props);
      });
    } else {
      this.afterSaveComment(props);
    }
  }

  afterSaveComment(props) {
    const items = [afterSaveComment];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  sendComment(props) {
    const {
      bill,
      menu,
      target,
      pack,
    } = props;
    const { company } = pack;
    const { id } = company;

    const data = {
      text: menu.querySelector('[pay-menu-textarea]').value.trim(),
      date: utils.today(),
      isUsed: true,
      idCompany: id,
      idBill: bill.id,
      sum: bill.sum,
    };

    const saveCheck = checkAPI.saveSMS(data);

    saveCheck.then((comment) => {
      const dataComment = {
        id: comment.id,
        isUsed: true,
        date: comment.date,
        text: comment.text,
        idBill: bill.id,
        manager: pack.manager?.name || document.querySelector('[who-create]').innerText.trim(),
        sum: bill.sum,
      };

      const selectCheck = checkAPI.selectSMS(dataComment);

      selectCheck.then(() => {
        target.classList.remove('disable');
        const items = [afterSaveComment];

        items.forEach((item) => {
          const init = item.init.bind(item);
          init(props);
        });
      }, () => {
        const popupProps = {
          text: 'Ошибка! Комментарий не добавлен. Попробуйте еще раз или сообщите в тех. поддержку',
          settings: 'alert-close',
        };

        popup.init(popupProps);

        target.classList.remove('disable');
      });
    }, () => {
      const popupProps = {
        text: 'Ошибка! Комментарий должен быть уникальным',
        settings: 'alert-close',
      };

      popup.init(popupProps);
      target.classList.remove('disable');
    });
  }
}

export default SendComment;
