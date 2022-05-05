$(document).ready(function(){
    const $filterForm = $('.filter__form');
    const $filter = $('.platform__filter');
    const $filterOpenBtn = $('.platform__filter--btn');
    const $filterCloseBtn = $('[tr-filter-close-btn]').get(0) ? $('[tr-filter-close-btn]') : $('.platform__close--btn-modal');
    const $filterApply = $('.filter__apply');

    $filterOpenBtn.on('click', function() {
        $('body').css({overflow: 'hidden'});
        const filter = document.querySelector('.platform__filter');
        openModalAnimation(filter);
    });

    $filterCloseBtn.on('click', function() {
        $('body').removeClass('hiddenOverflow');
        $filter.removeClass('open');
        resetFilter(FILTER_FROM_BACK);
    });

    $('.datepicker-here-f').datepicker({
        autoClose: true
    });

    $filterApply.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $filterForm.trigger('submit');
    })

    headManagerTransactionsFilter(filter);
});

//список фильтр
var FILTER_FROM_BACK;
function setFilter(filter) {
    FILTER_FROM_BACK = filter;
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

function resetFilter(filter) {
    if (filter) {
        $('#idManager option:selected').removeAttr('selected');
        $('#idManager').val(filter.idManager);

        $('#scoreType option:selected').removeAttr('selected');
        $('#scoreType').val(filter.scoreType);

        $('#idRateStatus option:selected').removeAttr('selected');
        $('#idRateStatus').val(filter.idRateStatus);

        $('#rateDateFrom').val(filter.rateDateFrom);
        $('#rateDateTo').val(filter.rateDateTo);
        $('#rateDateFrom').val(filter.rateDateFrom);
        $('#rateDateTo').val(filter.rateDateTo);
    }
}

$(document).on('change', '[filter-parameter]', function() {
    $(this).closest('form').trigger('submit');
});

$(document).on('change', '[tr-templates]', function() {
    $('[tr-template-items]').html('<option value="0" selected>Все пункты</option>');

    var currValue = $('option:selected', this).attr('value');
    if (currValue != 0) {
        var formData = new FormData();
        formData.append("id", currValue);
        setTemplateItemsByTemplate(formData);
    }
});
function setTemplateItemsByTemplate(formData) {
    $('[tr-templates]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getTemplateItems",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var currentOptions = $('[tr-template-items]').html();
            var seloption = "";
            $.each(data, function(index, value){
                seloption += '<option value="' + value.id + '">' + value.name + '</option>';
            });

            $('[tr-template-items]').html(currentOptions + seloption);

            $('[tr-templates]').prop("disabled", false);
        },
        error: function (data) {
            $('[tr-templates]').prop("disabled", false);
        }
    });
}

function headManagerTransactionsFilter(filter) {
    const form = document.querySelector('.filter__form');
    const items = form.querySelectorAll('.filter__item');

    const filterItems = [];

    items.forEach((item) => {
        const selects = item.querySelectorAll('select');
        const radios = item.querySelectorAll('input[type="radio"]');
        const inputs = item.querySelectorAll('input[type="text"]');
        const checkbox = item.querySelectorAll('input[type="checkbox"]');

        selects.forEach((elem) => {
            filterItems.push(elem);
        });

        radios.forEach((elem) => {
            filterItems.push(elem);
        });

        inputs.forEach((elem) => {
            filterItems.push(elem);
        });

        checkbox.forEach((elem) => {
            filterItems.push(elem);
        });
    });

    const filterData = Object.entries(filter);

    filterData.forEach((item) => {
        const field = item[0];
        const value = item[1];

        filterItems.forEach((elem) => {
            if (elem.getAttribute('name') === field) {
                setFilterItems(elem, value);
            }
        });
    });
}

function setFilterItems(item, value) {
    let type = item.tagName;

    /* Селект */
    if (type === 'SELECT') {
        Array.from(item.children).forEach((elem) => {
            elem.removeAttribute('selected');

            if (elem.value == value) {
                elem.setAttribute('selected', '');
            }

            if (elem.value === 'true' && value) {
                elem.setAttribute('selected', '');
            }

            if (elem.value === 'false' && !value && value !== null) {
                elem.setAttribute('selected', '');
            }

            if (elem.value === '' && value === null || elem.value === '' && value === '0') {
                elem.setAttribute('selected', '');
            }
        });
    }

    /* Инпут */
    if (type === 'INPUT' && item.getAttribute('type') === 'text') {
        item.value = value;
    }

    /* Чекбокс */
    if (type === 'INPUT' && item.getAttribute('type') === 'checkbox' && Array.isArray(value)) {

        if (value[0] === 'firstPaymentSearch' && item.getAttribute('value') === 'firstPaymentSearch') {
            item.checked = true;
        } else {
            value.forEach((elem) => {
                if (item.getAttribute('value') == elem) {
                    item.setAttribute('checked', '');
                }
            });
        }
    }

    /* Радио */
    if (type === 'INPUT' && item.getAttribute('type') === 'radio') {
        item.removeAttribute('checked');

        if (value === item.getAttribute('value')) {
            item.setAttribute('checked', '');
        }
    }
}