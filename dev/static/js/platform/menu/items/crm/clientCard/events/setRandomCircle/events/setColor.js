class SetColor {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const setColor = this.setColor.bind(this);
    setColor(props);
  }

  setColor(props) {
    const clientCard = document.querySelector('[js-menu-client-card]');

    const color = this.getRandomColor(props);

    if (clientCard) {
      const avatar = clientCard.querySelector('.platform-form__avatar');
      avatar.style.border = `2px solid ${color.borderColor}`;
      const avatarInner = avatar.querySelector('.platform-form__avatar--bg');
      avatarInner.style.backgroundColor = color.bgColor;
      avatarInner.style.color = color.color;

      avatar.setAttribute('data-border-color', color.borderColor);
      avatar.setAttribute('data-bg-color', color.bgColor);
      avatar.setAttribute('data-color', color.color);
    }
  }

  getRandomColor(props) {
    const { openClientCard, client } = props;

    const colors = [
      {
        bgColor: '#f3d8d8',
        color: '#e6b2b2',
        borderColor: '#d88d8d',
      },
      {
        bgColor: '#f3e4d8',
        color: '#e6ceb2',
        borderColor: '#d8be8d',
      },
      {
        bgColor: '#f0f3d8',
        color: '#dde6b2',
        borderColor: '#ced88d',
      },
      {
        bgColor: '#e0f3d8',
        color: '#bfe6b2',
        borderColor: '#a0d88d',
      },
      {
        bgColor: '#d8f3e7',
        color: '#b2e6d2',
        borderColor: '#8dd8b0',
      },
      {
        bgColor: '#d8eef3',
        color: '#b2dee6',
        borderColor: '#8db9d8',
      },
      {
        bgColor: '#d8daf3',
        color: '#b2bde6',
        borderColor: '#8d91d8',
      },
      {
        bgColor: '#e6d8f3',
        color: '#c7b2e6',
        borderColor: '#a28dd8',
      },
      {
        bgColor: '#f2d8f3',
        color: '#deb2e6',
        borderColor: '#d08dd8',
      },
      {
        bgColor: '#f3d8e5',
        color: '#e6b2ce',
        borderColor: '#d88db4',
      },
    ];

    const randomNumber = Math.floor(Math.random() * ((colors.length - 1) - 0 + 1)) + 0;

    const color = colors.filter((el, index) => index === randomNumber)[0];

    const clientColor = {
      bgColor: client?.clientColor?.bgColor || '#FF9E73',
      color: client?.clientColor?.color || '#FF7B40',
      borderColor: client?.clientColor?.borderColor || '#FF4F00',
    };

    return openClientCard ? clientColor : color;
  }
}

export default SetColor;
