/* eslint-disable */

import AddPaymentMethod from './events/addPaymentMethod.js';
import Utils from '../../../../utils/utils.js';
import { paymentMethodAPI } from '../../../../api/api.js';

const addPaymentMethod = new AddPaymentMethod();
const utils = new Utils();

class PaymentMethods {
  init(props) {

    if (utils.getPage() === 'payment-method') {
      this.getLinks().then(() => {
        this.paymentMethods();
      });
    }
  }

  paymentMethods() {
    const linksBtns = document.querySelectorAll('.payment-methods__link');

    if (linksBtns.length) {
      const copyLinks = this.#copyLink.bind(this);

      linksBtns.forEach((item) => {
        item.addEventListener('click', copyLinks);
      });
    }

    var codeIcon;

    const updateMethodShop = async (formData) => {
      const request = await $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'updatePaymentMethodShop',
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success(data) {
        },
        error() {
          $('[js-update-method]').prop("disabled", false);
        },
      });

      return request;
    };

    const getPaymentMethodAPI = async () => {
      const request = await $.ajax({
        type: 'GET',
        url: 'getPaymentMethodApis',
        data: null,
        processData: false,
        contentType: 'application/json',
        dataType: 'json',
        cache: false,
        success(data) {
        },
        error() {
          $('[js-update-method]').prop("disabled", false);
        },
      });

      return request;
    };

    const updatePayment = async (formData) => {
      const request = await $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'updatePaymentMethod',
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success(data) {
        },
        error() {
          $('[js-update-method]').prop("disabled", false);
        },
      });

      return request;
    };

    function afterUpdateMethod(data) {
      const row = $(`[pm-id="${data.id}"]`).closest('.custom-table__body-row');

      $(row).find('[pm-id]').val(data.id);
      $(row).find('[pm-idshop]').val(data.idShop);
      $(row).find('[pm-passwordshop]').val(data.passwordShop);
      $(row).find('[pm-apikey]').val(data.apiCode);
      $(row).find('[payment-code]').val(data.code);
      $(row).find('[payment-name]').val(data.title);
      $(row).find('[pm-enable-selector]').val(data.isActive);

      setTimeout(() => {
          location.reload();
      }, 400);
    }

    function getAPIS(menu, isUpdate, e) {
      const getPaymentAPI = getPaymentMethodAPI();

      const showLoaderWrapper = showLoader.bind(this);

      const loader = setTimeout(showLoaderWrapper, 400);

      getPaymentAPI.then((data) => {
        $('body').css({ overflow: 'hidden' });
        clearTimeout(loader);
        hideLoader();
        openModalAnimation(menu);

        const selectAPI = menu.querySelector('[method-api-code]');

        $.each($.makeArray(selectAPI.children), (index, item) => item.remove());

        $(selectAPI).append($('<option>').attr('value', '0').text('Выберите ключ API'));

        $.each(data, (index, item) => {
          if (item.keyField !== 0) {
            const option = $('<option>').attr('value', item.keyField).text(item.valueField);
            $(selectAPI).append(option);
          }
        });

        if (isUpdate) {
          codeIcon = $(e.target).closest('.custom-table__body-row').find('[payment-code]').val();
          setPaymentMethodData(menu, e);
        }
      });
    }

    $(document).ready(function () {
      const $menuCreatePMBtn = $('[js-create-row]');
      const $menuCreatePMCloseBtn = $('[js-menu-create-row-close-btn]');
      const $menuCreatePM = $('[js-menu-create-row]');

      const $saveRowBtn = $('[js-save-row]');
      const $createRowForm = $('[js-row-form]');

      $menuCreatePMBtn.on('click', function (e) {
        const menu = document.querySelector('[js-menu-create-row]');

        getAPIS(menu, false, e);
      });

      $menuCreatePMCloseBtn.on('click', function () {
        $('body').css({ overflow: 'auto' });
        const menu = document.querySelector('[js-menu-create-row]');
        const wrapper = menu.querySelector('.platform-modal__wrapper')
        closeModalAnimation(menu, wrapper, false, false);

        $createRowForm.trigger('reset');
        checkBodyHidden()
      });

      $saveRowBtn.on('click', function (event) {
        event.preventDefault();
        $createRowForm.trigger('submit');
      });

      $saveRowBtn.on('dblclick', () => {
        toValidationError();
      });

      $('[js-menu-create-row]').find($createRowForm).submit(function (event) {
        event.preventDefault();

        if (validateForm(this)) {
          const nameItem = $(this).find('[js-row-form-title]');

          const currentName = nameItem.val();
          const uniqueName = !$.makeArray($('[payment-name]')).map((item) => $(item).text().toLowerCase().trim()).includes(currentName.toLowerCase().trim());

          if (uniqueName) {
            var formData = $('[js-menu-create-row]').find($createRowForm).serializeObject();
            createPaymentMethod(formData);
          } else {
            setError(nameItem.get(0), 'Имя должно быть уникальным');
          }
        }
      });

      initEditRowFromList();
      initCancelEditRowFromList();
      initAcceptEditUserFromList();

      changeSelectorIndicator();
    });

    function setError(item, text = 'Заполните поле', settings = false) {
      const error = document.createElement('div');
      error.classList.add('validate-error');
      error.innerText = text;

      const parent = item.parentElement;
      parent.classList.add('validate-error__wrapper');
      parent.appendChild(error);

      if (settings === 'contract') {
        error.style.transform = 'translateY(5px)';
      } else if (settings === 'planned-date') {
        error.style.transform = 'translateY(15px)';
      } else if (settings === 'planned-date-bill') {
        error.style.transform = 'translateY(30px)';
      }

      setTimeout(() => {
        parent.classList.remove('validate-error__wrapper');
        const errorElem = document.querySelector('.validate-error');

        errorElem.remove();
      }, 1500);
    }

    function changeSelectorIndicator() {
      $('.indicated-select select').on('change', function (event) {
        var vl = $('option:selected', this).attr('value');
        $(this).closest('.indicated-select').removeClassWild("indicated-select_*").addClass('indicated-select_' + vl);
      });
    }

    function createPaymentMethod(userData) {
      $('[js-save-row]').prop("disabled", true);
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "savePaymentMethod",
        data: JSON.stringify(userData),
        dataType: 'json',
        cache: false,
        success: function (data) {
          addRowToFrontList(data);

          $('body').css({ overflow: 'auto' });

          const menu = document.querySelector('[js-menu-create-row]');
          const wrapper = menu.querySelector('.platform-modal__wrapper')
          closeModalAnimation(menu, wrapper, false, false);

          checkBodyHidden();
          $('[js-row-form]').trigger('reset');
          $('[js-save-row]').prop("disabled", false);

          setTimeout(() => {
            location.reload();
          }, 400)
        },
        error: function (data) {
          $('[js-save-row]').prop("disabled", false);
        }
      });
    }

    function toValidationError() {
      const errors = document.querySelectorAll('.validate-error');

      if (errors.length) {
        const first = errors[0];

        first.previousElementSibling.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }

    //активация редактирования формы
    var ROW_INFO_TEMP = {};
    function initEditRowFromList() {

      $('[edit-row]').on('click', function (event) {
        event.preventDefault();
        $(this).closest('[edit-menu]').removeClass('is-open').siblings('[edit-btns]').addClass('is-open');
        var list = {};

        $(this).closest('.custom-table__body-row').find('[pm-enable-wrapper]').removeClass('disabled');
        $(this).closest('.custom-table__body-row').find('[pm-enable-selector]').removeAttr('disabled');
        var enable = $(this).closest('.custom-table__body-row').find('[pm-enable-selector]');
        list['enable'] = enable.val();

        $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
        ROW_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[pm-id]').val()] = list;
      });
    }
    function initCancelEditRowFromList() {
      $('[edit-row-cancel]').on('click', function (event) {
        event.preventDefault();
        var values = ROW_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[pm-id]').val()];

        $(this).closest('.custom-table__body-row').find('[pm-enable-wrapper]').removeClassWild("indicated-select_*").addClass('indicated-select_' + values.enable).addClass('disabled');
        $(this).closest('.custom-table__body-row').find('[pm-enable-selector]').val(values.enable).attr("disabled", true);

        $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
        delete ROW_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[pm-id]').val()];
      });
    }
    var ROW_ACCEPT_BTN;
    function initAcceptEditUserFromList() {
      $('[edit-row-accept]').on('click', function (event) {
        event.preventDefault();
        ROW_ACCEPT_BTN = $(this);

        var rowData = new Object();
        rowData.id = $(this).closest('.custom-table__body-row').find('[pm-id]').val();
        rowData.isActive = $(this).closest('.custom-table__body-row').find('[pm-enable-selector]').val();

        $('[edit-row-accept]').prop("disabled", true);
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: "updatePaymentMethod",
          data: JSON.stringify(rowData),
          dataType: 'json',
          cache: false,
          success: function (data) {
            ROW_ACCEPT_BTN.closest('.custom-table__body-row').find('[pm-enable-wrapper]').addClass('disabled');
            ROW_ACCEPT_BTN.closest('.custom-table__body-row').find('[pm-enable-selector]').val(data.isActive.toString()).attr("disabled", true);

            ROW_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
            delete ROW_INFO_TEMP[data.id];

            $('[edit-row-accept]').prop("disabled", false);
          },
          error: function (data) {
            var values = ROW_INFO_TEMP[rowData.id];

            ROW_ACCEPT_BTN.closest('.custom-table__body-row').find('[pm-enable-wrapper]').addClass('disabled');
            ROW_ACCEPT_BTN.closest('.custom-table__body-row').find('[pm-enable-selector]').val(values.isActive).attr("disabled", true);

            ROW_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');

            delete ROW_INFO_TEMP[data.id];
            $('[edit-row-accept]').prop("disabled", false);
          }
        });
      });
    }
    function addRowToFrontList(data) {
      initEditRowFromList();
      initCancelEditRowFromList();
      initAcceptEditUserFromList();

      changeSelectorIndicator();

      const tr = document.createElement('tr');
      tr.classList.add('custom-table__body-row');
      tr.innerHTML = rowTemplate(data);

      const header = $('.custom-table__header-row').get(0);

      const firstRow = header.nextElementSibling;

      firstRow.parentNode.insertBefore(tr, firstRow);

      $.each($('.custom-table__body-row'), (index, item) => {
        $(item).find('[counter]').text(index + 1);
      });
    }

    function rowTemplate(data) {
      return '<input type="hidden" pm-id value="' + data.id + '">' +
        '<input type="hidden" pm-idShop value="' + data.idShop + '">' +
        '<input type="hidden" pm-passwordShop value="' + data.passwordShop + '">' +
        '<input type="hidden" pm-apiKey value="' + (data.apiCode == 0 ? 0 : data.apiCode == '' ? '' : data.apiCode) + '">' +
        '<td counter class="custom-table__body-col"></td>' +
        '<td class="custom-table__body-col">' +
        '<input type="hidden" payment-code value="' + data.code + '">' +
        '<div class="column_pmethod column_pmethod_' + data.code + '"></div>' +
        '</td>' +
        '<td class="custom-table__body-col" payment-name>' + data.title + '</td>' +
        '<td class="custom-table__body-col custom-table__body-col_medium">' +
        '<div pm-enable-wrapper class="indicated-select menu-input__wrapper menu-input__wrapper_select indicated-select_true disabled">' +
        '<input type="hidden" payment-is-active value="' + data.isActive + '"></input>' +
        '<select pm-enable-selector class="editable menu-input__input menu-input__input_medium menu-input__input_select menu-input__input_white" disabled>' +
        '<option value="true" selected>Активен</option>' +
        '<option value="false">Не активен</option>' +
        '</select>' +
        '</div>' +
        '</td>' +
        '<td class="custom-table__body-col custom-table__body-col_last">' +
        '<div edit-menu class="column-links display-flex-none is-open">' +
        '<div edit-row-update class="column_mwidth div-table__body-col_center column_mwidth-edit column_mwidth-edit-b"></div>' +
        '</div>' +
        '</td>';
    }

    function validateForm(form) {
      $(form).validate({
        onkeyup: false,
        onfocusout: false,
        errorPlacement: function (label, element) {
          label.addClass('error-wrapper');
          label.insertAfter(element.parent().last());
        },
        wrapper: 'span'
      });
      $(form).rules('add', {
        messages: {
          required: 'Заполните это поле.',
        }
      });

      return $(form).valid();
    }

    function openModalAnimation(modal) {
      modal.classList.add('open');
      modal.classList.add('black');

      setTimeout(() => {
        modal.style.opacity = '1';
      }, 100);

      const filter = modal.querySelector('.filter__wrapper');

      if (filter) {
        setTimeout(() => {
          filter.style.top = '0'
        }, 100);
      } else {
        setTimeout(() => {
          const modalWindow = modal.querySelector('.platform-modal__wrapper');
          modalWindow.style.right = '0';
        }, 0);
      }
    }

    function closeModalAnimation(modal, wrapper, isFilter, isClientCard) {
      if (isFilter) {
        wrapper.style.top = '-150%';
      } else {
        wrapper.style.right = '-100%';
      }

      if (isClientCard) {
        setTimeout(() => {
          modal.style.opacity = '0';
        }, 400);

        setTimeout(() => {
          modal.classList.remove('open');
        }, 600);

        setTimeout(() => {
          modal.classList.remove('black');
        }, 600);
      } else {
        setTimeout(() => {
          modal.style.opacity = '0';
        }, 200);

        setTimeout(() => {
          modal.classList.remove('open');
        }, 400);

        setTimeout(() => {
          modal.classList.remove('black');
        }, 400);
      }
    }

    $(document).on('click', '[edit-row-update]', function (e) {
      const menu = $('[js-menu-update-method]');
      openModalAnimation($(menu).get(0));
      getAPIS(menu.get(0), true, e);
    });

    $(document).on('click', '[js-menu-update-method-close-btn]', function (e) {
      const menu = $('[js-menu-update-method]');
      $('body').css({ overflow: 'auto' });
      const wrapper = $(menu).find('.platform-modal__wrapper');
      closeModalAnimation($(menu).get(0), wrapper.get(0), false, false);
    });

    $(document).on('click', '[js-update-method]', function (e) {
      const menu = $('[js-menu-update-method]');
      const form = $(menu).find('[js-row-form]');

      if (validateMethod(form)) {
        var formData = form.serializeObject();

        const active = $(menu).find('[method-status]').val() === 'true';
        const id = +$(menu).find('[payment-method-id]').val();

        const apiCode = $(menu).find('[method-api-code]').val() === '' ? null : +$(menu).find('[method-api-code]').val();

        formData.isActive = active;
        formData.id = id;
        formData.apiCode = apiCode;

        updatePaymentMethod(formData);
      }
    });

    function validateMethod(form) {
      const name = $(form).get(0).querySelector('[js-row-form-title]');

      const icons = $.makeArray(form.find('[name="code"]'));

      return name.value && icons.some((el) => el.checked);
    }

    function updatePaymentMethod(formData) {
      $('[js-update-method]').prop("disabled", true);

      const updateShop = updateMethodShop(formData);

      updateShop.then(() => {
        const updateMethod = updatePayment(formData);

        updateMethod.then((data) => {
          $('body').css({ overflow: 'auto' });

          const menu = document.querySelector('[js-menu-update-method]');
          const wrapper = menu.querySelector('.platform-modal__wrapper');
          closeModalAnimation(menu, wrapper, false, false);

          $(menu).find('form').trigger('reset');
          $('[js-update-method]').prop("disabled", false);
          afterUpdateMethod(data);
        });
      });
    }

    function setPaymentMethodData(menu, e) {
      const t = e.target;

      const row = $(t).closest('.custom-table__body-row');

      const id = +$(row).find('[pm-id]').val();
      const idInput = $(menu).find('[payment-method-id]');
      idInput.val(id);

      const name = $(row).find('[payment-name]').text();
      $(menu).find('[js-row-form-title]').val(name);

      const idShop = $(row).find('[pm-idShop]').val();
      $(menu).find('[js-row-form-id-shop]').val(idShop);

      const password = $(row).find('[pm-passwordShop]').val();
      $(menu).find('[js-row-form-password-shop]').val(password);

      const apiKey = $(row).find('[pm-apiKey]').val();
      $(menu).find('[method-api-code]').get(0).value = apiKey;

      const isActive = $(row).find('[payment-is-active]').val();
      $(menu).find('[method-status]').get(0).value = isActive === 'true';

      const code = $(row).find('[payment-code]').val();

      const icon = $.makeArray($('.update[name="code"]')).find((el) => el.value === code);

      if (icon) {
        icon.checked = true;
      }
    }

    function validationInputNuber(t, data = false, splitter = false, onlyDigit = false) {
      const { value } = t;

      const digits = value.split('.').length === 1 ? !Number.isNaN(+value) : null;
      const fraction = value.split('.').length === 2 ? !Number.isNaN(+value.split('.')[1]) : null;

      const validationData = {
        digits,
        fraction,
        t,
        data,
        onlyDigit,
      };

      if (splitter) {
        validationData.splitter = splitter;
        this.validationSplitter(validationData);
      } else {
        this.validationDigit(validationData)
      }
    }

    function validationSplitter(validationData) {
      const { t, splitter, digits, fraction, onlyDigit } = validationData;

      let isValidate;

      if (t.hasAttribute('js-bill-layer-value')) {
        const isSplitter = t.value.split(splitter).length === 2;
        const endPercent = t.value.split('').filter(el => el === '%').length;

        if (onlyDigit) {
          isValidate = digits || (isSplitter && endPercent);
        } else {
          isValidate = digits || fraction || (isSplitter && endPercent);
        }
      } else {
        isValidate = digits || fraction;
      }

      if (!isValidate) {
        const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');

        t.value = valueInput;
      } else {
        const instance = t.value.split('');
        const index = instance.findIndex(el => (el !== '.' && el !== '%' && isNaN(+el)));

        if (index !== -1) {
          instance.splice(index, 1);
          t.value = instance.join('');
        }
      }
    }

    function validationDigit(validationData) {
      const { data, t, digits, fraction } = validationData;

      const inData = digits ?? fraction;

      if (inData) {
        if (data) {
          data.regularRate = +t.value;
        }
      } else {
        const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');
        t.value = valueInput;

        if (data) {
          data.regularRate = +valueInput;
        }
      }
    }

    $(document).on('input', '[js-row-form-id-shop]', (e) => {
      const t = e.target;
      validationInputNuber(t);
    });
  }

  #copyLink(e) {
    const t = e.target;

    const link = t.getAttribute('data-link');

    console.log(link);

    utils.copyLink(link);
  }

  async getLinks() {
    const links = document.querySelectorAll('.payment-methods__link');

    if (links.length) {
      links.forEach(async (item) => {
        const idShop = item.getAttribute('data-id-shop');

        if (idShop) {
          const link = await paymentMethodAPI.getLink(idShop);

          await item.setAttribute('data-link', link.forCallback);
  
          console.log(item);
        }
      });
    }
  }
}

export default PaymentMethods;
