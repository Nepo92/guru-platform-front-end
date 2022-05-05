class ChangeDealMenu {
  init(props) {
    const { menu } = props;

    this.changeHeader(menu);
  }

  changeHeader(menu) {
    const menuTitle = menu.querySelector('[client-name]');
    menuTitle.innerText = 'Редактировать сделку';
  }
}

export default ChangeDealMenu;
