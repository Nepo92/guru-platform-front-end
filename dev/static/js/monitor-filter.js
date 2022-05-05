$(document).ready(function() {
    const $filterForm = $('.filter__form');
    const $filterFormBtn = $('.filter__apply');
    const $filter = $('.platform__filter');
    const $filterOpenBtn = $('[tr-filter-btn]');
    const $filterCloseBtn = $('.platform__close--btn-modal');

    setFilteritems(filter);

    $filterOpenBtn.on('click', function() {
        $('body').addClass('hiddenOverflow');
        $filter.addClass('open');
    });

    $filterCloseBtn.on('click', function() {
        $('body').removeClass('hiddenOverflow');
        $filter.removeClass('open');
        resetFilter(FILTER_FROM_BACK);
    });

    $filterFormBtn.on('click', function(event) {
        event.preventDefault();
        $filterForm.trigger('submit');
    });
});

//список фильтр
var FILTER_FROM_BACK;
function setDashboardFilter(filter) {
    FILTER_FROM_BACK = filter;
}

function resetFilter(filter) {
    $('#proceedType option:selected').removeAttr('selected');
    $('#proceedType').val(filter.proceedType);
    $('#projectId option:selected').removeAttr('selected');
    $('#projectId').val(filter.projectId);
}

$(document).on('change', '[filter-parameter]', function() {
    $(this).closest('form').trigger('submit');
});

$(document).on('click', '[js-menu-update-background-close-btn]', function() {
    $('[js-menu-update-background]').removeClass('is-open');
    $('[default-background-color]').prop("checked", false).attr("checked", false).removeAttr("checked");
    checkBodyHidden();
});

$(document).on('click', '[js-save-background]', function() {
    event.preventDefault();
    $('[js-update-background-form]').trigger('submit');
    showLoader();
});

$(document).on('submit', '[js-update-background-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var jsonData = $(this).serializeObject();
        updateBackground(jsonData);
    }
});

function updateBackground(jsonData) {
    $('[js-save-background]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: " ../monitor/updateCompanyBgColor",
        data: JSON.stringify(jsonData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            hideLoader();
            if ($('[default-background-color]').prop("checked")) {
                $('body').css("background-color", $('[default-background-color]').val());
            } else {
                $('body').css("background-color", jsonData['color']);
            }
            $('[js-menu-update-background]').removeClass('is-open');
            $('[default-background-color]').prop("checked", false).attr("checked", false).removeAttr("checked");
            checkBodyHidden();
            $('[js-save-background]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-background]').prop("disabled", false);
        }
    });
};

$(document).on('click', '[js-update-background]', function() {
    showLoader();
    var jsonItem = {};
    jsonItem['id'] = $(this).closest('.content-top').find('[name="idCompany"]').val();

    $('[js-update-background]').prop("disabled", true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: " ../monitor/getCompanyBgColor",
        data: JSON.stringify(jsonItem),
        dataType: 'json',
        cache: false,
        success: function (data) {
            hideLoader();
            openUpdateBackgroundMenu(data);
            $('[js-update-background]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-background]').prop("disabled", false);
        }
    });
});

function openUpdateBackgroundMenu(data) {
    $('[background-color]').val(data.color);
    $('[js-menu-update-background]').addClass('is-open');
    checkBodyHidden();
}

$(document).on('mouseenter', '.c-tooltip.tile__tooltip', function(event) {
    var topOffset = -10;
    var content = $(this).find('.tooltip-content').html();
    var tooltip = $('.c-tooltip__wrapper_right.tooltip-wrapper');

    if (typeof content !== "undefined" && content !== '') {
        var rect = $(this)[0].getBoundingClientRect();
        tooltip.css({top: $(window).scrollTop() + rect.top + topOffset, left: (rect.left - tooltip.width())});
        tooltip.html(content);
        tooltip.addClass('show');
    }
});

$(document).on('mouseleave', '.c-tooltip.tile__tooltip', function(event) {
    var tooltip = $('.c-tooltip__wrapper_right.tooltip-wrapper');
    tooltip.html('');
    tooltip.removeClass('show');
});

$(document).on('mouseenter', '.c-tooltip.action-info_prize', function(event) {
    var topOffset = -10;
    var content = $(this).find('.tooltip-content').html();
    var tooltip = $('.c-tooltip__wrapper_maxwidth.tooltip-wrapper');

    if (typeof content !== "undefined" && content !== '') {
        var rect = $(this)[0].getBoundingClientRect();
        tooltip.css({top: $(window).scrollTop() + rect.top + topOffset, left: rect.left + (rect.width/2)});
        tooltip.html(content);
        tooltip.addClass('show');
    }
});

$(document).on('mouseleave', '.c-tooltip.action-info_prize', function(event) {
    var tooltip = $('.c-tooltip__wrapper_maxwidth.tooltip-wrapper');
    tooltip.html('');
    tooltip.removeClass('show');
});

function checkImg() {
    const photos = $('.c-tooltip__avatar img');

    const changeSize = (photos) => {
        $.each(photos, (index, item) => {
            const resolution = $(item).width() / $(item).height();

            if (resolution < 1) {
                $(item).css({width: '100%', height: 'auto'});
            } else {
                $(item).css({width: '100%', height: '100%'});
            }
        });
    }

    changeSize(photos);
}

checkImg();

function setFilteritems(filter) {
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
