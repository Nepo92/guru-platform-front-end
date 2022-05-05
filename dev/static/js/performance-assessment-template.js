
$(document).on('click', '[add-template]', function(event){
    checkBodyHidden();
    recalculateTotal();

    $('body').css({overflow: 'hidden'});

    const menu = document.querySelector('[js-menu-add-template]');
    openModalAnimation(menu);
});
$(document).on('click', '[js-menu-add-template-close-btn]', function(event){
    resetAddTemplateForm();

    $('body').css({overflow: 'auto'});

    const menu = document.querySelector('[js-menu-add-template]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, false);

    checkBodyHidden();
});

$(document).on('keyup', '.rate-fields .menu-input__input_rate-value input', function (event){
   recalculateTotal();
});

function recalculateTotal() {
    var total = 0;
    $('.rate-fields .menu-input__input_rate-value input').each(function(index, item){
        var v = parseFloat($(item).val());
        if (!isNaN(v)) {
            total += v;
        }
    });
    $('[u-template-items-total]').html('Итого: ' + total).attr('template-items-total', total);
    $('[u-rate-alert]').toggle(total !== 5);
}

function resetAddTemplateForm() {
    $('[js-template-form]').trigger('reset');
    $('input[id^="addType"]').prop('checked', true);
    $('[data-item]').filter('[data-item!="0"]').remove();
    ITEMS_COUNT = 0;
}
var ITEMS_COUNT = 0;
$(document).on('click', '[add-rate-item]', function(event){
    ITEMS_COUNT++;
    $('[data-item]').last().after(
        '<div data-item="' + ITEMS_COUNT + '" class="rate-filed">' +
        '   <div class="rate-filed__wrapper menu-input__input_rate-filed">' +
        '      <input name="items[' + ITEMS_COUNT + '].name" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="Введите название пункта" required>' +
        '   </div>' +
        '   <div class="rate-filed__wrapper menu-input__input_rate-value">' +
        '      <input name="items[' + ITEMS_COUNT + '].goodScore" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="0" required>' +
        '   </div>' +
        '   <div delete-item class="rate-field__delete"></div>' +
        '</div>'
    );
    recalculateTotal();
});
$(document).on('click', '[delete-item]', function(event){
    $(this).closest('div[data-item]').remove();
    recalculateTotal();
});


$(document).on('click', '[save-template]', function(event){
    event.preventDefault();

    $('body').css({overflow: 'auto'});

    if (validateForm($('[js-template-form]').get(0))) {
        var formData = new FormData($('[js-template-form]').get(0));
        saveTemplate(formData);
    }
});

function saveTemplate(formData) {
    if (parseFloat($('[u-template-items-total]').attr('template-items-total')) !== 5) {
        alert('Количество баллов должно быть равным 5');
        return;
    }

    $('[save-template]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "savePerformanceAssessmentTemplate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setTemplate(data);
            resetAddTemplateForm();

            const menu = document.querySelector('[js-menu-add-template]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, false);

            checkBodyHidden();
            $('[save-template]').prop("disabled", false);
        },
        error: function (data) {
            $('[save-template]').prop("disabled", false);
        }
    });
}
function setTemplate(data) {
    var rows = $('[template-list]').html();
    var newRow = createRow(data);

    $('[template-list]').append(newRow);
}
function createRow(data) {
    var items = '';
    var userTypes = '';
    var itemCount = 0;
    $.each(data.items, function(index, item){
        itemCount++;
        items +=
            '<div class="c-tooltip__row">' +
            '   <div class="c-tooltip__text">' + item.name + '</div> ' +
            '</div>';
    });

    $.each(data.userTypes, function(index, userType){
        userTypes += '<span class="side-list__item">' + userType.title + '</span>';
    });

    return '<tr data-template="' + data.id + '" class="custom-table__body-row">' +
    '                                <td class="custom-table__body-col custom-table__body-col_25per">' +
    '                                    <div class="column-text">' + data.name + '</div>' +
    '                                </td>' +
    '                                <td class="custom-table__body-col custom-table__body-col_25per">' +
    '                                    <div class="side-tooltip ' + (itemCount !== 0 ? 'c-tooltip' : '') + '">' +
    '                                        <div class="c-tooltip__wrapper">' +
                                                items +
    '                                        </div>' +
    '                                        <span>' + itemCount + ' пунктов</span>' +
    '                                    </div>' +
    '                                </td>' +
    '                                <td class="custom-table__body-col custom-table__body-col_40per">' +
    '                                    <div class="side-list">' +
                                            userTypes +
    '                                    </div>' +
    '                                </td>' +
    '                                <td class="custom-table__body-col custom-table__body-col_10per">' +
    '                                    <div class="column-links display-flex-none is-open">' +
    '                                        <div update-template class="column_mwidth div-table__body-col_center column_mwidth-edit"></div>' +
    '                                        <form class="column-form" action="#">' +
    '                                            <button delete-template type="button" class="column_mwidth column_mwidth-delete"></button>' +
    '                                        </form>' +
    '                                    </div>' +
    '                                </td>' +
    '                            </tr>';
}

var DELETE_TEMPLATE;
$(document).on('click', '[delete-template]', function(event) {
    event.preventDefault();
    $('[dialog-accept]').find('.dialog__title').html('Вы действительно хотите удалить шаблон?');
    $('[dialog-accept]').find('.dialog__text').html('Шаблон будет удален');
    $('[dialog-accept]').find('[accept-dialog]').attr('accept-delete-template', '');
    $('[dialog-accept]').addClass('is-open');

    DELETE_TEMPLATE =  Number($(this).closest('[data-template]').data('template'));
});

$(document).on('click', '[close-dialog]', function(event) {
    removeAcceptBtnAttribute($(this).siblings('[accept-dialog]'));
    $('[dialog-accept]').removeClass('is-open');
});

$(document).on('click', '[accept-delete-template]', function(event) {
    var formData = new FormData();
    formData.append('id', DELETE_TEMPLATE);

    $.ajax({
        type: "POST",
        url: "deletePerformanceAssessmentTemplate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[data-template="' + DELETE_TEMPLATE + '"]').remove();
            $('[dialog-accept]').removeClass('is-open');

            removeAcceptBtnAttribute($(this));
        },
        error: function (data) {
            const menu = document.querySelector('[dialog-accept]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, false);

            removeAcceptBtnAttribute($(this));
        }
    });
});

$(document).on('click', '[update-template]', function(event){
    var formData = new FormData();
    formData.append('id', Number($(this).closest('[data-template]').data('template')));

    $('[update-template]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getPerformanceAssessmentTemplate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setUpdateTemplate(data);

            $('body').css({overflow: 'hidden'});

            $('[update-template]').prop("disabled", false);
        },
        error: function (data) {
            $('[update-template]').prop("disabled", false);
        }
    });
});

function setUpdateTemplate(data) {
    $('[u-template-id]').val(data.id);
    $('[u-template-name]').val(data.name);
    $.each(data.userTypes, function(index, userType){
        $('input[type="checkbox"][value="' + userType.id + '"]').prop('checked', true);
    });

    var items = '';
    $.each(data.items, function(index, item){
        items +=
            '<div data-item="' + index + '" class="rate-filed">' +
            '        <input type="hidden" value="' + item.id + '" name="items[' + index + '].id" required>' +
            '    <div class="rate-filed__wrapper menu-input__input_rate-filed">' +
            '        <input value="' + item.name + '" name="items[' + index + '].name" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="Введите название пункта" required>' +
            '    </div>' +
            '    <div class="rate-filed__wrapper menu-input__input_rate-value">' +
            '        <input value="' + item.goodScore + '" name="items[' + index + '].goodScore" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="0" required>' +
            '    </div>' +
            '    <div ' + (index !== 0 ? 'delete-item' : '') + ' class="rate-field__delete ' + (index === 0 ? 'rate-field__delete_disabled' : '') + '"></div>' +
            '</div>';
    });

    $('[u-template-items]').after(items);

    ITEMS_COUNT = data.items.length;

    const menu = document.querySelector('[js-menu-update-template]');
    openModalAnimation(menu);

    checkBodyHidden();
    recalculateTotal();
}

$(document).on('click', '[js-menu-update-template-close-btn]', function(event){
    resetUpdateTemplateForm();

    $('body').css({overflow: 'auto'});

    const menu = document.querySelector('[js-menu-update-template]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, false);

    checkBodyHidden();
});

function resetUpdateTemplateForm() {
    $('[js-update-template-form]').trigger('reset');
    $('input[id^="updateType"]').prop('checked', false);
    $('[u-template-items]').siblings('[data-item]').remove();

    ITEMS_COUNT = 0;
    recalculateTotal();
}

$(document).on('click', '[u-template]', function(event){
    event.preventDefault();

    $('body').css({overflow: 'auto'});

    $('[js-update-template-form]').trigger('submit');
});

$(document).on('submit', '[js-update-template-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-template-form]')[0]);
        updateTemplate(formData);
    }
});

function updateTemplate(formData) {
    if (parseFloat($('[u-template-items-total]').attr('template-items-total')) !== 5) {
        return;
    }
    $('[u-template]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updatePerformanceAssessmentTemplate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[template-list]').find('[data-template="' + formData.get('id') + '"]').replaceWith(createRow(data));

            resetUpdateTemplateForm();
            const menu = document.querySelector('[js-menu-update-template]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, false);

            checkBodyHidden();
            $('[u-template]').prop("disabled", false);
        },
        error: function (data) {
            $('[u-template]').prop("disabled", false);
        }
    });
}

$(document).on('click', '.select__option--tariff', function (e) {
    const price = $(e.target).find('.tariff__price').html().split(' ')[0];
    $('[js-deal-form-price]').val(price);
});

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
