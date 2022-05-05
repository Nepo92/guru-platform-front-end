/* eslint-disable */

import Tariff from '../tariff/tariff.js';
import { bannerAPI } from '../../../../api/api.js';
import Popup from '../../../../modules/popup/popup.js';

class Courses {
  init() {
    const tariff = new Tariff();
    const popup = new Popup();

    $(document).on('click', '[js-update-course]', function (event) {
      setCourseInfo($(this));
      resetTabs();
      $('.banner__add').addClass('hide');
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
          $('[up-course-bg]').val(data.backgroundColor);
          $('#archive').get(0).checked = data.archive;

          courseIsUsed = data.isUsed;

          if (!data.isUsed) {
            $('[delete-course]').removeClass('hide');
          } else {
            $('[delete-course]').addClass('hide');
          }

          $('body').css({ overflow: 'hidden' });

          const menu = document.querySelector('[js-menu-update]');
          openModalAnimation(menu);

          checkBodyHidden();
          $('[js-update-course]').prop("disabled", false);

          tariff.getTariff({ id: data.id });
        },
        error: function (data) {
          $('[js-update-course]').prop("disabled", false);
        }
      });
    }

    $(document).on('click', '[delete-course]', function (event) {
      const remove = removeCourse.bind(this);

      const removeProps = {
        text: 'Вы действительно хотите удалить этот курс?',
        settings: null,
        title: null,
        ok: remove,
        cancel: null,
        tartget: event.target,
      };

      popup.init(removeProps);
    });

    function removeCourse() {
      var formData = new FormData();
      var currentId = $('[up-course-id]').val();
      formData.set('id', currentId);

      $('[delete-course]').prop("disabled", true);

      $('[js-update]').get(0).style.pointerEvents = 'none';

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
          $('[js-update]').get(0).style.pointerEvents = 'all';
        },
        error: function (data) {
          $('[delete-course]').prop("disabled", false);
          $('[js-update]').get(0).style.pointerEvents = 'all';
        }
      });
    }

    $(document).on('click', '[js-menu-update-close-btn]', function (event) {
      $('body').css({ overflow: 'auto' });
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
      $('.js-fileName').html('Загрузите изображение (500x500px)');

      //сбросить табы
      resetCourseSelectors();
      checkBodyHidden();

      const menu = document.querySelector('[js-menu-update]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      closeModalAnimation(menu, wrapper, false, true);
    }

    function resetTabs() {
      const tabs = $('[js-update-form]').find('[js-tab]');

      $.each(tabs, (index, item) => {
        if (index === 0) {
          $(item).addClass('active');
        } else {
          $(item).removeClass('active');
        }
      });

      const contents = $('[js-update-form]').find('[js-tab-panel]');

      $.each(contents, (index, item) => {
        if (index === 0) {
          $(item).addClass('is-open');
        } else {
          $(item).removeClass('is-open');
        }
      });
    }

    $(document).on('click', '[js-create-course]', function (event) {
      setCourseSelectors($(this));
      checkBodyHidden();

      $('body').css({ overflow: 'hidden' });

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

    $(document).on('click', '[js-menu-course-close-btn]', function (event) {
      closeCourseMenu();

      $('body').css({ overflow: 'auto' });

      const menu = document.querySelector('[js-menu-course]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      closeModalAnimation(menu, wrapper, false, true);
    });

    function closeCourseMenu() {
      $('[js-course-form]').trigger('reset');
      resetCourseSelectors();
      checkBodyHidden();
    }

    $(document).on('click', '[js-update]', function (event) {
      event.preventDefault();
      $('[js-update-form]').trigger('submit');
    });

    $(document).on('submit', '[js-update-form]', function (event) {
      event.preventDefault();
      if (validateForm(this)) {
        var formData = new FormData($('[js-update-form]')[0]);

        const banners = $.makeArray($('.banner__radio'));

        if (banners.length) {
          const selected = banners.filter((el) => el.checked)[0]?.getAttribute('data-id') || null;
          formData.append('idBanner', +selected);
        }

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

          $('body').css({ overflow: 'auto' });

          const menu = document.querySelector('[js-menu-update]');
          const wrapper = menu.querySelector('.platform-modal__wrapper')
          closeModalAnimation(menu, wrapper, false, true);

          $('[js-update]').prop("disabled", false);

          const currentCourse = $(`[js-update-course][data-course="${data.id}"][data-project="${data.idProject}"]`);

          if (data.archive) {
            currentCourse.addClass('archive');
          } else {
            currentCourse.removeClass('archive');
          }
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

      if (product.data('project') === data.idProject && product.data('type') === data.idCourseType) {
        product.replaceWith(prodBlock);
      } else {
        product.remove();
        addCourse(data)
      }
    }

    function addCourse(data) {
      var productList = $('.products[data-project="' + data.idProject + '"]').find('[js-tab-panel][data-type="' + data.idCourseType + '"]').find('.products__list');

      productList.html(createCourse(data)
        + productList.html());
    }

    function addCourseToCommon(data) {
      var productList = $('.products[data-project="' + data.idProject + '"]').find('[js-tab-panel][data-type="all"]').find('.products__list');

      productList.html(createCourse(data)
        + productList.html());
    }

    function createCourse(data) {
      return '<div js-update-course data-course="' + data.id + '" data-project="' + data.idProject + '" data-type="' + data.idCourseType + '" class="product-block" style="background: ' + data.backgroundColor + ';">' +
        '                 <div class="product-block__wrapper ' + data.theme + '" >'
        + (data.backgroundImage !== null ?
          '                    <div class="product-block__background">' +
          '                       <img src="/' + data.backgroundImage + '" alt="">' +
          '                     </div>' : '') +
        '                     <div class="product-block__title">' + data.name + '</div>' +
        '                     <div class="product-block__type">' + data.courseType + '</div>' +
        '                     <div class="product-block__price">' + numberWithSpaces(data.price) + ' ₽</div>' +
        '                 </div>' +
        '              </div>';
    }

    $(document).on('click', '[js-save-course]', function (event) {
      event.preventDefault();
      $('[js-course-form]').trigger('submit');
    });

    $(document).on('submit', '[js-course-form]', function (event) {
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
          closeModalAnimation(menu, wrapper, false, false);
          $('body').css({ 'overflow': 'auto' })
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

    $(document).on('change', '[js-bg-default]', function (event) {
      var isChecked = $(this).is(':checked');
      $("[js-bg-default]").prop("checked", false).attr("checked", false).removeAttr("checked");

      if (isChecked) {
        $(this).prop("checked", true);
      }
    });

    const getBanners = async function (idCompany) {
      const result = await $.ajax({
        type: 'GET',
        url: `/banners-settings/getBannersByCompany/${idCompany}`,
        data: null,
        processData: false,
        contentType: false,
        cache: false,
        success() {
        },
        error() {
        },
      });

      return result;
    };

    $(document).on('click', '[banner-course]', (e) => {
      const t = e.target;

      const companyData = {
        ...company,
      };

      const { id } = companyData;

      getBanners(id).then((banners) => {
        bannerAPI.getBannersCourse(idCourse).then((bannerCourses) => {
          clearBannerWrapper();
          renderBanners(banners);
          checkSelectedBanners(bannerCourses);
          if (!$('.banner__add').get(0)) {
            addBanner();
          }
        });
      });
    });

    function checkSelectedBanners(bannerCourses) {
      const radios = document.querySelectorAll('.banner__radio');

      if (bannerCourses.length) {
        bannerCourses.forEach((item, index) => {
          radios.forEach((elem) => {
            if (index === bannerCourses.length - 1) {
              if (item.id === +elem.getAttribute('data-id')) {
                elem.checked = true;
              }
            }
          });
        });
      }
    }

    function addBanner() {
      $('[update-footer]').append($('<button/>').attr('class', 'banner__add').text('Прикрепить баннер'));

      $('.banner__add').on('click', (e) => {
        const selectedBanner = $.makeArray($('.banner__radio')).filter((el) => el.checked)[0];
        const idBanner = +selectedBanner.getAttribute('data-id');

        const data = {
          keyField: idCourse,
          valueField: idBanner,
        };

        bannerAPI.saveBannerToCourse(data);
      });
    }

    function clearBannerWrapper() {
      $.each($('[js-banner-panel]').children(), (index, item) => {
        item.remove();
      });
    }

    function renderBanners(banners) {
      $('[js-banner-panel]').append(
        $('<ul/>').attr('class', 'banner__list custom-scroll').append(
          $('<li/>').attr('class', 'banner__nav course').append(
            $('<span/>').text('Выберите баннер').attr('class', ''),
            $('<div/>').attr('class', 'banner__search-wrapper').append(
              $('<input/>').attr('type', 'text').attr('placeholder', 'Найти баннер').attr('class', 'banner__search'),
              $('<span/>').attr('class', 'banner__search-icon'),
            ),
          ),
        ),
      );

      $.each(banners, (index, item) => {
        $('.banner__list').append(
          $('<li/>').attr('class', 'banner__elem').attr('data-id', item.id).append(
            $('<input/>').attr('class', 'platform__checkbox banner__radio').attr('type', 'radio').attr('id', `banner_${index}`).attr('name', 'banner-item').attr('data-id', item.id),
            $('<label/>').attr('class', 'banner__choice').attr('for', `banner_${index}`).append(
              $('<img/>').attr('src', `/${item.mainImagePath}`).attr('class', 'banner__preview'),
              $('<p/>').attr('class', 'banner__description').text(item.name),
            ),
          ),
        );
      });
    }

    $(document).on('click', '.banner__choice', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const t = e.target;

      const radio = $(t).closest('.banner__elem').find('.banner__radio').get(0);

      if (radio.checked) {
        radio.checked = false;
      } else {
        radio.checked = true;
      }
    });

    $(document).on('input', '.banner__search', function (e) {
      e.preventDefault();
      e.stopPropagation();

      let $v = $(this).val().toLowerCase();

      $('.banner__elem').each(function () {
        if (!(~$(this).find('.banner__description').text().toLowerCase().indexOf($v))) {
          $(this).addClass('none');
        } else {
          $(this).removeClass('none');
        }
      });

      const icon = $(this).closest('.banner__search-wrapper').find('.banner__search-icon');

      if ($v) {
        icon.css({
          backgroundColor: 'black',
        });
      } else {
        icon.css({
          backgroundColor: 'lightgray',
        });
      }
    });
  }
}

export default Courses;
