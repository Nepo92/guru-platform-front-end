class SetLetter {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const setLetter = this.setLetter.bind(this);
    setLetter(props);
  }

  setLetter(clientCardPack) {
    const { client } = clientCardPack;

    const clientCard = document.querySelector('[js-menu-client-card]');

    const avatar = clientCard.querySelector('[js-client-avatar]');

    if (client) {
      const { name } = client;

      const sPair = name.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g);

      const symbolsArray = sPair?.length ? sPair : false;

      avatar.innerText = symbolsArray[0] || name.trim()[0].toUpperCase();
    }
  }
}

export default SetLetter;
