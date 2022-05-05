class DealFields {
  change(props) {
    const { pack } = props;

    if (pack.role !== 'ROLE_CURATOR') {
      const menu = document.querySelector('[js-menu-deal]');

      if (menu) {
        const saveChange = menu.querySelector('[edit-deal]');

        if (saveChange) {
          saveChange.removeAttribute('disabled');
        }
      }
    }
  }

  changeReqDate(dealPack, e) {
    const { menu } = dealPack;

    const t = e.target;

    if (!t || !t.classList.contains('datepicker--cell')) {
      return false;
    }

    const requestDate = menu.querySelector('[date-request]');

    if (e.clientX < 470) {
      const event = new Event('input');
      requestDate.dispatchEvent(event);
    } else {
      return false;
    }
  }
}

export default DealFields;
