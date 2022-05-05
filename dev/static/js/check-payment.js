var CHANGE_BTN;
var RADIO_BTN;
var PAYFORM;
var PAYDATE_TEMP;

var notfound;
var found;

function checkStatusTransaction() {
  const form = $('[js-status-form]');

  $.each(form, (index, item) => {
    found = $(item).find($('[js-status-found]'));
    notfound = $(item).find($('[js-status-notfound]'));

    // const form = $(item).closest('[js-status-form]');
    // $(form).closest('.body__row').find('.column_bstatus').removeClassWild('column_bstatus_*');

    if (found.is(':checked') && !notfound.is(':checked')) {
      notfound.prop('checked', false)
      notfound.prop('disabled', true);
      // $(form).closest('.body__row').find('.column_bstatus').addClass('column_bstatus_checked');
    }

    if (notfound.is(':checked') && !found.is(':checked')) {
      found.prop('checked', false)
      found.prop('disabled', true);
      // $(form).closest('.body__row').find('.column_bstatus').addClass('column_bstatus_notfound');
    }
  });
}

$(document).ready(function () {
  initFancy();
  checkStatusTransaction()
  $('.check-payment').css({ pointerEvents: 'all' });

  $('[js-change-amount]').on('keyup change', function () {
    $(this).siblings('[js-change-amount-btn]').addClass('block');
  })

  $('[js-change-amount-btn]').on('click', function (event) {
    event.preventDefault();
    CHANGE_BTN = $(this);
    $(this).closest('[js-change-amount-form]').trigger('submit');
  })

  $('[js-change-amount-form]').on('submit', function (event) {
    event.preventDefault();
    updateSum($(this).serializeObject());
  });

  //обновление статуса
  $('[js-status-found]').on('change', function (event) {
    RADIO_BTN = $(this);

    found = $(this).parent().parent().parent().find('[js-status-found]');
    notfound = $(this).parent().parent().parent().find('[js-status-notfound]');

    const form = $(this).closest('[js-status-form]');

    if ($(found).is(':checked')) {
      notfound.prop('checked', false);
      notfound.prop('disabled', true);
      $('.nonchecked-input').remove();
    } else {
      $('.nonchecked-input').remove();
      form.append($('<input>').attr('type', 'hidden').attr('value', '1').attr('name', 'status').attr('class', 'nonchecked-input'))
      notfound.prop('checked', false);
      notfound.prop('disabled', false);
    }

    updateStatus($(form).serializeObject());
  });

  $('[js-status-notfound]').on('change', function (event) {
    RADIO_BTN = $(this);

    found = $(this).parent().parent().parent().find('[js-status-found]');
    notfound = $(this).parent().parent().parent().find('[js-status-notfound]');

    const form = $(this).closest('[js-status-form]');

    if ($(notfound).is(':checked')) {
      $('.nonchecked-input').remove();
      found.prop('checked', false);
      found.prop('disabled', true);
    } else {
      $('.nonchecked-input').remove();
      form.append($('<input>').attr('type', 'hidden').attr('value', '1').attr('name', 'status').attr('class', 'nonchecked-input'))
      found.prop('checked', false);
      found.prop('disabled', false);
    }

    updateStatus($(form).serializeObject());
  });

  //обновление типа оплаты
  $('[js-change-pm-selector]').on('change', function (event) {
    event.preventDefault();

    $(this).removeClassWild("column_pmethod_*");
    var pm = $('option:selected', this).attr('value');
    var code = $('option:selected', this).attr('data-code');
    $(this).addClass("column_pmethod_" + code);

    $(this).closest('[js-change-pm-form]').trigger('submit');
  });

  $('[js-change-pm-form]').on('submit', function (event) {
    event.preventDefault();
    updatePaymentMethod($(this).serializeObject());
  });

  $('[js-pay-date]').on('click', function () {
    PAYFORM = $(this).closest('[js-pay-form]');
    PAYDATE_TEMP = $(this).val();
  });

  $('[js-pay-date]').on('keydown', function (event) {
    return false;
  });

  $('[js-pay-form]').submit(function (event) {
    event.preventDefault();
    updateBillPayDate($(this).serializeObject());
  });

  initDatePicker();
})

function updateStatus(formData) {
  $('[js-status]').prop("disabled", true);

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "updateStatus",
    data: JSON.stringify(formData),
    dataType: 'json',
    cache: false,
    success: function (data) {
      $('[js-status]').prop("disabled", false);
      var form = RADIO_BTN.closest('[js-status-form]');
      form.closest('.body__row').find('.column_bstatus').removeClassWild('column_bstatus_*');

      if (formData['status'] === "2") {
        form.closest('.body__row').find('.column_bstatus').addClass('column_bstatus_checked');
        $(notfound).prop('disabled', true);
      } else {
        form.closest('.body__row').find('.column_bstatus').addClass('column_bstatus_unchecked');
      }
    },
    error: function (data) {
      $('[js-status]').prop("disabled", false);
    }
  });
}

function updateBillPayDate(formData) {
  $('[js-pay-date]').prop("disabled", true);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "updateBillPayDate",
    data: JSON.stringify(formData),
    dataType: 'json',
    cache: false,
    success: function (data) {
      $('[js-pay-date]').prop("disabled", false);
    },
    error: function (data) {
      PAYFORM.find('[js-pay-date]').val(PAYDATE_TEMP);
      $('[js-pay-date]').prop("disabled", false);
    }
  });
}

function updateSum(formData) {
  $('[js-change-amount-btn]').prop("disabled", true);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "updateSum",
    data: JSON.stringify(formData),
    dataType: 'json',
    cache: false,
    success: function (data) {
      CHANGE_BTN.removeClass('block');
      $('[js-change-amount-btn]').prop("disabled", false);
    },
    error: function (data) {
      $('[js-change-amount-btn]').prop("disabled", false);
    }
  });
}

function updatePaymentMethod(formData) {
  $('[js-change-pm-selector]').prop("disabled", true);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "updatePaymentMethod",
    data: JSON.stringify(formData),
    dataType: 'json',
    cache: false,
    success: function (data) {
      $('[js-change-pm-selector]').prop("disabled", false);
    },
    error: function (data) {
      $('[js-change-pm-selector]').prop("disabled", false);
    }
  });
}

function initDatePicker() {
  $('.datepicker-here-b').datepicker({
    autoClose: true,
    onSelect: function (formattedDate, date, inst) {
      PAYFORM.trigger('submit');
    }
  });
}

function initFancy() {
  $('[data-fancybox]').fancybox({
    infobar: false,
    buttons: [
      "close"
    ],
  });
}
