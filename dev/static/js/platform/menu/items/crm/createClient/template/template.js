class CreateClientTemplate {
  clientItem(item) {
    return `
            <input type="hidden" class="js-client-id-l" js-client-id value="${item.id}">
            <p class="client-card__title">${item.name ? item.name : ''}</p>
            <div class="client-card__info">
                <div class="client-card__info-link">${item.link ? item.link : ''}</div>
                <div class="client-card__info-phone">${item.phone ? item.phone : ''}</div>
            </div>
        `;
  }
}

export default CreateClientTemplate;
