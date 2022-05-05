$(document).on('click', '[js-edit-btn]', function(event) {
    $('[js-client-card-name]').removeAttr('disabled');
    $('[js-client-card-link]').removeAttr('disabled');
    $('[js-client-card-link]').closest('.menu-input').find('.menu-input__title').html('Ссылка ВК **');
    $('[js-client-card-phone]').removeAttr('disabled');
    $('[js-client-card-phone]').closest('.menu-input').find('.menu-input__title').html('Номер телефона **');
    $('[js-client-card-email]').removeAttr('disabled');
    $('[js-client-card-email]').closest('.menu-input').find('.menu-input__title').html('Email **');
    $('[js-client-card-telegram]').removeAttr('disabled');

    $('[check-required="edit-client-info"]').trigger('change');

    $('[js-client-card-desc]').addClass('is-open');
    $('[js-edit-footer]').addClass('is-open');
});

function closeEdit() {
    $('[js-client-card-name]').attr("disabled", true);
    $('[js-client-card-link]').attr("disabled", true);
    $('[js-client-card-link]').closest('.menu-input').find('.menu-input__title').html('Ссылка ВК');
    $('[js-client-card-phone]').attr("disabled", true);
    $('[js-client-card-phone]').closest('.menu-input').find('.menu-input__title').html('Номер телефона');
    $('[js-client-card-email]').attr("disabled", true);
    $('[js-client-card-email]').closest('.menu-input').find('.menu-input__title').html('Email');
    $('[js-client-card-desc]').removeClass('is-open');
    $('[js-edit-footer]').removeClass('is-open');
}

//кнопка редактирования клиента
$(document).on('click', '[js-edit-client-btn]', function(event) {
    event.preventDefault();
    $(this).closest('.menu__content-side').find('[js-edit-client-form]').trigger('submit');
});

//form'a редактирование клиента
$(document).on('submit', '[js-edit-client-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        clientInfo.link = formData.link;
        clientInfo.telegram = formData.telegram;
        clientInfo.email = formData.email;
        clientInfo.phone = formData.phone;

        updateClient(clientInfo);
    }
});

function updateClient(formData) {
    $('[js-update-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/clients/updateClient",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-edit-client-btn]').prop('disabled', true);
        },
        error: function (data) {
            $('[js-edit-client-btn]').prop('disabled', true);
            $('[js-update-deal]').prop("disabled", false);
        }
    });
}
