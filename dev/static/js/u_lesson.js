const count = lessonCount;

function adaptiveSlide() {
  const items = $('.slick-slide');
  const comments = $('.gallery__item-comment');

  $.each(items, (index, item) => {
    const width = $(item).width();
    const preview = $(item).find('.gallery-item__preview').get(0);

    const figureTypeImg = $(preview).width() / $(preview).height();

    if (figureTypeImg < 1) {
      $(preview).css({ width: 'auto', position: 'absolute', left: '50%', transform: 'translateX(-50%)', visibility: 'visible' });
    } else {
      $(preview).css({ width: '100%', height: '100%', visibility: 'visible' });
    }
    $(item).height(width);
  });

  $.each(comments, (index, item) => {
    const preview = $(item).find('.gallery-item__preview');
    const figureTypeImg = $(preview).width() / $(preview).height();
    if (figureTypeImg < 1) {
      $(preview).css({ width: 'auto', height: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)', visibility: 'visible' });
    } else {
      $(preview).css({ width: '100%', height: '100%', visibility: 'visible' });
    }
  });

  $('.slick-track').height($($(items).get(0)).height());
}

async function lessonInitialize() {
  return await new Promise(resolve => {
    $(".slider").slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: false,
      infinite: false,
      responsive: [{
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
      ]
    });

    $('.slider').css({ display: 'block' });

    $.each($('.lesson-video__inner'), (index, item) => {
      setTimeout(() => { $(item).css({ display: 'block' }) }, 100 * index);
    });

    $.each($('.content-video__preview'), (index, item) => {
      $(item).on('load', function () {
        const playBtn = $(this).parent().children('.content-video__play-btn').css({ display: 'block' })
      });
    });

    if ($('.estimation__text--client').text() < 4) {
      $('.estimation__icon--client').css({ maskImage: 'url(/img/frown.svg)', backgroundColor: '#F5244A' });
    } else if ($('.estimation__text--client').text() > 3 && $('.estimation__text--client').text() < 7) {
      $('.estimation__icon--client').css({ maskImage: 'url(/img/meh.svg)', backgroundColor: '#FFA515' });
    } else if ($('.estimation__text--client').text() >= 7) {
      $('.estimation__icon--client').css({ maskImage: 'url(/img/smile.svg)', backgroundColor: '#27AE60' });
    }

    $('.slider').on('afterChange', adaptiveSlide);

    nav();
    setSlideSize();
    setAdaptiveSlide();
  })
}

function setSlideSize() {
  $.each($('.slider-item__wrapper'), (index, item) => {
    $(item).height($(item).width());
  });
}

(function setAdaptiveBannsers() {
  const desktopImg = $('.lesson-banner__desktop').find('img');
  const mobileImg = $('.lesson-banner__mobile').find('img');

  console.log(desktopImg);
  console.log(mobileImg);

  if (desktopImg && mobileImg) {
    const path1 = desktop;
    const path2 = mobile;

    const mobilePath = path1?.includes('mobile_') ? path1 : path2;
    const desktopPath = path2?.includes('browser_') ? path2 : path1;

    console.log(mobilePath);
    console.log(desktopPath);

    if (desktopPath) {
      $(desktopImg).attr('src', `/${desktopPath}`);
    }

    if (mobilePath) {
      $(mobileImg).attr('src', `/${mobilePath}`);
    }
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  lessonInitialize().then(adaptiveSlide());
});

$(window).on("resize", window_resize);

var resizeTimeoutId;
var banners;
var sliders;
var adaptiveSliders;

function window_resize() {
  clearTimeout(resizeTimeoutId);
  resizeTimeoutId = setTimeout(adaptiveSlide, 100);

  clearTimeout(sliders);
  sliders = setTimeout(setSlideSize, 100);

  clearTimeout(adaptiveSliders);
  adaptiveSliders = setTimeout(setAdaptiveSlide, 100);
}

function setAdaptiveSlide() {
  $.each($('.gallery-item__img'), (index, item) => {
    $(item).css({
      width: 'auto',
      height: 'auto',
    });

    const width = $(item).width();
    const height = $(item).height();

    const figure = width / height > 1 ? 'прямоугольник по горизонтали' : width === height ? 'квадрат' : 'прямоугольник по вертикали';

    if (figure === 'прямоугольник по горизонтали') {
      $(item).css({
        width: 'auto',
        height: '100%',
      });
    }

    if (figure === 'квадрат') {
      $(item).css({
        width: '100%',
        height: '100%',
      });
    }

    if (figure === 'прямоугольник по вертикали') {
      $(item).css({
        width: 'auto',
        height: '100%',
      });
    }
  });
}

function isChecked() {
  let mainHref = 'passed';
  const checkArray = document.location.href.split('?');

  if (checkArray.length > 1) {
    mainHref = `${checkArray[0]}/passed`;
  }

  $.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: mainHref,
    dataType: 'json',
    cache: false,
    success() {
      $('.lesson-passed').val('true');
    },
    error() {
    },
  });
}

$(document).ready(() => {
  const passed = $('.lesson-passed').val();

  if (passed === 'false') {
    isChecked();
  }
});

function nav() {
  if ($('.content-nav__item').length === 1) {
    if ($('.content-nav__item-number').html() === '2' && count !== 3) {
      $('.content-nav__wrapper').css({
        justifyContent: 'flex-end',
      });
    }
  }
}
