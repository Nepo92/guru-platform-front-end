import SelectOptions from '../../../utils/selectOptions/selectOptions.js';

const selectOptions = new SelectOptions();

class TempateSelect {
  customSelectTemplate(selectItem, pack) {
    const {
      type,
    } = selectItem;

    selectItem.options = this.dispatchOptionsInSelect(selectItem, pack) || '';

    switch (type.trim()) {
      case 'select-product':
      case 'select-managers':
      case 'select-products':
      case 'select-employees':
      case 'select-projects':
      case 'select-deal-type':
      case 'select-social':
      case 'select-tariff':
      case 'select-funnel':
      case 'select-payment-method':
      case 'select-multiply-date':
      case 'select-contract-status':
      case 'select-contract':
      case 'status-deal':
      case 'select-stream': {
        return this.customSelectTeplate(selectItem);
      }
      case 'select-status': {
        return this.dealStatusSelectTemplate(selectItem);
      }
      default: {
        break;
      }
    }
  }

  customSelectTeplate(selectItem) {
    const {
      required,
      placeholder,
      mode,
      name,
      options,
      defaultValue,
      defaultPlaceholder,
      openUp,
      type,
    } = selectItem;

    const placeholderValue = defaultPlaceholder || (placeholder || '');

    const isDealCardSelect = type === 'status-deal';

    return `
      <div data-mode="${mode}" data-select-adaptive="${openUp || 'false'}" select class="select platform__select mt_5 ${isDealCardSelect ? 'b_0' : ''}">
        <input ${name ? `name="${name}"` : ''} type="hidden" value="${defaultValue || ''}" id-selected ${required ? 'required' : ''}>
        <div select-head class="select__head ${isDealCardSelect ? 'select-deal-card__head' : ''}" title="${placeholderValue}">
          <span class="select-head__placeholder">${placeholderValue}</span>
        </div>
        <div select-body class="select__body">
          ${placeholder ? `
            <div value class="select__option no-icon">
              ${placeholder}
            </div>` : ''}
          ${options || ''}
        </div>
      </div>
    `;
  }

  dealStatusSelectTemplate(selectItem) {
    const {
      defaultValue,
      defaultCode,
      defaultPlaceholder,
      mode,
      name,
      required,
      placeholder,
      options,
      type,
      openUp,
    } = selectItem;

    const addedClassProps = {
      type,
      defaultCode,
      required,
      mode,
    };

    let placeholderValue = defaultPlaceholder || (placeholder || '');

    if (placeholderValue === 'Рассрочка') {
      placeholderValue = 'Долями';
    }

    const addedClass = this.getAddedClass(addedClassProps);

    return `
      <div data-mode="${mode}" data-select-adaptive="${openUp || 'false'}" select class="select platform__select ${addedClass}">
        <input ${name ? `name="${name}"` : ''} type="hidden" value="${defaultValue}" id-selected ${required ? 'required' : ''}>
        <div select-head class="select__head" title="${placeholderValue}">
          <span class="select-head__placeholder">${placeholderValue}</span>
        </div>
        <div select-body class="select__body">
          ${placeholder ? `
            <div value class="select__option select__option--status no-icon">
              ${placeholder}
            </div>` : ''}
            ${options || ''}
        </div>
      </div>`;
  }

  getAddedClass(props) {
    const {
      type,
      defaultCode,
      mode,
      required,
    } = props;

    const isStatusSelect = type === 'select-status' ? `deal-status__form_${defaultCode}` : '';

    const classType = isStatusSelect;

    const selectRequired = mode === 'custom' && !required ? 'deal-status__select' : false;
    const selectUnReequired = mode === 'custom' && required ? 'mt_5' : false;

    const classMode = selectRequired || selectUnReequired;

    return `${classType} ${classMode}`;
  }

  dispatchOptionsInSelect(selectItem, pack) {
    const { type } = selectItem;

    switch (type) {
      case 'select-managers': {
        const managers = pack?.analyticsFilterData?.managers;

        const setOptionsManagers = selectOptions.optionManagers.bind(selectOptions);

        return managers?.map(setOptionsManagers).join('');
      }
      case 'select-products': {
        const courses = pack?.analyticsFilterData?.courses;

        const setOptionsProducts = selectOptions.optionProducts.bind(selectOptions);

        return courses?.map(setOptionsProducts).join('');
      }
      case 'select-employees': {
        const employees = pack?.analyticsFilterData?.employees;

        const setOptionEmployees = selectOptions.optionEmployees.bind(selectOptions);

        return employees?.map(setOptionEmployees).join('');
      }
      case 'select-projects': {
        const projects = pack?.analyticsFilterData?.projects;

        const setOptionEmployees = selectOptions.optionProject.bind(selectOptions);

        return projects?.map(setOptionEmployees).join('');
      }
      case 'select-deal-type': {
        const saleType = pack?.saleType;

        const setOptionSaleType = selectOptions.optionSaleType.bind(selectOptions);

        return saleType?.map(setOptionSaleType).join('');
      }
      case 'status-deal':
      case 'select-status': {
        const dealStatuses = pack?.dealStatuses;

        const setStatusOptions = selectOptions.setStatusOptions.bind(selectOptions);

        return dealStatuses?.map(setStatusOptions).join('');
      }
      case 'select-social': {
        const social = pack?.social;

        const setSocialOptions = selectOptions.setSocialOptions.bind(selectOptions);

        return social?.map(setSocialOptions).join('');
      }
      case 'select-product': {
        const products = pack?.products;

        const setProductOptions = selectOptions.setProductOptions.bind(selectOptions);

        return products?.map(setProductOptions).join('');
      }
      case 'select-tariff': {
        const tariffs = pack?.tariffs;

        const setTariffsOptions = selectOptions.setTariffsOptions.bind(selectOptions);

        return tariffs?.map(setTariffsOptions).join('');
      }
      case 'select-stream': {
        const streams = pack?.streams;

        const setStreamsOptions = selectOptions.setStreamsOptions.bind(selectOptions);

        return streams && Array.isArray(streams) ? streams?.map(setStreamsOptions).join('') : false;
      }
      case 'select-payment-method': {
        const paymentMethods = pack?.paymentMethods;

        const setPaymentMethodsOptions = selectOptions.setPaymentMethodsOptions.bind(selectOptions);

        return paymentMethods?.map(setPaymentMethodsOptions).join('');
      }
      case 'select-multiply-date': {
        const streams = pack?.streams;
        const setOptions = selectOptions.setDateToSelectInPaymentFormBuilder.bind(selectOptions);

        return streams?.map(setOptions).join('');
      }
      case 'select-contract-status': {
        const contractStatus = [true, false];

        const setOptionsContract = selectOptions.setContractOptions.bind(selectOptions);

        return contractStatus?.map(setOptionsContract).join('');
      }
      case 'select-contract': {
        const contractStatus = [
          {
            name: 'Договор оферты',
            value: 'oferta',
          },
          {
            name: 'Политика конфиденциальности',
            value: 'confidentiality',
          },
        ];

        const setContractTypeOptions = selectOptions.setContractTypeOptions.bind(selectOptions);

        return contractStatus?.map(setContractTypeOptions).join('');
      }
      case 'select-funnel': {
        const funnels = Object.entries(pack?.funnels);

        let currentFunnels;

        funnels.forEach((item) => {
          item[1].forEach((el) => {
            if (selectItem.defaultValue === el.idFunnel) {
              [, currentFunnels] = item;
            }
          });
        });

        const setOptionFunnels = selectOptions.setOptionFunnels.bind(selectOptions);

        return currentFunnels?.map(setOptionFunnels).join('');
      }
      default: {
        break;
      }
    }
  }
}

export default TempateSelect;
