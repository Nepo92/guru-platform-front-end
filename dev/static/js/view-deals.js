var viewDeals = false;

var idDeal;

$(document).on('click', '[js-view-deal-btn]', function(event) {
    viewDeals = true;
    idDeal = +$(event.target).closest('.deal-card').attr('dealid');

    if (!idDeal) {
        idDeal = +$(event.target).closest('.custom-table__body-row').data('deal');
    }

    event.preventDefault();

    $('.task').remove();
    $('.menu-tasks__selector').remove();
    $('.menu-tasks__add').css({marginTop: '0'});

    $('.menu-tasks__btn').removeAttr('new-btn').attr('task-new-btn', '');

    $(this).closest('[js-view-deal-form]').trigger('submit');
});

$(document).on('submit', '[js-view-deal-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        getViewDealInfo(formData);
    }
});

$(document).on('click', '[js-menu-view-deal-close-btn]', function(event) {
    viewDeals = false;
    $('[js-menu-view-deal]').removeClass('is-open');

    setTimeout(() => {
        $('.datepicker-here.menu-tasks__datepicker.menu-input__wrapper_cal').val('')
        $('.menu-tasks__text').val('')
    }, 800)

    checkBodyHidden();
});

function getViewDealInfo(data) {
    $('[js-view-deal-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/getViewDeal",
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setViewDealInfo(data);
            $('[js-view-deal-btn]').prop("disabled", false);
            renderTasks(data.reminders);
        },
        error: function (data) {
            $('[js-view-deal-btn]').prop("disabled", false);
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
                                    <div class="task__status ${item.done ? 'reminder__done' : item.reminderToday ? 'reminder__now' : item.reminderExpiration ? 'reminder__off' : 'reminder__on'}"></div>
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
                `
            }
    
            $(task(item)).insertBefore('.menu-tasks__selector');
        });
    
        if (tasks.length !== 0 ) {
            $('.menu-tasks__add').css({ marginTop: '20px' });
        } else {
            $('.menu-tasks__add').css({ marginTop: '0' });
        }
    }
}

function setViewDealInfo(data) {
    resetViewDealMenu();
    $('[d-view-status]').html(data.statusName);
    $('[d-view-social]').html(data.socialName);
    $('[d-view-deal-date]').html(data.dealDate);
    $('[d-view-product]').html(data.product);
    $('[d-view-course]').html(data.course);
    $('[d-view-type]').html(data.type);
    $('[d-view-price]').html(data.price);
    $('[d-view-tag]').html(data.tag);
    $('[d-view-comment]').html(data.comment);

    if (data.type === 'Трафик') {
        // setDealRate();
        $('[view-deal-mailing-block]').addClass('is-open');
        $('[d-view-mailing]').prop("checked", data.isMailing);
    }

    if (data.kind !== null) {
        $('[view-deal-kind-block]').addClass('is-open');
        // setDealRate();
        $('[d-view-kind]').prop("checked", data.kind);
    }

    if (data.idSaleType === 2) {
        $('[view-deal-start-date-block]').addClass('is-open');

        // setDealRate();
        $('[d-view-start-date]').html(data.startDate);
        $('[view-deal-trial-block]').addClass('is-open');
        $('[d-view-mailing]').prop("checked", data.trial);
    }

    setFunnelsToDeals(data.type, funnels, 'view', data.idFunnel);

    const productData = {
        id: $('[js-update-form-deal-pr] option:selected').data('id'),
    }

    const getTariff = getTariffs(productData);

    getTariff.then((result) => {
        if (result.length !== 0) {
            setDealRate(result, 'modify', data.idTariff);
        } else {
            $('.tariff-content').remove();
        }
    });


    $('[js-menu-view-deal]').addClass('is-open');
    checkBodyHidden();
}

function resetViewDealMenu() {
    $('[d-view-status]').html('');
    $('[d-view-social]').html('');
    $('[d-view-deal-date]').html('');
    $('[d-view-product]').html('');
    $('[d-view-course]').html('');
    $('[d-view-type]').html('');
    $('[d-view-price]').html('');
    $('[d-view-tag]').html('');
    $('[d-view-comment]').html('');
    $('[view-deal-mailing-block]').removeClass('is-open');
    $('[d-view-mailing]').prop("checked", false);
    $('[view-deal-kind-block]').removeClass('is-open');
    $('[d-view-kind]').prop("checked", false);
    $('[view-deal-start-date-block]').removeClass('is-open');
    $('[d-view-start-date]').html('');
    $('[view-deal-trial-block]').removeClass('is-open');
    $('[d-view-mailing]').prop("checked", false);
}
