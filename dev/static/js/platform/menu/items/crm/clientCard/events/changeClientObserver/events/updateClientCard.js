class UpdateClientCard {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const { target, client, menu } = props;

    target.disabled = true;

    const input = menu.querySelector('[js-change-client-name]');

    const name = menu.querySelector('[js-client-name]');

    if (input) {
      input.classList.add('hide');
      name.innerText = client.name;
      name.classList.remove('hide');
    }

    const avatar = menu.querySelector('[js-client-avatar]');
    avatar.innerText = name.innerText.trim()[0].toUpperCase();
  }
}

export default UpdateClientCard;
