class CleanerTemplate {
  copiesTemplate(wrapper, item, index) {
    const [name, coincedence] = item;

    this.setMainRow(name, wrapper, index, coincedence);
    this.setClientsList(coincedence, index, wrapper);
  }

  setMainRow(name, wrapper, index, coincedence) {
    const li = document.createElement('li');
    li.classList.add('coincedence__item');
    li.setAttribute('coincedence', '');
    li.setAttribute('data-index', index);

    li.innerHTML = this.getCoincedenceItemTemplate(name, coincedence);

    wrapper.appendChild(li);
  }

  setClientsList(coincedence, index, wrapper) {
    const coincedenceItem = this.coincedenceItem.bind(this);
    const clients = coincedence.map(coincedenceItem);

    const clientList = document.createElement('ul');
    clientList.classList.add('coincedence-client__list');
    clientList.setAttribute('coincedence-list', '');
    clientList.setAttribute('data-index', index);

    clientList.innerHTML = clients.join('');

    wrapper.appendChild(clientList);
  }

  getCoincedenceItemTemplate(name, coincedence) {
    return `
      <span class="analytic__toggle-wrapper coincedence__toggle-wrapper">
        <span class="analytic__toggle coincedence__toggle"></span>
      </span>
      <div class="coincedence__info">
        <p coincedence class="coincedence__name">${name.trim() || 'Не заполнено'}</p>
        <p coincedence class="coincedence__quanity">${coincedence.length} шт</p>
      </div>
    `;
  }

  coincedenceItem(item) {
    return `
        <li class="coincedence-client__item" data-id="${item.id}">
          <div class="coincedence__client--left">
            <p class="coincedence-client__name" title="${item.name?.trim() || '&mdash;'}">${item.name?.trim() || '&mdash;'}</p>
            <p class="coincedence-client__email" title="${item.email?.trim() || '&mdash;'}">${item.email?.trim() || '&mdash;'}</p>
            <p class="coincedence-client__tel" title="${item.phone?.trim() || '&mdash;'}">${item.phone?.trim() || '&mdash;'}</p>
            <p class="coincedence-client__link" title="${item.link?.trim() || '&mdash;'}">${item.link?.trim() || '&mdash;'}</p>
            <p class="coincedence-client__telegram" title="${item.telegram?.trim() || '&mdash;'}">${item.telegram?.trim() || '&mdash;'}</p>
          </div>
          <span class="coincedence-client__remove"></span>
        </li>
      `;
  }
}

export default CleanerTemplate;
