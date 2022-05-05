class AfterUpdateBill {
  init(props) {
    this.updateBillWrapper(props);
  }

  updateBillWrapper(props) {
    const billWrapper = document.querySelectorAll('[js-client-bills]');

    billWrapper.forEach((item) => {
      Array.from(item.children).forEach((elem) => {
        elem.remove();
      });
    });

    const updateMenuWrapper = document.querySelector('.update-menu');

    if (updateMenuWrapper.classList.contains('active')) {
      updateMenuWrapper.classList.remove('active');
    }

    props.tabBillObs.init(props);
  }
}

export default AfterUpdateBill;
