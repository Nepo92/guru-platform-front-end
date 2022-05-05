/* Календарь в фильтре */
$('.datepicker-here-f').datepicker({
    autoClose: true
});

/* Функция открытия фильтра */
$(document).on('click', '[tr-filter-btn]', function () {
    $('[tr-filter]').addClass('is-open');
})

/* Функция применения фильтра  */
$(document).on('click', '[tr-filter-form-btn]', function () {
    const form = $('[tr-filter-form]');
    $(form).trigger('submit');
})

/* Функция закрытия фильтра */
$(document).on('click', '[tr-filter-close-btn]', function() {
    $('[tr-filter]').removeClass('is-open');
});
