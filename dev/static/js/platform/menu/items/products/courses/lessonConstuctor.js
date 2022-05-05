/* eslint-disable */

import Tariff from '../tariff/tariff.js';

class LessonConstructor {
  init() {
    const tariff = new Tariff();

    var LESSON_BLOCK_COUNTER = 0;
    let array;
    let flag = false;

    const filesAccess = {
      typesFile: [
        'pdf', 'PDF',
        'doc', 'DOC',
        'docx', 'DOCX',
        'psd', 'PSD',
        'ppt', 'PPT',
        'pptx', 'PPTX',
        'xls', 'XLS',
        'xlsx', 'XLSX',
      ],
      typesImg: [
        'jpg', 'JPG',
        'jpeg', 'JPEG',
        'png', 'PNG',
      ],
      maxSizeImg: 3670016,
      maxSizeDoc: 20971520,
      maxSizeWidth: '1180px',
      maxSizeHeight: '350px',
    }

    $(document).ready(function (e) {
      $(".sortableList").sortable({
        revert: true,
        placeholder: 'sortable-placeholder',
        stop: function (event, ui) {
          var type = ui.item.attr('data-type')
          if (typeof type !== typeof undefined && type !== false) {
            var replaced = '';
            if (type === 'video') {
              replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="video" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Видео</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Cсылку на видео *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" type="text" required placeholder="Введите ссылку" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete"></div>' +
                '                                    </div>';
            } else if (type === 'text') {
              replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="text" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Текстовый блок</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Заголовок *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите заголовок" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Текст *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                ' <textarea data-quilljs name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" required placeholder="Введите текст" class="text-editor lesson-element__input lesson-element__input_textarea" class=""></textarea>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete"></div>' +
                '                                    </div>';
            } else if (type === 'document') {
              replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="document" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Документ</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Название *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите название" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
                '                                                               <div class="file-loader">' +
                '                                                                   <input type="file" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.psd" class="file-loader__file file-loader__file_file" required>' +
                '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label"><span class="file-loader__title"></span></label>' +
                '                                                               </div>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete"></div>' +
                '                                    </div>';
            } else if (type === 'image') {
              replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="image" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Изображение</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Название *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите название" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
                '                                                               <div class="file-loader">' +
                '                                                                   <input type="file" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".png,.jpg,.jpeg" class="file-loader__file file-loader__file_image" required>' +
                '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label"><span class="file-loader__title"></span></label>' +
                '                                                               </div>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete"></div>' +
                '                                    </div>';
            } else if (type === 'gallery') {
              replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="gallery" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper lesson-block__wrapper_pb0">' +
                '                                            <div class="lesson-block__title">Галлерея</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Название *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите название" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
                '                                                               <div class="file-loader file-loader_mb20">' +
                '                                                                   <input lesson-gallery type="file" data-name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".png,.jpg,.jpeg" class="file-loader__file file-loader__file_gallery" multiple>' +
                '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label"><span class="file-loader__title"></span></label>' +
                '                                                               </div>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete"></div>' +
                '                                    </div>';
            } else if (type === 'question') {
              replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="question" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Открытый вопрос</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].blockValues[0].value" type="checkbox" id="images' + LESSON_BLOCK_COUNTER + '" class="checkbox" value="images">' +
                '                                                            <label class="checkbox-label checkbox-label_gray" for="images' + LESSON_BLOCK_COUNTER + '" >Разрешить загружать изображения</label>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].blockValues[1].value" type="checkbox" id="files' + LESSON_BLOCK_COUNTER + '" class="checkbox" value="files">' +
                '                                                            <label class="checkbox-label checkbox-label_gray" for="files' + LESSON_BLOCK_COUNTER + '" >Разрешить загружать файлы</label>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete"></div>' +
                '                                    </div>';
            } else if (type === 'banner') {
              replaced =
                '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper banners">' +
                '<input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                '<input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="banner" type="hidden" required>' +
                '<div class="banners__files">' +
                '<div class="banners__inner">' +
                '<div class="banners__title">Баннер</div>' +
                '<div class="banners__wrapper">' +
                '<div class="banners__inputs">' +
                '<div class="banners__mobile">' +
                '<input files-mobile accept=".png,.jpg,.jpeg" type="file" class="mobile banners__input--file" data-name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" required id="files-mobile' + LESSON_BLOCK_COUNTER + '">' +
                '<label class="banners__btn" for="files-mobile' + LESSON_BLOCK_COUNTER + '">Загрузить мобайл (640 x 440px)</label>' +
                '</div>' +
                '<div class="banners__desktop">' +
                '<input files-desktop accept=".png,.jpg,.jpeg" type="file" class="browser banners__input--file" data-name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" required id="files-desktop' + LESSON_BLOCK_COUNTER + '">' +
                '<label class="banners__btn" for="files-desktop' + LESSON_BLOCK_COUNTER + '">Загрузить десктоп (1180 x 350px)</label>' +
                '</div>' +
                '</div>' +
                '<div class="banners__value">' +
                '<input class="banners__input--value" required id="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" placeholder="Введите ссылку">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="banners__preview preview">' +
                '<div class="preview__item preview-mobile">' +
                ' <input type="hidden" value="' + LESSON_BLOCK_COUNTER + '" class="preview-mobile__counter"> ' +
                '</div>' +
                '<div class="preview__item preview-browser">' +
                ' <input type="hidden" value="' + LESSON_BLOCK_COUNTER + '" class="preview-mobile__counter"> ' +
                '</div>' +
                '</div>' +
                '<div class="lesson-block__delete"></div>' +
                '</div>';
            }

            LESSON_BLOCK_COUNTER++;
            ui.item.replaceWith(replaced);
          }
          recheckLessonBlockIndex($(this).find('.lesson-block'));
        }
      });
    });

    $(".draggable").draggable({
      connectToSortable: '.sortableList',
      helper: 'clone',
      revert: 'invalid'
    });

    $(".draggable").disableSelection();

    function recheckLessonBlockIndex(blocks) {
      $.each(blocks, function (index, block) {
        $(block).find('[name$=".index"]').val(index);
      });
    }

    $(document).on('click', '.lesson-block__delete', function (event) {
      var block = $(this).closest('.lesson-block');
      var blockWrapper = block.closest('.lesson-content__blocks');

      block.remove();
      recheckLessonBlockIndex(blockWrapper.find('.lesson-block'));
    });

    var DELETE_LESSON_BLOCKS = [];

    $(document).on('click', '.lesson-block__delete.update', function (event) {
      var block = $(this).closest('.lesson-block');
      DELETE_LESSON_BLOCKS.push(Number(block.find('[name$=".id"]').val()));
      var blockWrapper = block.closest('.lesson-content__blocks');
      block.remove();
      recheckLessonBlockIndex(blockWrapper.find('.lesson-block'));
    });

    var courseBlocks;

    $(document).on('click', '[lesson-tab]', function (event) {
      if ($('.banner__add').get(0)) {
        $('.banner__add').remove();
      }

      const t = event.target;
      var currentBtn = $(this);
      var formData = new FormData();
      formData.set('id', Number(currentBtn.attr('current-course')));

      $('[lesson-tab]').prop("disabled", true);

      $('.tariff-block').remove();

      const data = {
        id: idCourse,
      };

      if ($(this).data('tab') === 't1') {
        tariff.getTariff(data, t);
        $('[lesson-tab]').prop("disabled", false);
        $('.banner__add').removeClass('hide');

        toggleRemoveBtn();

      } else if ($(this).data('tab') !== 't1' && $(this).data('tab') !== 't4') {
        $.ajax({
          type: "POST",
          url: "getModules",
          data: formData,
          processData: false,
          contentType: false,
          cache: false,
          success: function (modules) {
            const blocks = getBlocks();

            blocks.then((blocks) => {
              $('.blocks').remove();
              $('.modules').remove();
              $('[modules-start]').remove();
  
              var currentActiveId = currentBtn.data('tab');
              currentBtn.closest('.tabs__wrapper').find('[js-tab]').removeClass('active');
              currentBtn.addClass('active');
              currentBtn.closest('.tabs__wrapper').find('[js-tab-panel]').removeClass('is-open');
              currentBtn.closest('.tabs__wrapper').find('[js-tab-panel]').filter('[data-tab=' + currentActiveId + ']').addClass('is-open');
  
              $('[lesson-tab]').prop("disabled", false);
              toggleRemoveBtn();

              renderBlocksWithModules(blocks, modules, t);
              hideLoader()
            });
          },
          error: function () {
            hideLoader()
            $('[lesson-tab]').prop("disabled", false);
          }
        });
      } else if ($(this).data('tab') === 't4') {
        $('[lesson-tab]').prop("disabled", false);

        $('[delete-course]').addClass('hide');
      }
    });

    function toggleRemoveBtn() {
      if (courseIsUsed) {
        $('[delete-course]').addClass('hide');
      } else {
        $('[delete-course]').removeClass('hide');
      }
    }

    function renderBlocksWithModules(blocks, modules, t) {
      if (!$.isArray(blocks) || !$.isArray(modules)) {
        return false;
      }

      const blocksItems = $.map(blocks, (block, index) => {
        return `
		<div data-block="${block.id}" class="block">
		<div class="block__wrapper">
			<div class="block__header collapsed" data-toggle="collapse" data-target="#block${block.id}" aria-expanded="false" aria-controls="module${block.id}">
				<div js-delete-block="" class="block__header-delete" data-block-id="${block.id}">
				</div>
				<div class="block-desc">
					<div class="block-desc__number block-desc__number">${index + 1}</div>
					<div class="block-desc__wrapper">
						<div class="block-name block-desc__title">${block.name}</div>
						<div class="block-desc__desc">
							<div class="lesson-count block-desc__text block-desc__text_video" data-item-count="0"><span class="modules-counter">${block.modulesCount}</span> модулей</div>
							<div class="block-desc__delim"><span></span></div>
							<div class="homework-count block-desc__text block-desc__text_work" data-item-count="0"><span class="lessons-counter">${block.lessonsCount}</span> уроков</div>
						</div>
					</div>
				</div>
				<div class="block__switch"></div>
			</div>
			<div class="block__body collapse" id="block${block.id}">
				<div class="modules">
				<div class="modules__wrapper">
					<div modules-list class="modules__content"></div>
					<div class="modules__content">
						<div class="modules__btn-wrapper modules__btn-in-block">
							<div add-module current-course data-inmodule="true" class="module-btn module-btn_low">Добавить модуль</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div update-block="" class="block-setting"></div>
	</div>
		`
      });

      $('[js-block-panel]').find('.tab-content__wrapper').append(setBlocksWrapper());
      $('.blocks').find('[blocks-list]').append(blocksItems);

      $('[js-modules-panel]').find('[modules-start]').remove();

      if ($(t).data('tab') === 't2') {
        $('[js-modules-panel]').find('.tab-content__wrapper').append(setModulesWrapper('out-block'));
      } else {
        $('[js-modules-panel]').find('.tab-content__wrapper').append(setModulesWrapper());
      }

      if ($(t).data('tab') === 't2') {
        setModules(blocks, modules, 'out-block');
      } else {
        setModules(blocks, modules);
      }
    }

    function setBlocksWrapper() {
      return `
		<div class="blocks">
			<div class="blocks__wrapper">
				<div blocks-list class="blocks__content"></div>
				<div class="blocks__content">
					<div class="blocks__btn-wrapper">
						<div add-blocks current-course class="module-btn module-btn_low">Добавить блок</div>
					</div>
				</div>
			</div>
		</div>
	`;
    }

    function setModulesWrapper(settings = null) {
      return `
		<div class="modules modules__with-blocks" modules-start>
      <div class="modules__wrapper">
				<div modules-list class="modules__content"></div>
				<div class="modules__content">
					<div class="modules__btn-wrapper modules__btn-in-block">
						<div add-module current-course data-inblock="${settings === 'out-block' ? false : true}" class="module-btn module-btn_low">Добавить модуль</div>
					</div>
				</div>
			</div>
    </div>
	`;
    }

    function setCourseModules(data) {
      $('[modules-list]').html('');
      $.each(data, function (index, module) {
        $('.modules__with-blocks').find('[modules-list]').append(createModule(module, (index + 1)));

        var lessonWrapper = $('[data-module="' + module.id + '"]').find('.module__lessons');
        var lessonCount = lessonWrapper.find('.module__lesson').length + 1;

        $.each(module.lessonList, function (index, lesson) {
          lessonWrapper.append(createLesson(lesson, lessonCount));
          lessonCount++;
        });
      });
    }

    function setModules(blocks, modules, settings = null) {
      if (blocks.length !== 0 && modules.length !== 0) {

        const modulesId = [];

        $.each(blocks, (index, item) => {
          // Выборка на отрисовку модулей в блоках
          const modulesInBlock = modules.filter(el => item.moduleIds.includes(el.id));

          $.each($('.block'), (count, elem) => {
            if ($(elem).data('block') === item.id) {
              // Отрисовака модулей
              renderModules(modulesInBlock, elem, 'in-block');
            }
          });

          $.each(modulesInBlock, (count, elem) => {
            modulesId.push(elem.id);
          });
        });

        // Выборка на отрисовку независимых модулей
        const modulesOutBlocks = modules.filter(el => !modulesId.includes(el.id));

        const template = $('[js-modules-panel]').find('[modules-start]').get(0);
        // Отрисовка независимых модулей
        renderModules(modulesOutBlocks, template, settings);

      } else if (blocks.length === 0 && modules.length !== 0) {
        const template = $('[js-modules-panel]').find('[modules-start]').get(0);
        renderModules(modules, template, settings);
      }
    }

    $(document).on('click', '[js-delete-block]', function (e) {
      e.stopPropagation();

      const t = e.target;

      const wrapper = $(t).closest('[blocks-list]');

      if (!confirm('Вы действительно хотите удалить	блок?')) {
        return;
      }

      showLoader();

      var idBlock = $(t).closest('.block').data('block');

      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: `/products/courses/deleteBlock/${idBlock}`,
        data: JSON.stringify(idBlock),
        dataType: 'json',
        cache: false,
        success: function () {
          $('.block[data-block="' + idBlock + '"]').remove();
          $.each($(wrapper).children(), (index, item) => {
            $(item).find('.block-desc__number').html(index + 1)
          });

          const data = {
            id: idCourse,
          }

          $.ajax({
            type: "POST",
            url: "/products/courses/getTariffs",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            success: function (tariffs) {

              $('[js-update-course]').prop("disabled", false);

              $.each(tariffs, (index, item) => {
                setTimeout(() => {
                  item.courseBlocks = item.courseBlocks.filter(el => el.id !== idBlock);

                  const updatingBox = {
                    keyField: null,
                    valueField: null,
                  }

                  updatingBox.keyField = item;

                  $.ajax({
                    type: "POST",
                    url: `/products/courses/updateTariff`,
                    data: JSON.stringify(updatingBox),
                    processData: false,
                    contentType: "application/json",
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                    },
                    error: function (data) {
                    }
                  });
                }, 10)
              });
              hideLoader();
            },
            error: function (data) {
              $('[js-update-course]').prop("disabled", false);
              hideLoader();
            },
          });

        },
        error: function () {
        }
      });
    })

    $(document).on('click', '[js-delete-module]', function (event) {
      const t = event.target;

      event.stopPropagation();
      if (!confirm('Вы действительно хотите удалить модуль?')) {
        return;
      }

      showLoader();

      var idModule = $(this).data('module-id');

      const wrapper = $(event.target).closest('[modules-list]');

      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteModule",
        data: JSON.stringify(idModule),
        dataType: 'json',
        cache: false,
        success: function () {
          $.each($(wrapper).children(), (index, item) => {
            $(item).find('[module-index]').html(`${index + 1}`);
          });

          const moduleLength = $(t).closest('.block').find('.module').length;

          $(t).closest('.block').find('.modules-counter').html(moduleLength - 1);

          const modulesCount = +$(t).closest('.block').find('.lessons-counter').html();
          const moduleInLesson = $(t).closest('.module').find('.module__lesson-delete[data-lesson-homework="false"]').length;
          const resultLessonCount = modulesCount - moduleInLesson;

          $(t).closest('.block').find('.lessons-counter').html(resultLessonCount);
          $(t).closest('.block').find('.modules-counter').html(moduleLength - 1);

          $('.module[data-module="' + idModule + '"]').remove();
          hideLoader();
        },
        error: function () {
          hideLoader();
        }
      });
    });

    async function deleteModule(idModule) {
      const response = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteModule",
        data: JSON.stringify(idModule),
        dataType: 'json',
        cache: false,
        success: function (data) {
        },
        error: function (data) {
        }
      });

      return await response;
    }

    $(document).on('click', '[js-delete-lesson]', function (event) {
      event.stopPropagation();
      if (!confirm('Вы действительно хотите удалить урок?')) {
        return;
      }

      showLoader();

      var idLesson = $(this).data('lesson-id');
      var isHomework = ($(this).data('lesson-homework') == 'true')

      const t = $(event.target).closest('.module__lessons');

      const target = event.target;

      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteLesson",
        data: JSON.stringify(idLesson),
        dataType: 'json',
        cache: false,
        success: function (data) {
          var $wrapper = $('.module__lesson[data-lesson="' + idLesson + '"]').parents('.module__wrapper');

          if (isHomework) {
            var $it = $wrapper.find('.homework-count');
            var count = parseInt($it.data('item-count')) - 1;
            $it.data('item-count', count);
            $it.html(count + ' домашнее задание')
          } else {
            var $it = $wrapper.find('.lesson-count');
            var count = parseInt($it.data('item-count')) - 1;
            $it.data('item-count', count);
            $it.html(count + ' уроков')
          }

          $.each($(t).children(), (index, item) => {
            $(item).find('.module-desc__number').html(`${index + 1}`);
          });

          const lessonsCounter = $(target).closest('.block').find('.module__lesson-delete[data-lesson-homework="false"]').length;

          $(target).closest('.block').find('.lessons-counter').html(lessonsCounter - 1);
          $('.module__lesson[data-lesson="' + idLesson + '"]').remove();
          hideLoader();
        },
        error: function (data) {
        }
      });
    });

    let target;

    $(document).on('click', '[add-module]', function (event) {
      const t = event.target;
      $('[js-add-module-form]').trigger('reset');
      $('[js-add-module-form]').find('[img-title]').html('Загрузите изображение (410 х 280px)');
      $('[m-course-id]').val($(this).attr('current-course'));
      setBlockChoose(t);

      checkBodyHidden();

      const menu = document.querySelector('[js-menu-add-module]');
      openModalAnimation(menu);

      target = event.target;
    });

    $(document).on('click', '[js-menu-add-module-close-btn]', function (event) {
      const menu = document.querySelector('[js-menu-add-module]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      closeModalAnimation(menu, wrapper, false, false);
      checkBodyHidden();
    });

    $(document).on('click', '[js-add-module]', function (event) {
      event.preventDefault();

      if (validateForm($('[js-add-module-form]').get(0))) {
        showLoader();
        var formData = new FormData($('[js-add-module-form]').get(0));
        formData.set('idCourse', idCourse);
        saveModule(formData, 'out-block');
      }
    });

    function saveModule(formData, settings) {
      $('[js-add-module]').prop("disabled", true);
      $.ajax({
        type: "POST",
        url: "saveModule",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
          setNewModule(data, 'out-block');

          const menu = document.querySelector('[js-menu-add-module]');
          const wrapper = menu.querySelector('.platform-modal__wrapper');
          closeModalAnimation(menu, wrapper, false, false);

          checkBodyHidden();
          $('[js-add-module]').prop("disabled", false);
          hideLoader();

          if (!$(target).closest('.block').get(0)) {
            return false;
          } else {
            bindingModulesToBlock(data);
          }
        },
        error: function (data) {
          $('[js-add-module]').prop("disabled", false);
          hideLoader();
        }
      });
    }

    function createModule(module, index, settings = null) {
      return `
		<div data-module="${module.id}" class="module" data-inblock="${settings === 'in-block' ? true : false}">
			<div class="module__wrapper">
				<div class="module__header collapsed" data-toggle="collapse" data-target="#module${module.id}" aria-expanded="false" aria-controls="module${module.id}">
					<div js-delete-module class="module__header-delete" data-module-id="${module.id}">
					</div>
					<div class="module-desc">
						<div module-index class="module-desc__number">${index + 1}</div>
						<div class="module-desc__wrapper">
							<div class="module-name module-desc__title">${module.name}</div>
							<div class="module-desc__desc">
								<div class="lesson-count module-desc__text module-desc__text_video" data-item-count="${module.lessonCount}">${module.lessonCount} уроков</div>
								<div class="module-desc__delim"><span></span></div>
								<div class="homework-count module-desc__text module-desc__text_work" data-item-count="${module.homeworkCount}">${module.homeworkCount} домашнее задание</div>
							</div>
						</div>
					</div>
					<div class="module__switch ${settings === 'in-block' ? 'module__switch--in-block' : ''}">
						<div class="module__switch--sep"></div>
					</div>
				</div>
					<div class="module__body collapse" id="module${module.id}">
						<div class="module__lessons"></div>
						<div class="modules__btn-wrapper ${settings === 'in-block' ? 'module-buttons--in-block' : ''}">
							<div add-lesson data-type="lesson" class="module-btn module-btn_low">Добавить урок</div>
							${(module.homeworkCount == 0) ?
          `
									<div add-lesson data-type="homework" class="module-btn module-btn_low">Добавить домашнее задание</div>
								`
          : ''}
						</div>
					</div>
					<div update-module class="module-setting ${settings === 'in-block' ? 'module-setting--in-block' : ''}"></div>
				</div>
			</div>
		</div>
	`
    }

    function createLesson(lesson, index) {
      var durationHour = Math.trunc(lesson.duration / 60);
      var durationMin = lesson.duration % 60;
      return '<div data-lesson="' + lesson.id + '" class="module__lesson">' +
        '<div js-delete-lesson class="module__lesson-delete" data-lesson-id="' + lesson.id + '" data-lesson-homework="' + (lesson.type == 'homework') + '">' +
        '</div>' +
        '<div class="module-desc">' +
        '<div class="module-desc__number">' + (index === null ? '' : index) + '</div>' +
        '<div class="module-desc__wrapper">' +
        '<div class="module-desc__title">' + lesson.title + '</div>' +
        '<div class="module-desc__desc">' +
        '<div class="module-desc__text module-desc__text_clock">' + durationHour + ' ч ' + durationMin + ' мин</div>' +
        '<div class="module-desc__delim"><span></span></div>' +
        '<div class="module-desc__text module-desc__text_document">' + lesson.documentsCounter + ' файла</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div update-lesson class="module__btn module__btn_right">' + (lesson.type == 'homework' ? 'Настроить ДЗ' : 'Настроить урок') + '</div>' +
        '</div>';
    }

    var idEditableModule;

    function setBlockChoose(t) {
      let inBlock;

      if ($(t).closest('.module')) {
        inBlock = $(t).closest('.module').data('inblock');
      } else {
        inBlock = $(t).data('inblock');
      }

      if (inBlock) {
        $('[js-menu-update-module]').find('.menu-blocks').css({
          display: 'none',
        })
      } else {
        $('[js-menu-update-module]').find('.menu-blocks').css({
          display: 'block',
        })
      }
    }

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

    $(document).on('click', '[update-module]', openUpdateModuleMenu);

    function openUpdateModuleMenu(event) {
      const menu = document.querySelector('[js-menu-update-module]');
      openModalAnimation(menu);

      idEditableModule = $(event.target).closest('.module').data('module');
      var formData = new FormData();
      formData.append('id', Number($(this).closest('[data-module]').data('module')));

      $.each($('[js-block-item]').children(), (index, item) => {
        if (index !== 0) {
          $(item).remove();
        }
      });

      $('[update-module]').prop("disabled", true);

      const t = event.target;

      setBlockChoose(t);

      $.ajax({
        type: "POST",
        url: "getModule",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
          setUpdateModuleInfo(data);

          $('[update-module]').prop("disabled", false);

          getBlocks().then((blocks) => {
            const blockOption = $.map((blocks), (block, index) => {
              return `
						<option value="${block.id}">${block.name}</option>
					`
            });

            $('[js-block-item]').append(blockOption);
          });
          hideLoader();
          const menu = document.querySelector('[js-menu-update-module]');
          openModalAnimation(menu);
        },
        error: function (data) {
          hideLoader();
          $('[update-module]').prop("disabled", false);
        }
      });
    }

    $(document).on('click', '[update-block]', function () {
      const idBlock = +$(this).closest('.block').data('block');

      $('[update-module]').prop("disabled", true);

      $.ajax({
        type: "GET",
        url: `/products/courses/getBlock/${idBlock}`,
        data: null,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
          setUpdateBlockInfo(data);
          $('[update-module]').prop("disabled", false);
          $('[update-block]').prop("disabled", false);
        },
        error: function (data) {
          $('[update-module]').prop("disabled", false);
          $('[update-block]').prop("disabled", false);
        }
      });
    });

    let modulesInEditableBLock = [];
    modulesInEditableBLock.length = 0;

    $(document).on('click', '[js-update-block]', function () {
      const btn = this;

      if (validateForm($('[js-update-block-form]').get(0))) {
        showLoader()
        const blocks = getBlocks();

        blocks.then((result) => {
          const updatingBox = {
            keyField: null,
            valueField: null,
          }

          let block;

          $.each(result, (index, item) => {
            if (item.id === +$(btn).closest('[js-update-block-form]').find('[u-block-id]').val()) {
              block = item;
            }
          });

          const file = $('[u-block-poster]').get(0).files[0];

          let myFile;
          if (file) {
            myFile = {
              'lastMod': file.lastModified,
              'lastModDate': file.lastModifiedDate,
              'name': file.name,
              'size': file.size,
              'type': file.type,
            }
          }

          block.name = $(btn).closest('[js-update-block-form]').find('[u-block-name]').val();
          block.description = $(btn).closest('[js-update-block-form]').find('[u-block-description]').val();
          block.file = myFile;

          updatingBox.keyField = block;

          $.ajax({
            type: "POST",
            url: "/products/courses/updateBlock",
            data: JSON.stringify(updatingBox),
            processData: false,
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            success: function (data) {
              const menuUpdateBlock = document.querySelector('[js-menu-update-block]');

              if (menuUpdateBlock) {
                const wrapper = menuUpdateBlock.querySelector('.platform-modal__wrapper');
                closeModalAnimation(menuUpdateBlock, wrapper, false, false);
              }

              updateBlockAfterUpdate(data);
              hideLoader();
            },
            error: function () {
              $('[update-module]').prop("disabled", false);
              hideLoader();
            }
          });
        }
        )
      }
    });

    $(document).on('click', '[js-menu-update-block-close-btn]', function () {
      const menu = document.querySelector('[js-menu-update-block]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      closeModalAnimation(menu, wrapper, false, false);
    })

    function setUpdateBlockInfo(block) {
      $('[js-update-block-form]').trigger('reset');
      $('[js-update-block-form]').find('[img-title]').html('Загрузите изображение (410 х 280px)');

      $('[u-block-name]').val(block.name);
      $('[u-block-description]').html(block.description);
      $('[u-block-id]').val(block.id);

      const menu = document.querySelector('[js-menu-update-block]');
      openModalAnimation(menu);

      modulesInEditableBLock = block.moduleIds;
    }

    function setUpdateModuleInfo(module) {
      $('[js-update-module-form]').trigger('reset');
      $('[js-update-module-form]').find('[img-title]').html('Загрузите изображение (410 х 280px)');

      $('[u-module-name]').val(module.name);
      $('[u-module-description]').html(module.description);
      $('[u-module-access]').prop('checked', module.accessLimitation);
      $('[u-module-id]').val(module.id);
      $('[js-menu-update-module]').find('[name="promo"]').prop('checked', module.promo);

      const menu = document.querySelector('[js-menu-update-module]');
      openModalAnimation(menu);
      checkBodyHidden();
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

    $(document).on('click', '[js-menu-update-module-close-btn]', function (event) {
      const menu = document.querySelector('[js-menu-update-module]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      closeModalAnimation(menu, wrapper, false, false);
      checkBodyHidden();
    });

    $(document).on('click', '[js-update-module]', function (event) {
      event.preventDefault();
      $('[js-update-module-form]').trigger('submit');
    });

    $(document).on('submit', '[js-update-module-form]', function (event) {
      event.preventDefault();
      if (validateForm(this)) {
        showLoader();
        var formData = new FormData($('[js-update-module-form]')[0]);
        if (formData.get('block') == '0') {
          formData.delete('block');
          updateModule(formData);
        }

        if (formData.get('block') !== '0') {

          getBlocks().then((blocks) => {
            let block = blocks.filter(el => el.id === +formData.get('block'))[0];

            const updatingBox = {
              keyField: null,
              valueField: null,
            }

            if (block) {
              block.moduleIds.push(idEditableModule);

              updatingBox.keyField = block;

              updateBlock(updatingBox).then(() => {
                $(`.module[data-module="${idEditableModule}"]`).remove();

                const menu = document.querySelector('[js-menu-update-module]');
                const wrapper = menu.querySelector('.platform-modal__wrapper');
                closeModalAnimation(menu, wrapper, false, false);
                hideLoader();
              });
            }
          });
        }
      }
    });

    function updateModule(formData) {
      $('[js-update-module]').prop("disabled", true);
      $.ajax({
        type: "POST",
        url: "updateModule",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
          $('[data-module="' + data.id + '"]').find('.module-name').html(data.name);

          const menu = document.querySelector('[js-menu-update-module]');
          const wrapper = menu.querySelector('.platform-modal__wrapper');
          closeModalAnimation(menu, wrapper, false, false);

          checkBodyHidden();
          $('[js-update-module]').prop("disabled", false);
          hideLoader();
        },
        error: function (data) {
          $('[js-update-module]').prop("disabled", false);
          hideLoader();
        }
      });
    }

    let lessonTarget;

    $(document).on('click', '[add-lesson]', function (e) {
      $('.constructor-blocks.add-lesson').find('.not-common').addClass('constructor-blocks__wrapper_hide');
      $('[js-add-lesson-form]').trigger('reset');
      $('[js-add-lesson-form]').find('.lesson-content__blocks').html('');
      TEMP_DATA = {};
      LESSON_BLOCK_COUNTER = 0;

      lessonTarget = e.target;

      $('[a-lesson-module]').val($(this).closest('[data-module]').data('module'));
      $('[a-lesson-type]').val($(this).data('type'));

      if ($(this).data('type') === 'homework') {
        $('.constructor-blocks.add-lesson').find('.not-common').removeClass('constructor-blocks__wrapper_hide');
      }

      const menu = document.querySelector('[js-menu-add-lesson]');
      openModalAnimation(menu);

      checkBodyHidden();
    });

    $(document).on('click', '[js-menu-add-lesson-close-btn]', function () {
      const menu = document.querySelector('[js-menu-add-lesson]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      closeModalAnimation(menu, wrapper, false, true);

      checkBodyHidden();
    });

    let createLessonBtn;

    $(document).on('click', '[js-add-lesson]', function (event) {
      event.preventDefault();
      createLessonBtn = event.target;
      $('[js-add-lesson-form]').trigger('submit');
    });

    $(document).on('submit', '[js-add-lesson-form]', function (event) {
      event.preventDefault();
      if (validateForm(this)) {
        var formData = new FormData($('[js-add-lesson-form]')[0]);
        $.each(TEMP_DATA, function (index, file) {
          formData.append(file['name'], file['file']);
        });

        saveLesson(formData);
      }
    });

    var lesson;

    function saveLesson(formData) {
      $('[js-add-lesson]').prop("disabled", true);
      $.ajax({
        type: "POST",
        url: "saveLesson",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
          var lessonWrapper = $('[data-module="' + data.idModule + '"]').find('.module__lessons');
          var lessonCount = lessonWrapper.find('.module__lesson').length + 1;

          lessonWrapper.append(createLesson(data, lessonCount));

          updateModuleInfo(data.idModule);

          const menu = document.querySelector('[js-menu-add-lesson]');
          const wrapper = menu.querySelector('.platform-modal__wrapper');
          closeModalAnimation(menu, wrapper, false, true);

          checkBodyHidden();
          $('[js-add-lesson]').prop("disabled", false);
          hideLoader();

          lesson = data;

          const lessonsInBlock = $(lessonTarget).closest('.block').find('.module__lesson-delete[data-lesson-homework="false"]').length;

          $(lessonTarget).closest('.block').find('.lessons-counter').html(lessonsInBlock);

        },
        error: function (data) {
          $('[js-add-lesson]').prop("disabled", false);
          hideLoader();
        },
        beforeSend: function () {
          showLoader();
        },
        afterSend: function () {
          hideLoader();
        }
      });
    }

    function updateModuleInfo(idModule) {
      var formData = new FormData();
      formData.append('id', Number(idModule));

      $.ajax({
        type: "POST",
        url: "getModule",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
          $('[data-module="' + data.id + '"]').find('.lesson-count').data('item-count', data.lessonCount).html(data.lessonCount + ' уроков');
          $('[data-module="' + data.id + '"]').find('.homework-count').data('item-count', data.homeworkCount).html(data.homeworkCount + ' домашнее задание');
          if (data.homeworkCount > 0) {
            $('[data-module="' + data.id + '"]').find('[add-lesson][data-type="homework"]').hide();
          } else {
            $('[data-module="' + data.id + '"]').find('[add-lesson][data-type="homework"]').show();
          }
        },
        error: function (data) {
        }
      });
    }

    $(document).on('change', '.file-loader__file_file', function (element) {
      var $input = $(this),
        $label = $input.siblings('.file-loader__label');

      if (element.target.value) {
        var fileType = element.target.value.split('\\').pop().split('.').pop();
        const file = element.target.files[0];

        if (file.size > filesAccess.maxSizeDoc) {
          $('.gallery__error').remove();
          $($(this).parent().parent().parent().parent().find('.lesson-element__wrapper').get(0)).append($('<span/>').attr('class', 'gallery__error').html(`Файл ${file.name} превышает допустимый размер для документов - (20 Мб)`).css({
            color: 'red',
            marginTop: '15px'
          }))

          return false;
        }

        if ($.inArray(fileType, filesAccess.typesFile) === -1) {
          $('.gallery__error').remove();

          $($(this).parent().parent().parent().parent().find('.lesson-element__wrapper').get(0)).append($('<span/>').attr('class', 'gallery__error').html(`Файл ${file.name} не входит в список разрешенных (.pdf, .doc, .docx, psd, .xls, .xlsx, .ppt, .pptx)`).css({
            color: 'red',
            marginTop: '15px'
          }))

          return false;
        }

        $label.addClass('file-loader__label_attached');

        $('.gallery__error').remove();

        $label.after(
          '<div class="file-loader__file-preview file-loader__file-preview_' + fileType + '">' +
          '   <span class="file-loader__title">' + fileType + '</span>' +
          '</div>' +
          '<span class="file-loader__delete file-preview"></span>');
      }
    });

    $(document).on('click', '.file-loader__delete.file-preview', function (element) {
      deleteFilePreview($(this));
      $(this).remove();
    });

    function deleteFilePreview(block) {
      var $preview = block.siblings('.file-loader__file-preview'),
        $input = $preview.closest('.file-loader').find('.file-loader__file_file'),
        $label = $input.siblings('.file-loader__label');

      $preview.remove();
      $input.val('');
      $label.removeClassWild('file-loader__label_*');
    }

    $(document).on('click', '.file-loader__delete.file-preview_update', function (element) {
      deleteFilePreview($(this));
      $(this).siblings('input').attr('required', 'required');
      $(this).remove();
    });

    $(document).on('change', '.file-loader__file_image', function (element) {
      var $input = $(this),
        $label = $input.siblings('.file-loader__label');

      if (element.target.value) {
        var tmpPath = URL.createObjectURL(element.target.files[0]);
        const file = element.target.files[0];
        const type = file.name.split('.')[file.name.split('.').length - 1];

        if ($.inArray(type, filesAccess.typesImg) === -1) {
          $('.gallery__error').remove();
          $($(this).parent().parent().parent().parent().find('.lesson-element__wrapper').get(0)).append($('<span/>').attr('class', 'gallery__error').html(`Файл ${file.name} не входит в список разрешенных (.jpg, .jpeg, .png)`).css({
            color: 'red',
            marginTop: '15px'
          }))

          return false;
        }

        $label.addClass('file-loader__label_attached');

        $label.after(
          '<a class="file-loader__preview" href="' + tmpPath + '" data-fancybox="' + element.target.value.split('\\').pop() + '">' +
          '    <img src="' + tmpPath + '">' +
          '</a>' +
          '<span class="file-loader__delete preview_update"></span>');
      }
    });

    $(document).on('click', '.file-loader__delete.preview', function (element) {
      deleteImagePreview($(this));
      $(this).remove();
    });

    function deleteImagePreview(block) {
      var $preview = block.siblings('.file-loader__preview'),
        $input = $preview.closest('.file-loader').find('.file-loader__file_image'),
        $label = $input.siblings('.file-loader__label');

      $preview.remove();
      $input.val('');
      $label.removeClassWild('file-loader__label_*');
    }

    $(document).on('click', '.file-loader__delete.preview_update', function (element) {
      deleteImagePreview($(this));
      $(this).siblings('input').attr('required', 'required');
      $(this).remove();
    });

    var TEMP_DATA = {};

    $(document).on('change', '.file-loader__file_gallery', function (element) {
      if (element.target.value) {
        var $loader = $(this).closest('.file-loader'),
          $name = $(this).data('name');

        $.each(element.target.files, (index, file) => {
          var tmpPath = URL.createObjectURL(file);
          if ($.inArray(file.name.split('.')[file.name.split('.').length - 1], filesAccess.typesImg) === -1) {
            $('.gallery__error').remove();
            $($(this).parent().parent().parent().parent().find('.lesson-element__wrapper').get(0)).append($('<span/>').attr('class', 'gallery__error').html(`Файл ${file.name} не изображение`).css({
              color: 'red',
              marginTop: '15px'
            }))

            return false;
          }

          $('.gallery__error').remove();

          $loader.before(
            '<div class="file-loader file-loader_mb20">' +
            '   <a class="file-loader__preview" href="' + tmpPath + '" data-fancybox="' + file.name + '">' +
            '       <img src="' + tmpPath + '">' +
            '   </a>' +
            '<span class="file-loader__delete gallery"></span>' +
            '</div>');

          var tmpFile = {};
          tmpFile['name'] = $name;
          tmpFile['file'] = file;

          TEMP_DATA[tmpPath] = tmpFile;
        });
        $(this).val('');
      }
    });

    $(document).on('click', '.file-loader__delete.gallery', function (element) {
      var $loader = $(this).closest('.file-loader');

      delete TEMP_DATA[$loader.find('img').attr('src')];

      $loader.remove();
    });

    var DELETE_GALLERY = [];
    $(document).on('click', '.file-loader__delete.gallery_update', function (element) {
      var $loader = $(this).closest('.file-loader');

      DELETE_GALLERY.push(Number($loader.data('gallery')));

      $loader.remove();
    });

    function setBannerPreviews(mobile, desktop) {
      const counter = $('.preview-mobile__counter').val();
      if (mobile) {
        if (mobile.value.split('mobile_').length > 1) {
          $('.preview-mobile').css({ height: '130px', width: 'calc(50% - 5px' })
            .append($('<img/>').attr('src', `/${mobile.value}`).attr('class', 'preview-mobile__img'))
            .append($('<span/>').attr('class', 'preview__delete'))

          $('.preview-browser')
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].value`).attr('value', `${mobile.value}`).attr('class', 'preview-browser__value').attr('type', 'hidden'))
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].id`).attr('value', `${mobile.id}`).attr('class', 'preview-browser__id').attr('type', 'hidden'));
        } else if (mobile.value.split('browser_').length > 1) {
          $('.preview-browser').css({ height: '130px', width: 'calc(50% - 5px' })
            .append($('<img/>').attr('src', `/${mobile.value}`).attr('class', 'preview-browser__img'))
            .append($('<span/>').attr('class', 'preview__delete'))

          $('.preview-mobile')
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].value`).attr('value', `${mobile.value}`).attr('class', 'preview-browser__value').attr('type', 'hidden'))
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].id`).attr('value', `${mobile.id}`).attr('class', 'preview-browser__id').attr('type', 'hidden'));
        } else {
          $('.preview-mobile').css({ height: '130px', width: 'calc(50% - 5px' })
            .append($('<img/>').attr('src', `/${mobile.value}`).attr('class', 'preview-mobile__img'))
            .append($('<span/>').attr('class', 'preview__delete'))

          $('.preview-browser')
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].value`).attr('value', `${mobile.value}`).attr('class', 'preview-browser__value').attr('type', 'hidden'))
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].id`).attr('value', `${mobile.id}`).attr('class', 'preview-browser__id').attr('type', 'hidden'));
        }
      }

      if (desktop) {
        if (desktop.value.split('browser_').length > 1) {
          $('.preview-browser').css({ height: '130px', width: 'calc(50% - 5px' })
            .append($('<img/>').attr('src', `/${desktop.value}`).attr('class', 'preview-browser__img'))
            .append($('<span/>').attr('class', 'preview__delete'))

          $('.preview-mobile')
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].value`).attr('value', `${desktop.value}`).attr('class', 'preview-browser__value').attr('type', 'hidden'))
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].id`).attr('value', `${desktop.id}`).attr('class', 'preview-browser__id').attr('type', 'hidden'));
        } else if (desktop.value.split('mobile_').length > 1) {
          $('.preview-mobile').css({ height: '130px', width: 'calc(50% - 5px' })
            .append($('<img/>').attr('src', `/${desktop.value}`).attr('class', 'preview-mobile__img'))
            .append($('<span/>').attr('class', 'preview__delete'))

          $('.preview-browser')
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].value`).attr('value', `${desktop.value}`).attr('class', 'preview-browser__value').attr('type', 'hidden'))
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].id`).attr('value', `${desktop.id}`).attr('class', 'preview-browser__id').attr('type', 'hidden'));
        } else {
          $('.preview-browser').css({ height: '130px', width: 'calc(50% - 5px' })
            .append($('<img/>').attr('src', `/${desktop.value}`).attr('class', 'preview-browser__img'))
            .append($('<span/>').attr('class', 'preview__delete'))

          $('.preview-mobile')
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].value`).attr('value', `${desktop.value}`).attr('class', 'preview-browser__value').attr('type', 'hidden'))
            .append($('<input>').attr('name', `lessonBlocks[${counter}].blockValues[0].id`).attr('value', `${desktop.id}`).attr('class', 'preview-browser__id').attr('type', 'hidden'));
        }
      }
    }

    $(document).on('click', '[update-lesson]', function (event) {
      TEMP_DATA = {};
      LESSON_BLOCK_COUNTER = 0;
      DELETE_GALLERY = [];
      DELETE_LESSON_BLOCKS = [];

      var formData = new FormData();
      formData.set('id', Number($(this).closest('[data-lesson]').data('lesson')));

      $.ajax({
        type: "POST",
        url: "getModuleLessonWithBlocks",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
          $('[u-lesson-id]').val(data.id);
          $('[u-lesson-title]').val(data.title);
          $('[u-lesson-duration]').val(data.duration);
          $('[u-lesson-access]').prop('checked', data.stopLesson);

          setUpdateLessonBlock(data.lessonBlocks);

          const menu = document.querySelector('[js-menu-update-lesson]');
          openModalAnimation(menu);

          checkBodyHidden();
          setTextEditor();
          stopDraggable();

          /* Установить превью баннеров при загрузке страницы */
          $.each(data.lessonBlocks, (index, item) => {
            if (item.type === 'banner') {
              const banners = item.blockValues;

              const mobile = banners[banners.length - 2];
              const browser = banners[banners.length - 1];

              setBannerPreviews(mobile, browser);

              /* Добавляем верхний отступ, если есть хоть один баннер */
              if ($('.preview-mobile').find('.preview-mobile__img').get(0) || $('.preview-browser').find('.preview-browser__img').get(0)) {
                $('.preview').css({ marginTop: '15px' });
              } else {
                $('.preview').css({ marginTop: '0' });
              }
            }
            ;
          });
        },
        error: function (data) {
          $('[update-lesson]').prop("disabled", false);
        }
      });
    });

    /* Функция добавления баннера */
    function addBanner(event) {
      const inputs = [];

      inputs.push($('.mobile'));
      inputs.push($('.browser'));

      let version,
        unVersion;

      /* Определяем версию баннера */
      if ($(this).is('[files-mobile]')) {
        version = 'mobile';
        unVersion = 'browser';
      } else if ($(this).is('[files-desktop]')) {
        version = 'browser';
        unVersion = 'mobile';
      }

      const preview = $('.preview');

      /* Добавляем первью */
      URL.revokeObjectURL(event.target.files[0]);

      const previewPath = URL.createObjectURL(event.target.files[0]);
      const counter = $('.preview-mobile__counter').val();

      if (version === 'mobile') {
        $(preview).find('.preview-mobile').css({ width: 'calc(50% - 5px)', height: '130px' })
          .append($('<img>').attr('src', `${previewPath}`).attr('class', `preview-${version}__img`))
          .append($('<span>').attr('class', 'preview__delete'))

      } else if (version === 'browser') {
        $(preview).find(`.preview-browser`).css({ width: 'calc(50% - 5px)', height: '130px' })
          .append($('<img>').attr('src', `${previewPath}`).attr('class', `preview-${version}__img`))
          .append($('<span>').attr('class', 'preview__delete'))
      }

      /* Пересобираем файл */
      const file = event.target.files[0];
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = function () {
        const dt = new DataTransfer();
        const file = new File([fileReader.result], '');
        dt.items.add(file);
        this.files = dt.files;
      }

      /* Добавляем верхний отступ, если есть хоть один баннер */
      if ($('.preview-mobile').find('img').get(0) || $('.preview-browser').find('img').get(0)) {
        $('.preview').css({ marginTop: '15px' });
      } else {
        $('.preview').css({ marginTop: '0' });
      }
    }

    /* Добавляем обработчик на мобильную версию */
    $(document).on('change', '.mobile', addBanner);

    /* Добавляем обработчик на десктопную версию */
    $(document).on('change', '.browser', addBanner);

    /* Удаляем баннер */
    $(document).on('click', '.preview__delete', function (event) {
      const id = $(this).parent().data('id');

      const inputs = [];

      inputs.push($('.mobile').get(0));
      inputs.push($('.browser').get(0));

      $.each(inputs, (index, item) => {
        const input = item;
        const preview = $(this).parent();
        const arr = $(preview).attr('class').split('-');
        const version = arr[arr.length - 1];

        const isInputVersion = $(item).is(`.${version}`);
        const isPreviewVersion = $(preview).is(`.preview-${version}`);

        if (isInputVersion && isPreviewVersion) {
          // item.files.length = 0;
          $(item).val('');
        }
      });

      $(this).parent().css({ height: '0', width: '0' });
      $(this).parent().children().remove();

      /* Добавляем верхний отступ, если есть хоть один баннер */
      if ($('.preview-mobile').find('img').get(0) || $('.preview-browser').find('img').get(0)) {
        $('.pre-view').css({ marginTop: '15px' });
      } else {
        $('.preview').css({ marginTop: '0' });
      }
    })

    /* Сохраняем изменения урока */
    $(document).on('click', '[js-update-lesson]', function (event) {
      event.preventDefault();
      $('.gallery__error').remove();

      if ($('.mobile').get(0) && $('.browser').get(0)) {
        $('.mobile').prop('required', false);
        $('.browser').prop('required', false);

        if (!$('.preview-mobile').find('img').get(0)) {
          $('.mobile').val();
          $('.mobile').get(0).files.length = 0;
          $('.mobile').prop('required', true);
        }

        if (!$('.preview-browser').find('img').get(0)) {
          $('.browser').val();
          $('.browser').get(0).files.length = 0;
          $('.browser').prop('required', true)
        }

        if ($('.preview').get(0)) {
          if ($('.preview').children().length === 0) {
            $('.mobile').prop('required', true);
            return false;
          }
        }
      }

      $('[js-update-lesson-form]').trigger('submit');
    });

    /* Шаблоны, редактирования блоков */
    function setUpdateLessonBlock(blocks) {
      var blocksHtml = '';
      $.each(blocks, function (index, block) {
        if (block.type === 'video') {
          blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="video" type="hidden" required>' +
            '                                        <div class="lesson-block__wrapper">' +
            '                                            <div class="lesson-block__title">Видео</div>' +
            '                                            <div class="lesson-elements">' +
            '                                                <div class="lesson-elements__wrapper">' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__title">Cсылка на видео *</div>' +
            '                                                        <div class="lesson-element__wrapper">' +
            '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" value="' + block.value + '" type="text" required placeholder="Введите ссылку" class="lesson-element__input">' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="lesson-block__delete update"></div>' +
            '                                    </div>';
        } else if (block.type === 'text') {
          blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="text" type="hidden" required>' +
            '                                        <div class="lesson-block__wrapper">' +
            '                                            <div class="lesson-block__title">Текстовый блок</div>' +
            '                                            <div class="lesson-elements">' +
            '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__title">Заголовок *</div>' +
            '                                                        <div class="lesson-element__wrapper">' +
            '                                                            <input value="' + block.title + '" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите заголовок" class="lesson-element__input">' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__title">Текст *</div>' +
            '                                                        <div class="lesson-element__wrapper">' +
            ' <textarea data-quilljs style="display: none;" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" required placeholder="Введите текст" class="text-editor lesson-element__input lesson-element__input_textarea">' + block.value + '</textarea>' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="lesson-block__delete update"></div>' +
            '                                    </div>';
        } else if (block.type === 'document') {
          var fileType = block.value.split('\\').pop().split('.').pop();
          blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="document" type="hidden" required>' +
            '                                        <div class="lesson-block__wrapper">' +
            '                                            <div class="lesson-block__title">Документ</div>' +
            '                                            <div class="lesson-elements">' +
            '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__title">Название *</div>' +
            '                                                        <div class="lesson-element__wrapper">' +
            '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" value="' + block.title + '" type="text" required placeholder="Введите название" class="lesson-element__input">' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
            '                                                               <div class="file-loader">' +
            '                                                                   <input type="file" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.psd" class="file-loader__file file-loader__file_file">' +
            '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label file-loader__label_attached"></label>' +
            '                                                                       <div class="file-loader__file-preview file-loader__file-preview_' + fileType + '">' +
            '                                                                           <span class="file-loader__title">' + fileType + '</span>' +
            '                                                                       </div>' +
            '                                                                   <span class="file-loader__delete file-preview_update"></span>' +
            '                                                               </div>' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="lesson-block__delete update"></div>' +
            '                                    </div>';
        } else if (block.type === 'image') {
          blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="image" type="hidden" required>' +
            '                                        <div class="lesson-block__wrapper">' +
            '                                            <div class="lesson-block__title">Изображение</div>' +
            '                                            <div class="lesson-elements">' +
            '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__title">Название *</div>' +
            '                                                        <div class="lesson-element__wrapper">' +
            '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" value="' + block.title + '" type="text" required placeholder="Введите название" class="lesson-element__input">' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
            '                                                               <div class="file-loader">' +
            '                                                                   <input type="file" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".png,.jpg,.jpeg" class="file-loader__file file-loader__file_image">' +
            '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label file-loader__label_attached"><span class="file-loader__title"></span></label>' +
            '                                                                   <a class="file-loader__preview" href="/' + block.value + '" data-fancybox="' + block.value + '">' +
            '                                                                       <img src="/' + block.value + '">' +
            '                                                                   </a>' +
            '                                                                   <span class="file-loader__delete preview_update"></span>' +
            '                                                               </div>' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="lesson-block__delete update"></div>' +
            '                                    </div>';
        } else if (block.type === 'gallery') {
          var blockValues = '';
          $.each(block.blockValues, function (index, blockValue) {
            blockValues += '<div data-gallery="' + blockValue.id + '" class="file-loader file-loader_mb20">' +
              '   <a class="file-loader__preview" href="/' + blockValue.value + '" data-fancybox="' + blockValue.value + '">' +
              '       <img src="/' + blockValue.value + '">' +
              '   </a>' +
              '<span class="file-loader__delete gallery_update"></span>' +
              '</div>';
          });

          blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="gallery" type="hidden" required>' +
            '                                        <div class="lesson-block__wrapper lesson-block__wrapper_pb0">' +
            '                                            <div class="lesson-block__title">Галлерея</div>' +
            '                                            <div class="lesson-elements">' +
            '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__title">Название *</div>' +
            '                                                        <div class="lesson-element__wrapper">' +
            '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" value="' + block.title + '" type="text" required placeholder="Введите название" class="lesson-element__input">' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
            blockValues +
            '                                                               <div class="file-loader file-loader_mb20">' +
            '                                                                   <input type="file" data-name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".png,.jpg,.jpeg" class="file-loader__file file-loader__file_gallery" multiple>' +
            '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label"><span class="file-loader__title"></span></label>' +
            '                                                               </div>' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="lesson-block__delete update"></div>' +
            '                                    </div>';
        } else if (block.type === 'question') {
          var arr = block.blockValues;

          blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
            '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="question" type="hidden" required>' +
            '                                        <div class="lesson-block__wrapper">' +
            '                                            <div class="lesson-block__title">Открытый вопрос</div>' +
            '                                            <div class="lesson-elements">' +
            '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__wrapper">' +
            '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].blockValues[0].value" type="checkbox" id="images' + LESSON_BLOCK_COUNTER + '" class="checkbox" ' + ((arr.filter(x => x.value === 'images')[0]) ? 'checked' : '') + ' value="images">' +
            '                                                            <label class="checkbox-label checkbox-label_gray" for="images' + LESSON_BLOCK_COUNTER + '" >Разрешить загружать изображения</label>' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                    <div class="lesson-element">' +
            '                                                        <div class="lesson-element__wrapper">' +
            '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].blockValues[1].value" type="checkbox" id="files' + LESSON_BLOCK_COUNTER + '" class="checkbox" ' + ((arr.filter(x => x.value === 'files')[0]) ? 'checked' : '') + ' value="files">' +
            '                                                            <label class="checkbox-label checkbox-label_gray" for="files' + LESSON_BLOCK_COUNTER + '" >Разрешить загружать файлы</label>' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="lesson-block__delete update"></div>' +
            '                                    </div>';
        } else if (block.type === 'banner') {
          blocksHtml +=
            '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper banners">' +
            '<input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
            '<input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
            '<input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="' + block.type + '" type="hidden" required>' +
            '<div class="banners__files">' +
            '<div class="banners__inner">' +
            '<div class="banners__title">Баннер</div>' +
            '<div class="banners__wrapper">' +
            '<div class="banners__inputs">' +
            '<div class="banners__mobile">' +
            '<input files-mobile accept=".png,.jpg,.jpeg" type="file" class="mobile banners__input--file" data-name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" required id="files-mobile' + LESSON_BLOCK_COUNTER + '">' +
            '<label class="banners__btn" for="files-mobile' + LESSON_BLOCK_COUNTER + '">Загрузить мобайл (640 x 440px)</label>' +
            '</div>' +
            '<div class="banners__desktop">' +
            '<input  files-desktop accept=".png,.jpg,.jpeg" type="file" class="browser banners__input--file" data-name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" required id="files-desktop' + LESSON_BLOCK_COUNTER + '">' +
            '<label class="banners__btn" for="files-desktop' + LESSON_BLOCK_COUNTER + '">Загрузить десктоп (1180 x 350px)</label>' +
            '</div>' +
            '</div>' +
            '<div class="banners__value">' +
            '<input value="' + block.value + '" class="banners__input--value" required id="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" placeholder="Введите ссылку">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="banners__preview preview">' +
            '<div class="preview__item preview-mobile">' +
            ' <input type="hidden" value="' + LESSON_BLOCK_COUNTER + '" class="preview-mobile__counter"> ' +
            '</div>' +
            '<div class="preview__item preview-browser">' +
            ' <input type="hidden" value="' + LESSON_BLOCK_COUNTER + '" class="preview-mobile__counter"> ' +
            '</div>' +
            '</div>' +
            '<div class="lesson-block__delete update"></div>' +
            '</div>';
        }
        LESSON_BLOCK_COUNTER++;
      });

      $('[u-lesson-blocks]').html(blocksHtml);
    }

    $(document).on('click', '[js-menu-update-lesson-close-btn]', function (event) {
      const menu = document.querySelector('[js-menu-update-lesson]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      closeModalAnimation(menu, wrapper, false, true);
      checkBodyHidden();
    });

    $(document).on('submit', '[js-update-lesson-form]', function (event) {
      event.preventDefault();

      if (validateForm(this)) {
        var formData = new FormData($('[js-update-lesson-form]').get(0));

        $.each(TEMP_DATA, function (index, file) {
          formData.append(file['name'], file['file']);
        });

        formData.append('deleteGalleryElements', DELETE_GALLERY);
        formData.append('deleteLessonBlocks', DELETE_LESSON_BLOCKS);

        updateLesson(formData);
      }
    });

    function updateLesson(formData) {
      $('[js-update-lesson]').prop("disabled", true);
      $.ajax({
        type: "POST",
        url: "updateLesson",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
          var index = $('[data-lesson="' + data.id + '"]').find('.module-desc__number').html();
          $('[data-lesson="' + data.id + '"]').replaceWith(createLesson(data, index));

          checkBodyHidden();
          $('[js-update-lesson]').prop("disabled", false);
          hideLoader();

          const menu = document.querySelector('[js-menu-update-lesson]');
          const wrapper = menu.querySelector('.platform-modal__wrapper');
          closeModalAnimation(menu, wrapper, false, true);
        },
        error: function (data) {
          $('[js-update-lesson]').prop("disabled", false);
          hideLoader();
        },
        beforeSend: function () {
          showLoader();
        },
        afterSend: function () {
          hideLoader();
        }
      });
    }

    function setTextEditor() {
      const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'bullet' }],
        [{ 'align': ['', 'center', 'right'] }],
        ['video'],
        ['image'],
        ['link'],
        ['clean']
      ];

      $.each($('.lesson-block'), (index, item) => {
        if (Boolean($(item).find('.text-editor')[0]) === true && Boolean($(item).find('.ql-editor')[0]) === false) {
          quilljs_textarea('.text-editor', {
            modules: { toolbar: toolbarOptions },
            theme: 'snow',
          })
        }
      });
    }

    $.each($('.constructor-block'), (index, item) => {
      $(item).on('mousedown', () => {
        if ($(".sortableList").sortable('option', "disabled")) {
          $(".sortableList").sortable("enable");
        }
      })
    });

    $(document).on('mouseup', '.constructor-block', function () {
      stopDraggable();
      setTimeout(() => {
        $.each($('.lesson-block'), function (index, item) {
          if (Boolean($(item).find('.ql-editor')[0]) === true) {
            $(item).find('.ql-editor').remove();
            $(item).find('.ql-toolbar').remove();
            $(item).find('.ql-container').remove();
          }
        })
        setTextEditor();
      }, 600);
    });

    function stopDraggable() {
      $(".sortableList").sortable("disable");
    }

    function quilljs_textarea(elem = null, options = null) {
      let editorElems;
      if (elem) {
        editorElems = Array.prototype.slice.call(document.querySelectorAll(elem));
      } else {
        editorElems = Array.prototype.slice.call(document.querySelectorAll('[data-quilljs]'));
      }


      editorElems.forEach(function (el, index) {
        let elemType = el.type;
        let editorDiv;
        let elemValue;

        if (elemType == 'textarea') {
          elemValue = el.value;
          editorDiv = document.createElement('div');
          editorDiv.innerHTML = elemValue;
          el.parentNode.insertBefore(editorDiv, el.nextSibling);
          el.style.display = "none";
          var placeholder = el.placeholder;
        } else {
          var placeholder = null;
          editorDiv = el;
        }
        if (!options) {
          var default_options = {
            theme: 'snow',
            placeholder: placeholder,
          };
        } else {
          if (!options.placeholder) {
            options.placeholder = placeholder;
          }
          var default_options = options;
        }

        var editor = new Quill(editorDiv, default_options);
        editor.on('text-change', function (delta, oldDelta, source) {
          var editor_value = editor.root.innerHTML;
          el.value = editor_value;
        });
      });
    }

    quilljs_textarea();

    $(document).on('click', '[js-menu-add-block-close-btn]', function () {
      const menu = document.querySelector('[js-menu-add-block]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      closeModalAnimation(menu, wrapper, false, false);

      setTimeout(() => {
        clearBlockMenu();
      }, 800)
    })

    function clearBlockMenu() {
      $('[js-add-block-form]').trigger('reset');
      $('[js-add-block-form]').find('[img-title]').html('Загрузите изображение (410 х 280px)');
      $('label.error').remove();
    }

    /* Блоки */
    function setNewModule(module, settings) {
      var moduleCount = $(target).closest('.modules__wrapper').find('[modules-list]').find('.module').length;

      $(target).closest('.block').find('.modules-counter').html(moduleCount + 1);
      $(target).closest('.modules__wrapper').find('[modules-list]').append(createModule(module, moduleCount, settings));

      setTimeout(() => {
        $(target).closest('.modules__wrapper').find(`.module[data-module="${module.id}"]`)
          .find('.module__switch').attr('class', 'module__switch module__switch--in-block');
        $(target).closest('.modules__wrapper').find(`.module[data-module="${module.id}"]`)
          .find('.module-setting').attr('class', 'module-setting module-setting--in-block');
        $(target).closest('.modules__wrapper').find(`.module[data-module="${module.id}"]`)
          .find('.module__switch--sep').css({ display: 'block' });
      }, 50);

      if (settings === 'out-block') {
        $('[js-menu-update]').find('[modules-list]').find('.module__switch--sep').css({ display: 'none' });
      }
    }

    let idCourse;

    $(document).on('click', '[js-update-course]', function (e) {
      idCourse = $(e.target).closest('[js-update-course]').data('course');

      console.log();
    })

    async function getBlocks() {
      const formData = new FormData();
      formData.set('id', idCourse);

      const response = $.ajax({
        type: "POST",
        url: "/products/courses/getBlocks",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
        },
        error: function (data) {
        }
      });

      const result = await response;

      return result;
    }

    $(document).on('click', '[add-blocks]', function () {
      const menu = document.querySelector('[js-menu-add-block]')
      openModalAnimation(menu);
    });

    $(document).on('click', '[js-add-block]', function (e) {

      const t = e.target;

      $(t).closest('[js-add-block-form]').find('[m-course-id]').val(idCourse);
      const data = new FormData($('[js-add-block-form]').get(0));

      if (validateForm($('[js-add-block-form]').get(0))) {
        showLoader()
        $.ajax({
          type: "POST",
          url: "/products/courses/saveBlock",
          data: data,
          processData: false,
          contentType: false,
          cache: false,
          success: function () {
            const menu = document.querySelector('[js-menu-add-block]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, false);
            $('.blocks').remove();
            $('.modules').remove();

            clearBlockMenu();

            getBlocks().then((blocks) => {
              getModules().then((modules) => {
                renderBlocksWithModules(blocks, modules);
                hideLoader();
              });
            });
          },
          error: function () {
            hideLoader();
          },
        });
      } else {
        setTimeout(() => {
          $('label.error').remove();
        }, 2000)
      }
    });

    async function getModules() {

      var formData = new FormData();
      formData.set('id', idCourse);

      const response = $.ajax({
        type: "POST",
        url: "getModules",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function () {
        },
        error: function () {
          $('[lesson-tab]').prop("disabled", false);
        }
      });

      return await response;
    }

    // const newBlock = (data) => {
    // 	return `
    // 		<div data-block="${data.id}" class="block">
    // 			<div class="block__wrapper">
    // 				<div class="block__header collapsed" data-toggle="collapse" data-target="#module${data.id}" aria-expanded="false" aria-controls="module${data.id}">
    // 					<div js-delete-block="" class="block__header-delete" data-block-id="${data.id}">
    // 					</div>
    // 					<div class="block-desc">
    // 						<div class="block-desc__number block-desc__number"></div>
    // 						<div class="block-desc__wrapper">
    // 							<div class="block-name block-desc__title">${data.name}</div>
    // 							<div class="block-desc__desc">
    // 								<div class="lesson-count block-desc__text block-desc__text_video" data-item-count="0">0 уроков</div>
    // 								<div class="block-desc__delim"><span></span></div>
    // 								<div class="homework-count block-desc__text block-desc__text_work" data-item-count="0">0 домашнее задание</div>
    // 							</div>
    // 						</div>
    // 					</div>
    // 					<div class="block__switch"></div>
    // 				</div>
    // 				<div class="block__body collapse" id="module${data.id}">
    // 					<div class="modules">
    // 					<div class="modules__wrapper">
    // 						<div modules-list class="modules__content"></div>
    // 						<div class="modules__content">
    // 							<div class="modules__btn-wrapper">
    // 								<div add-module current-course data-inblock="${}" class="module-btn module-btn_low">Добавить модуль</div>
    // 							</div>
    // 						</div>
    // 					</div>
    // 				</div>
    // 			</div>
    // 		</div>
    // 		<div update-block="" class="block-setting"></div>
    // 		</div>
    // 	`;
    // };


    function bindingModulesToBlock(data) {

      const updatingBox = {
        keyField: null,
        valueField: null,
      }

      const currentBlock = $(target).closest('.block').data('block');

      let blocks = getBlocks();

      blocks.then((result) => {
        let block;

        $.each(result, (index, item) => {
          if (currentBlock === item.id) {
            block = item;
          }
        });

        if (block) {
          block.moduleIds.push(data.id);
        }

        updatingBox.keyField = block;

        $.ajax({
          type: "POST",
          url: "/products/courses/updateBlock",
          data: JSON.stringify(updatingBox),
          processData: false,
          contentType: "application/json",
          dataType: 'json',
          cache: false,
          success: function () {
          },
          error: function () {
            $('[lesson-tab]').prop("disabled", false);
          }
        });
      })
    }

    async function updateBlock(updatingBox) {
      const response = $.ajax({
        type: "POST",
        url: "/products/courses/updateBlock",
        data: JSON.stringify(updatingBox),
        processData: false,
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function () {
        },
        error: function () {
          $('[lesson-tab]').prop("disabled", false);
        }
      });

      return await response;
    }

    function renderModules(modules, template, settings = null) {
      const moduleList = $(template).find('[modules-list]');

      const module = $.map(modules, (module, index) => {
        return `
		<div data-module="${module.id}" class="module" data-inblock="${settings === 'in-block' ? true : false}">
			<div class="module__wrapper">
				<div class="module__header collapsed" data-toggle="collapse" data-target="#module${module.id}" aria-expanded="false" aria-controls="module${module.id}">
					<div js-delete-module class="module__header-delete" data-module-id="${module.id}">
					</div>
					<div class="module-desc">
						<div module-index class="module-desc__number">${index + 1}</div>
						<div class="module-desc__wrapper">
							<div class="module-name module-desc__title">${module.name}</div>
							<div class="module-desc__desc">
								<div class="lesson-count module-desc__text module-desc__text_video" data-item-count="${module.lessonCount}">${module.lessonCount} уроков</div>
								<div class="module-desc__delim"><span></span></div>
								<div class="homework-count module-desc__text module-desc__text_work" data-item-count="${module.homeworkCount}">${module.homeworkCount} домашнее задание</div>
							</div>
						</div>
					</div>
					<div class="module__switch ${settings === 'in-block' ? 'module__switch--in-block' : ''}">
						${settings === 'in-block' ? '<div class="module__switch--sep"></div>' : ''}
					</div>
				</div>
					<div class="module__body collapse" id="module${module.id}">
						<div class="module__lessons"></div>
						<div class="modules__btn-wrapper ${settings === 'in-block' ? 'module-buttons--in-block' : ''}">
							<div add-lesson data-type="lesson" class="module-btn module-btn_low">Добавить урок</div>
							${(module.homeworkCount == 0) ?
            `
									<div add-lesson data-type="homework" class="module-btn module-btn_low">Добавить домашнее задание</div>
								`
            : ''}
						</div>
					</div>
					<div update-module class="module-setting ${settings === 'in-block' ? 'module-setting--in-block' : ''}"></div>
				</div>
			</div>
		</div>
		`;
      });

      moduleList.append(module);

      $.each(modules, (index, item) => {
        $.each($(template).find('.module'), (count, elem) => {
          if ($(elem).data('module') === item.id) {
            const lessonList = $(elem).find('.module__lessons');

            const lessons = item.lessonList;

            $.each(lessons, (iter, subj) => {
              lessonList.append(createLesson(subj, iter + 1));
            });
          }
        });
      });
    }

    function updateBlockAfterUpdate(data) {
      $('[data-block="' + data.id + '"]').find('.block-name').html(data.name);

      $.each($('.module-setting--in-block'), (index, item) => {
        $(item).on('click', openUpdateModuleMenu);
      });
    }

  }
}

export default LessonConstructor;
