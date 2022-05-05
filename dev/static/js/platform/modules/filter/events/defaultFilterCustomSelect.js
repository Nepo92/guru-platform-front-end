class DefaultFilterCustomSelect {
  init(props) {
    const form = document.querySelector('.filter__form');

		if (!form) return false;

    const { pack } = props;
    const { filter } = pack;

    const items = form.querySelectorAll('[select-here]');

    if (items.length) {
      items.forEach((item) => {
        const type = item.getAttribute('deal-select-type');

        switch (type) {
          case 'select-funnel': {
            const idFunnel = item.querySelector('[id-selected]');
            idFunnel.value = filter.idFunnel;

            const body = item.querySelector('[select-body]');

            if (body) {
              if (filter.idFunnel !== 0) {
                const selected = Array.from(body.children).find((el) => +el.getAttribute('value') === filter.idFunnel);
                const placeholder = item.querySelector('.select-head__placeholder');
                placeholder.innerText = selected.innerText.trim();
                placeholder.parentNode.setAttribute('title', selected.innerText.trim());
              }
            }
            break;
          }
          default: {
            break;
          }
        }
      });
    }
  }
}

export default DefaultFilterCustomSelect;
