/* eslint-disable */

import AddLink from './events/addLink/addLink.js';
import Utils from '../../../utils/utils.js';
import Popup from '../../../modules/popup/popup.js';
import { dealAPI } from '../../../api/api.js';

const addLink = new AddLink();
const utils = new Utils();
const popup = new Popup();

class Marketing {
  init(props) {
    const addLinkBtn = document.querySelector('[js-add-outside-link]');

    if (addLinkBtn) {
      const cloneAddBtn = utils.setCloneElement(addLinkBtn);
      const add = addLink.init.bind(addLink, props);

      cloneAddBtn.addEventListener('click', add);

      this.marketingSettings();
    } else {
      this.marketingSettings();
    }
  }

  marketingSettings() {
    var DELETE_LINK_FORM;
    var LINK_ROW;

    $(document).on('click', '[delete-inside-link-btn]', function (event) {
      event.preventDefault();
      $('[dialog]').find('.dialog__title').html('Вы действительно хотите удалить ссылку?');
      $('[dialog]').find('.dialog__text').html('Внутренняя ссылка будет удалена');
      $('[dialog]').find('[accept-dialog]').attr('accept-delete-link', '');
      $('[dialog]').addClass('is-open');
      DELETE_LINK_FORM = $(this).closest('[delete-inside-link-form]');
      LINK_ROW = $(this);
    });

    $(document).on('click', '[accept-delete-link]', function (event) {
      event.preventDefault();
      $('[dialog]').removeClass('is-open');
      removeAcceptBtnAttribute($(this));
      DELETE_LINK_FORM.trigger('submit');
    });

    $(document).on('click', '[close-dialog]', function (event) {
      removeAcceptBtnAttribute($(this).siblings('[accept-dialog]'));
      $(this).closest('.dialog').removeClass('is-open');
    });

    $(document).on('submit', '[delete-inside-link-form]', function (event) {
      event.preventDefault();
      if (validateForm(this)) {
        var formData = $(this).serializeObject();
        deleteInsideLink(formData);
      }
    });

    //функция удаления счета
    function deleteInsideLink(formData) {
      $('[delete-inside-link-btn]').prop("disabled", true);
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteInsideLink",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
          LINK_ROW.closest('tr').remove();
          $('[delete-inside-link-btn]').prop("disabled", false);
        },
        error: function (data) {
          $('[delete-inside-link-btn]').prop("disabled", false);
        }
      });
    }

    $(document).on('click', '[delete-outside-link-btn]', function (event) {
      event.preventDefault();
      $('[dialog]').find('.dialog__title').html('Вы действительно хотите удалить ссылку?');
      $('[dialog]').find('.dialog__text').html('Внешняя и внутренние ссылки будут удалены');
      $('[dialog]').find('[accept-dialog]').attr('accept-delete-olink', '');
      $('[dialog]').addClass('is-open');
      DELETE_LINK_FORM = $(this).closest('[delete-outside-link-form]');
      LINK_ROW = $(this);
    });

    $(document).on('click', '[accept-delete-olink]', function (event) {
      event.preventDefault();
      $('[dialog]').removeClass('is-open');
      removeAcceptBtnAttribute($(this));
      DELETE_LINK_FORM.trigger('submit');
    });


    $(document).on('submit', '[delete-outside-link-form]', function (event) {
      event.preventDefault();
      if (validateForm(this)) {
        var formData = $(this).serializeObject();
        deleteOutsideLink(formData);
      }
    });

    //функция удаления счета
    function deleteOutsideLink(formData) {
      $('[delete-outside-link-btn]').prop("disabled", true);
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteOutsideLink",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
          LINK_ROW.closest('tr').remove();
          $('[parent="' + formData['id'] + '"]').remove();
          $('[delete-outside-link-btn]').prop("disabled", false);
        },
        error: function (data) {
          $('[delete-outside-link-btn]').prop("disabled", false);
        }
      });
    }


    $(document).on('click', '[js-add-link]', function (event) {
      $('body').css({ overflow: 'hidden' });
      const menu = document.querySelector('[js-menu-add]');
      openModalAnimation(menu);
      checkBodyHidden();
    });
    $(document).on('click', '[js-menu-add-close-btn]', function (event) {
      $('body').css({ overflow: 'auto' });
      const menu = document.querySelector('[js-menu-add]');
      const wrapper = menu.querySelector('.platform-modal__wrapper')
      closeModalAnimation(menu, wrapper, false, false);

      $('[js-menu-add-form]').trigger('reset');
      checkBodyHidden();
    });

    $(document).on('click', '[js-add]', function (event) {
      event.preventDefault();
      $('[js-menu-add-form]').trigger('submit');
    });

    $(document).on('submit', '[js-menu-add-form]', function (event) {
      event.preventDefault();
      if (validateForm(this)) {
        saveLink($(this).serializeObject());
      }
    });

    function saveLink(linkData) {
      $('[js-add]').prop("disabled", true);
      showLoader();
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveLink",
        data: JSON.stringify(linkData),
        dataType: 'json',
        cache: false,
        success: function (data) {
          updateLinkInTable(data);
          hideLoader();

          $('body').css({ overflow: 'auto' });

          const menu = document.querySelector('[js-menu-add]');
          const wrapper = menu.querySelector('.platform-modal__wrapper');
          closeModalAnimation(menu, wrapper, false, false);

          $('[js-menu-add-form]').trigger('reset');
          checkBodyHidden();
          $('[js-add]').prop("disabled", false);

          setTimeout(() => {
            location.reload();
          }, 400);
        },
        error: function (data) {
          $('[js-add]').prop("disabled", false);
        }
      });
    }

    function updateLinkInTable(data) {
      var linksTable = $('[links-table]');
      linksTable.html(
        '<tr class="custom-table__body-row">' +
        '   <td class="custom-table__body-col">' + data.name + '</td>' +
        '   <td class="custom-table__body-col">' + data.advertiser + '</td>' +
        '   <td class="custom-table__body-col">' + data.link + '</td>' +
        '</tr>'
        + linksTable.html());
    }

    $(document).on('keyup', '[link-search]', function (event) {
      var $v = $(this).val().toLowerCase();

      $('.link-row').each(function () {
        if (!(~$(this).find('.link-name').text().toLowerCase().indexOf($v) ||
          ~$(this).find('.link-name').val().toLowerCase().indexOf($v))) {
          $(this).addClass('none');
          $('[parent="' + $(this).data('outside') + '"]').addClass('none');
        } else {
          $(this).removeClass('none');
          $('[parent="' + $(this).data('outside') + '"]').removeClass('none');
        }
      })
    });

    var OUTSIDE_INFO_TEMP = {};
    $(document).on('click', '[js-edit-outside]', function (event) {
      event.preventDefault();
      $(this).closest('[js-edit-menu]').removeClass('is-open').siblings('[js-edit-btns]').addClass('is-open');
      var list = {};

      var name = $(this).closest('.custom-table__body-row').find('[o-name]');
      name.removeAttr('disabled');
      list['name'] = name.val();

      OUTSIDE_INFO_TEMP[$(this).closest('[data-outside]').data('outside')] = list;
    });

    $(document).on('click', '[js-edit-outside-cancel]', function (event) {
      event.preventDefault();
      var values = OUTSIDE_INFO_TEMP[$(this).closest('[data-outside]').data('outside')];

      $(this).closest('.custom-table__body-row').find('[o-name]').val(values.name).attr("disabled", true);

      $(this).closest('[js-edit-btns]').removeClass('is-open').siblings('[js-edit-menu]').addClass('is-open');
      delete OUTSIDE_INFO_TEMP[$(this).closest('[data-outside]').data('outside')];
    });
    var OUTSIDE_ACCEPT_BTN;
    $(document).on('click', '[js-edit-outside-accept]', function (event) {
      event.preventDefault();
      OUTSIDE_ACCEPT_BTN = $(this);

      var linkData = new Object();
      linkData.id = $(this).closest('[data-outside]').data('outside');
      linkData.name = $(this).closest('.custom-table__body-row').find('[o-name]').val();

      $('[js-edit-outside-accept]').prop("disabled", true);
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateOutsideLink",
        data: JSON.stringify(linkData),
        dataType: 'json',
        cache: false,
        success: function (data) {
          OUTSIDE_ACCEPT_BTN.closest('.custom-table__body-row').find('[o-name]').attr("disabled", true);

          OUTSIDE_ACCEPT_BTN.closest('[js-edit-btns]').removeClass('is-open').siblings('[js-edit-menu]').addClass('is-open');
          delete OUTSIDE_INFO_TEMP[linkData.id];

          $('[js-edit-outside-accept]').prop("disabled", false);
        },
        error: function (data) {
          var values = OUTSIDE_INFO_TEMP[linkData.id];

          OUTSIDE_ACCEPT_BTN.closest('.custom-table__body-row').find('[o-name]').val(values.name).attr("disabled", true);

          delete OUTSIDE_INFO_TEMP[linkData.id];

          $('[js-edit-outside-accept]').prop("disabled", false);
        }
      });
    });

    //внешняя ссылка
    $(document).on('click', '[js-menu-add-outside-close-btn]', function (event) {
      $('body').css({ overflow: 'auto' });
      const menu = document.querySelector('[js-menu-add-outside]');
      const wrapper = menu.querySelector('.platform-modal__wrapper')
      closeModalAnimation(menu, wrapper, false, true);

      $('[js-menu-add-outside-form]').trigger('reset');
      checkBodyHidden();
    });

    const addLinkBtn = $('[js-add-outside]').get(0);

    if (addLinkBtn) {
      const addLink = utils.setCloneElement(addLinkBtn);

      console.log(addLink);

      if (addLink) {
        addLink.addEventListener('click', function (event) {
          event.preventDefault();
          $('[js-menu-add-outside-form]').trigger('submit');
        })
      }
    }

    $(document).on('submit', '[js-menu-add-outside-form]', function (event) {
      event.preventDefault();
      if (validateForm(this)) {
        saveOutsideLink($(this).serializeObject());
      }
    });

    function saveOutsideLink(linkData) {
      $('[js-add-outside]').prop("disabled", true);

      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveOutsideLink",
        data: JSON.stringify(linkData),
        dataType: 'json',
        cache: false,
        success: function (data) {
          updateOutsideLinkInTable(data);

          const menu = document.querySelector('[js-menu-add-outside]');
          const wrapper = menu.querySelector('.platform-modal__wrapper');
          closeModalAnimation(menu, wrapper, false, false);

          $('[js-menu-add-outside-form]').trigger('reset');
          $('[js-add-outside]').prop("disabled", false);
          $('body').css({ 'overflow': 'auto' });
        },
        error: function (data) {
          $('[js-add-outside]').prop("disabled", false);
        }
      });
    }

    function updateOutsideLinkInTable(data) {
      var linksTable = $('[links-table]');

      const outsideLink = outsideLinkTemplate(data);

      linksTable.get(0).children[0].insertAdjacentHTML('afterend', outsideLink);
    }

    function outsideLinkTemplate(data) {
      return '<tr class="custom-table__body-row link-row" data-outside="' + data.id + '">' +
        '                                <td class="custom-table__body-col">' +
        '                                    <input o-name name="name" class="menu-input__input menu-input__input_small link-name editable" value="' + data.name + '" disabled required placeholder="Введите название">' +
        '                                </td>' +
        '                                <td class="custom-table__body-col">' +
        '                                    <div class="column-wrapper">' +
        '                                        <div class="column-full-text">' + data.link + '</div>' +
        '                                        <div class="column-links">' +
        '                                            <div js-copy-link class="column_mwidth column_mwidth-copy" data-link="' + data.link + '"></div>' +
        '                                            <a target="_blank" class="column_mwidth column_mwidth-open" href="' + data.link + '"></a>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                </td>' +
        '                                <td>' +
        '                                    <div class="div-table__body-col div-table__body-col_center div-table__body-col_xxsmall div-table__body-col_lauto">' +
        '                                        <div js-edit-btns class="column-links display-flex-none">' +
        '                                            <div js-edit-outside-accept class="column_mwidth column_mwidth-accept"></div>' +
        '                                            <div js-edit-outside-cancel class="column_mwidth column_mwidth-cancel"></div>' +
        '                                        </div>' +
        '                                        <div js-edit-menu class="column-links display-flex-none is-open">' +
        '                                            <div js-edit-outside class="column_mwidth div-table__body-col_center column_mwidth-edit"></div>' +
        '                                            <form delete-outside-link-form= class="column-form" action="#">' +
        '                                                <input type="hidden" value="' + data.id + '" name="id" required="">' +
        '                                                <button delete-outside-link-btn= type="button" class="column_mwidth column_mwidth-delete"></button>' +
        '                                            </form>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                </td>' +
        '                                <td class="custom-table__body-col">' +
        '                                    <div class="accordion-btn">' +
        '                                        <div data-toggle="collapse" aria-expanded="false" class="accordion-btn__wrapper collapsed" data-target="#out' + data.id + '" aria-controls="out' + data.id + '">' +
        '                                        </div>' +
        '                                    </div>' +
        '                                </td>' +
        '                            </tr>' +
        '                            <tr id="out' + data.id + '" class="custom-table__body-row collapse" parent="' + data.id + '">' +
        '                                <td colspan="4" class="custom-table__body-col custom-table__body-col_center custom-table_m-0_p-0">' +
        '                                    <table class="custom-table custom-table_inset custom-table_m-0_p-0">' +
        '                                        <tbody><tr class="custom-table__body-row">' +
        '                                            <td colspan="5" class="custom-table__body-col custom-table__body-col_p18 custom-table__body-col_r30">' +
        '                                                <div class="column-wrapper">' +
        '                                                    <div js-add-inside-link class="add-button add-button_right add-button_medium">+ Добавить внутреннюю ссылку</div>' +
        '                                                </div>' +
        '                                            </td>' +
        '                                        </tr>' +
        '                                    </tbody></table>' +
        '                                </td>' +
        '                            </tr>'
    }

    //редактирование внутренней
    var INSIDE_INFO_TEMP = {};
    $(document).on('click', '[js-edit-inside]', function (event) {
      event.preventDefault();
      $(this).closest('[js-edit-menu]').removeClass('is-open').siblings('[js-edit-btns]').addClass('is-open');
      var list = {};

      var name = $(this).closest('.custom-table__body-row').find('[i-name]');
      name.removeAttr('disabled');
      list['name'] = name.val();

      var link = $(this).closest('.custom-table__body-row').find('[i-link]');
      link.removeAttr('disabled');
      list['link'] = link.val();

      INSIDE_INFO_TEMP[$(this).closest('[data-inside]').data('inside')] = list;
    });

    $(document).on('click', '[js-edit-inside-cancel]', function (event) {
      event.preventDefault();
      var values = INSIDE_INFO_TEMP[$(this).closest('[data-inside]').data('inside')];

      $(this).closest('.custom-table__body-row').find('[i-name]').val(values.name).attr("disabled", true);
      $(this).closest('.custom-table__body-row').find('[i-link]').val(values.link).attr("disabled", true);

      $(this).closest('[js-edit-btns]').removeClass('is-open').siblings('[js-edit-menu]').addClass('is-open');
      delete INSIDE_INFO_TEMP[$(this).closest('[data-inside]').data('inside')];
    });
    var INSIDE_ACCEPT_BTN;
    $(document).on('click', '[js-edit-inside-accept]', function (event) {
      event.preventDefault();
      INSIDE_ACCEPT_BTN = $(this);

      var linkData = new Object();
      linkData.id = $(this).closest('[data-inside]').data('inside');
      linkData.name = $(this).closest('.custom-table__body-row').find('[i-name]').val();
      linkData.link = $(this).closest('.custom-table__body-row').find('[i-link]').val();

      $('[js-edit-inside-accept]').prop("disabled", true);
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateInsideLink",
        data: JSON.stringify(linkData),
        dataType: 'json',
        cache: false,
        success: function (data) {
          INSIDE_ACCEPT_BTN.closest('.custom-table__body-row').find('[i-name]').attr("disabled", true);
          INSIDE_ACCEPT_BTN.closest('.custom-table__body-row').find('[i-link]').attr("disabled", true);

          INSIDE_ACCEPT_BTN.closest('[js-edit-btns]').removeClass('is-open').siblings('[js-edit-menu]').addClass('is-open');
          delete INSIDE_INFO_TEMP[linkData.id];

          $('[js-edit-inside-accept]').prop("disabled", false);
        },
        error: function (data) {
          var values = INSIDE_INFO_TEMP[linkData.id];

          INSIDE_ACCEPT_BTN.closest('.custom-table__body-row').find('[i-name]').val(values.name).attr("disabled", true);
          INSIDE_ACCEPT_BTN.closest('.custom-table__body-row').find('[i-link]').val(values.link).attr("disabled", true);

          delete INSIDE_INFO_TEMP[linkData.id];

          $('[js-edit-inside-accept]').prop("disabled", false);
        }
      });
    });

    //внутрненяя ссылка
    $(document).on('click', '[js-add-inside-link]', function (event) {
      $('[inside-parent]').val($(this).closest('[parent]').attr('parent'));

      $('body').css({ overflow: 'hidden' });

      const menu = document.querySelector('[js-menu-add-inside]');
      openModalAnimation(menu);

      checkBodyHidden();
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

    $(document).on('click', '[js-menu-add-inside-close-btn]', function (event) {
      $('body').css({ overflow: 'auto' });

      const menu = document.querySelector('[js-menu-add-inside]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      closeModalAnimation(menu, wrapper, false, false);

      $('[js-menu-add-inside-form]').trigger('reset');
      checkBodyHidden();
    });
    $(document).on('click', '[js-add-inside]', function (event) {
      event.preventDefault();
      $('[js-menu-add-inside-form]').trigger('submit');
    });

    $(document).on('submit', '[js-menu-add-inside-form]', function (event) {
      event.preventDefault();
      if (validateForm(this)) {
        saveInsideLink($(this).serializeObject());
      }
    });

    function saveInsideLink(linkData) {
      $('[js-add-inside]').prop("disabled", true);
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveInsideLink",
        data: JSON.stringify(linkData),
        dataType: 'json',
        cache: false,
        success: function (data) {
          updateInsideLinkInTable(data);

          $('[js-menu-add-inside]').removeClass('is-open');

          const menu = document.querySelector('[js-menu-add-inside]');
          const wrapper = menu.querySelector('.platform-modal__wrapper');
          closeModalAnimation(menu, wrapper, false, false);

          $('[js-menu-add-inside-form]').trigger('reset');
          checkBodyHidden();
          $('[js-add-inside]').prop("disabled", false);

          utils.showLoader();

          setTimeout(() => {
            location.reload();
          }, 400);
        },
        error: function (data) {
          $('[js-add-inside]').prop("disabled", false);
        }
      });
    }

    function updateInsideLinkInTable(data) {
      var linksTable = $('[parent="' + data.idParent + '"]').find('tbody');

      linksTable.children(":first").insertAfter(
        '<tr class="custom-table__body-row custom-table__body-row_gray" data-inside="' + data.id + '">' +
        '                                                <td class="custom-table__body-col custom-table__body-col_15per">' +
        '                                                    <input i-name name="name" class="menu-input__input menu-input__input_small editable" value="' + data.name + '" disabled required placeholder="Введите имя">' +
        '                                                </td>' +
        '                                                <td class="custom-table__body-col custom-table__body-col custom-table__body-col_15per">' + data.counter + ' переходов</td>' +
        '                                                <td class="custom-table__body-col custom-table__body-col_center custom-table__body-col_35per">' +
        '                                                    <div class="column-wrapper">' +
        '                                                        <div class="column-full-text">' +
        '                                                            <input i-link name="link" class="menu-input__input menu-input__input_small editable editable__adv" value="' + data.link + '" disabled required placeholder="Введите ссылку">' +
        '                                                        </div>' +
        '                                                        <div class="column-links">' +
        '                                                            <div js-copy-link class="column_mwidth column_mwidth-copy" data-link="' + data.link + '"></div>' +
        '                                                            <a target="_blank" class="column_mwidth column_mwidth-open" href="' + data.link + '"></a>' +
        '                                                        </div>' +
        '                                                    </div>' +
        '                                                </td>' +
        '                                                <td class="custom-table__body-col custom-table__body-col_center">' +
        '                                                    <form action="#" js-link-active-form class="input-element__input input-element__input_status input-element__input_max input-element__input_right input-element__input_row">' +
        '                                                        <div class="input-element__radio input-element__input_xxsmall">' +
        '                                                            <input js-link-active type="radio" id="active' + data.id + '" class="radio radio_green" name="isActive" value="true" checked="checked">' +
        '                                                            <label for="active' + data.id + '" class="label">Включена</label>' +
        '                                                        </div>' +
        '                                                        <div class="input-element__radio input-element__input_xxsmall">' +
        '                                                            <input js-link-active type="radio" id="inactive' + data.id + '" class="radio radio_red" name="isActive" value="false">' +
        '                                                            <label for="inactive' + data.id + '" class="label">Выключена</label>' +
        '                                                        </div>' +
        '                                                        <input type="hidden" name="id" value="' + data.id + '">' +
        '                                                    </form>' +
        '                                                </td>' +
        '                                                <td class="custom-table__body-col custom-table__body-col_lsmall">' +
        '                                                    <div class="div-table__body-col div-table__body-col_center div-table__body-col_xxsmall">' +
        '                                                        <div js-edit-btns class="column-links display-flex-none">' +
        '                                                            <div js-edit-inside-accept class="column_mwidth column_mwidth-accept"></div>' +
        '                                                            <div js-edit-inside-cancel class="column_mwidth column_mwidth-cancel"></div>' +
        '                                                        </div>' +
        '                                                        <div js-edit-menu class="column-links display-flex-none is-open">' +
        '                                                            <div js-edit-inside class="column_mwidth div-table__body-col_center column_mwidth-edit"></div>' +
        '                                                            <form delete-inside-link-form class="column-form" action="#">' +
        '                                                                <input type="hidden" value="' + data.id + '" name="id" required>' +
        '                                                                <button delete-inside-link-btn type="button" class="column_mwidth column_mwidth-delete"></button>' +
        '                                                            </form>' +
        '                                                        </div>' +
        '                                                    </div>' +
        '                                                </td>' +
        '                                            </tr>');
    }

    //обновление вкл/выкл

    $(document).on('change', '[js-link-active]', function (event) {
      event.preventDefault();
      $(this).closest('[js-link-active-form]').trigger('submit');
    });

    $(document).on('submit', '[js-link-active-form]', function (event) {
      event.preventDefault();
      if (validateForm(this)) {
        updateStatusLink($(this).serializeObject());
      }
    });

    function updateStatusLink(formData) {
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateStatusLink",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
        },
        error: function (data) {
        }
      });
    }

    let target;

    $(document).on('click', '[remove-table]', function (e) {
      const text = 'Вы действительно хотите удалить эти рекламные данные ?';
      target = e.target;

      const remove = removeLink.bind(removeLink, target)

      const popupProps = {
        text,
        settings: null,
        title: null,
        ok: remove,
        cancel: null,
        target,
      }

      popup.init(popupProps);
    });

    function removeLink(target) {
      const id = getParent(target, 'custom-table__body-row').dataset.id;

      const loader = setTimeout(() => {
        showLoader();
      }, 400)

      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: `deleteLink/${id}`,
        data: null,
        dataType: 'json',
        cache: false,
        success: function () {
          setTimeout(() => {
            const table = document.querySelector(`.custom-table__body-row[data-id="${id}"]`);
            table.remove();

            clearTimeout(loader);
            hideLoader();
          }, 200)
        },
        error: function () {
        }
      });
    }

    $(document).on('click', '[update-table]', function (e) {
      e.preventDefault();
      e.stopPropagation();

      showLoader()

      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "manualUpdate",
        data: null,
        dataType: 'json',
        cache: false,
        success: function () {
          hideLoader();
        },
        error: function () {
        }
      });
    })

    function getParent(element, cls) {
      while ((element = element.parentElement) && !element.classList.contains(cls));
      return element;
    }

    $(document).on('click', '.adv-nav__right--check-auth', function (e) {
      const t = e.target;

      t.style.pointerEvents = 'none';

      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "../../api/tokens/checkToken",
        data: null,
        dataType: 'json',
        cache: false,
        success: function (data) {
          t.style.pointerEvents = 'all';

          const popupProps = {
            text: data.authUri,
            settings: 'copy',
            title: data.resultMsg,
          }

          popup.init(popupProps);
        },
        error: function (data) {
          t.style.pointerEvents = 'all';
        }
      });
    })
  }
}

export default Marketing;
