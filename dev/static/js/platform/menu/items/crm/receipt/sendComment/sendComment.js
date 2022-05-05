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

    const dispatchComment = this.dispatchComment(comment, bill);
    const commentNav = this.getCommentNav(props);

    const current = commentNav.find((el) => el.type === dispatchComment);

    if (current) {
      current.action();
    }
  }

  getCommentNav(props) {
    const sendComment = this.sendComment.bind(this, props);
    const afterSave = this.afterSave.bind(this, props);
    const deleteComment = this.deleteComment.bind(this, props);

    return [
      {
        type: 'change',
        action: sendComment,
      },
      {
        type: 'no-change',
        action: afterSave,
      },
      {
        type: 'delete-comment',
        action: deleteComment,
      },
      {
        type: 'no-comment',
        action: afterSave,
      },
    ];
  }

  deleteComment(props) {
    const { bill } = props;

    checkAPI.unSelectSMS(bill.id).then(() => {
      checkAPI.getUnusedSms().then((checks) => {
        const current = checks.find((el) => el.text === bill.comment);

        this.deleteCheck(props, current);
      });
    });
  }

  dispatchComment(comment, bill) {
    const commitIsChanged = comment && comment !== bill.comment ? 'change' : '';
    const commitNoChanged = comment && comment === bill.comment ? 'no-change' : '';
    const deleteComment = !comment && bill.comment ? 'delete-comment' : '';
    const noComment = !comment && !bill.comment ? 'no-comment' : '';

    return commitIsChanged || commitNoChanged || deleteComment || noComment;
  }

  deleteCheck(props, current) {
    if (current) {
      checkAPI.deleteSMS(current).then(() => {
        this.afterSave(props);
      });
    } else {
      this.afterSave(props);
    }
  }

  afterSave(props) {
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
