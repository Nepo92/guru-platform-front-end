import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class IContractTemplate {
  settingsContractMenuTemplate(contract) {
    const name = contract?.name || '';
    const link = contract?.link || '';

    return `
      <div class="contract-menu__item">
        <p class="contract-menu__name">Имя *</p>
        <input contract-name type="text" value="${name}" class="contract__input" required placeholder="Введите имя договора">
      </div>
      <div class="contract-menu__item">
        <p class="contract-menu__name">Выберите тип документа *</p>
        <div class="contract__select" select-here data-select-type="select-contract"></div>
      </div>
      <div class="contract-menu__item">
        <p class="contract-menu__name">Ссылка *</p>
        <input contract-link type="text" value="${link}" class="contract__input" required placeholder="Введите ссылку">
      </div>
    `;
  }

  setContract(data) {
    const { pack } = data;
    const { contracts } = pack;

    const table = document.querySelector('.contract__table tbody');

    utils.removeChildren(table, 0);

    const template = this.contractTemplate.bind(this);

    const typeContracts = this.getContractTypeCode();

    const contractsTemplates = contracts.sort((a, b) => b.id - a.id).filter((el) => el.code === typeContracts).map(template).join('');

    table.children[0].insertAdjacentHTML('afterend', contractsTemplates);
  }

  contractTemplate(contract, count) {
    const isOferta = contract.type === 0 ? 'Договор оферты' : '';
    const isConfidentiality = contract.type === 1 ? 'Политика конфиденциальности' : '';

    const contractType = isOferta || isConfidentiality || '';

    const createDate = utils.getDateFormatDDMMYYYY(contract?.createDate) || '&mdash;';
    const contractId = contract?.id ? `data-id=${contract.id}` : '';
    const contractName = contract?.name || '&mdash;';
    const userName = contract?.userName || '&mdash;';
    const isActive = contract.active ? 'Активен' : 'Не активен';

    return `
      <tr class="contract__row" ${contractId}>
        <td class="contract__cell date">${createDate}</td>
        <td class="contract__cell type">${contractType}</td>
        <td need-disable title="${contractName}" class="contract__cell contract-disable">
          <input type="text" contract-name value="${contractName}" class="contract__input contract-name">
        </td>
        <td class="contract__cell who">${userName}</td>
        <td class="contract__cell status contract-status ${contract.active ? 'active' : 'disable'}">
          <input type="radio" class="platform__checkbox" name="contract_${contract.type}" id="status_${count}" ${contract.active ? 'checked="true"' : ''}">
          <label class="platform-checkbox__label" for="status_${count}">
            <span class="platform__checkbox--fake"></span>
            <span class="contract-status__text">
              ${isActive}
            </span>
          </label>
        </td>
        <td class="contract__cell edit-contract">
          <div class="edit-contract__nav">
            <span class="edit-contract__edit-icon"></span>
            <span class="edit-contract__remove-icon"></span>
          </div>
        </td>
      </tr>
    `;
  }

  getContractTypeCode() {
    const tabs = document.querySelectorAll('.platform-tabs__link');

    if (tabs.length) {
      const current = Array.from(tabs).find((el) => el.classList.contains('active'));

      if (current) {
        return +current.getAttribute('data-type');
      }
    }
  }
}

export default IContractTemplate;
