class StatusDefault {
  init(dealCardPack) {
    const { deals, menu } = dealCardPack;

    if (menu) {
      const dealsCards = menu.querySelectorAll('.deal-card');

      if (deals) {
        dealsCards.forEach((item) => {
          deals.forEach((elem) => {
            if (+item.getAttribute('data-deal') === elem.id) {
              const status = item.querySelector('[data-select-type="status-deal"]');
              const statusValue = status.querySelector('[id-selected]');
              statusValue.value = elem.status;

              const options = Array.from(status.querySelector('[select-body]').children);

              const selectedOption = options.find((el) => +el.getAttribute('value') === elem.status);

              const head = status.querySelector('[select-head]');

              head.querySelector('.select-head__placeholder').innerText = selectedOption.innerText.trim();
              head.setAttribute('title', selectedOption.innerText.trim());

              status.classList.add(`deal-select__${selectedOption.getAttribute('data-code')}`);
            }
          });
        });
      }
    }
  }
}

export default StatusDefault;
