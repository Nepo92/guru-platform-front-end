var TEMP_DATA = {};

function setCloneElement(item) {
    const itemClone = item.cloneNode(true);

    if (item.parentNode) {
        item.parentNode.appendChild(itemClone);
        item.remove();

        return itemClone;
    }
}

$(document).on('click', '[open-rates]', function (event) {
    const row = $(this).closest('.platform-table__row');
    const managerName = row.find('.column-manager .column-text').html();

    $('body').css({overflow: 'hidden'});

    openRatesMenu($(this).closest('[data-deal]').data('deal'), managerName);

    const estimationCol = $(row).find('.open-rates');
});

$(document).on('click', '[js-menu-rates-close-btn]', function (event) {
    const menu = document.querySelector('[js-menu-rates]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);

    checkBodyHidden();
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
    $(dealWrapper).css({height: `calc(${dealHeight}px + ${marginDeal}px)`});
}

function dealCreateHeight() {
    const sibling = $('.deal_create').parent().children('.deal-card');
    const siblingHeight = $(sibling[sibling.length - 2]).height();

    $('.deal_create').css({height: `${siblingHeight}`});

    if ($('.deal-card').length === 1) {
        $('.deal_create').css({height: '451px'});
    }
}

function openRatesMenu(idDeal, name) {
    var formData = new FormData();
    formData.append('id', idDeal);

    $('[open-rates]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getRateTemplatesInfo",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            // resetRateTemplatesInfo();
            setRateTemplatesInfo(data);

            const menu = document.querySelector('[js-menu-rate-point]');
            openModalAnimation(menu);

            checkBodyHidden();
            $('[open-rates]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            hideLoader();
            $('[open-rates]').prop("disabled", false);
        }
    });
}

function setRateTemplatesInfo(data) {
    var avatar = data.employee.avatar;
    if (avatar === null) {
        $('[rate-avatar]').addClass('avatar-image_default');
        $('[rate-avatar]').html('');
    } else {
        $('[rate-avatar]').html('<img src="/' + avatar + '" alt="">');
    }

    $('.rate-employee__name').html(data.employee.name !== null ? data.employee.name : '');
    $('.rate-employee__position').html(data.employee.position !== null ? data.employee.position : '');
    $('.rate-employee__date').html((data.editDate !== null ? data.editDate : ''));
    $('.rate-employee__deal-number').html(data.idDeal ? 'Сделка № ' + data.idDeal : '');

    $('[rate-id-deal]').val(data.idDeal);

    $('[template-fields]').children().remove();

    $.each($('[rate-wrapper]').children(), (index, item) => {
        if (index !== 0) {
            item.remove();
        }
    });

    const templates = $.map(data.templates, (item, index) => {
        return `
        <tr template-info="${item.id}" class="platform-table__row">
            <td class="platform-table__column rate-status">
                <div class="column_bstatus ${(item.isRated) ? "column_bstatus_checked" : "column_bstatus_unchecked"}"></div>
            </td>
            <td class="platform-table__column rate-point-item">
                <div class="column-text column-text_full">${item.name}</div>
            </td>
            <td class="platform-table__column rate-point-counter">
                <div class="column-text">${item.items.length}</div>
            </td>
            <td rate class="platform-table__column rate-values">
                ${(item.totalScore !== null) ?
            `<div class="score ${(item.totalScore > 0) ? "score__green" : (item.totalScore > 0) ? 'score__gray' : 'score__red'}">
                        ${(item.totalScore > 0) ? item.totalScore : item.totalScore}
                    </div>`
            :
            '<div class="score score_gray">—</div>'
        }
            </td>
            <td class="platform-table__column rate-btn">
                ${(item.isRated) ?
            `<div data-rate="${item.idRate}" open-rate class="platform-form__access-btn rate">Подробнее</div>`
            :
            `<div data-template="${item.id}" add-rate class="platform-form__access-btn rate">Оценить по списку</div>`
        }
            </td>
        </tr>`;
    });

    $('[rate-wrapper]').append(templates);
}

$(document).on('click', '[add-rate]', function (event) {
    openAddRateMenu($(this).attr('data-template'));
});

$(document).on('click', '[open-rate]', function (event) {
    openRateMenu($(this).closest('.platform-table__row').data('rate'));
});

function openAddRateMenu(idDeal) {
    var formData = new FormData();
    formData.append('id', idDeal);

    $('[add-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getPerformanceAssessmentTemplatesItems",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[rate-id-template]').val(formData.get('id'));
            resetTotalScore();
            setTemplateItems(data);

            const menu = document.querySelector('[js-menu-rate-view]');
            openModalAnimation(menu);

            checkBodyHidden();
            $('[add-rate]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            $('[add-rate]').prop("disabled", false);
        }
    });
}

$(document).on('click', '[js-menu-rate-close-btn]', function (event) {
    resetRateTemplateInfo();

    $('body').css({overflow: 'auto'});

    const menu = document.querySelector('[js-menu-rate-point]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);
    checkBodyHidden();
});

function resetRateTemplateInfo() {
    $('[js-save-rate]').attr('disabled', '');
    resetTotalScore();
    TEMP_DATA = {};
}

function resetRateTemplatesInfo() {
    $('[rate-avatar]').removeClass('avatar-image_default');
    $('[rate-avatar]').html('');
    $('[rate-employee-name]').html('');
    $('[rate-employee-position]').html('');
    $('[rate-date]').html('');
    $('[rate-deal]').html('');
    $('[templates]').html('');
}

$(document).on('change', '[rate-templates]', function (event) {
    var formData = new FormData();
    formData.append('id', Number($('option:selected', this).val()));

    $('[rate-templates]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getPerformanceAssessmentTemplatesItems",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[rate-id-template]').val(formData.get('id'));
            resetTotalScore();

            setTemplateItems(data);

            $('[rate-templates]').prop("disabled", false);
        },
        error: function (data) {
            $('[rate-templates]').prop("disabled", false);
        }
    });
});

function resetTotalScore() {
    $('.total-score').removeClassWild("score_*");
    $('.total-score').html('—');
}

function setTemplateItems(data) {
    $.each($('[rate-wrapper-items]').children(), (index, item) => {
        if (index !== 0) {
            item.remove();
        }
    });

    $('.rate-comment').css({display: 'flex'});

    var row = '';
    $.each(data, function (index, item) {
        row += '<tr class="platform-table__row">' +
            '<input type="hidden" name="items[' + index + '].idItem" value="' + item.id + '" required>' +
            '<td class="platform-table__column rate-point-item">' + item.name + '</td>' +
            '<td class="platform-table__column rate-comment">' +
            '   <div add-comment data-index="' + index + '" class="button button_white">Оставить комментарий</div>' +
            '</td>' +
            '<td class="platform-table__column rate-values">' +
            '   <div class="score item-score">—</div>' +
            '</td>' +
            '<td class="platform-table__column rate-btn">' +
            '   <div class="rate-block">           ' +
            '       <div class="rate-block__wrapper">               ' +
            '           <div class="rate-block__btn rate-block__btn_small">                   ' +
            '               <input type="radio" id="good' + index + '" class="radio radio_icon radio_like rate-value" name="items[' + index + '].score" value="' + item.goodScore + '" required>                   ' +
            '               <label for="good' + index + '" class="label">Отлично</label>               ' +
            '           </div>               ' +
            '           <div class="rate-block__btn rate-block__btn_small">                   ' +
            '               <input type="radio" id="bad' + index + '" class="radio radio_icon radio_dislike rate-value" name="items[' + index + '].score" value="0" required>                   ' +
            '               <label for="bad' + index + '" class="label">Плохо</label>               ' +
            '           </div>           ' +
            '       </div>       ' +
            '   </div>' +
            '</td>' +
            '</tr>';
    });

    $('[rate-wrapper-items]').append(row);
}

$(document).on('change', '.rate-value', function () {
    var score = Number($(this).val());
    var scoreBlock = $(this).closest('.platform-table__row').find('.item-score');

    scoreBlock.removeClassWild("score_*");
    if (score > 0) {
        scoreBlock.addClass('score_green');
    } else if (score < 0) {
        scoreBlock.addClass('score_red');
    } else {
        scoreBlock.addClass('score_gray');
    }
    scoreBlock.html(score);

    checkAllRateValueSelected();
    countTotalScore();
});

function checkAllRateValueSelected() {
    var i = 0;
    var isAllSelected = true;
    while (true) {
        if ($('input[type="radio"][name="items[' + i + '].score"]').length) {
            if (!$('input[type="radio"][name="items[' + i + '].score"]').is(':checked')) {
                isAllSelected = false;
            }
        } else {
            break;
        }
        i++;
    }

    if (isAllSelected) {
        $('[js-save-rate]').removeAttr('disabled');
    }
}

function countTotalScore() {
    var total = 0;
    $.each($('.rate-value:checked'), function (index) {
        total += Number($(this).val())
    });

    var totalScoreBlock = $('.total-score');

    totalScoreBlock.removeClassWild("score_*");
    if (total > 0) {
        totalScoreBlock.addClass('score_green');
    } else if (total < 0) {
        totalScoreBlock.addClass('score_red');
    } else {
        totalScoreBlock.addClass('score_gray');
    }

    totalScoreBlock.html(total);
}

$(document).on('click', '[js-save-rate]', function (event) {
    event.preventDefault();
    showLoader();

    if (validateCheckboxForm($('[js-rate-form]')[0])) {
        var formData = new FormData($('[js-rate-form]')[0]);

        $.each(TEMP_DATA, function (index, item) {
            formData.append('items[' + index + '].exComment', item.get('exComment'));
            $.each(item.getAll('files'), function (index2, file) {
                formData.append('items[' + index + '].files', file);
            });
        });

        formData.set('idDeal', $('[js-rate-form]').closest('.rate-employee').find('[rate-id-deal]').val())
        formData.set('idPerformanceAssessmentTemplate', $('[js-rate-form]').closest('.rate-employee').find('[rate-id-template]').val())

        saveRate(formData);
    }
});

function saveRate(formData) {
    $('[js-save-rate]').prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "saveRate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            replaceTemplateInfoRow(data);
            resetRateTemplateInfo();

            const menu = document.querySelector('[js-menu-rate-view]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, true);

            checkBodyHidden();
            $('[js-save-rate]').prop("disabled", false);
            hideLoader();

            renderRate(data);
        },
        error: function (data) {
            $('[js-save-rate]').prop("disabled", false);
            hideLoader();
        },
        beforeSend: function () {
            showLoader();
        },
        afterSend: function () {
            hideLoader();
        }
    });
}

function replaceTemplateInfoRow(data) {
    $('[template-info="' + data.idPerformanceAssessmentTemplate + '"]').replaceWith(
        '<tr template-info="' + data.idPerformanceAssessmentTemplate + '" class="platform-table__row">' +
        '<td class="platform-table__column rate-status">' +
        '   <div class="column_bstatus column_bstatus_checked"></div>' +
        '</td>' +
        '<td class="platform-table__column rate-point-item">' +
        '   <div class="column-text">' + data.performanceAssessmentTemplateName + '</div>' +
        '</td>' +
        '<td class="platform-table__column rate-point-counter">' +
        '   <div class="column-text">' + data.items.length + '</div>' +
        '</td>' +
        '<td rate class="platform-table__column rate-values">' +
        '   <div class="score">' + (data.totalScore > 0 ? ('+' + data.totalScore) : (data.totalScore)) + '</div>' +
        '</td>' +
        '<td class="platform-table__column rate-btn">' +
        '   <div data-rate="' + data.id + '" open-rate class="platform-form__access-btn rate">Подробнее</div>' +
        '</td>' +
        '</tr>');
}

$(document).on('click', '[add-comment]', function (event) {
    var index = $(this).data('index');
    $('[comment-index]').val(index);

    const menu = document.querySelector('[js-menu-add-comment]');
    openModalAnimation(menu);

    checkBodyHidden();
});

$(document).on('click', '[js-menu-add-comment-close-btn]', function (event) {
    resetAddCommentForm();

    const menu = document.querySelector('[js-menu-add-comment]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);

    checkBodyHidden();
});

function resetAddCommentForm() {
    $('[js-add-comment-form]').trigger('reset');
    $('.input-element__documents-new').html('');
    FILES = new FormData();
}

$(document).on('click', '[js-add-comment]', function (event) {
    event.preventDefault();
    var formData = new FormData($('[js-add-comment-form]')[0]);
    addFilesToFormData(formData);


    var index = $('[comment-index]').val();
    if (formData.get('exComment') !== "" || formData.getAll('files').length !== 0) {
        $('[add-comment][data-index="' + index + '"]').removeClass('button_white');
        $('[add-comment][data-index="' + index + '"]').html('Посмотреть комментарий');
        $('[add-comment][data-index="' + index + '"]').removeAttr('add-comment').attr('open-comment', '');
        TEMP_DATA[index] = formData;
    } else {
        $('[add-comment][data-index="' + index + '"]').addClass('button_white');
        $('[add-comment][data-index="' + index + '"]').html('Оставить комментарий');
        $('[add-comment][data-index="' + index + '"]').removeAttr('open-comment').attr('add-comment', '');
        delete TEMP_DATA[index];
    }

    resetAddCommentForm();

    const menu = document.querySelector('[js-menu-add-comment]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);

    checkBodyHidden();
});

$(document).on('click', '[open-comment]', function (event) {
    var index = $(this).data('index');
    $('[comment-index]').val(index);

    var formData = TEMP_DATA[index];
    $('[comment-index]').val(formData.get('index'));
    $('[comment-desc]').val(formData.get('exComment'));
    FILES = new FormData();

    setFiles(formData.getAll('files'));
    updateFiles($('[comment-files]'));

    const menu = document.querySelector('[js-menu-add-comment]');
    openModalAnimation(menu);

    checkBodyHidden();
});

$(document).on('click', '[view-comment]', function (event) {
    openCommentMenu($(this).attr('data-item'));
});

function openCommentMenu(idComment) {
    var formData = new FormData();
    formData.append('id', idComment);

    $('[view-comment]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getRateItemInfo",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setRateItemInfo(data);

            $('body').css({overflow: 'hidden'});

            const menu = document.querySelector('[js-menu-open-comment]');
            openModalAnimation(menu);

            checkBodyHidden();
            $('[view-comment]').prop("disabled", false);
        },
        error: function (data) {
            $('[view-comment]').prop("disabled", false);
        }
    });
}

$(document).on('click', '[js-menu-open-comment-close-btn]', function (event) {
    $('body').css({overflow: 'auto'});

    const menu = document.querySelector('[js-menu-open-comment]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);

    checkBodyHidden();
});

function setRateItemInfo(data) {
    resetOpenCommentMenu();

    $('[comments]').children().remove();

    $('[c-rate-item-name]').html(data.itemName);

    $('[c-rate-score]').html(data.score);
    $('[c-rate-score]').addClass((data.score > 0 ? 'score_green' : (data.score === 0 ? 'score_gray' : 'score_red')));

    var comments = '';
    $.each(data.comments, function (index, comment) {
        var documents = getDocuments(comment.commentFiles);
        if ((documents.length != 0 || comment.text != null) || comment.type == 'manager') {
            comments +=
                '<div class="comment-item">' +
                '   <div class="comment__wrapper ' + (comment.type == 'examiner' ? 'comment__wrapper_400 comment__wrapper_black' : 'comment__wrapper_400 comment__wrapper_right') + '">' +
                (comment.type == 'manager' ?

                    '<div class="comment__score"><span>Желаемая оценка </span><div class="score ' + (comment.wishScore > 0 ? 'score_green' : (comment.wishScore === 0 ? 'score_gray' : 'score_red')) + '">' + comment.wishScore + '</div></div>' : '') +
                '<div class="comment__create-data">' + comment.createDate + '</div>' +
                ((comment.text != null) ? '<div class="comment__text">' + comment.text + '</div>' : '') +
                '       <div class="comment__document-wrapper">' +
                documents +
                '       </div>' +
                '   </div>' +
                '</div>'
        }
    });

    $('[comments]').append(comments);
}

function getDocuments(documents) {
    var documentsBlock = '';
    $.each(documents, function (index, document) {
        if (document.type === 'png' || document.type === 'jpeg' || document.type === 'jpg') {
            documentsBlock += '<div class="comment__document">' +
                '   <a class="comment__img" data-fancybox href="/' + document.shortPath + '">  ' +
                '   <img src="/' + document.shortPath + '">' +
                '   </a>' +
                '</div>';
        } else {
            documentsBlock += '<div class="comment__document">' +
                '<a href="' + document.path + '" class="comment__file comment__file_' + document.type + '">' +
                '<div class="comment__file-type">' + document.type + '</div>' +
                // '<div class="comment__file-name">' + document.name + '</div>' +
                '</a>' +
                '</div>';
        }

    });

    return documentsBlock;
}

function resetOpenCommentMenu() {
    $('[comments]').nextAll('.comment').remove();
}

$(document).on('click', '[js-menu-rate-close-btn]', function (event) {
    const menu = document.querySelector('[js-menu-rate-point]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);

    checkBodyHidden();
});

$(document).on('click', '[js-menu-rate-close-btn-rate]', function (event) {
    const menu = document.querySelector('[js-menu-rate]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);

    checkBodyHidden();
});

// $(document).on('click', '[open-rate]', function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//
//     setCloneElement(e.target);
//
//     openRateMenu($(this).data('rate'));
// });

function openRateMenu(idRate) {
    var formData = new FormData();
    formData.append('id', idRate);

    $('[open-rate]').prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "getRateInfo",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            const menu = document.querySelector('[js-menu-rate-view]');
            openModalAnimation(menu);

            setRateInfo(data);
            checkBodyHidden();
            $('[open-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[open-rate]').prop("disabled", false);
        }
    });
}

$(document).on('click', '[js-menu-rate-items-close-btn]', function (event) {
    const menu = document.querySelector('[js-menu-rate-items]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);

    checkBodyHidden();
});

const rateSatus = $('#rateStatus').val()

$(document).on('change', '#rateStatus', checkEstimation);

$('[tr-filter-form-btn]').click(checkEstimation);

function checkEstimation() {
    if ($('#rateStatus').val() === '0' && $('#idTemplate').val() === 0) {
        $('.rate-list').css({opacity: '0', pointerEvents: 'none'});
    } else if ($('#rateStatus').val() === '0' && $('#idTemplate').val() !== '0') {
        $('.rate-list').css({opacity: '1', pointerEvents: 'all'});
    } else if ($('#rateStatus').val() !== '0' && $('#idTemplate').val() === '0') {
        $('.rate-list').css({opacity: '1', pointerEvents: 'all'});
    } else if ($('#rateStatus').val() !== '0' && $('#idTemplate').val() !== '0') {
        $('.rate-list').css({opacity: '1', pointerEvents: 'all'});
    }
}

$(window).on('load', deletestatusOption);

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

checkEstimation();
checkStatusDeal();

function checkStatusDeal() {
    const row = $('.custom-table__body-row');

    $.each(row, (index, item) => {
        const status = $(item).find('.deal-status__form');
        const statusClasses = status.attr('class');

        if (statusClasses.split(' ')[1].split('important').length > 1) {
            const important = $(item).find('.column-paid');

            $(important).removeClass('column-paid_green');
            $(important).css({backgroundColor: '#d9d9d9'});
        }
    });
}

$(document).on('click', '[view-comment]', adaptiveGallery);

function adaptiveGallery(event) {
    setTimeout(() => {
        const wrapper = $('.comment');

        $.each($(wrapper).children(), (index, item) => {
            const preview = $(item).find('img');

            $(preview).css({width: 'auto', height: 'auto', position: 'fixed', top: '0'});

            const figureTypeImg = $(preview).width() / $(preview).height();
            if (figureTypeImg < 1) {
                $(preview).css({
                    width: 'auto',
                    height: '100%',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    visibility: 'visible'
                });
            } else {
                $(preview).css({position: 'relative', top: '0', width: '100%', height: '100%', visibility: 'visible'});
            }
        });
    }, 100);
};

function renderRate(data) {
    const row = document.querySelector(`.platform-table__row[template-info="${data.idPerformanceAssessmentTemplate}"]`);
    const rateWrapper = Array.from(row.children).filter((el) => el.classList.contains('rate-values'))[0];

    const score = Array.from(rateWrapper.children);

    if (score.length) {
        const scoreItem = score.filter((el) => el.classList.contains('score'))[0];

        scoreItem.classList.remove('score_gray');
        scoreItem.innerHTML = `${data.totalScore}`;

        const dealRow = document.querySelector(`.platform-table__row[data-deal="${data.idDeal}"]`);

        const estimationWrapper = Array.from(dealRow.children);

        if (estimationWrapper.length) {
            const rateWrapper = estimationWrapper.filter((el) => el.classList.contains('estimation'))[0];
            const estimation = Array.from(rateWrapper.children).filter((el) => el.classList.contains('column-text'))[0];

            if (estimation.innerText === 'Нет') {
                const spanRate = document.createElement('span');
                const spanSelector = document.createElement('span');
                const spanTotal = document.createElement('span');

                const count = document.querySelectorAll('tr[template-info]');

                estimation.innerText = '';
                estimation.innerHTML = '';

                spanRate.innerText = '1';
                spanSelector.classList.add('pa-rate_delim');
                spanSelector.innerText = '/';
                spanTotal.innerText = `${count.length}`;

                estimation.appendChild(spanRate)
                estimation.appendChild(spanSelector)
                estimation.appendChild(spanTotal)
            } else {
                const spanRate = Array.from(estimation.children)[0];
                const rate = +spanRate.innerText + 1;
                spanRate.innerText = rate;
            }

            const number = +estimation.innerText
        }
    }
}

$(document).on('click', '[js-menu-rate-view-close-btn]', function () {
    const menu = document.querySelector('[js-menu-rate-view]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);
});

$(document).on('mouseover', '.estimation', getRate);

function getRate() {
    const idDeal = $(this).closest('.platform-table__row').data('deal');

    var formData = new FormData();
    formData.append('id', idDeal);

    const rateInfo = setRateInfoInTooltip.bind(this);

    if (idDeal && $(this).find('.column-text').html() !== 'Нет') {
        $.ajax({
            type: "POST",
            url: "getRateTemplatesInfo",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                rateInfo(data);
            },
            error: function (data) {
                $('[open-rates]').prop("disabled", false);
            }
        });
    }
}

function setRateInfoInTooltip(data) {
    const tooltip = $(this).find('.tooltip');

    tooltip.html(rateList(data))

    function rateList(data) {
        const items = data.templates.map((item) => {
            return `
                    <tr class="c-tooltip-table__body-col c-tooltip__text inherit">
                        <td class="c-tooltip-table__body-col c-tooltip__text inherit">${item.name ? item.name : ''}</td>
                        <td class="c-tooltip-table__body-col c-tooltip__text inherit">${item.totalScore ? item.totalScore : 'Нет'}</td>
                    </tr>
                `;
        });

        return `
                <table class="c-tooltip-table">
                    <thead class="c-tooltip-table__head">
                        <tr class="c-tooltip-table__head-row">
                            <td class="c-tooltip-table__head-col c-tooltip__text c-tooltip__text_title">Список</td>
                            <td class="c-tooltip-table__head-col c-tooltip__text c-tooltip__text_title">Оценка</td>
                        </tr>
                    </thead>
                    <tbody class="c-tooltip-table__body">
                        ${items.join('')}
                    </tbody>
                </table>`;
    }
}

