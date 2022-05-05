var $coursesList = courses;
var $saleTypes;
var $statusesList;
var idSavedDeal;
var idDeal;

function sortingArray(array) {
    return array.sort((a, b) => {
        const year = `${new Date().getFullYear()}`.split('')[0] + `${new Date().getFullYear()}`.split('')[1];
        const yearResultOne = year + a.reminderDate.split('.')[2];

        let monthResultOne;

        if (a.reminderDate.split('.')[1].split('')[0] === '0') {
            monthResultOne = +a.reminderDate.split('.')[1].split('')[1];
        } else {
            monthResultOne = +a.reminderDate.split('.')[1];
        }

        let dayResultOne;

        if (a.reminderDate.split('.')[0].split('')[0] === '0' === '0') {
            dayResultOne = +a.reminderDate.split('.')[0].split('')[1];
        } else {
            dayResultOne = +a.reminderDate.split('.')[0];
        }

        const yearResultTwo = year + b.reminderDate.split('.')[2];

        let monthResultTwo;

        if (b.reminderDate.split('.')[1].split('')[0] === '0') {
            monthResultTwo = +b.reminderDate.split('.')[1].split('')[1];
        } else {
            monthResultTwo = +b.reminderDate.split('.')[1];
        }

        let dayResultTwo;

        if (b.reminderDate.split('.')[0].split('')[0] === '0') {
            dayResultTwo = +b.reminderDate.split('.')[0].split('')[1];
        } else {
            dayResultTwo = +b.reminderDate.split('.')[0];
        }

        const dateOne = new Date(+yearResultOne, monthResultOne - 1, dayResultOne);
        const dateTwo = new Date(+yearResultTwo, monthResultTwo - 1, dayResultTwo);

        return dateTwo.getTime() - dateOne.getTime();
    });
}

const dealAPI = {
    getCoursesList: function () {
        $coursesList = courses;
    },
    startDate: function (data) {
        $.ajax({
            type: "GET",
            url: `/api/deals/getStreamsByIdCourse/${data}`,
            data: null,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                var seloption = '<option value="" disabled selected>Выберите дату старта</option>';
                $.each(data, function (index, stream) {
                    seloption += '<option value="' + stream.id + '">' + stream.startDate + '</option>';
                });

                const selector = $('[js-deal-form-start-date]');

                selector.html(seloption);
            },
            error: function (data) {
            },
        });
    },
    getSaleTypes: function () {
        $.ajax({
            type: "GET",
            url: "/api/deals/getSaleTypes",
            data: null,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                $saleTypes = data;
            },
            error: function (data) {
            },
        });
    },
    getDealStatus: async function getStatuses() {
        const response = $.ajax({
            type: "GET",
            url: "/api/deals/getDealStatuses",
            data: null,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                $statusesList = data;
            },
            error: function (data) {
            }
        });

        return await response;
    },
    getPaymentMethods: async function () {
        const request = $.ajax({
            type: "GET",
            url: "/api/deals/getPaymentMethods",
            data: null,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
            },
            error: function (data) {
            }
        });

        return await request;
    },
    changeBlockEnabled: async function (data) {
        const request = $.ajax({
            type: "POST",
            url: "/api/deals/changeClientCourseBlockEnabled",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            success: function () {
            },
            error: function () {
            }
        });

        return await request;
    }
};

$(document).on('submit', '[js-update-form-reminder]', function (event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        updateReminder(formData);
    }
});

function setSaleTypes(saleTypes) {
    $('#u-product-types').children().remove();
    $('#u-product-types').append($('<option>').attr('value', '0').html('Выберите тип продукта'));

    const type = $.map(saleTypes, (item, index) => {
        return `
        <option value="${item.code}" data-id="${item.id}" ${index === 0 ? 'selected' : ''}>${item.name}</option>
      `;
    });

    $('#u-product-types').append(type);
}

var OLD_SELECTOR_VALUE = 0;
$(document).on('focusin', '[check-target-status]', function (event) {
    OLD_SELECTOR_VALUE = +$('option:selected', this).val();

    if (OLD_SELECTOR_VALUE === 1) {
        $(this).closest('form').find('[not-target]').removeClass('is-open').addClass('menu-input_close');
    }
});

$(document).on('change', '[check-target-status]', function (event) {
    if (+$('option:selected', this).val() === 1) {
        $(this).closest('form').find('[not-target]').removeClass('is-open').addClass('menu-input_close');
    } else {
        $(this).closest('form').find('[not-target]').find('.product').removeClass('menu-input_close').addClass('is-open');
        $(this).closest('form').find('[not-target]').find('[start-date-block]').removeClass('menu-input_close').addClass('is-open');
        checkCreateDealProductTypes();
    }
});

function checkCreateDealProductTypes() {
    if ($('[product-types] option').length <= 2) {
        $('[product-types-block]').removeClass('is-open');

        var optionVal = $('[product-types] option:last').val();
        $('[product-types]').val(optionVal).trigger('change');
    } else {
        $('[product-types-block]').addClass('is-open');
    }
}

function changeIndicatorColor(value, str) {
    if (str === 'important') {
        value = '#d9d9d9';
    } else if (str === 'prepaid') {
        value = '#f9ed5d';
    } else if (str === 'reservation') {
        value = '#4a86e8';
    } else if (str === 'installment') {
        value = '#ff852f';
    } else if (str === 'successfully') {
        value = '#01fe03';
    } else if (str === 'closed') {
        value = '#e06665';
    } else if (str === 'unknown') {
        value = 'rgba(217, 20, 0, 0.44)';
    }

    return value;
}

function dealWrapperHeight() {
    const dealCard = $('.deal-card');
    const dealList = [];
    const marginDeal = Math.ceil(dealCard.length / 3 - 1) * 20 + '';

    $.each(dealCard, (index, item) => {
        if (dealCard.length !== 0) {
            dealList.push(dealCard.splice(0, 3));
        }
    });

    let dealHeight = 0;
    $.each(dealList, (index, item) => {
        const itemHeight = item.map(elem => elem.clientHeight);
        if (itemHeight !== undefined) {
            const itemHeightSort = itemHeight.sort((a, b) => b - a);

            if (itemHeightSort[0] && itemHeightSort[0] !== undefined && !isNaN(itemHeightSort[0])) {
                dealHeight += +itemHeightSort[0];
            }
        }
    });

    const dealWrapper = $('[js-deals-list]');

    $(dealWrapper).css({height: +`${dealHeight}` + +`${marginDeal}` + 'px'});
}

function dealCreateHeight() {
    const sibling = $('.deal_create').parent().children('.deal-card');
    const siblingHeight = $(sibling[sibling.length - 2]).height();

    $('.deal_create').css({height: `${siblingHeight}`});

    if ($('.deal-card').length === 1) {
        $('.deal_create').css({height: '451px'});
    }
}

$(document).on('click', '.datepicker-here', function (event) {
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});

$(document).on('click', '.datepicker-here-deal', function (event) {
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});

$(document).on('click', '.datepicker-here-cs', function (event) {
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});

$(document).on('click', '.datepicker-here-pay', function (event) {
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});

//список способов оплаты
var $paymentMethodList;

function setPaymentMethodList(paymentMethodList) {
    $paymentMethodList = paymentMethodList;
}

//изменение чекера напоминания при редактировании сделки
$(document).on('click', '[js-update-open-reminder]', function (event) {
    $('[js-update-form-deal-reminder-btn]').removeClass('is-open');
    $('[js-update-form-deal-reminder-block]').addClass('is-open');
    $('[js-update-form-deal-reminder-date]').val('');
    $('[js-update-form-deal-reminder-msg]').val('');
    $('[js-update-form-deal-reminder]').prop("checked", true);
});

//изменение чекера напоминания при редактировании сделки закрытие
$(document).on('click', '[js-update-close-reminder]', function (event) {
    $('[js-update-form-deal-reminder-btn]').addClass('is-open');
    $('[js-update-form-deal-reminder-block]').removeClass('is-open');
    $('[js-update-form-deal-reminder-date]').val('—');
    $('[js-update-form-deal-reminder-msg]').val('');
    $('[js-update-form-deal-reminder]').prop("checked", false);
});

//в меню редактирования
$(document).on('change', '[js-update-form-deal-sale-type]', function (event) {
    setFunnelsToDeals($(this).val(), funnels);

    if ($(this).val() === 'traffic') {
        $('[js-update-form-deal-mailing-block]').addClass('is-open');
    } else {
        $('[js-update-form-deal-mailing-block]').removeClass('is-open');
        $('[js-update-form-deal-mailing]').prop('checked', false);
    }
});

//в меню редактирования
$(document).on('change', '[js-update-form-deal-pr]', function (event) {
    $('[js-update-form-deal-price]').val($('option:selected', this).attr('data-price'));
    $('[js-update-form-deal-product-type]').val($('option:selected', this).attr('data-type'));

    $('[js-update-form-deal-product-id]').val($('option:selected', this).attr('data-id'));

    $list = createKindList($('option:selected', this).val());
    if ($list) {
        if ($list.length > 0) {
            $('[js-update-form-kind]').html(createKindOptions($list));
            $('[js-update-form-kind-block]').addClass('is-open');
        } else {
            $('[js-update-form-kind-block]').removeClass('is-open');
            $('[js-update-form-kind]').html('');
        }
    }


    if ($('[u-product-types]').val() == 'курс') {
        setStreams($('[js-update-form-deal-start-date]'), $('option:selected', this).attr('data-id'));
    }

    if ($('[product-types]').val() == 'курс') {
        setStreams($('[js-update-form-deal-start-date]'), $('option:selected', this).attr('data-id'));
    }

    const selected = $('[js-update-form-deal-pr] option:selected').get(0);

    setTariffs(null, 'modify', selected);
});

//в меню создания
$(document).on('change', '[js-deal-form-sale-type]', function (event) {
    setFunnelsToDeals($(this).val(), funnels);

    if ($(this).val() === 'traffic') {
        $('[js-deal-form-mailing-block]').addClass('is-open');
        checkBodyHidden()
    } else {
        $('[js-deal-form-mailing-block]').removeClass('is-open');
        $('[js-deal-form-mailing]').prop('checked', false);
        checkBodyHidden()
    }
});
//в меню создания
$(document).on('change', '[js-deal-form-product]', function (event) {
    $('[js-deal-form-price]').val($('option:selected', this).attr('data-price'));
    $('[js-deal-form-product-type]').val($('option:selected', this).attr('data-type'));
    $('[js-deal-form-product-id]').val($('option:selected', this).attr('data-id'));

    $list = createKindList($('option:selected', this).val());

    if ($list) {
        if ($list.length > 0) {
            $('[js-deal-form-kind]').html(createKindOptions($list));
            $('[js-deal-form-kind-block]').addClass('is-open');
        } else {
            $('[js-deal-form-kind-block]').removeClass('is-open');
            $('[js-deal-form-kind]').html('');
        }
    }


    if ($('[product-types]').val() == 'курс') {
        setStreams($('[js-deal-form-start-date]'), $('option:selected', this).attr('data-id'));
    }

    dealAPI.startDate($('option:selected', this).data('id'));

    const selected = $('[js-deal-form-product] option:selected').get(0);

    setTariffs(null, 'add', selected);
});


function setStreams(selector, idCourse) {
    var formData = new FormData();
    formData.set('idCourse', Number(idCourse));

    $.ajax({
        type: "POST",
        url: "/transactions/getStreamsByIdCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var seloption = '<option value="" disabled selected>Выберите дату старта</option>';
            $.each(data, function (index, stream) {
                seloption += '<option value="' + stream.id + '">' + stream.startDate + '</option>';
            });
            selector.html(seloption);
        },
        error: function (data) {
        }
    });
}

$(document).ready(function () {
    $('.datepicker-here-deal').datepicker({
        autoClose: true,
        maxDate: new Date(),
        todayButton: true
    });

    $('.datepicker-here').datepicker({
        autoClose: true,
        todayButton: true
    });

    const $menuClientCard = $('[js-menu-client-card]');
    const $menuClientCardCloseBtn = $('[js-menu-client-card-close-btn]');
    //закрытие карточки клиента
    $menuClientCardCloseBtn.on('click', function () {
        // $menuSearch.removeClass('is-open');
        $menuCreateClient.removeClass('is-open');
        $menuClientCard.removeClass('is-open');
        checkBodyHidden();
    });


    const $menuUpdateDeal = $('[js-menu-update-deal]');
    const $menuUpdateDealCloseBtn = $('[js-menu-update-deal-close-btn]');
    //закрытие редактирование сделки
    $menuUpdateDealCloseBtn.on('click', function () {
        $menuUpdateDeal.removeClass('is-open');
        checkBodyHidden()
    });


    const $menuBillsCloseBtn = $('[js-menu-bills-close-btn]');
    const $menuBills = $('[js-menu-bills]');
    //закрытие меню счетов
    $menuBillsCloseBtn.on('click', function () {
        $menuBills.removeClass('is-open');
        checkBodyHidden();
        BILLS_TEMP_INFO = {};
    });

    const $menuSearchCloseBtn = $('[js-menu-search-close-btn]');
    const $menuSearch = $('[js-menu-search]');

    $menuSearchCloseBtn.on('click', function () {
        $menuSearch.removeClass('is-open');
        checkBodyHidden()
    });

    const $menuUpdateReminderCloseBtn = $('[js-menu-update-reminder-close-btn]');
    const $menuUpdateReminder = $('[js-menu-update-deal]');

    $menuUpdateReminderCloseBtn.on('click', function () {
        clearReminderForm();
        $menuUpdateReminder.removeClass('is-open');
        checkBodyHidden();
    });


    const $menuCreateClientCloseBtn = $('[js-menu-create-client-close-btn]');
    const $menuCreateClient = $('[js-menu-create-client]');

    $menuCreateClientCloseBtn.on('click', function () {
        $('js-create-client-form').submit('reset');
        $menuCreateClient.removeClass('is-open');
        checkBodyHidden()
    });

    const $menuCreateDealCloseBtn = $('[js-menu-create-deal-close-btn]');
    const $menuCreateDeal = $('[js-menu-create-deal]');

    $menuCreateDealCloseBtn.on('click', function () {
        $menuCreateDeal.removeClass('is-open');
        setTimeout(() => {
            $('.datepicker-here.menu-tasks__datepicker.menu-input__wrapper_cal').val('')
            $('.menu-tasks__text').val('')
        }, 800)
        checkBodyHidden();
    });

    const $menuBillCloseBtn = $('[js-menu-bill-close-btn]');
    const $menuBill = $('[js-menu-bill]');

    $menuBillCloseBtn.on('click', function () {
        $menuBill.removeClass('is-open');
        $('[js-bill-form]').submit('reset');
        checkBodyHidden()
    });

    initDatePickerPayDate();
});

$(document).on('submit', '[js-bill-form]', function (event) {
    event.preventDefault();
    if (validateForm(this)) {
        saveBill($(this).serializeObject());
    }
});

function saveBill(billDate) {
    $('[js-save-bill]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/bills/saveBill",
        data: JSON.stringify(billDate),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard($CLIENT);
            $('[js-menu-bill]').removeClass('is-open');
            checkBodyHidden()
            $('[js-bill-form]').trigger('reset');

            $('[js-save-bill]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-bill]').prop("disabled", false);
        }
    });
}

$(document).on('click', '[js-save-bills]', function (event) {
    event.preventDefault();
    $('[js-bills-form]').trigger('submit');
});

$(document).on('submit', '[js-bills-form]', function (event) {
    event.preventDefault();
    if (validateForm(this)) {
        var billData = $(this).serializeObject();
        saveBillWithUpdate(billData);
    }
});

function saveBillWithUpdate(billData) {
    $('[js-save-bills]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/bills/saveBill",
        data: JSON.stringify(billData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard($CLIENT);
            billData['id'] = billData.idDeal;
            openBills(billData);
            $('[js-bills-form]').trigger('reset');

            $('[js-save-bills]').prop("disabled", false);
            BILLS_TEMP_INFO = {};
        },
        error: function (data) {
            $('[js-save-bills]').prop("disabled", false);
        }
    });
}

$(document).on('click', '[js-create-deal]', function (event) {
    resetCreateDealForm();

    idDeal = false;

    $('.create-deal__funnel').remove();
    $('[js-menu-create-deal]').addClass('is-open');
    checkBodyHidden()

    $('.menu-tasks__btn').removeAttr('task-new-btn').attr('new-btn', '');

    $('.menu-tasks__wrapper').find('.task').remove();
    $('.menu-tasks__wrapper').find('.menu-tasks__selector').remove();

    setCourses(null, $coursesList);
});


$(document).on('click', '[close-dialog]', function (event) {
    removeAcceptBtnAttribute($(this).siblings('[accept-dialog]'));
    $(this).closest('.dialog').removeClass('is-open');
});

$(document).on('change', '[js-form-status]', function (event) {
    var form = $(this).parent($('[js-status-form]'));
    form.removeClassWild("deal-status__form_*");
    form.addClass("deal-status__form_" + ($('option:selected', this).attr('data-code')));

    var data = form.serializeObject();

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/updateDealStatus",
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false,
        success: function (data) {
        },
        error: function (data) {
        }
    });
});

// Функция смены цвета индикатора
function changeIndicator(data, code) {

    const indicator = $(this).parent().parent().parent().parent().parent().find('.deal-indicator__value');

    let color;
    color = changeIndicatorColor(color, code);
    indicator.css('backgroundColor', `${color}`);

    const indicatorLeft = $(this).parent().parent().parent().parent().parent().find('.deal-indicator__left');

    const history = data.splice(data.length - 4, 3);

    $.each(history, (index, item) => {
        if (index === history.length - 1) {
            indicatorLeft.append($("<div/>").attr("class", `deal-indicator__history ${item.code}`).css({backgroundColor: `${changeIndicatorColor(color, item.code)}`}));
        }
    });

    const indicatorHistory = $(this).parent().parent().parent().parent().parent().find('.deal-indicator__history');

    if (indicatorHistory.length > 3) {
        $.each(indicatorHistory, (index, item) => {
            if (index === 0) {
                $(item).remove();
            }
        });
    }
}

$(document).on('change', '[js-deal-form-status]', changeHistory);

// Отправляем запрос на смену статуса
function changeHistory(event) {
    var form = $(this).parent($('[js-deal-status-form]'));
    form.removeClassWild("deal__select_*");
    var code = $('option:selected', this).attr('data-code');
    form.addClass("deal__select_" + code);

    form.append($("<input/>").attr('type', 'hidden').val(code).attr('name', ''))
    var formData = form.serializeObject();
    formData['code'] = code;

    $('[js-deal-form-status]').prop("disabled", true);

    // Прибиваем this селекта статуса к функции смены статуса
    const changeStatus = changeIndicator.bind(this);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/updateDealStatus",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealStatusOnList(formData);
            $('[js-deal-form-status]').prop("disabled", false);
            changeStatus(data, code);
        },
        error: function (data) {
            $('[js-deal-form-status]').prop("disabled", false);
        }
    });
}

//обновление статуса сделки на фронте
function updateDealStatusOnList(value) {
    var dealRow = $('[data-deal="' + value.id + '"]');
    var select = dealRow.find('[js-form-status]');
    var form = select.parent($('form'));
    form.removeClassWild("deal-status__form_*").addClass("deal-status__form_" + value.code);
    $(select).find('option:selected').removeAttr('selected');
    $(select).val(value.status);
}

//кнопка открытия поиска клиента
$(document).on('click', '[js-search-client]', function (event) {
    resetSearchClientMenu();
    $('[js-menu-search]').addClass('is-open');
    checkBodyHidden();
});


//кнопка создания клиента
$(document).on('click', '[js-create-client-btn]', function (event) {
    event.preventDefault();
    const infoField = $('.edit-info')
    validateNewClientInfo(infoField);
    $('[js-menu-search]').removeClass('is-open');
    $('[js-create-client-form]').trigger('submit');
});

$(document).on('submit', '[js-create-client-form]', function (event) {
    event.preventDefault();
    if (validateForm(this)) {
        createClientCard();
        $('[js-menu-create-client]').removeClass('is-open');
    }
});

$('[js-create-client-cancel]').on('click', () => {
    $('[js-menu-create-client]').removeClass('is-open');
});

var CLIENT_DATA;
var clientInfo;

function createClientCard() {
    var cardInfo = {}
    cardInfo["name"] = $('[js-create-client-name]').val();
    cardInfo["createDate"] = $('[js-create-client-date]').val();
    cardInfo["idManager"] = $('[js-create-client-manager]').val();
    cardInfo["link"] = $('[js-create-client-link]').val();
    cardInfo["phone"] = $('[js-create-client-phone]').val();
    cardInfo["email"] = $('[js-create-client-email]').val();
    cardInfo["telegram"] = $('[js-create-client-telegram]').val();

    $('[js-create-client-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/clients/saveClientInfo",
        data: JSON.stringify(cardInfo),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setClientCardInfo(data);
            $('[js-create-client-form]').trigger('reset');
            $('[js-create-client-btn]').prop("disabled", false);
        },
        error: function (data) {
            CLIENT_DATA = data;
            $('[dialog]').find('.dialog__title').html('Хотите использовать его?');
            $('[dialog]').find('.dialog__text').html('В базе данных найден клиент с такими же данными');
            $('[dialog]').find('[accept-dialog]').attr('use-client', '');
            $('[dialog]').addClass('is-open');

            $('[js-create-client-btn]').prop("disabled", false);
        }
    });
}

$(document).on('click', '[use-client]', function (event) {
    event.preventDefault();
    $('[dialog]').removeClass('is-open');
    removeAcceptBtnAttribute($(this));

    $('[js-client-card-name]').val(CLIENT_DATA.responseJSON.name);
    $('[js-client-card-date]').text(CLIENT_DATA.responseJSON.createDate);
    $('[js-client-card-manager]').text(CLIENT_DATA.responseJSON.manager);
    $('[js-client-card-link]').val(CLIENT_DATA.responseJSON.link);
    $('[js-client-card-phone]').val(CLIENT_DATA.responseJSON.phone);
    $('[js-client-card-email]').val(CLIENT_DATA.responseJSON.email);
    $('[js-client-card-comment]').val(CLIENT_DATA.responseJSON.comment);
    $('[js-client-card-id]').val(CLIENT_DATA.responseJSON.id);

    $('[js-client-name-copy]').text(CLIENT_DATA.responseJSON.name);
    $('[js-client-name-copy]').attr('data-link', CLIENT_DATA.responseJSON.name);

    setIdClient(CLIENT_DATA.responseJSON.id);
    updateDealCard($CLIENT);
    $('[js-menu-client-card]').addClass('is-open');
    checkBodyHidden();
    $('[js-create-client-form]').trigger('reset');
});

$(document).on('click', '[js-create-client]', function () {
    const value = $('[js-menu-search-input]').val();

    if (value.split(' ').length > 1 || value.split(' ').length > 1) {
        if (value.search(/\d/) == -1) {
            setTimeout(() => {
                $('[js-create-client-name]').val(value)
            }, 0);
        }
    }

    if (value.split('https://vk.com/').length > 1 || value.split('http://vk.com/').length > 1) {
        setTimeout(() => {
            $('[js-create-client-link]').val(value)
        }, 0);
    }

    if (value.length < 17) {
        const regExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        const valid = regExp.test(value);

        if (valid) {
            setTimeout(() => {
                $('[js-create-client-phone]').val(value)
            }, 0);
        }
    }

    if (value.split('@').length > 1) {
        const regExp = /^[^@]+@[^@.]+\.[^@]+$/;
        const valid = regExp.test(value);

        if (valid) {
            setTimeout(() => {
                $('[js-create-client-email]').val(value)
            }, 0);
        }
    }
});

//форма поиска клиента
$(document).on('submit', '[js-menu-search-form]', function (event) {
    event.preventDefault();
    var searchValue = $('[js-menu-search-input]').val();

    if ($.trim(searchValue) !== '') {
        var search = {}
        search["search"] = searchValue;
        $('[js-menu-search-input]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/clients/searchClients",
            data: JSON.stringify(search),
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('[js-client-card-list]').html('');

                if (data.length === 0) {
                    $('[js-create-client]').prop('disabled', false);
                } else {
                    $('[js-create-client]').prop('disabled', true);

                    $.each(data, function (index, value) {
                        var response = $("<div/>").attr("js-client-card", "").attr("class", "client-card")
                            .append($("<input/>").attr("type", "hidden").attr("class", "js-client-id-l").attr("js-client-id", "").val(value.id))
                            .append($("<div/>").attr("class", "client-card__title").html(value.name))
                            .append($("<div/>").attr("class", "client-card__info")
                                .append($("<div/>").attr("class", "client-card__info-link").html(value.link))
                                .append($("<div/>").attr("class", "client-card__info-phone").html(value.phone)));
                        $('[js-client-card-list]').append(response);
                    });
                }

                $('[js-menu-search-input]').prop("disabled", false);
            },
            error: function (data) {
                $('[js-menu-search-input]').prop("disabled", false);
            }
        });
    }
});

//кнопка открытия карточки клиента
$(document).on('click', '[js-client-card]', function (event) {
    var clientId = $(this).find('[js-client-id]').val();

    $('[js-client-card]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/clients/getClientInfo",
        data: JSON.stringify(clientId),
        dataType: 'json',
        cache: false,
        success: function (data) {
            clientInfo = data;
            setClientCardInfo(data);
            dealAPI.getCoursesList(courses);
            dealAPI.getSaleTypes();
            dealAPI.getDealStatus();

            $('[js-client-card]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-client-card]').prop("disabled", false);
        }
    });
});

function setCourses(data = null, courses) {

    $('[js-update-form-deal-pr]').children().remove();
    $('[js-update-form-deal-pr]').append($('<option>').html('Выберите продукт').attr('value', '0'))
    $('[js-deal-form-product]').children().remove();
    $('[js-deal-form-product]').append($('<option>').html('Выберите продукт').attr('value', '0'))

    const course = $.map(courses, (item, index) => {
        return `
        <option ${data ? data.course === item.name ? 'selected' : '' : ''} data-id="${item.id}" value="${item.name}" data-type="${item.type}" data-price="${item.price}">${item.name}</option>
      `;
    });

    $('[js-update-form-deal-pr]').append(course);
    $('[js-deal-form-product]').append(course);
}


var $CLIENT;

//заполение информации о клиенте в карточке клиента
function setClientCardInfo(data) {
    $('[js-client-card-name]').val(data.name);
    $('[js-client-card-date]').text(data.createDate);
    $('[js-client-card-manager]').text(data.manager);
    $('[js-client-card-link]').val(data.link);
    $('[js-client-card-phone]').val(data.phone);
    $('[js-client-card-telegram]').val(`${data.telegram ? data.telegram : ''}`);
    $('[js-client-card-email]').val(data.email);
    $('[js-client-card-comment]').val(data.comment);
    $('[js-client-card-id]').val(data.id);

    $('[js-client-name-copy]').text(data.name);
    $('[js-client-name-copy]').attr('data-link', data.name);

    var registerInfoBtn = $('[js-register-info-btn]');
    var registerInfo = $('[js-register-info]');
    var registerInfoContainer = $('[js-register-info-container]');
    var copyRegisterInfo = $('[js-copy-register-info]');
    registerInfoBtn.unbind('click');
    copyRegisterInfo.unbind('click');
    if (data.idUser != 0) {
        registerInfoBtn.addClass('hide');
        registerInfo.removeClass('hide')
        $('[js-client-url]').html(window.location.origin + '/login');
        $('[js-client-login]').html(data.userLogin);
        $('[js-client-password]').html(data.userPassword);
    } else {
        registerInfoBtn.removeClass('hide');
        registerInfoBtn.click(function () {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/api/clients/createUser",
                data: JSON.stringify(data.id),
                dataType: 'json',
                cache: false,
                success: function (userData) {
                    registerInfoBtn.addClass('hide');
                    registerInfo.removeClass('hide');
                    $('[js-client-login]').html(userData.username);
                    $('[js-client-password]').html(userData.password);
                },
                error: function (userData) {

                }
            });
        });
        registerInfo.addClass('hide');
    }
    copyRegisterInfo.click(function () {
        var childs = Array.from(registerInfoContainer.children());
        var copiedText = '';
        childs.forEach(function (value, index, array) {
            var elem = $(value);
            if (elem.hasClass('client-card__register-info-label') ||
                elem.hasClass('client-card__register-info-value')) {
                copiedText += elem.text().trim() + '\n';
            }
        });
        var $tmp = $("<textarea>");
        $("body").append($tmp);
        $tmp.val(copiedText).select();
        document.execCommand("copy");
        $tmp.remove();
    });

    setIdClient(data.id);
    //обновление карточек сделок
    updateDealCard($CLIENT);

    $('[js-menu-client-card]').addClass('is-open');
    checkBodyHidden()
}

function setIdClient(id) {
    $('[js-deal-form-client]').val(id);
    $CLIENT = id;
}

//обновление карточек сделок
function updateDealCard(idClient, idSavedDeal) {
    $('[js-deals-list]').append($('<div/>').attr('class', 'preloader').html('Loading...'));
    $('.menu__content-main_overy').scrollTop(0);

    if (typeof idClient !== "undefined") {
        // Утсанавливаем Таймаут на запрос, для того чтобы анимация меню не тормозила
        setTimeout(() => {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/api/deals/getManagerDeals",
                data: JSON.stringify(idClient),
                dataType: 'json',
                cache: false,
                success: function (data) {
                    var $dealList = $('[js-deals-list]');
                    $dealList.html('');

                    // отрисовка карточек
                    $.each(data, function (index, value) {
                        // установка значения в списке
                        updateDealPriceOnList(value);

                        // установка значения в меню
                        var seloption = "";
                        let selectoption = '';

                        if (value.paid > 1) {

                            if ($statusesList) {
                                const statuses = $statusesList.filter((item) => item.code !== 'closed');
                                $.each(statuses, function (index, value2) {
                                    seloption += '<option js-deal-form-status value="' + value2.id + '" data-code="' +
                                        value2.code + '" ' + (value2.id === value.status ? 'selected="selected" ' : '') + '">' + value2.title + '</option>';
                                });
                            }
                        } else {
                            $.each($statusesList, function (index, value2) {
                                selectoption += '<option js-deal-form-status value="' + value2.id + '" data-code="' +
                                    value2.code + '" ' + (value2.id === value.status ? 'selected="selected" ' : '') + '">' + value2.title + '</option>';
                            });
                        }

                        var reminder = "";
                        if (value.reminder) {
                            reminder += '<div class="menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-violet">' +
                                '<div class="deal__comment" title="' + value.reminderMessage + '">' + value.reminderMessage + '</div></div>';
                        } else {
                            reminder += '<div class="menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-empty">' +
                                '<div class="deal__comment">Нет напоминаний</div></div>';
                        }

                        const remindersSort = sortingArray(value.reminders);
                        const reminders = remindersSort.filter(el => !el.done).reverse();
                        const lastReminder = reminders[0];

                        let done, today, expiration;

                        if (lastReminder) {
                            done = lastReminder.done ? 'deal__reminder-title deal-reminder deal-reminder_done' : '';
                            today = lastReminder.reminderToday ? 'deal__reminder-title deal-reminder deal-reminder_yellow' : '';
                            expiration = lastReminder.reminderExpiration ?
                                'deal__reminder-title deal-reminder deal-reminder_red'
                                :
                                'deal__reminder-title deal-reminder deal-reminder_green';
                        }

                        const reminderItems = $.map(reminders, (reminder) => {
                            if (!reminder.done) {
                                return `
                                    <tr class="reminder-row">
                                        <td class="task-tooltip__date">${reminder.reminderDate}</td>
                                        <td class="task-tooltip__message">${reminder.reminderMessage}</td>
                                        <input type="hidden" js-task-id value="${reminder.id}">
                                    </tr>
                                `;
                            }
                            ;
                        })

                        var response = $("<div/>").attr("class", "deal-card").attr('dealId', `${value.id}`)
                            .append($("<div/>").attr("class", "deal-card__inner")
                                .append($("<div/>").attr("class", "deal-card__header").attr('style', (!value.backgroundColor) ? `background-color: #ffffff` : `background-color: ${value.backgroundColor}`)
                                    .append($("<div/>").attr("class", "deal-card__name")
                                        .append($("<div/>").attr("class", "deal-card__title").html(value.status === 1 ? 'Целевая заявка' : value.course))
                                        .append($("<div/>").attr("class", "deal-card__date").html(value.createDate))

                                        .append($("<div/>").attr("class", " c-tooltip")
                                            .append($("<div/>").attr("class", "c-tooltip__wrapper")
                                                .append($("<div/>").attr("class", "c-tooltip__text").html(value.managerAccessName)))
                                            .append($("<div/>").attr("class", "deal-card__author").html(value.managerName))
                                        )
                                    )
                                    .append($("<div/>").attr("class", "deal-card__task deal-task")
                                        .append($("<p/>").attr("class", "deal-task__taskchecker")
                                            .append($("<div/>").attr("class", `deal-task__indicator ${reminders.length !== 0 ? done ? done : today ? today : expiration : ''}`)
                                                .append($('<div>').attr('class', 'reminder-wrapper task-tooltip__wrapper tooltip-card__tasks')
                                                    .append($('<table>').attr('class', 'task-tooltip__table')
                                                        .append($('<thead/>').append($('<tr>').attr('class', 'reminder-row')
                                                            .append($('<td>').attr('class', 'task-tooltip__date').html('Дата'))
                                                            .append($('<td>').attr('class', 'task-tooltip__message').html('Задача'))
                                                        ))
                                                        .append($('<tbody>').attr('class', 'deal-task__tbody-card')
                                                            .append(reminderItems.join(''))
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                        .append(value.backgroundImage === null ? false :
                                            $("<img>").attr("src", `/${value.backgroundImage}`)
                                        )
                                    )
                                )

                                .append($("<div/>").attr("class", "deal-card__info")
                                    .append($("<div/>").attr("class", "deal-card__status deal-status")
                                        .append($("<div/>").attr("class", "deal-status__left")
                                            .append($("<div/>").attr("class", "deal__social")
                                                .append($("<div/>").attr("class", "deal-social deal-social_" + value.socialCode))
                                            )
                                            .append((value.isEditable && value.status !== 1) ?
                                                $("<div/>").attr("class", "deal-status__text")
                                                    .append($("<form/>").attr("js-deal-status-form", "").attr("class", "deal__select deal__select_" + value.statusCode)
                                                        .append($("<input/>").attr("name", "id").attr("type", "hidden").val(value.id))
                                                        .append($("<select/>").attr("class", "deal-select menu-input__input_select").attr("name", "status").attr("js-deal-form-status", "").html((value.paid > 1) ? seloption : selectoption))
                                                        .append($("<input/>").attr('type', 'hidden').val(`${value.statusCode}`).attr('name', 'statusChanges'))
                                                    ) :
                                                $("<div/>").attr("class", "deal-status__text")
                                                    .append($("<div/>").attr("class", "deal__select deal__select_" + value.statusCode)
                                                        .append($("<div/>").attr("class", "deal-select menu-input__input_select").html(value.statusName))
                                                    )
                                            )
                                        )
                                        .append($("<div/>").attr("class", "deal-status__right")
                                            .append($("<div/>").attr("class", "deal-status__angle"))
                                        )
                                    )
                                    .append($("<div/>").attr("class", "deal-card__indicator deal-indicator")
                                        .append($("<div/>").attr("class", "deal-indicator__left"))
                                        .append($("<div/>").attr("class", "deal-indicator__right")
                                            .append($("<div/>").attr("class", "deal-indicator__value"))
                                        )
                                    )
                                )
                                .append($("<div/>").attr("class", "deal-card__access deal-access")
                                    .append($("<div/>").attr("class", "deal-access__inner").attr('js-deal-id', value.id))
                                )

                                .append($("<div/>").attr("class", "deal-card__price deal-price")
                                    .append($("<div/>").attr("class", "deal-price__cost")
                                        .append($("<div/>").attr("class", "deal-price__name").html("Стоимость"))
                                        .append($("<div/>").attr("class", "deal-price__value").html(value.price + ' &#8381;'))
                                    )
                                    .append($("<div/>").attr("class", "deal-price__received")
                                        .append($("<div/>").attr("class", "deal-price__name").html("Получено"))
                                        .append($("<div/>").attr("class", "deal-price__value--black").html(value.paid + ' &#8381;'))
                                    )
                                    .append((value.isEditable && value.status !== 1) ?
                                        $("<div/>").attr("class", "deal-price__btn")
                                            .append($("<form/>").attr("js-add-bill-form", "").attr("action", "#").attr("class", value.isHidden ? "hidden-deal" : "")
                                                .append($("<input/>").attr("type", "hidden").attr("name", "id").val(value.id))
                                                .append($("<button/>").attr("js-add-bill-button", "").attr("class", "deal-price__icon"))
                                            ) : ''
                                    )
                                )
                                .append((value.isEditable) ?
                                    $("<div/>").attr("class", "deal-card__controls")
                                        .append($("<form/>").attr("class", "deal-card__form-management").attr("action", "#").attr("js-update-deal-form", "")
                                            .append($("<input/>").attr("name", "id").attr("type", "hidden").val(value.id))
                                            .append($("<button/>").attr("type", "button").attr("class", "deal-card__management").attr("js-update-deal-btn", "").html("Управление сделкой"))
                                        )
                                        .append(
                                            (value.isHidden)
                                                ?
                                                $("<form/>").attr("class", "").attr("action", "#").attr("js-reveal-deal-form", "")
                                                    .append($("<input/>").attr("data-hide-deal", value.id).attr("name", "id").attr("type", "hidden").val(value.id))
                                                    .append(
                                                        $("<button/>").attr("type", "button").attr("class", "deal-card__recover deal-card__recover--card").attr("js-reveal-deal-btn", "")
                                                            .append($("<span/>").attr("class", "deal-card__recover-icon"))
                                                    )
                                                :
                                                $("<form/>").attr("class", "").attr("action", "#").attr("js-hide-deal-form", "")
                                                    .append($("<input/>").attr("data-hide-deal", value.id).attr("name", "id").attr("type", "hidden").val(value.id))
                                                    .append($("<button/>").attr("type", "button").attr("class", "deal-card__delete").attr("js-hide-deal-btn", "")
                                                        .append($("<span/>").attr("class", "deal-card__delete-icon"))
                                                    )
                                        ) :
                                    $("<div/>").attr("class", "deal-card__controls")
                                        .append($("<form/>").attr("class", "deal-card__form-management").attr("action", "#").attr("js-view-deal-form", "")
                                            .append($("<input/>").attr("name", "id").attr("type", "hidden").val(value.id))
                                            .append($("<button/>").attr("type", "button").attr("class", "deal-card__management").attr("js-view-deal-btn", "").html("Посмотреть сделку"))
                                        )
                                )
                            );
                        $dealList.append(response);

                        loadBlocks(idClient, value.id, idSavedDeal);

                        if (value.statusChanges.length !== 0) {
                            const dealCard = $(`[dealId = ${value.id}]`);
                            const indicatorLeft = dealCard.find('.deal-indicator__left');

                            const lastChanges = value.statusChanges.splice(value.statusChanges.length - 4, 3);

                            $.each(lastChanges, (count, elem) => {
                                indicatorLeft.append($('<div/>').attr('class', `deal-indicator__history ${elem.code}`))
                            })
                        }
                    });

                    // Добавление формы, добавления сделки
                    var $createDealBlock = $("<div/>").attr("js-create-deal", "").attr("class", "deal-card deal_create")
                        .append($("<div/>").attr("class", "deal__btm-message").html('Добавить сделку'));

                    $dealList.append($createDealBlock);

                    if ($('.deal-card').length === 1) {
                        $('.deal_create').css({height: '451px'});
                    }

                    // Добавление свойства background-color индикатору
                    let color;

                    $.each($('.deal-card'), function (index, item) {
                        const indicator = $(this).find('.deal-indicator__value');

                        let selArr, code;

                        if ($(this).find('.deal__select').attr('class')) {
                            selArr = $(this).find('.deal__select').attr('class').split('_');
                            code = selArr[5];
                        }

                        const social = $(this).find('.deal__social');
                        const socialClass = social.children('.deal-social').attr('class');

                        if (socialClass) {
                            if (socialClass.split("_")[1] === 'null') {
                                social.css('display', 'none');
                            }
                        }

                        const indicatorHistory = $(this).find('.deal-indicator__history');
                        indicator.css('backgroundColor', `${changeIndicatorColor(color, code)}`);

                        $.each(indicatorHistory, (index, item) => {
                            const indicatorValue = $(item).attr('class').split(' ');
                            $(item).css('backgroundColor', `${changeIndicatorColor(color, indicatorValue[1])}`);
                        });
                    });
                }
            });
        }, 800)
    }
}

function loadBlocks(idClient, idDeal, idCurrentDeal) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/getDealsModulesInfo",
        data: JSON.stringify(idDeal),
        dataType: 'json',
        cache: false,
        success: function (modules) {
            $modulesRoot = $("<div/>").attr("class", "deal__access-lessons ");
            $lessons = $("<div/>").attr("class", "deal__lessons");
            $access = $("<div/>").attr("class", "deal__access")
                .append($("<div/>").attr("class", "deal__access-text")).html('Доступ к продукту')
                .append($("<div/>").attr("class", "deal__access-btn slide-toggle " + (modules.allowed ? 'slide-toggle_active' : '')).attr("js-id-deal-toggle", idDeal)
                    .append($("<div/>").attr("class", "slide-toggle__thumb")));
            $modulesRoot.append($access);
            $modulesRoot.append($lessons);

            $modulesRoot.insertAfter($('[js-deal-id=' + idDeal + ']'));

            $(".slide-toggle[js-id-deal-toggle=" + idDeal + "]").click(function (event) {
                const t = event.target;
                const toggle = $(this);
                const idDeal = toggle.attr('js-id-deal-toggle');
                const allowed = toggle.hasClass('slide-toggle_active');

                if (allowed) {
                    toggle.removeClass('slide-toggle_active');
                } else {
                    toggle.addClass('slide-toggle_active');
                }

                changeAllowed(idDeal, idClient, !allowed);
            });

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/api/deals/getClientCourseBlocks",
                data: JSON.stringify(idDeal),
                dataType: 'json',
                cache: false,
                success: function (blocks) {
                    if (blocks.length !== 0) {
                        renderBlocksToCard(idDeal, blocks, modules, idCurrentDeal);
                    } else {
                        setModulesToBlocksCard(idDeal, blocks, modules, idCurrentDeal);
                    }

                    dealCreateHeight();
                    dealWrapperHeight();
                }
            });
        }
    });
}

function setRowDealToCRM(id, settings = null) {

    if (settings !== 'hide') {
        const getDeal = async function (id) {
            const data = {
                id: id,
            }

            const request = await $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/api/deals/getDeal",
                data: JSON.stringify(data),
                dataType: 'json',
                cache: false,
                success: function (data) {
                },
                error: function () {
                }
            });

            return request;
        }

        getDeal(id).then((deal) => {
            const options = async function () {
                const request = await $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: "/api/deals/getDealStatuses",
                    data: JSON.stringify(),
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                    },
                    error: function () {
                    }
                })
                return request;
            }

            options().then((statuses) => {
                const optionsStatus = $.map(statuses, (item, index) => {
                    return `
                                <div class="select__option" js-deal-form-status data-code="${item.code}" value="${status.id}">${status.title}</div>
                            `
                })

                const row = (deal) => {
                    return `
                            <tr class="custom-table__body-row" data-deal="${deal.id}">
                                <td class="custom-table__body-col">${deal.dealDate}</td>
                                <td data-deal-date-deal class="custom-table__body-col">${deal.dealDate}</td>
                                <td class="custom-table__body-col">
                                    <div data-deal-social class="deal-social deal-social_big deal-social__social-icon deal-social_${deal.socialCode}"></div>
                                </td>
                                <td class="custom-table__body-col">
                                    <div js-client-card class="column-link column-link_active">
                                        <input type="hidden" js-client-id data-client="${deal.idClient}" value="${deal.idClient}">
                                        <span>${deal.clientName}</span>
                                    </div>
                                    <div class="phone-column" data-phone-client="${deal.idClient}">
                                    ${deal.clientPhone ?
                        `<div js-copy-link class=""client-phone" data-link="${deal.clientPhone}">${deal.clientPhone}</div>` :
                        ''}
                                    </div>
                                </td>
                                ${deal.clientLink ?
                        `<td class="custom-table__body-col custom-table__body-col_center" data-link-client="${deal.idClient}"></td>`
                        :
                        `<td class="custom-table__body-col" data-link-client="${deal.idClient}">
                                    <div class="column-links">
                                        <div js-copy-link data-link="${deal.clientLink}" class="column_mwidth column_mwidth-copy"></div>
                                        <a href="${deal.clientLink}" target="_blank" class="column_mwidth column_mwidth-open"></a>
                                    </div>
                                </td>`
                    }
                                <td class="custom-table__body-col">
                                    <div class="c-tooltip__wrapper">
                                        <div class="c-tooltip__text">${deal.managerAccessName}</div>
                                    </div>
                                    <div className="column-text">${deal.managerName}</div>
                                </td>
                                <td class="custom-table__body-col">
                                    <form action="#" js-update-deal-form>
                                        <input name="id" type="hidden" value="${deal.id}">
                                        <div data-deal-course class="column-course" js-update-deal-btn title="${(deal.status != 1) ? deal.course + deal.kind ? ' (' + deal.kind + ')' : '' : 'Целевая заявка'}">
                                            ${(deal.course != null) ? deal.course + (deal.kind ? ' (' + deal.kind + ')' : '') : 'Нет продукта'}
                                        </div>
                                    </form>
                                </td>
                                <td data-deal-type class="custom-table__body-col">${deal.type === 'traffic' ? 'Трафик' : 'Допродажа'}</td>
                                <td class="custom-table__body-col">
                                    <div class="column-paid ${deal.price <= deal.paid ? 'column-paid_green' : ''}">
                                        <div data-deal-price class="column_price">${deal.price}</div>
                                        <div class="column_price-del">/</div>
                                        <div data-deal-paid class="column_paid">${deal.paid + ' ₽'}</div>
                                        ${deal.status != 1 ?
                        `<form js-add-bill-form action="#" className="paid-form ${deal.isHidden} ? 'hidden-deal' : ''">
                                                <input type="hidden" name="id" value="${deal.id}">
                                                <input type="hidden" name="idClient" value="${deal.idClient}">
                                                <button js-add-bill-btn js-add-bill-up-client class="add-btn add-btn_small"></button>
                                            </form>`
                        :
                        ''
                    }
                                    </div>
                                </td>
                                ${deal.idSaleType == 2 ?
                        `<td data-deal-start-date className="custom-table__body-col" th:utext="${deal.startDate}"></td>`
                        :
                        `<td data-deal-start-date className="custom-table__body-col">—</td>`
                    }
                                <td data-deal-tag class="custom-table__body-col">
                                ${deal.tag ?
                        `<div title="${deal.tag}" class="column-msg">
                                        ${deal.tag}
                                    </div>`
                        :
                        `<div>—</div>`
                    }
                                </td>
                                <td data-deal-mailing class="custom-table__body-col">${deal.coupling}</td>
                                <td class="custom-table__body-col">
                                    <div class="column-status">
                                        <div class="select deal-status__form_${deal.statusCode}">
                                            <input js-status-form type="hidden" name="id" value="${deal.id}">
                                            <div data-code="${deal.statusCode}" class="select__head">${deal.statusName}</div>
                                            <div id="status${deal.id}" class="select__body">
                                                ${optionsStatus.join('')}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="custom-table__body-col">
                                    <div data-deal-reminder class="column-reminder column-reminder_mr10">
                                        <div class="reminder-wrapper task-tooltip__wrapper">
                                            <table class="task-tooltip__table">
                                                <thead>
                                                    <tr class="reminder-row">
                                                        <td class="task-tooltip__date">Дата</td>
                                                        <td class="task-tooltip__message">Задача</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div classs="reminder"></div>
                                        <div class="reminder-d"></div>
                                    </div>
                                </td>
                                <td class="custom-table__body-col">
                                ${deal.isHidden === false ?
                        `<form action="#" js-hide-deal-form>
                                        <input data-hide-deal="${deal.id}" name="id" type="hidden" value="${deal.id}">
                                        <button type="button" class="button button_hide button_circle" js-hide-deal-btn-crm>
                                            <div class="hidden-btn hidden-btn_hide"></div>
                                        </button>
                                    </form>`
                        :
                        `<form action="#" js-reveal-deal-form>
                                        <input data-hide-deal="${deal.id}" name="id" type="hidden" value="${deal.id}">
                                        <button type="button" class="deal-card__recover" js-reveal-deal-btn-crm>
                                            <div class="deal-card__recover-icon"></div>
                                        </button>
                                    </form>`}
                                </td>
                            </tr>
                        `
                }

                const tbody = $('.content-main__inner').find('tbody');
                const firstRow = tbody.find('.custom-table__body-row').first();

                $(row(deal)).insertBefore(firstRow);

            })
        });
    } else {
        $(`.custom-table__body-row[data-deal="${id}"]`).remove();
    }
}

function setModulesToBlocksCard(idDeal, blocks = null, modules, idCurrentDeal) {
    setModulesToDeal(idDeal, blocks, modules, 'tariff-off').then(() => {
        if (idDeal === idCurrentDeal) {
            doModulesActive(idCurrentDeal);
        }
    });
}

function renderBlocksToCard(idDeal = null, blocks = null, modules = null, idCurrentDeal = null) {
    const setBlocks = async function (blocks) {
        const blockItems = $.map(blocks, (item) => {
            return `
            <div class="lesson-block ${item.enabled ? 'active' : ''}" data-id="${item.courseBlock.id}" enabled="${item.enabled ? 'true' : ''}">
                <div class="lesson-block__wrapper">
                    <div class="lesson-block__name">${item.courseBlock.name}</div>
                    <div class="lesson-block__closed-icon"></div>
                </div>
                <div class="lesson-block__modules">
                </div>
            </div>
        `;
        });

        const dealCards = $('.deal-card');

        for (let i = 0; i < dealCards.length; i++) {
            const dealCard = dealCards[i];

            if (+$(dealCard).attr('dealid') === idDeal) {
                await $(dealCard).find('.deal__lessons').append(blockItems);
            }
        }
    }

    setBlocks(blocks).then(() => {
        setModulesToDeal(idDeal, blocks, modules, 'tariff-on').then(() => {
            if (idDeal === idCurrentDeal) {
                doModulesActive(idCurrentDeal);
            }
        });
    })
}

async function setModulesToDeal(idDeal, blocks, modules, settings) {
    if (settings === 'tariff-on') {
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            let modulesArray = modules.modules.filter((el) => block.courseBlock.moduleIds.includes(el.idModule));

            const modulesItems = renderModules(modulesArray, idDeal);

            const lessonBlocks = $('.lesson-block');

            for (let i = 0; i < lessonBlocks.length; i++) {
                const lessonBlock = lessonBlocks[i];

                if (block.courseBlock.id === $(lessonBlock).data('id') && idDeal === +$(lessonBlock).closest('.deal-card').attr('dealid')) {
                    $(lessonBlock).find('.lesson-block__modules').children().remove();
                    await $(lessonBlock).find('.lesson-block__modules').append(modulesItems);
                }
            }
        }
    } else {
        let modulesInBlock = [];
        modulesInBlock.length = 0;

        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            for (let i = 0; i < block.moduleIds.length; i++) {
                const module = block.moduleIds[i];
                modulesInBlock.push(module);
            }
        }

        let modulesOutBlock = modules.modules.filter((el) => !modulesInBlock.includes(el.idModule));
        const modulesItems = renderModules(modulesOutBlock, idDeal);
        $(`.deal-card[dealid="${idDeal}"]`).find('.deal__lessons').children().remove();
        $(`.deal-card[dealid="${idDeal}"]`).find('.deal__lessons').append(modulesItems);
    }
}

function renderModules(modulesItems, idDeal) {
    const idClient = $CLIENT;

    const modules = $.map(modulesItems, (elem, count) => {
        return `
                    <div js-module="${elem.idModule}" js-module-deal="${idDeal}" js-module-client="${idClient}" class="deal__lessons-item ${elem.enabled ? 'deal__lessons-item_active' : ''}">${count + 1}</div>
                `
    });

    return modules;
}

function doModulesActive(id) {
    const modules = $.makeArray($(`.deal-card[dealid=${id}]`).find('.deal__lessons-item'));
    changeModulesAccess(modules);
    idDeal = null;
    idSavedDeal = null;
}

function changeModulesAccess(modules) {
    const arr = modules;

    let i = 0;

    timer = setInterval(function () {
        if (i >= arr.length) {
            clearInterval(timer);
        } else {
            if (arr[i]) {
                const idClient = +arr[i].getAttribute('js-module-client');
                const idDeal = +arr[i].getAttribute('js-module-deal');
                const idModule = +arr[i].getAttribute('js-module');

                changeEnabledModule(idClient, idDeal, idModule, true, 'new-deal');
            }
            i++;
        }
    }, 10);
}

function changeAllowed(idDeal, idClient, allowed) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/changeModulesAllowed",
        data: JSON.stringify({id: idDeal, idClient: idClient, value: allowed}),
        dataType: 'json',
        cache: false,
        success: function (data) {
        }
    });
}

function changeEnabledModule(idClient, idDeal, idModule, enabled, settings) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/changeModulesEnabled",
        data: JSON.stringify({idDeal: idDeal, idModule: idModule, idClient: idClient, value: enabled}),
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (settings === 'new-deal') {
                $(`.deal-card[dealid="${idDeal}"]`)
                    .find(`.deal__lessons-item[js-module=${idModule}]`)
                    .addClass('deal__lessons-item_active');
            }
        }
    });
}

$(document).on('click', '[data-deal-reminder]', function (e) {
    const deal = $(e.target).closest('.custom-table__body-row').data('deal');

    const data = {
        id: deal,
    }

    if (deal) {
        currentIdDeal = deal;
        idDeal = deal;
    } else {
        currentIdDeal = +$(t).closest('.deal-card').attr('dealid');
        idDeal = +$(t).closest('.deal-card').attr('dealid');
    }

    setDealInfo(data);
});

//обновление цены/получено по сделке на фронте
function updateDealPriceOnList(value) {
    var dealRow = $('[data-deal="' + value.id + '"]');

    var colPaid = dealRow.find('.column-paid');
    colPaid.removeClassWild('column-paid_*');
    if (value.price <= value.paid) {
        colPaid.addClass('column-paid_green');
    }

    dealRow.find('[data-deal-price]').html(value.price);
    dealRow.find('[data-deal-paid]').html(value.paid + ' ₽');
}

//кнопка добавления напоминания
$(document).on('click', '[js-add-reminder-button]', function (event) {
    event.preventDefault();
    $(this).closest('[js-add-reminder-form]').trigger('submit');
});

//form'a напоминания
$(document).on('submit', '[js-add-reminder-form]', function (event) {
    event.preventDefault();
    openUpdateReminder($(this).find('[name="idDeal"]').val());
});

function openUpdateReminder(idDeal) {
    $('[js-add-reminder-button]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/getReminder",
        data: JSON.stringify(idDeal),
        dataType: 'json',
        cache: false,
        success: function (data) {
            openReminderMenu(data);

            $('[js-add-reminder-button]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-add-reminder-button]').prop("disabled", false);
        }
    });
}

//скрыть сделкуedit-bill-accept
var HIDE_DEAL_FORM;
$(document).on('click', '[js-hide-deal-btn]', function (event) {
    event.preventDefault();
    $('[dialog]').find('.dialog__title').html('Вы действительно хотите скрыть сделку?');
    $('[dialog]').find('.dialog__text').html('В данном случае информация о сделке не будет учитываться');
    $('[dialog]').find('[accept-dialog]').attr('hide-deal', '');
    $('[dialog]').addClass('is-open');
    HIDE_DEAL_FORM = $(this).closest('[js-hide-deal-form]');
});

$(document).on('click', '[hide-deal]', function (event) {
    event.preventDefault();
    $('[dialog]').removeClass('is-open');
    removeAcceptBtnAttribute($(this));
    HIDE_DEAL_FORM.trigger('submit');
});

$(document).on('submit', '[js-hide-deal-form]', function (event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        hideDeal(formData);
    }
});

function hideDeal(formData) {
    $('[js-hide-deal-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/hideDeal",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-hide-deal-btn]').prop("disabled", false);
            $('[data-hide-deal="' + formData.id + '"]').closest('.deal').remove();
            $('[data-hide-deal="' + formData.id + '"]').closest('.custom-table__body-row').remove();

            HIDE_DEAL_FORM.closest('.deal-card').remove();
        },
        error: function (data) {
            $('[js-hide-deal-btn]').prop("disabled", false);
        }
    });
}

function updateHideForm(idDeal, isHide) {
    var el = $('[data-hide-deal="' + idDeal + '"]');

    if (CRMreveral === 'crm') {
        el.closest('.custom-table__body-row').remove();
        CRMreveral = null;
    } else {
        var form = el.closest('form');
        var billForm = $('[js-add-bill-form]').find('input[name="id"][value="' + idDeal + '"]').closest('[js-add-bill-form]');
        if (isHide) {
            form.removeAttr("js-hide-deal-form").attr("js-reveal-deal-form", '');
            var btn = form.find('[js-hide-deal-btn]');
            btn.removeAttr("js-hide-deal-btn").attr("js-reveal-deal-btn", '');
            btn.find('.hidden-btn_hide').removeClass('hidden-btn_hide').addClass('hidden-btn_reveal');
            btn.removeClass('deal-card__delete').addClass('deal-card__recover deal-card__recover--card');
            btn.find('span').removeClass('deal-card__delete-icon').addClass('deal-card__recover-icon');

            billForm.addClass("hidden-deal");
        } else {
            form.removeAttr("js-reveal-deal-form").attr("js-hide-deal-form", '');
            var btn = form.find('[js-reveal-deal-btn]');
            btn.removeAttr("js-reveal-deal-btn").attr("js-hide-deal-btn", '');
            btn.find('.hidden-btn_reveal').removeClass('hidden-btn_reveal').addClass('hidden-btn_hide');
            btn.addClass('deal-card__delete').removeClass('deal-card__recover deal-card__recover--card');
            btn.find('span').removeClass('deal-card__recover-icon').addClass('deal-card__delete-icon');
            billForm.removeClass("hidden-deal");
        }
    }
}

$(document).on('click', '[js-update-deal-btn]', function (event) {
    event.preventDefault();
    $(this).closest('[js-update-deal-form]').trigger('submit');

    idDeal = +$(event.target).closest('.deal-card').attr('dealid');

    if (!idDeal) {
        idDeal = +$(event.target).closest('.custom-table__body-row').data('deal')
    }

    if (!idDeal) {
        idDeal = +$(event.target).closest('.custom-table__body-row').find('[b-id-deal]').val()
    }

    $('.menu-tasks__btn').removeAttr('new-btn').attr('task-new-btn', '');

    $('.menu-tasks__datepicker').val('');
    $('.menu-tasks__text ').val('');
    $('.menu-tasks__error').remove();
});

$(document).on('submit', '[js-update-deal-form]', function (event) {
    event.preventDefault();

    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        setDealInfo(formData);
    }
});

var currentIdDeal;

$(document).on('click', '[data-deal-reminder]', function (e) {
    const deal = $(e.target).closest('.custom-table__body-row').data('deal');

    const data = {
        id: deal,
    }

    if (deal) {
        currentIdDeal = deal;
    } else {
        currentIdDeal = +$(t).closest('.deal-card').attr('dealid');
    }

    setDealInfo(data);
});


function setDealInfo(data) {
    $('[js-update-deal-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/getDeal",
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setUpdateDealInfo(data);
            setCourses(data, $coursesList);
            setSaleTypes($saleTypes);

            const sortTasks = sortingArray(data.reminders);

            renderTasks(sortTasks);

            $('[js-menu-update-deal]').addClass('is-open');
            $('[js-update-deal-btn]').prop("disabled", false);
            $('[js-update-deal]').prop("disabled", true);
        },
        error: function () {
            $('[js-update-deal-btn]').prop("disabled", false);
            $('[js-update-deal]').prop("disabled", true);
        }
    });
}

function setUpdateStreams(idCourse) {
    var formData = new FormData();
    formData.set('idCourse', Number(idCourse));

    $.ajax({
        type: "POST",
        url: "/transactions/getStreamsByIdCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var seloption = '';
            $.each(data, function (index, stream) {
                seloption += '<option value="' + stream.id + '">' + stream.startDate + '</option>';
            });

            $('[js-update-form-deal-start-date]').append(seloption);
        },
        error: function () {
        }
    });

    $.ajax({
        type: "POST",
        url: "/api/deals/getReminders",
        data: JSON.stringify(idDeal),
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function (data) {
            const sortArray = sortingArray(data);
            renderTasks(sortArray);
        },
        error: function () {
        }
    });
}

function renderTasks(tasks) {
    $('.menu-tasks__wrapper').find('.task').remove();
    $('.menu-tasks__wrapper').find('.menu-tasks__selector').remove();

    if (tasks) {
        if (tasks.length !== 0 && !$('.menu-tasks__selector').get(0)) {
            $('<div class="menu-tasks__selector"></div>').insertBefore('.menu-tasks__add');
        } else if (tasks.length === 0) {
            $('.menu-tasks__selector').remove();
        }

        $.each(tasks.reverse(), (index, item) => {
            const task = (item) => {
                return `
                <div class="task">
                    <div class="task__wrapper">
                        <div class="task__status ${item.done ? 'reminder__done' :
                    item.reminderToday ? 'reminder__now' : item.reminderExpiration ?
                        'reminder__off' : 'reminder__on'}"></div>
                            <div class="task__date">${item.reminderDate}</div>
                            <div class="task__message ${item.done ? 'task__through' : ''}" >${item.reminderMessage}</div>
                                ${
                    (item.done && idDeal || item.done && currentIdDeal) ? '' :
                        (!item.done && idDeal || !item.done && currentIdDeal) ?
                            '<div class="task__complete--btn">Завершить</div>' :
                            ''
                }
                            <div class="task__delete"></div>
                            <input type="hidden" js-task-id value="${item.id}">
                    </div>
                </div>
            `;
            };

            $(task(item)).insertBefore('.menu-tasks__selector');
        });

        if (tasks.length !== 0) {
            $('.menu-tasks__add').css({marginTop: '20px'});
        } else {
            $('.menu-tasks__add').css({marginTop: '0'});
        }
    }
}

$(document).on('click', '[js-update-deal]', function (event) {
    event.preventDefault();
    $('[js-update-form-deal]').trigger('submit');
});

$(document).on('submit', '[js-update-form-deal]', function (event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        const idTariff = $(this).closest('[js-update-form-deal]').find('[id-tariff]').val();
        formData.idFunnel = +$(this).closest('[js-menu-update-deal]').find('[deal-type] option:selected').attr('value');
        formData.idTariff = +idTariff ? idTariff : null;

        if (formData.id) {
            updateDeal(formData);
        }
    }
});

function updateDeal(formData) {
    $('[js-update-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/updateDeal",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-deals-list]').children().remove();

            updateDealCard(data.idClient, idDeal);
            $('[js-menu-update-deal]').removeClass('is-open');
            checkBodyHidden();
            updateDealAfterUpdateOnList(data);
            $('[js-update-deal]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-deal]').prop("disabled", false);
        }
    });
}

function updateDealAfterUpdateOnList(value) {
    var dealRow = $('[data-deal="' + value.id + '"]');
    dealRow.find('[data-deal-date-deal]').html(value.dealDate);

    dealRow.find('[data-deal-social]').removeClassWild("deal-social_*").addClass("deal-social_" + value.socialCode).addClass("deal-social_big");

    var course = value.course != null ? (value.course + (value.kind !== null && value.kind !== '' ? ' (' + value.kind + ')' : '')) : 'Целевая заявка';
    dealRow.find('[data-deal-course]').attr('title', course).html(course);
    dealRow.find('[data-deal-type]').html(value.type);
    dealRow.find('[data-deal-price]').html(value.price);

    var colPaid = dealRow.find('.column-paid');
    colPaid.removeClassWild('column-paid_*');

    if (dealRow.find('[data-deal-paid]').html()) {
        if (value.price <= dealRow.find('[data-deal-paid]').html().replace(/\D+/g, "")) {
            colPaid.addClass('column-paid_green');
        }
    }

    dealRow.find('[data-deal-start-date]').html(value.startDate);
    if (value.tag === null) {
        dealRow.find('[data-deal-tag]').html('<div>—</div>');
    } else {
        dealRow.find('[data-deal-tag]').html('<div title="' + value.tag + '" class="column-msg">' + value.tag + '</div>');
    }
    dealRow.find('[data-deal-mailing]').html(value.coupling);

    var select = dealRow.find('[js-form-status]');
    var form = select.parent($('form'));
    form.removeClassWild("deal-status__form_*").addClass("deal-status__form_" + value.statusCode);
    select.on('change', function (event) {
        event.preventDefault();
    });
    $("#" + $(select).attr('id') + " option:selected").removeAttr('selected');
    $("#" + $(select).attr('id')).val(value.status);

    var reminder = '';
    if (value.reminder) {
        reminder += '<div class="reminder-wrapper">' +
            '<div class="reminder-date" >' + value.reminderDate + '</div>' +
            '<div class="reminder-msg">' + value.reminderMessage + '</div>' +
            '</div>';
    }
    reminder += '<div class="reminder ' + (value.reminder ? (value.reminderExpiration ? 'reminder_red' : (value.reminderToday ? 'reminder_green' : 'reminder_gray')) : '') + '"></div>';
    if (value.reminder) {
        reminder += '<div class="reminder-d">' + value.reminderDate + '</div>';
    }

    dealRow.find('[data-deal-reminder]').html(reminder);

}

$(document).on('submit', '[js-add-bill-form]', function (event) {
    event.preventDefault();
    openBills($(this).serializeObject());
});

function openBills(formData) {
    $('[js-add-bill-form]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/bills/getManagerBills",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (data.length > 0) {
                $('[js-bill-payment-type]').val("Доплата");
                $('[js-bill-payment-type-text]').text("Тип платежа: Доплата");
            } else {
                $('[js-bill-payment-type]').val("Новый клиент");
                $('[js-bill-payment-type-text]').text("Тип платежа: Первая оплата");
            }
            $('[js-bills-deal-id]').val(formData.id);
            createBills(data);
            $('[js-menu-bills]').addClass('is-open');
            checkBodyHidden();
            $('[js-add-bill-form]').prop("disabled", false);

            const paymentMethods = dealAPI.getPaymentMethods();

            paymentMethods.then((methods) => {
                const methodItems = $.map(methods, (method, index) => {
                    return `
                        <option value="${method.title}" data-code="${method.code}" class="">${method.title}</option>
                    `
                });

                const childrenMethods = $.makeArray($('[js-bill-payment-method]').children()).filter((el, index) => index !== 0);

                $(childrenMethods).remove();

                $('[js-bill-payment-method]').append(methodItems);
            });

        },
        error: function (data) {
            $('[js-add-bill-form]').prop("disabled", false);
        }
    });
}

function createBills(billList) {
    $('[js-bills-body]').html('');

    if (billList.length > 0) {
        $('[js-bills]').addClass('is-open');
    } else {
        $('[js-bills]').removeClass('is-open');
    }
    // checkBodyHidden();
    $.each(billList, function (index, value) {
        var response = "";
        response += '<div class="div-table__body-row">';

        // установка значения в в меню
        var seloption = "";
        $.each($paymentMethodList, function (index, value2) {
            seloption += '<option value="' + value2.title + '" data-code="' + value2.code + '">' + value2.title + '</option>';
        });

        //если статус 1 проверено, то зеленая иначе можно редактировать
        if (value.status === 2) {
            response += '<div class="div-table__body-col div-table__body-col_exxsmall div-table__body-col_center">' +
                '<div class="column_bstatus column_bstatus_checked"></div>' +
                '</div>';
        } else {
            response += '<div class="div-table__body-col div-table__body-col_exxsmall div-table__body-col_center">' +
                '<div class="column_bstatus column_bstatus_unchecked"></div>' +
                '</div>';
        }

        response += '<div class="div-table__body-col div-table__body-col_medium">' +
            '<div class="column-text">' + value.manager + '</div>' +
            '</div>';

        response += '<form b-update-bill-form action="#" class="edit-form-bill">' +
            '<input type="hidden" b-id-bill value="' + value.id + '" name="id" required>' +
            '<input type="hidden" value="' + value.idDeal + '" name="idDeal" required>' +
            '<input type="hidden" b-pm value="' + value.paymentMethod + '" name="paymentMethod">' +
            '<input type="hidden" b-pm-code value="' + value.paymentMethodCode + '" name="paymentMethodCode">' +
            '<div class="div-table__body-col div-table__body-col_small">' + value.billDate + '</div>';

        // add сумму
        response += '<div class="div-table__body-col div-table__body-col_center div-table__body-col_xsmall">' +
            '<input b-sum disabled name="sum" class="menu-input__input menu-input__input_small editable" value="' + value.sum + '" placeholder="0 ₽">' +
            '</div>';

        response += '<div class="div-table__body-col div-table__body-col_xxsmall">' +
            '<div b-pm-wrapper class="pmethod-wrapper disabled">' +
            '<select b-pm-selector disabled class="column_pmethod-select column_pmethod_' + value.paymentMethodCode + '">' +
            seloption +
            '</select>' +
            '</div>' +
            '</div>';

        // add номер счета
        response += '<div class="div-table__body-col div-table__body-col_medium  div-table__body-col_center div-table__body-col_r10">' +
            '<input b-account-number disabled name="accountNumber" class="menu-input__input menu-input__input_small editable" value="' + (value.accountNumber === null ? '' : value.accountNumber) + '" placeholder="—">' +
            '</div>';

        response += '<div class="div-table__body-col col-pay-date div-table__body-col_center div-table__body-col_medium ">' +
            '<div class="menu-input__wrapper menu-input__wrapper_xsmall">' +
            '<input b-pay-date disabled name="payDate" ' +
            'class="datepicker-here-cs menu-input__input menu-input__input_small editable" autocomplete="off" value="' + (value.payDate === null ? '' : value.payDate) + '" data-autoclose="true" placeholder="—"/>' +
            '</div></div>';

        // add оплачен/выставлен
        if (value.payDate === null) {
            response += '<div class="div-table__body-col div-table__body-col_small col-status">Выставлен</div>';
        } else {
            response += '<div class="div-table__body-col div-table__body-col_small col-status div-table__body-col_green">Оплачен</div>';
        }

        // add тип оплаты
        response += '<div class="div-table__body-col div-table__body-col_small">' + (value.paymentType === 'Новый клиент' ? 'Первый' : 'Доплата') + '</div>';

        // add ссылка
        if (value.link !== null && value.link !== '') {
            response += '<div class="div-table__body-col div-table__body-col_xxsmall div-table__body-col_center">' +
                '<div class="column-links"><div js-copy-link data-link="' + value.link + '" class="column_mwidth column_mwidth-copy"></div>' +
                '<a js-open-link href="' + value.link + '" target="_blank" class="column_mwidth column_mwidth-open"></a></div></div>';
        } else {
            response += '<div class="div-table__body-col div-table__body-col_xxsmall">' +
                '<div>—</div></div>';
        }
        response += '</form>';

        // add коммент
        response += '<div data-bill-id="' + value.id + '" class="div-table__body-col div-table__body-col_medium div-table__body-col_center">' +
            '<div class="column-links">' +
            ((value.comment === null)
                ? '<div js-add-sms-check js-check-btn class="column_mwidth column_mwidth-large column_mwidth_bordered div-table__body-col_center column_mwidth-add-check"></div>'
                : '<div js-delete-sms-check js-check-btn title="' + value.comment + '" class="column_mwidth column_mwidth-large column_mwidth_bordered div-table__body-col_center column_mwidth-delete-check"></div>') +
            ((value.billImage !== null && value.billImage !== '')
                ? '<a class="column-img column_mwidth column-img_large div-table__body-col_center" data-fancybox="gallery" href="../' + value.billImage + '">' +
                '<img src="/' + value.billImage + '">' +
                '</a>'
                : '<form js-upload-bill-form action="#" class="column_mwidth column_mwidth-large div-table__body-col_center div-table__body-col_fl" enctype="multipart/form-data">' +
                '<input type="hidden" value="' + value.id + '" name="id" required>' +
                '<input type="hidden" value="false" name="isHidden" required>' +
                '<input type="hidden" value="' + value.idDeal + '" name="idDeal" required>' +
                '<input js-upload-bill accept="image/*,image/jpeg" class="input-file" name="file" type="file" id="file' + index + '"/>' +
                '<label for="file' + index + '" class="js-labelFile">' +
                '<span class="js-upload-file js-upload-file_small"></span>' +
                '</label>' +
                '</form>') +
            '</div>' +
            '</div>';

        response += '<div class="div-table__body-col div-table__body-col_center div-table__body-col_xxsmall">';

        if (value.status === 1 && value.isEditable) {
            response += '<div js-edit-btns class="column-links display-flex-none">' +
                '<div js-edit-bill-accept class="column_mwidth column_mwidth-accept"></div>' +
                '<div js-edit-bill-cancel class="column_mwidth column_mwidth-cancel"></div>' +
                '</div>' +
                '<div js-edit-menu class="column-links display-flex-none is-open">' +
                '<div js-edit-bill class="column_mwidth div-table__body-col_center column_mwidth-edit"></div>' +
                '<form js-delete-bill-form class="column-form" action="#">' +
                '<input type="hidden" value="' + value.id + '" name="id" required>' +
                '<button js-delete-bill type="button" class="column_mwidth column_mwidth-delete"></button>' +
                '</form>' +
                '</div>';
        }

        response += '</div>' +
            '</div>';

        $('[js-bills-body]').html($('[js-bills-body]').html() + response);
    });

    initDatePicker();
    initFancy();

    initEditBillForm();
    initCancelEditBill();
    initAcceptEditBill();
}

function validateNewClientInfo(inputs) {
    const values = [];

    $.each(inputs, (index, item) => {
        if ($(item).val()) {
            values.push($(item).val());
        }
    });

    if (values.length != 0) {
        $.each(inputs, (index, item) => {
            $(item).prop('required', false);
        });
    }
}

function initDatePickerPayDate() {
    $('.datepicker-here-pay').datepicker({
        autoClose: true,
        maxDate: new Date(),
        todayButton: true
    });
}

function initDatePicker() {
    $('.datepicker-here-cs').datepicker({
        autoClose: true,
        maxDate: new Date(),
        todayButton: true
    });
}

function initFancy() {
    $('[data-fancybox="gallery"]').fancybox({
        infobar: false,
        buttons: [
            "close"
        ],
    });
}

$(document).on('click', '[js-add-bill-up-client]', function (event) {
    var clientId = $(this).closest('.custom-table__body-row').find('[js-client-id]').val();
    var clientName = $(this).closest('.custom-table__body-row').find('[js-client-id]').siblings('span').html();

    setIdClient(clientId);

    $('[js-client-name-copy]').text(clientName);
    $('[js-client-name-copy]').attr('data-link', clientName);
});

$(document).on('change', '[js-upload-bill]', function (event) {
    var form = $(this).closest('[js-upload-bill-form]')
    var data = new FormData(form[0]);
    $('[js-upload-bill]').prop("disabled", true);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/bills/uploadBill",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            updateBillImageOnList(data);

            var formData = form.serializeObject();
            formData['id'] = formData.idDeal;
            openBills(formData);
            $('[js-upload-bill]').prop("disabled", false);
        },
        error: function (e) {
            $('[js-upload-bill]').prop("disabled", false);
        }
    });
});

$(document).on('change', '[js-upload-bill-front]', function (event) {
    var form = $(this).closest('[js-upload-bill-form]')
    var data = new FormData(form[0]);
    $('[js-upload-bill-front]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/bills/uploadBill",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            updateBillImageOnList(data);
            $('[js-upload-bill-front]').prop("disabled", false);
        },
        error: function (e) {
            $('[js-upload-bill-front]').prop("disabled", false);
        }
    });
});

function updateBillImageOnList(billData) {
    var imageBillForm = $('[js-upload-bill-form][bill-image="' + billData.id + '"]');
    imageBillForm.replaceWith('<a class="column-img column-img_mr5" data-fancybox="gallery' + billData.id + '" href="/' + billData.billImage + '">' +
        '  <img src="/' + billData.billImage + '"></a>');
}

//активация редактирования формы
var BILLS_INFO_TEMP = {};

$(document).on('click', '[edit-bill]', function (event) {
    event.preventDefault();
    $(this).closest('[edit-menu]').removeClass('is-open').siblings('[edit-btns]').addClass('is-open');
    var list = {};
    var pd = $(this).closest('.custom-table__body-row').find('[b-pay-date]');
    pd.removeAttr('disabled');
    list['payDate'] = pd.val();

    var s = $(this).closest('.custom-table__body-row').find('[b-sum]');
    list['sum'] = s.val();
    s.val(s.val().replace(' ₽', '')).removeAttr('disabled');

    $(this).closest('.custom-table__body-row').find('[b-pm-wrapper]').removeClass('disabled');
    $(this).closest('.custom-table__body-row').find('[b-pm-selector]').removeAttr('disabled');
    var pm = $(this).closest('.custom-table__body-row').find('[b-pm]');
    list['paymentMethod'] = pm.val();
    var pmCode = $(this).closest('.custom-table__body-row').find('[b-pm-code]');
    list['paymentMethodCode'] = pmCode.val();

    var an = $(this).closest('.custom-table__body-row').find('[b-account-number]');
    an.removeAttr('disabled');
    list['accountNumber'] = an.val();

    BILLS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[b-id-bill]').val()] = list;
});

$(document).on('click', '[edit-bill-cancel]', function (event) {
    event.preventDefault();
    var values = BILLS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[b-id-bill]').val()];

    $(this).closest('.custom-table__body-row').find('[b-pay-date]').val(values.payDate).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[b-sum]').val(values.sum).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[b-account-number]').val(values.accountNumber).attr("disabled", true);

    $(this).closest('.custom-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
    $(this).closest('.custom-table__body-row').find('[b-pm-selector]')
        .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + values.paymentMethodCode).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[b-pm]').val(values.paymentMethod);
    $(this).closest('.custom-table__body-row').find('[b-pm-code]').val(values.paymentMethodCode);

    $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
    delete BILLS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[b-id-bill]').val()];
});

var ACCEPT_EDITE_BTN;
$(document).on('click', '[edit-bill-accept]', function (event) {
    event.preventDefault();
    ACCEPT_EDITE_BTN = $(this);

    var billData = new Object();
    billData.id = $(this).closest('.custom-table__body-row').find('[b-id-bill]').val();
    billData.idDeal = $(this).closest('.custom-table__body-row').find('[b-id-deal]').val();
    billData.paymentMethod = $(this).closest('.custom-table__body-row').find('[b-pm]').val();
    billData.paymentMethodCode = $(this).closest('.custom-table__body-row').find('[b-pm-code]').val();
    billData.sum = $(this).closest('.custom-table__body-row').find('[b-sum]').val();
    billData.accountNumber = $(this).closest('.custom-table__body-row').find('[b-account-number]').val();
    billData.payDate = $(this).closest('.custom-table__body-row').find('[b-pay-date]').val();

    $('[edit-bill-accept]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/bills/updateBill",
        data: JSON.stringify(billData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pay-date]').val(data.payDate).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-sum]').val(data.sum + ' ₽').attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-account-number]').val(data.accountNumber).attr("disabled", true);

            if (data.payDate === null || data.payDate === '') {
                ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('.column-bill__status').removeClass('column-bill__status_paid').html('Выставлен');
            } else {
                ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('.column-bill__status').addClass('column-bill__status_paid').html('Оплачен');
            }

            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-selector]')
                .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + data.paymentMethodCode).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm]').val(data.paymentMethod);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-code]').val(data.paymentMethodCode);


            ACCEPT_EDITE_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
            delete BILLS_INFO_TEMP[data.id];

            $('[edit-bill-accept]').prop("disabled", false);
        },
        error: function (data) {
            var values = BILLS_INFO_TEMP[billData.id];

            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pay-date]').val(values.payDate).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-sum]').val(values.sum).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-account-number]').val(values.accountNumber).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-selector]')
                .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + values.paymentMethodCode).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm]').val(values.paymentMethod);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-code]').val(values.paymentMethodCode);

            ACCEPT_EDITE_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
            delete BILLS_INFO_TEMP[data.id];
            $('[edit-bill-accept]').prop("disabled", false);
        }
    });
});

// сохранение сделки

let btnSaveDeal;

var SAVE_DEAL_TYPE;
$(document).on('click', '[js-save-deal]', function (event) {
    event.preventDefault();

    btnSaveDeal = event.target;

    SAVE_DEAL_TYPE = "s";
    $('[js-deal-form]').trigger('submit');
});

///сохранение сделки и открытие выставление счета
$(document).on('click', '[js-save-and-bill-deal]', function (event) {
    event.preventDefault();
    SAVE_DEAL_TYPE = "sb";
    $('[js-deal-form]').trigger('submit');
});

$(document).on('submit', '[js-deal-form]', function (event) {
    event.preventDefault();

    if (validateForm(this)) {
        var dealData = $(this).serializeObject();
        const idTariff = +$(this).closest('[js-menu-create-deal]').find('[id-tariff]').val();

        dealData.idFunnel = +$(this).closest('[js-menu-create-deal]').find('[deal-type] option:selected').attr('value');
        dealData.idTariff = +idTariff ? idTariff : null;
        dealData.reminders = [];
        delete dealData.reminderDate;
        delete dealData.reminderMessage;

        const tasks = $(btnSaveDeal).closest('[js-menu-create-deal]').find('.menu-tasks__wrapper').find('.task');

        $.each(tasks, (index, item) => {
            const task = {
                done: $(item).find('.task__status').is('.reminder__done'),
                reminderDate: $(item).find('.task__date').html(),
                reminderMessage: $(item).find('.task__message').html(),
            }
            dealData.reminders.push(task);
        });

        if (SAVE_DEAL_TYPE === 's') {
            createDeal(dealData);
        } else if (SAVE_DEAL_TYPE === 'sb') {
            createDealAndBill(dealData);
        }
    }
});

function createDeal(dealData) {
    $('[js-save-deal]').prop("disabled", true);
    $('[js-save-and-bill-deal]').prop("disabled", true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/saveDeal",
        data: JSON.stringify(dealData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            idSavedDeal = data;
            $('[js-deals-list]').children().remove();
            updateDealCard(dealData.idClient, idSavedDeal);
            $('[js-bill-deal-id]').val(data);
            $('[js-menu-create-deal]').removeClass('is-open');
            checkBodyHidden();

            $('.create-deal__funnel').remove();

            // resetCreateDealForm();

            $('[js-save-deal]').prop("disabled", false);
            $('[js-save-and-bill-deal]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-deal]').prop("disabled", false);
            $('[js-save-and-bill-deal]').prop("disabled", false);
        }
    });
}

function createDealAndBill(dealData) {
    $('[js-save-deal]').prop("disabled", true);
    $('[js-save-and-bill-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/saveDeal",
        data: JSON.stringify(dealData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            idSavedDeal = data;
            $('[js-deals-list]').children().remove();

            updateDealCard(dealData.idClient, idSavedDeal);
            $('[js-bill-deal-id]').val(data);
            $('[js-menu-create-deal]').removeClass('is-open');
            checkBodyHidden();

            $('.create-deal__funnel').remove();

            // resetCreateDealForm();

            setBillInfo(dealData);
            $('[js-menu-bill]').addClass('is-open');
            checkBodyHidden();

            $('[js-save-deal]').prop("disabled", false);
            $('[js-save-and-bill-deal]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-deal]').prop("disabled", false);
            $('[js-save-and-bill-deal]').prop("disabled", false);
        }
    });
}

function setBillInfo(data) {
    $('[js-bill-info-product]').text(data.course);
    $('[js-bill-info-sum]').text(data.price);
    $('[js-bill-info-date]').text(data.dealDate);
}

$(document).on('change', '[product-types]', function (event) {
    $('[js-deal-form-price]').val(0);
    $('[js-deal-form-start-date]').html('<option value="" disabled selected>Выберите дату старта</option>');
    var idType = $('option:selected', this).attr('data-id');

    $('#product-category option:selected').removeAttr('selected');
    $('#product-category option:first').prop('selected', true);

    if (idType == 2) {
        createProductOptions($coursesList, 'js-deal-form-product');
        $('[product-block]').removeClass('menu-input_close');
        $('[trial-block]').removeClass('menu-input_close');
        $('[product-category-block]').addClass('menu-input_close');
        $('[start-date-block]').removeClass('menu-input_close');
    } else if (idType == 3) {
        createEmptyProductOptions('js-deal-form-product');
        $('[product-category-block]').removeClass('menu-input_close');
        $('[product-block]').addClass('menu-input_close');
        $('[trial-block]').addClass('menu-input_close');
        $('[start-date-block]').addClass('menu-input_close');
    } else {
        $('[product-block]').addClass('menu-input_close');
        $('[trial-block]').addClass('menu-input_close');
        $('[product-category-block]').addClass('menu-input_close');
        $('[start-date-block]').addClass('menu-input_close');
    }
});

function createProductOptions(list, ident) {
    var seloption = "";
    seloption += '<option value="" disabled selected>Выберите продукт</option>';
    $.each(list, function (index, value2) {
        seloption += '<option data-id="' + value2.id + '" value="' + value2.name + '" data-type="' + value2.type + '" data-price="' + value2.price + '"">' + value2.name + '</option>';
    });
    $('[' + ident + ']').html(seloption);
}

function createEmptyProductOptions(ident) {
    $('[' + ident + ']').html('<option value="" disabled selected>Выберите продукт</option>');
}

//список продуков по категориям
var $productMap;

function setProductMap(productMap) {
    $productMap = productMap;
}

$(document).on('change', '[product-category]', function () {
    $('[js-deal-form-price]').val(0);
    var idCategory = $('option:selected', this).val();
    createProductOptions($productMap[idCategory], 'js-deal-form-product');
    $('[product-block]').removeClass('menu-input_close');
});

$(document).on('change', '[u-product-category]', function () {
    $('[js-update-form-deal-price]').val(0);
    var idCategory = $('option:selected', this).val();
    createProductOptions($productMap[idCategory], 'js-update-form-deal-pr');
    $('[u-product-block]').removeClass('menu-input_close');

});
$(document).on('change', '[u-product-types]', function () {
    $('[js-update-form-deal-price]').val(0);
    $('[js-update-form-deal-start-date]').html('<option value="" disabled selected>Выберите дату старта</option>');
    var idType = $('option:selected', this).attr('data-id');

    $('#u-product-category option:selected').removeAttr('selected');
    $('#u-product-category option:first').prop('selected', true);
    $('#js-update-form-deal-pr option:selected').removeAttr('selected');
    $('#js-update-form-deal-pr option:first').prop('selected', true);

    if (idType == 2) {
        createProductOptions($coursesList, 'js-update-form-deal-pr');
        $('[u-product-block]').removeClass('menu-input_close');
        $('[u-trial-block]').removeClass('menu-input_close');
        $('[u-product-category-block]').addClass('menu-input_close');
        $('[u-start-date-block]').removeClass('menu-input_close');
    } else if (idType == 3) {
        createEmptyProductOptions('js-update-form-deal-pr');
        $('[u-product-category-block]').removeClass('menu-input_close');
        $('[u-product-block]').addClass('menu-input_close');
        $('[u-trial-block]').addClass('menu-input_close');
        $('[u-start-date-block]').addClass('menu-input_close');
    } else {
        $('[u-product-block]').addClass('menu-input_close');
        $('[u-trial-block]').addClass('menu-input_close');
        $('[u-product-category-block]').addClass('menu-input_close');
        $('[u-start-date-block]').removeClass('menu-input_close');
    }
});

$(window).on('load', window_onload);

function deletestatusOption() {
    $.each($('.custom-table__body-row'), (index, item) => {
        const paid = $(item).find('[data-deal-paid]').text().split('₽')[0];
        if (paid > 1) {
            const statuses = $(item).find('[js-deal-form-status]');
            $.each(statuses, (count, elem) => {
                if ($(elem).data('code') === 'closed') {
                    $(elem).remove();
                }
            });
        }
    });
}

function window_onload() {
    deletestatusOption();
}

$(document).on('click', '[js-create-client]', function () {
    $('[js-menu-search]').removeClass('is-open');
});

checkStatusDeal();

function checkStatusDeal() {
    const row = $('.custom-table__body-row');

    $.each(row, (index, item) => {
        const status = $(item).find('.deal-status__form');
        const statusClasses = status.attr('class');

        if (statusClasses) {
            if (statusClasses.split(' ')[1].split('important').length > 1) {
                const important = $(item).find('.column-paid');
                $(important).removeClass('column-paid_green');
                $(important).css({backgroundColor: '#d9d9d9'});
            }
        }
    });
}

function setFunnelsToDeals(dealType, funnels, settings = null, idFunnel = null) {
    if (!dealType || !funnels) return false;

    let deal;

    if (dealType === 'Трафик') {
        deal = 'traffic';
    }

    if (dealType === 'Допродажа') {
        deal = 'additional';
    }

    if ($('.create-deal__funnel').get(0)) {
        $('.create-deal__funnel').remove();
    }

    const funnel = JSON.parse(JSON.stringify(funnels));

    const funnelsObj = Object.entries(funnel);

    $.each(funnelsObj, (index, item) => {
        const type = item[0];
        const funnelsName = item[1];

        if (type === dealType || type === deal) {
            const chooseFunnel = () => {
                if (settings === 'update' || settings === null) {

                    const funnelOptions = $.map(funnelsName, (elem, count) => {
                        return `
                        <option value="${+elem.idFunnel}">${elem.funnelName}</option>
                    `;
                    });

                    return `
                    <div funnel-create-deal class="create-deal__funnel">
                      <div class="menu-input__title">Воронка *</div>
                      <div class="menu-input__wrapper menu-input__wrapper_select">
                        <select required deal-type required class="menu-input__input menu-input__input_small menu-input__input_select">
                          <option value disabled selected>Выберите воронку</option>
                            ${funnelOptions.join('')}
                        </select>
                      </div>
                    </div>
                  `;
                }

                if (settings === 'view') {
                    let name;

                    $.each(funnelsName, (iter, subj) => {
                        if (subj.idFunnel === idFunnel) {
                            name = subj.funnelName;
                        }
                    });

                    return `
                        <div funnel-create-deal class="create-deal__funnel">
                            <div class="menu-input__title">Воронка</div>
                            <div class="menu-input__wrapper">
                                <div class="menu-input__input menu-input__input_small menu-input__input_select" type="text">${name ? name : 'Выберите воронку'}</div>
                            </div>
                        </div>
                    `;
                }
            };

            const dealType = $('.deal-type');

            if (!$('.create-deal__funnel').get(0)) {
                $(chooseFunnel()).insertAfter(dealType);
            }
            ;

            if (settings === 'update' && idFunnel !== null || settings === 'update' && idFunnel !== 0) {
                $.each($('[deal-type]').children(), (count, elem) => {
                    if (+$(elem).attr('value') === idFunnel) {
                        $(elem).prop('selected', true);
                    }
                });
            }
        }
    });
}

let selectClose = true;

function changeColor(value) {
    let color;

    if (value === 'important' || value === 'reservation' || value === 'installment' || value === 'closed') {
        color = 'white';
    } else {
        color = 'black';
    }

    return color;
}

let selected;

$(document).on('click', '.select__option', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    if (!selectClose) {
        const selectedText = $(t).html();
        const current = $(t).closest('.column-status').find('.select__head');

        current.html(selectedText);
        current.attr('data-code', `${$(t).data('code')}`);

        $(t).closest('.select__body').css({display: 'none'});

        $('.select__close').remove();

        let bgColor;
        bgColor = changeIndicatorColor(bgColor, $(t).data('code'));

        let color;
        color = changeColor($(t).data('code'));

        current.css({backgroundColor: `${bgColor}`, color: `${color}`});

        const data = {
            id: +$(t).closest('.select').find('[js-status-form]').attr('value'),
            status: +$(t).attr('value'),
        };

        selected = current;

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/deals/updateDealStatus",
            data: JSON.stringify(data),
            dataType: 'json',
            cache: false,
            success: function (data) {
                if ($(selected).attr('data-code') === 'important') {
                    $(selected).css({pointerEvents: 'none'});
                }
                ;
            },
            error: function (data) {
            }
        });

        selectClose = true;
    }
});

$(document).on('click', '.select__head', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    if (!selectClose) {
        $('.select__body').css({display: 'none'});
        $('.select__close').remove();

        selectClose = true;
    } else {
        const body = $(t).closest('.column-status').find('.select__body');

        body.css({display: 'flex'})

        $('body').append($('<div/>').css({
            display: 'block',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '1000',
            backgroundColor: 'transparent'
        }).attr('class', 'select__close'));

        selectClose = false;
    }
});

$(document).on('click', '.select__close', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!selectClose) {
        $('.select__body').css({display: 'none'});
        $('.select__close').remove();

        selectClose = true;
    }
});

function colorStatus() {
    $.each($('.select__head'), (index, item) => {
        let bgColor;

        bgColor = changeIndicatorColor(bgColor, $(item).data('code'));

        let color = changeColor($(item).data('code'));
        $(item).css({backgroundColor: `${bgColor}`, color: `${color}`});

        if ($(item).data('code') === 'important') {
            $(item).css({pointerEvents: 'none'});
        }
    });
}

colorStatus();

$(document).on('click', '.select__option--tariff', function (e) {
    const price = $(e.target).find('.tariff__price').html().split(' ')[0];
    $('[js-deal-form-price]').val(price);
    $('[js-update-form-deal-price]').val(price);
});

$(document).on('click', '.lesson-block__closed-icon', function (e) {
    const t = e.target;

    const clientCourseBlock = {
        courseBlock: {
            id: $(e.target).closest('.lesson-block').data('id'),
        },
        idDeal: +$(e.target).closest('.deal-card').attr('dealid'),
        enabled: !$(e.target).closest('.lesson-block').attr('enabled'),
    };

    const changeBlockEnabled = dealAPI.changeBlockEnabled(clientCourseBlock);

    changeBlockEnabled.then(() => {
        $(t).closest('.lesson-block').attr('enabled', `${clientCourseBlock.enabled ? 'true' : ''}`);

        if (clientCourseBlock.enabled) {
            $(t).closest('.lesson-block').addClass('active');
        } else {
            $(t).closest('.lesson-block').removeClass('active');
        }

        const switcher = $(t).closest('.deal__access-lessons ').find('.slide-toggle');
        const switcherIsActive = $(t).closest('.deal__access-lessons ').find('.slide-toggle').is('.slide-toggle_active');
        const blockIsActive = $(t).closest('.lesson-block').is('.active');

        if (!switcherIsActive && blockIsActive) {
            const idDeal = +$(t).closest('.deal-card').attr('dealid');
            const idClient = +$(t).closest('.lesson-block').find('.deal__lessons-item').attr('js-module-client');
            changeAllowed(idDeal, idClient, true);
            switcher.addClass('slide-toggle_active');
        }
    });
});

$(document).on('click', '.deal__lessons-item', function (event) {
    const t = event.target;

    const $this = $(this);
    const idModule = $this.attr('js-module');
    const idDeal = $this.attr('js-module-deal');
    const allowed = $(".slide-toggle[js-id-deal-toggle=" + idDeal + "]").hasClass('slide-toggle_active');
    const idClient = $this.attr('js-module-client');
    const enabled = $this.hasClass('deal__lessons-item_active');
    const toggle = $(t).closest('.deal-card').find('.slide-toggle');

    const haveTariff = $(t).closest('.deal__lessons').find('.lesson-block').length;

    if (allowed && enabled) {
        $this.removeClass('deal__lessons-item_active');
    } else if (allowed && !enabled) {
        toggle.addClass('slide-toggle_active');
        $this.addClass('deal__lessons-item_active');
        if (haveTariff) changeEnableBlock($(t).get(0), allowed, idDeal, idClient);
    } else if (!allowed && enabled) {
        $this.removeClass('deal__lessons-item_active');
    } else if (!allowed && !enabled && haveTariff) {
        toggle.addClass('slide-toggle_active');
        $this.addClass('deal__lessons-item_active');
        changeEnableBlock($(t).get(0), allowed, idDeal, idClient);
    } else if (!allowed && !enabled && !haveTariff) {
        toggle.addClass('slide-toggle_active');
        $this.addClass('deal__lessons-item_active');
        changeAllowed(idDeal, idClient, !allowed);
    }

    changeEnabledModule(idClient, idDeal, idModule, !enabled);
});

function changeEnableBlock(t, allowed) {
    if (Array.isArray(t)) {
        let blocks = t;
        if (blocks) {
            enableAllBlocks(blocks, allowed);
        }
    } else {
        const block = $(t).closest('.lesson-block');

        if (block) {
            enableCurrentBlock(block, allowed)
        }
    }
}

function getDataBlock(block, allowed) {
    return {
        courseBlock: {
            id: $(block).data('id'),
        },
        idDeal: +$(block).closest('.deal-card').attr('dealid'),
        enabled: allowed ? $(block).attr('enabled') ? $(block).attr('enabled') : false : true,
    };
}

function enableAllBlocks(blocks, allowed) {
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        const courseBlock = getDataBlock(block, allowed);

        ((courseBlock) => setTimeout(() => {
            dealAPI.changeBlockEnabled(courseBlock);
            $(block).addClass('active');
            $(block).attr('enabled', true);
        }, 0))(courseBlock);
    }
}

function enableCurrentBlock(block, allowed) {
    block.addClass('active');
    block.attr('enabled', true);

    const idDeal = +$(block).closest('.deal-card').attr('dealid');
    const idClient = +$(block).find('.deal__lessons-item').attr('js-module-client');
    const courseBlock = getDataBlock(block, allowed);

    const blockEnable = dealAPI.changeBlockEnabled(courseBlock);

    blockEnable.then(() => {
        if (!allowed) {
            $(block).addClass('active');
            $(block).attr('enabled', true);

            changeAllowed(idDeal, idClient, !allowed);
        }
    });
}

$(document).on('keydown', '.menu-input__edit-client', function(e) {
    const t = e.target;

    const btn = $('[js-menu-client-card]').find('[js-edit-client-btn]');
    $(btn).prop('disabled', false);
});
