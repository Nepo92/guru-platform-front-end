$(document).on('click', '[vote]', function (event) {
    event.preventDefault();
    var json = new Object();
    json.rate = Number($(this).data('rate'));
    vote(json);
});

function vote(json) {
    var mainHref = "vote";
    var checkArray = document.location.href.split('?');
    if (checkArray.length > 1) {
        mainHref = document.location.href.split('?')[0] + "/vote";
    }
    $('[js-save-project]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: mainHref,
        data: JSON.stringify(json),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setMessage('Ваш голос принят, спасибо!');
        },
        error: function (data) {
            setMessage('Произошла ошибка, попробуйте проголосовать позднее.');
        }
    });
}

function setMessage(msg) {
    $('.estimation__list').html(createBlock(msg));
}

function createBlock(message) {
    return `<li>${message}</li>`
}

function hoverOnRateItems() {
    const items = $('.estimation__icon');

    $.each($(items), function (index, item) {
        const current = $(items).index($(this));

        $(item).on('mouseover', function() {
            const elements = $(this).parent().parent().children();
            const prev = elements.splice(0, (current + 1));

            $.each($(prev), (count, elem) => {
                if (count <= 2) {
                    $(elem).find('.estimation__icon').css({backgroundColor: '#F5244A'});
                } else if (count <= 5 && count >= 3) {
                    $(elem).find('.estimation__icon').css({backgroundColor: '#FFA515'});
                } else if (count >= 6 && count <= 9) {
                    $(elem).find('.estimation__icon').css({backgroundColor: '#27AE60'});
                }
            });
        })

        $(item).on('mouseout', function() {
            const elements = $(this).parent().parent().children();
            const prev = elements.splice(0, (current + 1));

            $.each($(prev), (count, elem) => {
                $(elem).find('.estimation__icon').css({backgroundColor: 'lightgray'});
            })
        });
    });
};

hoverOnRateItems();
