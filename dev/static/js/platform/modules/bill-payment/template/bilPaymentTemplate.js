class BillPaymentTemplate {
  checkClientData(client) {
    return `
      <ul class="payment__contact-date">
        <li class="contact-date__item">
          <input type="hidden" name="id" value="${client.id}">
          <p class="payment__name">Имя</p>
          <input required class="payment__input" type="text" value="${client.name}" placeholder="Введите имя" name="name">
        </li>
        <li class="contact-date__item">
          <p class="payment__name">Телефон</p>
          <input required class="payment__input" type="text" value="${client.phone}" placeholder="Введите телефон" name="phone">
        </li>
        <li class="contact-date__item">
          <p class="payment__name">E-mail</p>
          <input required class="payment__input" type="text" value="${client.email}" placeholder="Введите e-mail" name="email">
        </li>
      </ul>
    `;
  }
}

export default BillPaymentTemplate;
