$(document).on('change', '[s-filter]', function() {
    $('[s-filter-form]').trigger('submit');
});
$(document).on('click', '.datepicker-here', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});
$(document).on('click', '.datepicker-here-start', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});

var $coursesMap;
function setCoursesMap(coursesMap) {
    $coursesMap = coursesMap;
}

var $projects;
function setProjectsList(projects) {
    $projects = projects;
}

$(document).ready(function() {
    initTimePicker();

    $('.datepicker-here-start').datepicker({
        autoClose: true,
        minDate: new Date(),
        todayButton: true
    });

    $('.datepicker-here').datepicker({
        autoClose: true,
        todayButton: true
    });
});

function initTimePicker() {
    $('.only-time').datepicker({
        dateFormat: ' ',
        timepicker: true,
        classes: 'only-timepicker'
    });
}

$(document).on('click', '[add-streams]', function(event) {
    resetAddStreamsMenu();
    $('[add-streams-project]').trigger('change');
    checkBodyHidden();

    $('body').css({overflow: 'hidden'});

    const menu = document.querySelector('[js-menu-add-streams]');
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

$(document).on('click', '[js-menu-add-streams-close-btn]', function(event){
    checkBodyHidden();

    $('body').css({overflow: 'auto'});

    const menu = document.querySelector('[js-menu-add-streams]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, false);
});
function resetAddStreamsMenu() {
    $('[js-add-streams-form]').trigger('reset');
}

$(document).on('change', '[projects]', function() {
    var projectsBlock = $(this);
    resetCourses(projectsBlock);
    setCourses(projectsBlock);
});
function setCourses(block) {
    var seloption = "";
    $.each($coursesMap[$('option:selected', block).val()], function(index, value){
        seloption += '<option value="' + value.id + '">' + value.name + '</option>';
    });

    var coursesBlock =  block.closest('[block-wrapper]').find('[courses]');
    coursesBlock.html(coursesBlock.html() + seloption);
}

function resetCourses(block) {
    block.closest('[block-wrapper]').find('[courses]').html('<option value="" disabled>Выберите продукт</option>');
}

$(document).on('click', '[js-add-streams]', function(event){
    event.preventDefault();
    $('[js-add-streams-form]').trigger('submit');
});

$(document).on('submit', '[js-add-streams-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-add-streams-form]')[0]);
        saveStreams(formData);
    }
});

function saveStreams(formData) {
    $('[js-add-streams]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveStreams",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $.each(data, function(index, streams){
                var list = '';
                $.each(streams, function(index2, stream){
                    list += '<div class="calendar-stream ' + (stream.isStarted ? 'calendar-stream_started' : '') + '"><span>' + stream.nameCourse + '</span></div>';
                });

                $('[data-date="' + index + '"]').find('[stream-list]').html('' +
                    '<div class="calendar-streams c-tooltip">' +
                    '   <div class="c-tooltip__wrapper c-tooltip__wrapper_right">' +
                    '   ' + list +
                    '   </div>' +
                    '   <div class="calendar-stream calendar-stream_hover"><span>' + streams.length + ' потоков</span></div>' +
                    '</div>');
            });

            checkBodyHidden();
            $('[js-add-streams]').prop("disabled", false);

            $('body').css({overflow: 'auto'});

            const menu = document.querySelector('[js-menu-add-streams]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, false);
        },
        error: function (data) {
            $('[js-add-streams]').prop("disabled", false);
        }
    });
}


$(document).on('click', '[edit-streams]', function(event){
    resetUpdateStreamsMenu();

    var formData = new FormData();
    formData.append('startDate', $(this).data('date'));

    openEditStreamsMenu(formData);

    $('body').css({overflow: 'hidden'});

    const menu = document.querySelector('[js-menu-update-streams]');
    openModalAnimation(menu)
});
$(document).on('click', '[js-menu-update-streams-close-btn]', function(event){
    checkBodyHidden();

    $('body').css({overflow: 'auto'});

    const menu = document.querySelector('[js-menu-update-streams]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, false);
});
function resetUpdateStreamsMenu() {
    $('[u-date]').html('');
    $('[u-start-list]').html('');
    DELETE_STARTS_LIST = [];
}

var STREAM_COUNTER = 0;
function openEditStreamsMenu(formData) {
    $('[edit-streams]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getStreamsByDate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[u-date]').html(data.startDate);
            $('[update-start-date]').val(data.startDate);

            var seloption = "";
            $.each($projects, function(index, value){
                seloption += '<option value="' + value.id + '">' + value.name + '</option>';
            });

            var streamList = $('[u-start-list]');
            var projectBlock;

            STREAM_COUNTER = data.streams.length;
            $.each(data.streams, function(index, stream){
                streamList.append(
                    (stream.dealsCounter === 0
                        ? '<div class="collapse-block__header collapsed" data-toggle="collapse" data-target="#stream' + stream.id  + '" aria-expanded="false" aria-controls="stream' + stream.id  + '">'
                        : '<div class="collapse-block__header collapse-block__header_hidden">') +
                    '    <div class="collapse-desc">' +
                    '        <div class="collapse-desc__title">' + stream.nameCourse + '</div>' +
                    '            <div class="collapse-desc__wrapper">' +
                    '                <div class="collapse-desc__text">' + stream.nameProject + '</div>' +
                    '                <div class="collapse-desc__delim"><span></span></div>' +
                    '                <div class="collapse-desc__text">№ потока  <span>' + stream.id  + '</span></div>' +
                    '                <div class="collapse-desc__delim"><span></span></div>' +
                    '                <div class="collapse-desc__text">Учеников  <span>' + stream.dealsCounter  + '</span></div>' +
                    '            </div>' +
                    '        </div>' +
                            (stream.dealsCounter === 0 ? '<div delete-start data-id="' + stream.id  + '" class="collapse-delete"></div>' : '') +
                    '</div>' +
                    (stream.dealsCounter === 0
                        ? '    <div class="collapse-block__body collapse" id="stream' + stream.id  + '">' +
                        '       <input type="hidden" name="streams[' + index + '].id" value="' + stream.id + '">' +
                        '        <div block-wrapper class="collapse-body">' +
                        '            <div class="menu-input menu-input_xsmall menu-input_t20">' +
                        '                 <div class="menu-input__title">Проект *</div>' +
                        '                 <div class="menu-input__wrapper menu-input__wrapper_select">' +
                        '                           <select projects class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
                            seloption +
                        '                           </select>' +
                        '                 </div>' +
                        '             </div>' +
                        '             <div class="menu-input menu-input_xsmall">' +
                        '                 <div class="menu-input__title">Продукт *</div>' +
                        '                 <div class="menu-input__wrapper menu-input__wrapper_select">' +
                        '                     <select courses name="streams[' + index + '].idCourse" class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
                        '                         <option value="" disabled>Выберите продукт</option>' +
                        '                     </select>' +
                        '                 </div>' +
                        '              </div>' +
                        '              <div class="menu-input menu-input_xsmall">' +
                        '                  <div class="menu-input__title">Время старта *</div>' +
                        '                  <div class="menu-input__wrapper menu-input__wrapper_cal">' +
                        '                      <input value="' + stream.startTime + '" name="streams[' + index + '].startTime" autocomplete="off" class="only-time menu-input__input menu-input__input_small" placeholder="Выберите время" required/>' +
                        '                  </div>' +
                        '              </div>' +
                        '           </div>' +
                        '        </div>'
                        : '')
                    );

                projectBlock = $("#stream" + stream.id).find('[projects]');
                projectBlock.val(stream.idProject);

                setCourses(projectBlock);

                $("#stream" + stream.id).find('[courses]').val(stream.idCourse);
            });
            initTimePicker();
            checkBodyHidden();
            $('[edit-streams]').prop("disabled", false);
        },
        error: function (data) {
            $('[edit-streams]').prop("disabled", false);
        }
    });
}



$(document).on('click', '[add-start]', function(event){
    var seloption = "";
    $.each($projects, function(index, value){
        seloption += '<option value="' + value.id + '">' + value.name + '</option>';
    });

    $('[u-start-list]').append(
        '<div class="collapse-block__header" data-toggle="collapse" data-target="#new' + STREAM_COUNTER  + '" aria-expanded="true" aria-controls="new' + STREAM_COUNTER  + '">' +
        '    <div class="collapse-desc">' +
        '        <div class="collapse-desc__title">Новый поток</div>' +
        '        </div>' +
        '        <div delete-start class="collapse-delete"></div>' +
        '</div>' +
        '    <div class="collapse-block__body collapse show" id="new' + STREAM_COUNTER + '">' +
        '        <div block-wrapper class="collapse-body">' +
        '            <div class="menu-input menu-input_xsmall menu-input_t20">' +
        '                 <div class="menu-input__title">Проект *</div>' +
        '                 <div class="menu-input__wrapper menu-input__wrapper_select">' +
        '                           <select projects class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
                                        seloption +
        '                           </select>' +
        '                 </div>' +
        '             </div>' +
        '             <div class="menu-input menu-input_xsmall">' +
        '                 <div class="menu-input__title">Продукт *</div>' +
        '                 <div class="menu-input__wrapper menu-input__wrapper_select">' +
        '                     <select courses name="streams[' + STREAM_COUNTER + '].idCourse" class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
        '                         <option value="" disabled>Выберите продукт</option>' +
        '                     </select>' +
        '                 </div>' +
        '              </div>' +
        '              <div class="menu-input menu-input_xsmall">' +
        '                  <div class="menu-input__title">Время старта *</div>' +
        '                  <div class="menu-input__wrapper menu-input__wrapper_cal">' +
        '                      <input name="streams[' + STREAM_COUNTER + '].startTime" autocomplete="off" class="only-time menu-input__input menu-input__input_small" placeholder="Выберите время" required/>' +
        '                  </div>' +
        '              </div>' +
        '           </div>' +
        '        </div>');

    $("#new" + STREAM_COUNTER).find('[projects]').trigger('change');
    $("#new" + STREAM_COUNTER).find('.only-time').datepicker({
        dateFormat: ' ',
        timepicker: true,
        classes: 'only-timepicker'
    });

    STREAM_COUNTER++;
});

$(document).on('click', '[js-update-streams]', function(event){
    event.preventDefault();
    $('[js-update-streams-form]').trigger('submit');

    $('body').css({
        overflow: 'auto'
    })

    const menu = document.querySelector('[js-menu-update-streams]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, false);
});

$(document).on('submit', '[js-update-streams-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-streams-form]')[0]);
        formData.append("deletedStreams", DELETE_STARTS_LIST);
        updateStreams(formData);
    }
});

function updateStreams(formData) {
    $('[js-update-streams]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updateStreams",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateDayStreams(data);
            checkBodyHidden();
            $('[js-update-streams]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-streams]').prop("disabled", false);
        }
    });
}

var DELETE_STARTS_LIST = [];
$(document).on('click', '[delete-start]', function(event){
    var attr = $(this).attr('data-id');

    if (typeof attr !== typeof undefined && attr !== false) {
        DELETE_STARTS_LIST.push($(this).data('id'));
    }

    var needDelete = $(this).closest('.collapse-block__header').attr('aria-controls');
    $(this).closest('.collapse-block__header').remove();
    $('#' + needDelete).remove();
});

function updateDayStreams(data) {
    if (data.streams.length !== 0) {
        var list = "";
        $.each(data.streams, function(index, stream){
            list += '<div class="calendar-stream ' + (stream.isStarted ? 'calendar-stream_started' : '') + '"><span>' + stream.nameCourse + '</span></div>';
        });
        $('[data-date="' + data.startDate + '"]').find('[stream-list]').html('' +
            '<div class="calendar-streams c-tooltip">' +
            '   <div class="c-tooltip__wrapper c-tooltip__wrapper_right">' +
            '   ' + list +
            '   </div>' +
            '   <div class="calendar-stream calendar-stream_hover"><span>' + data.streams.length + ' потоков</span></div>' +
            '</div>');
    } else {
        $('[data-date="' + data.startDate + '"]').find('[stream-list]').html('' +
            '<div class="calendar-streams">' +
            '   <div class="calendar-text">Нет потоков</div>' +
            '</div>');
    }
}