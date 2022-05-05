$(document).on('click', '[js-menu-rate-view-close-btn]', function(event){
    const menu = document.querySelector('[js-menu-rate-view]');
    const wrapper = menu.querySelector('.platform-modal__wrapper')
    closeModalAnimation(menu, wrapper, false, true);
    checkBodyHidden();
});

$(document).on('click', '[open-rate]', function(event){
    openRateMenu($(this).closest('.platform-table__row').data('rate'));
});

function openRateMenu(idRate) {
    var formData = new FormData();
    formData.append('id', idRate);

    $('[open-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/performance-assessment/getRateInfo",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setRateInfo(data);
            $('body').css({overflow: 'hidden'});

            const menu = document.querySelector('[js-menu-rate-view]');
            openModalAnimation(menu);

            const footerStart = menu.querySelector('.menu__footer_start');
            footerStart.style.display = 'none';
            checkBodyHidden();
            $('[open-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[open-rate]').prop("disabled", false);
        }
    });
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

function closeFilter(modal, wrapper) {
    wrapper.style.top = '-150%';

    setTimeout(() => {
      modal.style.opacity = '0';
    }, 200);

    setTimeout(() => {
      modal.classList.remove('open');
    }, 400);
  }

function closeMenu(modal, wrapper) {
    wrapper.style.right = '-100%';
    const content = wrapper.querySelector('.platform-modal__content');

    if (content) {
      content.style.right = '-100%';
    }

    setTimeout(() => {
      modal.style.opacity = '0';
    }, 500);

    setTimeout(() => {
      modal.classList.remove('open');
    }, 700);
}

function closeModalAnimation(modal, wrapper, isFilter, isOverflowed = null) {
    if (isFilter) {
        closeFilter(modal, wrapper);
    } else {
        closeMenu(modal, wrapper);
    }

    setOverflow(isOverflowed);
}

function setOverflow(isOverflowed) {
    if (isOverflowed) {
      document.body.style.overflow = 'hidden';
    } else if (!isOverflowed && isOverflowed !== null) {
      document.body.style.overflow = 'auto';
    }
}

function setRateInfo(data) {
    $('.rate-employee__name').html(data.performanceAssessmentTemplateName);
    $('.rate-employee__date').html(data.createDate);
    $('.rate-employee__deal-number').html('Сделка № ' + data.idDeal);
    $('.rate-employee__position').html(data.totalScore);

    $('.rate-employee__position').addClass((data.totalScore > 0 ? 'score_green' : (data.totalScore === 0 ? 'score_gray' : 'score_red')));

    var rows = '';
    $.each(data.items, function(index, item){
        rows +=
            '<tr class="platform-table__row">' +
            '   <td class="platform-table__column rate-point-item">' + item.itemName + '</td>' +
            '   <td class="platform-table__column rate-values">' +
            '       <div class="score ' + (item.score > 0 ? 'score_green' : (item.score == 0 ? 'score_gray' : 'score_red')) + '">' + (item.score > 0 ? ('+' + item.score) : (item.score)) + '</div>' +
            '   </td>' +
            '   <td class="platform-table__column rate-btn">   ' +
            '       <div open-comment data-item="' + item.id + '" class="button button_white">Посмотреть</div>' +
            '   </td>' +
            '</tr>';
    });
    $('[rate-wrapper-items]').html(rows);
}

$(document).on('click', '[open-comment]', function(event) {
    $('body').css({overflow: 'hidden'});
    openCommentMenu($(this).closest('[data-item]').data('item'));
});

function openCommentMenu(idComment) {
    var formData = new FormData();
    formData.append('id', idComment);

    $('[open-comment]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/performance-assessment/getRateItemInfo",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setRateItemInfo(data);

            const menu = document.querySelector('[js-menu-open-comment]')
            openModalAnimation(menu);

            checkBodyHidden();
            setRateItemInfo(data);
            $('[open-comment]').prop("disabled", false);
        },
        error: function (data) {
            $('[open-comment]').prop("disabled", false);
        }
    });
}

function resetOpenCommentMenu() {
    $('[js-open-comment-form]').trigger('reset');
    $('.input-element__documents-new').html('');
    FILES = new FormData();
    //
    // $('[c-rate-score]').removeClassWild("score_*");
    // $('.wish-score').html('—');
    // $('.wish-score').removeClassWild("score_*");

    $('[comments]').nextAll('.comment').remove();

    $('[debate-btn-block]').removeClass('is-open');
    $('[debate-block]').removeClass('is-open');
    //
    // $('[ex-comment]').removeClass('comment__wrapper_400 comment__wrapper_violet');
    // $('[c-rate-mcomment]').html('');
    // $('[c-rate-mdocuments]').html('');
    // $('[c-rate-mscore]').removeClassWild("score_*");
    // $('[examiner-comment]').removeClass('is-open');
    // $('[manager-comment]').removeClass('is-open');

}
// function setRateItemInfo(data) {
//     resetOpenCommentMenu();
//
//     $('[c-rate-id]').val(data.id);
//     $('[c-rate-id-item]').val(data.idItem);
//     $('[c-rate-item-name]').html(data.itemName);
//
//     if (data.exComment !== null || data.documents.length !== 0) {
//         $('[examiner-comment]').addClass('is-open');
//     }
//
//     $('[c-rate-comment]').html(data.exComment);
//
//     $('[c-rate-score]').html(data.score);
//     $('[c-rate-score]').addClass((data.score > 0 ? 'score_green' : (data.score === 0 ? 'score_gray' : 'score_red')));
//
//     setDocuments(data.documents, $('[c-rate-documents]'));
//
//     if (!data.isExpired && (data.status === 1 || data.status === 4)) {
//         $('[debate-btn-block]').addClass('is-open');
//     }
//
//     if (data.status !== 1 && data.status !== 4) {
//         $('[c-rate-mcomment]').html(data.managerComment);
//         setDocuments(data.managerDocuments , $('[c-rate-mdocuments]'));
//
//         $('[ manager-comment]').addClass('is-open');
//         $('[ex-comment]').addClass('comment__wrapper_400 comment__wrapper_violet');
//
//         $('[c-rate-mscore]').html(data.wishScore);
//         $('[c-rate-mscore]').addClass((data.wishScore > 0 ? 'score_green' : (data.wishScore === 0 ? 'score_gray' : 'score_red')));
//
//     }
//
//     $('[c-rate-mgood]').val(data.goodScore);
//     $('[c-rate-mbad]').val(data.badScore);
// }
function setRateItemInfo(data) {
    resetOpenCommentMenu();

    $('[c-rate-id]').val(data.id);
    $('[c-rate-id-item]').val(data.idItem);
    $('[c-rate-item-name]').html(data.itemName);

    $('[c-rate-score]').html(data.score);
    $('[c-rate-score]').addClass((data.score > 0 ? 'score_green' : (data.score === 0 ? 'score_gray' : 'score_red')));

    var comments = '';
    $.each(data.comments, function(index, comment) {
        var documents = getDocuments(comment.commentFiles);

        if ((documents.length != 0 || comment.text != null) || comment.type == 'manager') {
            comments +=
                '<div class="comment">' +
                '   <div class="comment__wrapper ' + (comment.type == 'examiner' ? 'comment__wrapper_400 comment__wrapper_black' : 'comment__wrapper_400 comment__wrapper_right') + '">' +
                (comment.type == 'manager' ?
                    '<div class="comment__score"><span>Желаемая оценка </span><div class="score ' + (comment.wishScore > 0 ? 'score_green' : (comment.wishScore === 0 ? 'score_gray' : 'score_red')) + '">' + comment.wishScore + '</div></div>' : '') +
                ((comment.text != null) ? '<div class="comment__text">' + comment.text + '</div>' : '') +
                '       <div class="comment__document-wrapper">' +
                documents +
                '       </div>' +
                '   </div>' +
                '</div>'
        }
    });
    $('[comments]').after(comments);

    if (!data.isExpired && (data.status === 1 || data.status === 4)) {
        $('[debate-btn-block]').addClass('is-open');
    }
    $('[c-rate-mgood]').val(data.goodScore);
    $('[c-rate-mbad]').val(data.badScore);
}

function getDocuments(documents) {
    var documentsBlock = '';
    $.each(documents, function(index, document){
        if (document.type === 'png' || document.type === 'jpeg' || document.type === 'jpg') {
            documentsBlock += '<div class="comment__document">' +
                '   <a class="comment__img" data-fancybox="' + document.name + '" href="/' + document.shortPath + '">  ' +
                '       <img src="/' + document.shortPath + '">' +
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

$(document).on('click', '[js-menu-open-comment-close-btn]', function(event) {
    $('body').css({overflow: 'auto'})
    const menu = document.querySelector('[js-menu-open-comment]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, false, false);
    checkBodyHidden();
});

$(document).on('click', '[debate-btn]', function(event){
    $('[debate-btn-block]').removeClass('is-open');
    $('[debate-block]').addClass('is-open');
});

$(document).on('click', '[accept-debate]', function(event) {
    event.preventDefault();
    $('[js-open-comment-form]').trigger('submit');
});
$(document).on('submit', '[js-open-comment-form]', function(event) {
    event.preventDefault();
    if (validateCheckboxForm(this)) {
        var formData = new FormData($('[js-open-comment-form]')[0]);
        addFilesToFormData(formData);
        saveDebate(formData);
    }
});

function saveDebate(formData) {
    $('[accept-debate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/performance-assessment/saveDebate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            const menu = document.querySelector('[js-menu-open-comment]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, true);

            checkBodyHidden();

            $('[data-item="' + formData.get('id') + '"]').find('.status').html('На рассмотрении');

            $('[accept-debate]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            $('[accept-debate]').prop("disabled", false);
            hideLoader();
        },
        beforeSend: function() {
            showLoader();
        },
        afterSend: function() {
            hideLoader();
        }
    });
}

$(document).on('change', '.wish-value', function() {
    var score = Number($(this).val());
    var scoreBlock = $('.wish-score');

    scoreBlock.removeClassWild("score_*");
    if (score > 0) {
        scoreBlock.addClass('score_green');
    } else if (score < 0) {
        scoreBlock.addClass('score_red');
    } else {
        scoreBlock.addClass('score_gray');
    }
    scoreBlock.html(score);
});

$(document).on('click', '.platform__close--btn', function(e) {
    const t = e.target;

    const menu = $(t).closest('[js-menu-rate-view]');

    if ($(menu).get(0)) {
        const wrapper = $(menu).get(0).querySelector('.platform-modal__wrapper');
        closeModalAnimation($(menu).get(0), wrapper, false, false, false);
    }
})

