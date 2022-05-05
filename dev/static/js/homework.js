$(document).on('click', '[save-homework]', function (event) {
    event.preventDefault();
    $('[save-homework-form]').trigger('submit');
});

$(document).on('submit', '[save-homework-form]', function (event) {
    event.preventDefault();

    if (validateForm(this)) {
        var formData = new FormData($('[save-homework-form]')[0]);
        setFilesToFormData(formData);
        saveHomework(formData);
    }
});

function saveHomework(formData) {
    var mainHref = "saveHomework";
    var checkArray = document.location.href.split('?');

    if (checkArray.length > 1) {
        mainHref = document.location.href.split('?')[0] + "/saveHomework";
    }

    $('[save-homework]').prop("disabled", true);

    $.ajax({
        type: "POST",
        url: mainHref,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            hideLoader();
            $('[save-homework]').prop("disabled", false);
            $('[js-hide-on-complete]').remove();
            getCommentaries(data.comments);
            scrollChatToBottom($('.comments__wrapper'));
            homeworkUploadNotify()
            adaptiveGallery();
        },
        error: function (data) {
            hideLoader();
            $('[save-homework]').prop("disabled", false);
        },
        beforeSend: function () {
            showLoader();
        },
    });
}

function scrollChatToBottom(item) {
    item.scrollTop(item.prop('scrollHeight'));
}

scrollChatToBottom($('.comments__wrapper'));

function getCommentaries(data) {
    $($('.lessons__list').get(0)).find('.content-element__wrapper').remove();

    $($('.lessons__list').get(0)).append($('<div/>').attr('class', 'content-element__wrapper lesson-comments')
        .append($("<div/>").attr('class', 'content-element__side')
            .append($("<div/>").attr('class', 'comments')
                .append($("<div/>").attr('class', 'comments__board comments__wrapper custom-scroll'))
            )
        )
    )

    $.each(data, function (index, item) {
        if (item.type) {
            $('.comments__board').append(
                (item.type === 'user') ?
                    $('<div/>').attr('class', `comments__item ${item.type}`)
                        .append($('<div/>').attr('class', `${item.type}__inner`)
                            .append($('<div/>').attr('class', 'comment comment_left')
                                .append($('<div/>').attr('class', 'comment__title')
                                    .append($("<span/>").attr('class', 'comment__author').html('Ваше сообщение:'))
                                )
                            )
                            .append($("<div/>").attr('class', `comment__body ${item.type}__comment`)
                                .append($("<div/>").attr('class', `comment__text ${item.type}__text`).html(item.text))
                                .append((item.homeworkFiles.length !== 0) ?
                                    $("<div/>").attr('class', 'gallery__wrapper gallery__wrapper_small custom-scroll')
                                        .append($("<div/>").attr('class', `gallery__list ${item.type}__gallery gallery__list--comment`)
                                            .append(getHomeworkFiles(item))
                                        )
                                    :
                                    false
                                )
                            )
                        )
                    :
                    $('<div/>').attr('class', `comments__item ${item.type}`)
                        .append($('<div/>').attr('class', `${item.type}__inner`)
                            .append($('<div/>').attr('class', 'comment comment_left')
                                .append($('<div/>').attr('class', 'comment__title')
                                    .append($("<span/>").attr('class', 'comment__author').html('Сообщение куратора:'))
                                )
                            )
                            .append($("<div/>").attr('class', `comment__body ${item.type}__comment`)
                                .append($("<div/>").attr('class', `comment__text ${item.type}__text`).html(item.text))
                                .append((item.homeworkFiles.length !== 0) ?
                                    $("<div/>").attr('class', 'gallery__wrapper gallery__wrapper_small custom-scroll')
                                        .append($("<div/>").attr('class', `gallery__list ${item.type}__gallery gallery__list--comment`)
                                            .append(getHomeworkFiles(item))
                                        )
                                    :
                                    false
                                )
                            )
                        )
            )
        }
    });
}

function getHomeworkFiles(comment) {
    const files = comment.homeworkFiles;

    const fileTypes = [
        'pdf', 'PDF',
        'doc', 'DOC',
        'docx', 'DOCX',
        'psd', 'PSD',
        'ppt', 'PPT',
        'pptx', 'PPTX',
        'xls', 'XLS',
        'xlsx', 'XLSX',
    ]

    const gallery = files.map((elem) => {
        if (elem.type === 'png' || elem.type === 'jpg' || elem.type === 'jpeg') {
            return `
            <div class="gallery__item gallery__item-comment">
                <a data-fancybox=${elem.name} href=/${elem.path} class="gallery-item gallery-item_small">
                    <img class="gallery-item__preview" src=/${elem.path}>
                </a>
            </div>`
        }

        if ($.inArray(elem.type, fileTypes) !== -1) {
            return `
            <a href=/${elem.path} download class="gallery__item gallery__item-comment">
                <div class="gallery-item gallery-item_small gallery-item_${elem.type} comment__files">
                    <div class="gallery-item__title">${elem.type}</div>
                    <div class="gallery-item__subtitle">${elem.name}</div>
                </div>
            </a>`
        }
    });

    return gallery;
}

function homeworkUploadNotify() {
    $($('.lessons__list').get(0)).append($("<div/>").attr('class', 'content-element__wrapper homework__popup')
        .append($("<div/>").attr('class', 'homework-accepted')
            .append($("<div/>").attr('class', 'homework-accepted__content').html('Спасибо! Ваше домашнее задание принято на проверку, ответ получите в скором времени!'))
        )
    )
}

$(document).on('change', '.upload-btn__item-file', adaptiveGallery);

function adaptiveGallery() {
    const image = $(this).closest('.content-element__side');
    const wrapper = $(image).find('[upload-list]');

    const gallery = $('.gallery');

    $(gallery).css({ position: 'relative' });

    setTimeout(() => {
        $.each($(wrapper).children(), (index, item) => {
            const preview = $(item).find('img');

            $(preview).css({ width: 'auto', height: 'auto', position: 'fixed', top: '0' });

            const figureTypeImg = $(preview).width() / $(preview).height();
            if (figureTypeImg < 1) {
                $(preview).css({ width: 'auto', height: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)', visibility: 'visible' });
            } else {
                $(preview).css({ position: 'relative', top: '0', width: '100%', height: '100%', visibility: 'visible' });
            }
        });

        $('.gallery__wrapper').css({ paddingBottom: '20px' });

        const warning = $('<div>').attr('class', 'gallery__warning').html('Максимальное число файлов &mdash; 8').css({ position: 'absolute', bottom: '-13px', left: 0, color: 'lightgray' });

        if ($('.gallery__warning').length === 0) {
            $(gallery).append(warning);
        }

    }, 200);
}
