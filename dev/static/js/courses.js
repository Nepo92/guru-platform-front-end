import tariff from './modules/tariff/tariff.js';

$(document).on('click', '[js-update-course]', function(event){
    setCourseInfo($(this));
});

var idCourse;

function setCourseInfo(btn) {
    var formData = new FormData();
    formData.set('id', btn.data('course'));

    $('[js-update-course]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            idCourse = data.id;
            setCourseSelectors(btn);
            $('[up-course-id]').val(data.id);

            $('[current-course]').attr('current-course', data.id);

            $('[up-course-name]').val(data.name);
            $('[up-course-price]').val(data.price);
            $("input[up-course-theme][value=" + data.theme + "]").prop("checked", true);
            $('[up-course-bg]').val(data.backgroundColor);

            if(!data.isUsed) {
                $('[update-footer]').html($('[update-footer]').html() +
                    '<button delete-course type="button" class="button button_white button_right">' +
                    '    <span>Удалить</span>' +
                    '</button>');
            }

            $('body').css({overflow: 'hidden'});

            const menu = document.querySelector('[js-menu-update]');
            openModalAnimation(menu);

            checkBodyHidden();
            $('[js-update-course]').prop("disabled", false);

            tariff.getTariff({id: data.id});
        },
        error: function (data) {
            hideLoader()
            $('[js-update-course]').prop("disabled", false);
        }
    });
}

$(document).on('click', '[delete-course]', function(event) {
    var formData = new FormData();
    var currentId = $('[up-course-id]').val();
    formData.set('id', currentId);

    $('[delete-course]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "deleteCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[data-course="' + currentId + '"]').remove();
            closeUpdateCourseMenu();

            $('[delete-course]').prop("disabled", false);
        },
        error: function (data) {
            $('[delete-course]').prop("disabled", false);
        }
    });
});

$(document).on('click', '[js-menu-update-close-btn]', function(event){
    $('body').css({overflow: 'auto'});
    closeUpdateCourseMenu();
});

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

function closeUpdateCourseMenu() {
    $('[js-update-form]').trigger('reset');

    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите изображение (477x333)');

    $('[delete-course]').remove();

    //сбросить табы
    $('[js-update-form]').find('[js-tab]').trigger('click');

    resetCourseSelectors();
    checkBodyHidden();

    const menu = document.querySelector('[js-menu-update]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);
}

$(document).on('click', '[js-create-course]', function(event){
    setCourseSelectors($(this));
    checkBodyHidden();

    $('body').css({overflow: 'hidden'});

    const menu = document.querySelector('[js-menu-course]');
    openModalAnimation(menu);
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

$(document).on('click', '[js-menu-course-close-btn]', function(event) {
    closeCourseMenu();

    $('body').css({overflow: 'auto'});

    const menu = document.querySelector('[js-menu-course]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);
});

function closeCourseMenu() {
    $('[js-course-form]').trigger('reset');
    resetCourseSelectors();
    checkBodyHidden();
}

$(document).on('click', '[js-update]', function(event){
    event.preventDefault();
    $('[js-update-form]').trigger('submit');
});

$(document).on('submit', '[js-update-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-form]')[0]);
        updateCourse(formData);
    }
});

function updateCourse(formData) {
    $('[js-update]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updateCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateCourseBlock(data);

            closeUpdateCourseMenu();

            $('body').css({overflow: 'auto'});

            const menu = document.querySelector('[js-menu-update]');
            const wrapper = menu.querySelector('.platform-modal__wrapper')
            closeModalAnimation(menu, wrapper, false, true);

            $('[js-update]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update]').prop("disabled", false);
        }
    });
}

function updateCourseBlock(data) {
    var prodBlock = createCourse(data);

    var product = $('[js-tab-panel][data-type!="all"]').find('.product-block[data-course="' + data.id + '"]');
    var productCommon = $('[js-tab-panel][data-type="all"]').find('.product-block[data-course="' + data.id + '"]');

    productCommon.replaceWith(prodBlock);

    if (product.data('project') === data.idProject &&  product.data('type') === data.idCourseType) {
        product.replaceWith(prodBlock);
    } else {
        product.remove();
        addCourse(data)
    }
}

function addCourse(data) {
    var productList = $('.products[data-project="' + data.idProject + '"]').find('[js-tab-panel][data-type="' + data.idCourseType + '"]').find('.products__list');

    productList.html( createCourse(data)
        + productList.html());
}

function addCourseToCommon(data) {
    var productList = $('.products[data-project="' + data.idProject + '"]').find('[js-tab-panel][data-type="all"]').find('.products__list');

    productList.html( createCourse(data)
        + productList.html());
}

function createCourse(data) {
    return '<div js-update-course data-course="' + data.id + '" data-project="' + data.idProject + '" data-type="' + data.idCourseType + '" class="product-block" style="background: ' + data.backgroundColor + ';">' +
        '                 <div class="product-block__wrapper ' + data.theme + '" >'
        + (data.backgroundImage !== null ?
            '                    <div class="product-block__background">' +
            '                       <img src="/' + data.backgroundImage + '" alt="">' +
            '                     </div>' : '' ) +
        '                     <div class="product-block__title">' + data.name + '</div>' +
        '                     <div class="product-block__type">' + data.courseType + '</div>' +
        '                     <div class="product-block__price">' + numberWithSpaces(data.price) + ' ₽</div>' +
        '                 </div>' +
        '              </div>';
}

$(document).on('click', '[js-save-course]', function(event){
    event.preventDefault();
    $('[js-course-form]').trigger('submit');
});

$(document).on('submit', '[js-course-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-course-form]')[0]);
        saveCourse(formData);
    }
});

function saveCourse(formData) {
    $('[js-save-course]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            addCourse(data);
            addCourseToCommon(data);

            closeCourseMenu();
            $('[js-save-course]').prop("disabled", false);

            const menu = document.querySelector('[js-menu-course]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, true);
        },
        error: function (data) {
            $('[js-save-course]').prop("disabled", false);
        }
    });
}

function setCourseSelectors(btn) {
    $('[course-project]').val(btn.data('project'));

    var attr = btn.attr('data-type');
    if (typeof attr !== typeof undefined && attr !== false) {
        $('[course-type]').val(btn.data('type'));
    }
}

function resetCourseSelectors() {
    $('[course-type]option:selected').removeAttr('selected');
    $('[course-project]option:selected').removeAttr('selected');
}

$(document).on('change', '[js-bg-default]', function(event) {
    var isChecked = $(this).is(':checked');
    $("[js-bg-default]").prop("checked", false).attr("checked", false).removeAttr("checked");

    if (isChecked) {
        $(this).prop("checked", true);
    }
});
