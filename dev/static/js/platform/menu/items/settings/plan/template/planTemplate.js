class PlanTemplate {
  managerRow(type, subject) {
    return `
    <tr class="plans-funnel__manager manager-row">
      <input js-id-manager-plan value="${subject.idManagerPlan}" type="hidden">
      <input js-id-funnel-plan value="${subject.idFunnelPlan}" type="hidden">
      <input js-manager-id type="hidden" value="${subject.manager.idByType}">
      <td class="funnel-manager__name">${subject.manager.name}</td>
        ${(type === 'traffic') ? `
          <td class="funnel-manager__adv">
            <input class="funnel__input" placeholder="0" autocomplete="off" funnel-input manager-adv value="${subject.advBudget || ''}" type="text">
          </td>` : ''}
          <td class="funnel-manager__sales ${(this.type === 'additional') ? 'additional-sales' : ''}">
            <input class="funnel__input" placeholder="0" autocomplete="off" value="${subject.salesCount || ''}" funnel-input manager-sales type="text">
          </td>
          <td class="funnel-manager__revenue ${(this.type === 'additional') ? 'additional__revenue' : ''}">
            <input class="funnel__input" placeholder="0" autocomplete="off" value="${subject.revenue || ''}" funnel-input manager-revenue type="text">
          </td>
          <td class="funnel-manager__delete">
            <span class="funnel-manager__delete-btn"></span>
          </td>
      </tr>
    `;
  }

  funnelTemplate(renderProps) {
    const {
      el,
      managerRows,
      activeTab,
    } = renderProps;

    return `
    <div class="plans-funnel__manager manager-item ${(activeTab === 'additional') ? 'manager-item__additional' : ''}">
    <input js-plan-funnel-id value="${el.idFunnelPlan}" type="hidden">
    <input js-funnel-id value="${el.funnel.idFunnel}" type="hidden">
    <div class="funnel-manager__nav">
      <span class="funnel-manager__title">${el.funnel.funnelName}</span>
    </div>
    <div class="funnel-manager__inner">
      <table class="funnel-manager__table">
        <thead class="funnel-manger__head">
          <tr class="funnel-manager__head-row">
            <td class="funnel-manager__name">Сотрудник</td>
            ${(activeTab === 'traffic') ? '<td class="funnel-manager__adv">Рекламный бюджет</td>' : ''}
            <td class="funnel-manager__sales">Продажи</td>
            <td class="funnel-manager__revenue">Выручка</td>
          </tr>
        </thead>
        <tbody class="funnel-manager__tbody">
          ${managerRows.join('')}
        </tbody>
      </table>
    <div class="funnel-manager__settings">
        <span funnel-remove class="funnel-settings funnel-settings__remove"></span>
    </div>
  </div>
</div>
    `;
  }

  planItemTemplate(elem, monthName) {
    return `
    <div js-plan-month class="plans-now__item">
    <input js-plan-id type="hidden" value="${elem.id}">
    <input js-current-month type="hidden" value="${elem.month}">
    <p class="plans-now__title">${monthName}</p>
    <ul class="plans-plan__list">
      <li class="plans-list__item">
        <span class="plans-item__title">Рекламный бюджет</span>
        <span adv-budget class="plans-item__value">${elem.totalAdvBudget} &#8381;</span>
      </li>
      <li class="plans-list__item">
        <span class="plans-item__title">Продажи траффик</span>
        <span traffic-count class="plans-item__value">${elem.totalTrafficSalesCount} шт</span>
      </li>
      <li class="plans-list__item">
        <span class="plans-item__title">Выручка траффик</span>
        <span traffic-total class="plans-item__value">${elem.totalTraffic} &#8381;</span>
      </li>
      <li class="plans-list__item">
        <span class="plans-item__title">Продажи база</span>
        <span additional-count class="plans-item__value">${elem.totalAdditionalSalesCount} шт</span>
      </li>
      <li class="plans-list__item">
        <span class="plans-item__title">Выручка база</span>
        <span additional-total class="plans-item__value">${elem.totalAdditional} &#8381;</span>
      </li>
    </ul>
  </div>
    `;
  }

  emptyTableTemplate() {
    return `
      <div class="empty-table">
        На этот месяц нет настроенных планов,<br> пожалуйста добавьте план и настройте его
      </div>
    `;
  }

  optionYear(item) {
    return `
      <option value="${item}" class="select-year__option">${item}</option>
    `;
  }

  optionFunnels(item) {
    return `
      <option value="${item.idFunnel}">${item.funnelName}</option>
    `;
  }

  managerTemplate(item, index) {
    return `
      <div class="plans-menu__manager">
        <input manager-id type="checkbox" class="plans-manager__checkbox" id="manager_${index + 1}" data-id="${item.idByType}">
        <label for="manager_${index + 1}">${item.name}</label>
      </div>
    `;
  }
}

export default PlanTemplate;
