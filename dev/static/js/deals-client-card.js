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
            indicatorLeft.append($("<div/>").attr("class", `deal-indicator__history ${item.code}`).css({ backgroundColor: `${changeIndicatorColor(color, item.code)}` }));
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

const $menuClientCard = $('[js-menu-client-card]');
const $menuClientCardCloseBtn = $('[js-menu-client-card-close-btn]');

//закрытие карточки клиента
$menuClientCardCloseBtn.on('click', function () {
    // $menuSearch.removeClass('is-open');
    // $menuCreateClient.removeClass('is-open');
    $menuClientCard.removeClass('is-open');
    $('body').css({overflow: 'auto'});
});

//обновление статуса сделки на фронте
function updateDealStatusOnList(value) {
    var dealRow = $('[data-deal="' + value.id + '"]');
    var select = dealRow.find('[js-form-status]');
    var form = select.parent($('form'));
    form.removeClassWild("deal-status__form_*").addClass("deal-status__form_" + value.code);
    $(select).find('option:selected').removeAttr('selected');
    $(select).val(value.status);
}

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
            $('[js-update-deal-btn]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-deal-btn]').prop("disabled", false);
        }
    });
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

    $(dealWrapper).css({ height: +`${dealHeight}` + +`${marginDeal}` + 'px' });
}

function dealCreateHeight() {
    const sibling = $('.deal_create').parent().children('.deal-card');
    const siblingHeight = $(sibling[sibling.length - 2]).height();

    $('.deal_create').css({ height: `${siblingHeight}` });
}

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
            setClientCardInfo(data);
            $('[js-client-card]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-client-card]').prop("disabled", false);
        }
    });
});

var $statusesList;
function setStatusesList(statusesList) {
    $statusesList = statusesList;
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

//обновление карточек сделок
function updateDealCard(idClient) {
    $('[js-deals-list]').children().remove();
    $('[js-deals-list]').append($('<div/>').attr('class', 'preloader').html('Loading...').css({ textAlign: 'center' }));
    $('.menu__content-main_overy').scrollTop(0);

    if (typeof idClient !== "undefined") {

        // Утсанавливаем Таймаут на запрос, для того чтобы анимация меню не тормозила
        setTimeout(() => {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/api/deals/getDeals",
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
                            if ($statusesList) {
                                $.each($statusesList, function (index, value2) {
                                    selectoption += '<option js-deal-form-status value="' + value2.id + '" data-code="' +
                                        value2.code + '" ' + (value2.id === value.status ? 'selected="selected" ' : '') + '">' + value2.title + '</option>';
                                });
                            }
                        }

                        var reminder = "";
                        if (value.reminder) {
                            reminder += '<div class="menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-violet">' +
                                '<div class="deal__comment" title="' + value.reminderMessage + '">' + value.reminderMessage + '</div></div>';
                        } else {
                            reminder += '<div class="menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-empty">' +
                                '<div class="deal__comment">Нет напоминаний</div></div>';
                        }

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
                                        .append($("<div/>").attr("class", (value.reminders.length !== 0) ?
                                        (value.reminders[0].done) ? "deal__reminder-title deal-reminder deal-reminder_green " : "deal__reminder-title deal-reminder deal-reminder_red" : '')
                                        .html((value.reminders.length !== 0) ? (value.reminders[0].reminder) ? value.reminders[0].reminderDate : "Нет задач" : 'Нет задач'))
                                            .append((value.isEditable && value.status !== 1) ?
                                                $("<div/>").attr("class", "deal-task__add-task")
                                                    .append($("<form/>").attr("js-add-reminder-form", "").attr("action", "#")
                                                        .append($("<input/>").attr("type", "hidden").attr("name", "idDeal").val(value.id))
                                                        .append($("<button/>").attr("js-add-reminder-button", "").attr("class", "deal-task__icon"))
                                                    ) : ''
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
                                                        .append($("<select/>").attr("class", "deal-select menu-input__input_select").attr("name", "status").attr("js-deal-form-status", "").html((value.paid) ? seloption : selectoption))
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
                                                        $("<button/>").attr("type", "button").attr("class", "deal-card__recover").attr("js-reveal-deal-btn", "")
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

                        loadModules(idClient, value.id);

                        if (value.statusChanges.length !== 0) {
                            const dealCard = $(`[dealId = ${value.id}]`);
                            const indicatorLeft = dealCard.find('.deal-indicator__left');

                            const lastChanges = value.statusChanges.splice(value.statusChanges.length - 4, 3);

                            $.each(lastChanges, (count, elem) => {
                                indicatorLeft.append($('<div/>').attr('class', `deal-indicator__history ${elem.code}`))
                            })
                        }
                    });

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

function loadModules(idClient, idDeal) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/getDealsModulesInfo",
        data: JSON.stringify(idDeal),
        dataType: 'json',
        cache: false,
        success: function (data) {
                $modulesRoot = $("<div/>").attr("class", "deal__access-lessons ");
                $lessons = $("<div/>").attr("class", "deal__lessons");
                $.each(data.modules, function (index, value) {
                    $lessons.append($("<div/>").attr('js-module', value.idModule).attr('js-module-deal', idDeal).attr('js-module-client', idClient).attr('js-allowed', data.allowed).attr("class", "deal__lessons-item " + (value.enabled ? 'deal__lessons-item_active' : '')).html(value.number));
                });
                $access = $("<div/>").attr("class", "deal__access")
                    .append($("<div/>").attr("class", "deal__access-text")).html('Доступ к продукту')
                    .append($("<div/>").attr("class", "deal__access-btn slide-toggle " + (data.allowed ? 'slide-toggle_active' : '')).attr("js-id-deal-toggle", idDeal)
                        .append($("<div/>").attr("class", "slide-toggle__thumb")));
                $modulesRoot.append($access);
                $modulesRoot.append($lessons);

                $modulesRoot.insertAfter($('[js-deal-id=' + idDeal + ']'));

                // Установка высоты deal-list
                dealWrapperHeight()

            $(".slide-toggle[js-id-deal-toggle=" + idDeal + "]").click(function (event) {
                const t = event.target;
                const toggle = $(this);
                const idDeal = toggle.attr('js-id-deal-toggle');
                const allowed = toggle.hasClass('slide-toggle_active');

                if (allowed) {
                    toggle.removeClass('slide-toggle_active');
                } else {
                    toggle.addClass('slide-toggle_active');

                    const blocks = $.makeArray($(t).closest('.deal__access-lessons').find('.lesson-block'));

                    if (blocks.length) {
                        changeEnableBlock(blocks, allowed);
                    }
                }

                changeAllowed(idDeal, idClient, !allowed);
            });

                $('.deal__lessons-item[js-module-deal=' + idDeal + ']').click(function (event) {
                    var $this = $(this);
                    var idModule = $this.attr('js-module');
                    var idDeal = $this.attr('js-module-deal');
                    var allowed = $(".slide-toggle[js-id-deal-toggle=" + idDeal + "]").hasClass('slide-toggle_active');
                    var idClient = $this.attr('js-module-client');
                    var enabled = $this.hasClass('deal__lessons-item_active');
                    if (allowed) {
                        if (enabled) {
                            $this.removeClass('deal__lessons-item_active');
                        } else {
                            $this.addClass('deal__lessons-item_active');
                        }
                        changeEnabledModule(idClient, idDeal, idModule, !enabled);
                    }
                });
                // Установка высоты deal-list
                dealWrapperHeight()
        }
    });
}

var $courseKindsList;
function setCourseKindsList(courseKindsList) {
    $courseKindsList = courseKindsList;
}

function createKindList(course) {
    return $courseKindsList.filter($courseKindsList => $courseKindsList['courseName'] === course);
}
function createKindOptions(kindList) {
    var options = '<option value="" disabled selected>Выберите тип</option>';

    kindList.forEach(function (kind) {
        options += '<option value="' + kind["name"] + '">' + kind["name"] + '</option>';
    })
    return options;
}

function setUpdateDealInfo(data) {
    $('[js-menu-update-deal]').addClass('is-open');

    $('#js-update-form-deal-status option:selected').removeAttr('selected');
    $('#js-update-form-deal-social option:selected').removeAttr('selected');
    $('#js-update-form-deal-pr option:selected').removeAttr('selected');
    $('#js-update-form-deal-sale-type option:selected').removeAttr('selected');

    $("#js-update-form-deal-status").val(data.status);
    $("#js-update-form-deal-social").val(data.social);
    $('[js-update-form-deal-deal-date]').val(data.dealDate);
    $("#js-update-form-deal-pr").val(data.course);
    $("#js-update-form-deal-sale-type").val(data.type);
    $('[js-update-form-deal-start-date]').val(data.startDate);

    $('[js-update-form-kind-block]').removeClass('is-open');
    $('[js-update-form-kind]').html('');
    var list = createKindList(data.course);
    if (list.length > 0) {
        $('[js-update-form-kind]').html(createKindOptions(list));
        $('[js-update-form-kind]').val(data.kind);
        $('[js-update-form-kind-block]').addClass('is-open');
    }

    $('[js-update-form-deal-mailing]').prop("checked", false);
    if (data.type === 'traffic') {
        $('[js-update-form-deal-mailing-block]').addClass('is-open');
        if (data.isMailing) {
            $('[js-update-form-deal-mailing]').prop("checked", true);
        } else {
            $('[js-update-form-deal-mailing]').prop("checked", false);
        }
    } else {
        $('[js-update-form-deal-mailing-block]').removeClass('is-open');
        $('[js-update-form-deal-mailing]').prop('checked', false);
    }
    $('[js-update-form-deal-trial]').prop('checked', data.trial);
    $('[js-update-form-deal-price]').val(data.price);
    $('[js-update-form-deal-tag]').val(data.tag);
    $('[js-update-form-deal-comment]').val(data.comment);
    $('[js-deal-open-lessons]').prop('checked', data.allModulesHomeworkAllowed);

    $('[js-update-form-deal-reminder]').prop("checked", false);
    if (data.reminder) {
        $('[js-update-form-deal-reminder-block]').addClass('is-open');
        $('[js-update-form-deal-reminder-btn]').removeClass('is-open');
        $('[js-update-form-deal-reminder]').prop("checked", true);
        $('[js-update-form-deal-reminder-date]').val(data.reminderDate);
        $('[js-update-form-deal-reminder-msg]').val(data.reminderMessage);
    } else {
        $('[js-update-form-deal-reminder-block]').removeClass('is-open');
        $('[js-update-form-deal-reminder-btn]').addClass('is-open');
        $('[js-update-form-deal-reminder]').prop("checked", false);
        $('[js-update-form-deal-reminder-date]').val('');
        $('[js-update-form-deal-reminder-msg]').val('');
    }

    $('[js-update-form-deal-product-type]').val(data.product);
    $('[js-update-form-deal-client]').val(data.idClient);
    $('[js-update-form-deal-manager]').val(data.idManager);
    $('[js-update-form-deal-id]').val(data.id);

    checkBodyHidden();
}

$(document).on('click', '[js-update-deal-btn]', function (event) {
    event.preventDefault();
    $(this).closest('[js-update-deal-form]').trigger('submit');
});

$(document).on('submit', '[js-update-deal-form]', function (event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        setDealInfo(formData);
    }
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
            // setUpdateDealInfo(data);
            $('[js-update-deal-btn]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-deal-btn]').prop("disabled", false);
        }
    });
}

$(document).on('click', '.select__option--tariff', function (e) {
    const price = $(e.target).find('.tariff__price').html().split(' ')[0];
    $('[js-deal-form-price]').val(price);
});

$(document).on('keydown', '.menu-input__edit-client', function(e) {
    const t = e.target;

    const btn = $('[js-menu-client-card]').find('[js-edit-client-btn]');
    $(btn).prop('disabled', false);
});
