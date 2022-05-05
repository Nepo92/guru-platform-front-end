class IndicatorNow {
  init(dealCardPack) {
    const { deals, pack } = dealCardPack;
    const { dealStatuses, closeStatusArray } = pack;

    const dealCards = document.querySelectorAll('.deal-card');

    if (dealCards.length) {
      if (deals) {
        deals.forEach((item) => {
          dealCards.forEach((elem) => {
            if (item.id === +elem.getAttribute('data-deal')) {
              const indicatorNowElement = elem.querySelector('.deal-indicator__right');

              indicatorNowElement.className = 'deal-indicator__right';

              const selectedStatus = dealStatuses.find((el) => el.id === item.status);

              indicatorNowElement.classList.add(selectedStatus.code);

              const isFirst = item.statusChanges.length === 1;

              const left = elem.querySelector('.deal-indicator__left');
              const right = elem.querySelector('.deal-indicator__right');

              if (closeStatusArray?.includes(selectedStatus.code) || isFirst) {
                left.className = 'deal-indicator__left';
                left.classList.add('width_0');

                right.classList.remove('width_50');
                right.classList.add('width_100');
                right.style.borderTopLeftRadius = '15px';
                right.style.borderBottomLeftRadius = '15px';
              } else {
                left.classList.remove('width_0');
                left.classList.add('width_50');

                right.classList.remove('width_100');
                right.classList.add('width_50');

                right.style.borderTopLeftRadius = '0';
                right.style.borderBottomLeftRadius = '0';
              }
            }
          });
        });
      }
    }
  }
}

export default IndicatorNow;
