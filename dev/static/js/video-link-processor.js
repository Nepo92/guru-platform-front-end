//regex для проверки ссылок.
var YOUTUBEPATTERN = /^(https:\/\/(www.youtube.com|youtu.be)\/)(watch\?v=)*/;
var YOUTUBEENDLINKPATTERN = /(&.*)/;
var VIMEOPATTERN = /^(https:\/\/vimeo.com\/)/;
var VIMEOTHUMBNAILSIZEPATTERN = /(_[0-9]+)(x[0-9]+)?/;
var IMAGINATIONPATTERN = /^(https:\/\/(imagination.school)\/)*/;

$(document).ready(function () {
    var elements = document.getElementsByClassName('content-video');
    for (var index = 0; index < elements.length; index++) {
        fillingVideoBlock(elements[index]);
    }
});

/*
* Анализ-заполнение каждого отдельного элемента.
*/
function fillingVideoBlock(element) {
    var imgElement = element.getElementsByTagName('img')[0];
    var link = element.getAttribute('data-videoLink');

    if (link != null) {
        if (regexAnalyse(link, YOUTUBEPATTERN)){
            var videoId = link
                .replace(YOUTUBEPATTERN, '')
                .replace(YOUTUBEENDLINKPATTERN, '');
            youtubePreviewLink(videoId, imgElement);
        } else if (regexAnalyse(link, VIMEOPATTERN)) {
            vimeoPreviewLink(link, imgElement, element);
        } else if (regexAnalyse(link, IMAGINATIONPATTERN)) {
            imaginationPreviewLink(link, imgElement, element);
        }
    }
}

/*
* Проверяет ссылку на видео на соответствие паттерну.
* */
function regexAnalyse(link, pattern) {
    link = link.trim();
    var result = false;

    if (pattern.exec(link)) {
        result = true;
    }

    return result;
}

/*
* В данном случае для получения ссылки на картинку
* надо обратиться к vimeo API.
* Так же на входе может быть приватная ссылка- потому для правильно работы
* ещё и обновляет ссылку на само видео.
* */
function vimeoPreviewLink(link, elemForSrc, element) {
    var imgLink = "https://vimeo.com/api/oembed.json?url=" + link;
    $.ajax({
        url: imgLink,
        method: "GET",
        success: function (data) {
            const href = data.html.split('src')[1].split('width')[0].split('"')[1];
            var previewLink = data.thumbnail_url;
            previewLink = previewLink
                .replace(VIMEOTHUMBNAILSIZEPATTERN, '_640');
            elemForSrc.src = previewLink;
            element.href = href;
        }
    });
}


function youtubePreviewLink(videoId, elemForSrc) {
    elemForSrc.src = "//img.youtube.com/vi/" + videoId + "/sddefault.jpg";
}

function imaginationPreviewLink(link, elemForSrc, element) {
    $(element).append($('<video>').attr('src', `${link}`).css({width: '100%', height: 'auto'}));

    $('.content-video__play-btn').css({display: 'flex', zIndex: '1'});
}
