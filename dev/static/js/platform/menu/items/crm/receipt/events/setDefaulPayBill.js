import { billAPI } from '../../../../../api/api.js';

class SetDefaultPayBill {
  init(props) {
    const { bill, payMenu } = props;

    props.saveBtn = payMenu.querySelector('.pay__save');
    props.billData = {
      id: bill.idDeal,
    };

    if (props.billData.id) {
      this.changePayBillMenuWithDeal(props);
    } else {
      this.changePayBillMenuWithoutDeal(props);
    }
  }

  changePayBillMenuWithDeal(props) {
    const { bill, billData } = props;

    const getBills = billAPI.getBills(billData);

    getBills.then((billsData) => {
      const [billInfo] = billsData.filter((el) => el.id === +bill.id);

      props.bill = billInfo;

      if (billInfo) {
        if (billInfo.billImage) {
          this.getImage(props);
        } else {
          this.getInputFile(props);
        }

        const textArea = props.menu.querySelector('[pay-menu-textarea]');
        textArea.value = billInfo.comment ? billInfo.comment : '';

        props.saveBtn.style.display = 'flex';
      }
    });
  }

  changePayBillMenuWithoutDeal(props) {
    const { bill, payMenu, saveBtn } = props;

    props.bill = bill;

    if (bill.billImage || bill.comment) {
      this.getImage(props);
    } else {
      this.getInputFile(props);
    }

    payMenu.querySelector('.platform-form__input-full.active').style.opacity = '0';
    payMenu.querySelector('.platform-form__input-full.active').style.pointerEvents = 'none';

    const textArea = props.menu.querySelector('[pay-menu-textarea]');
    textArea.value = bill.comment ? bill.comment : '';

    saveBtn.style.display = 'none';
  }
}

export default SetDefaultPayBill;
