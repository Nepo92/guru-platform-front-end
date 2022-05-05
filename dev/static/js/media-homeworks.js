function moduleMedia() {
    const span = $('.homework-type');
    const homework = $('.homework-type');
    const homeModule = $('.info-block__text');
    let result;

    $.each(homeModule, (count, elem) => {
        if (count + 1 !== 1 && (count + 1) % 3 === 0) {
            mediaHomework($(elem), $(elem).text());
        }
    });

    $.each(span, (count, elem) => {
        mediaHomework($(elem), $(elem).text());
    })

    $.each(homework, (count, elem) => {
        if (count % 2 === 1) {
            mediaHomework($(elem), $(elem).text());
        }
    });
}

function mediaHomework(elem, text) {
    if (innerWidth < 515) {
        const arr = text.split(' ');

        if (arr.length > 2) {
            arr.splice(1, 1);
        }

        result = arr.join(' ');
        $(elem).html(result);
    }

    if (innerWidth >= 515) {
        const arr = text.split(' ');

        if (arr.length < 3) {
            arr.splice(1, 0, 'домашних');
        }

        result = arr.join(' ');
        $(elem).html(result);
    }
} 

moduleMedia();

$(window).resize(moduleMedia);
