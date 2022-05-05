import Utils from '../utils.js';

const utils = new Utils();

class SelectOptions {
  optionManagers(manager) {
    return `
      <div value="${manager.id}" title="${manager.name}" class="select__option no-icon">
        ${manager.name}
      </div>
    `;
  }

  optionProducts(product) {
    return `
      <div value="${product}" title="${product}" class="select__option no-icon">
        ${product}
      </div>
    `;
  }

  optionEmployees(employee) {
    const value = employee ? 'Работающие' : 'Уволенные';

    return `
      <div value="${employee}" title="${value}" class="select__option no-icon">
        ${value}
      </div>
    `;
  }

  optionProject(project) {
    return `
      <div value="${project.id}" title="${project.name}" class="select__option no-icon">
        ${project.name}
      </div>
    `;
  }

  optionSaleType(type) {
    return `
      <div value="${type.value}" title="${type.name}" class="select__option no-icon">
        ${type.name}
      </div>
    `;
  }

  setStatusOptions(status) {
    const statusNameIsClosed = status.title === 'Закрыта не реализована' ? 'Не реализована' : status.title;

    return `
      <div class="select__option select__option--status" data-code=${status.code} value="${status.id}">
        ${status.title !== 'Успешно реализована' ? statusNameIsClosed : 'Реализована'}
      </div>`;
  }

  setSocialOptions(social) {
    return `
    <div class="select__option no-icon" value="${social.id}" data-code="${social.code}">
      ${social.title}
    </div>`;
  }

  setProductOptions(product) {
    return `
    <div class="select__option no-icon" value="${product.id}" data-title="${product.name}" data-price="${product.price}" data-type="${product.type}">
      ${product.name}
    </div>`;
  }

  setTariffsOptions(tariff) {
    return `
      <div class="select__option no-icon" value="${tariff.id}">
        <span class="select-head__name">${tariff.name}</span>
        <span class="select-head__price">${tariff.price} ₽</span>
      </div>`;
  }

  setStreamsOptions(stream) {
    return `
      <div class="select__option no-icon" value="${stream.id}">
        ${utils.getDateFormatDDMMYYYY(stream.startDate)}
      </div>
    `;
  }

  setPaymentMethodsOptions(paymentMethod) {
    return `
      <div class="select__option no-icon" value="${paymentMethod.id}">
        ${paymentMethod.title}
      </div>`;
  }

  setDateToSelectInPaymentFormBuilder(date, count) {
    return `
      <div class="select__option" data-id="${count + 1}" value="${count + 1}">
        ${count + 1}
      </div>
    `;
  }

  setContractOptions(value) {
    return `
    <div class="select__option contract__option ${value ? 'active' : 'no-active'}" value="${value}">
      ${value === true ? 'Активен' : 'Не активен'}
    </div>
    `;
  }

  setContractTypeOptions(type) {
    return `
      <div class="select__option" value=${type.value}>
        ${type.name}
      </div>
    `;
  }

  setOptionFunnels(funnel) {
    return `
      <div class="select__option" value=${funnel.idFunnel}>
        ${funnel.funnelName}
      </div>
    `;
  }
}

export default SelectOptions;
