class CLientCardTemplates {
  accessTemplate(clientCardPack) {
    const { pack, client } = clientCardPack;

    return `
        <div class="platform-access__item">
            <p class="platform-access__name">Ссылка на авторизацию</p>
            <p class="platform-access__value">${window.location.origin}/company=${pack.company.companyCode}</p>
        </div>
        <div class="platform-access__item">
            <p class="platform-access__name">Логин</p>
            <p class="platform-access__value">${client.userLogin ? client.userLogin : client.username}</p>
        </div>
        <div class="platform-access__item">
            <p class="platform-access__name">Пароль <span class="client-password__btn">(изменить)</span></p>
            <p class="platform-access__value" pwd-value>
              ${client.userPassword ? client.userPassword : client.password}
              <span class="platform-access__copy"></span>
            </p>
        </div>
    `;
  }
}

export default CLientCardTemplates;
