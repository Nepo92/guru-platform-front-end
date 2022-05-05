// $(document).on('click', '[motivation-add]', setNewWage);

// let wageBlock = [];
// let emptyPack;
// let oldBlock;

// let counterId = 0;

// function setNewWage() {
//     const menu = document.querySelector('[js-menu-motivation-add]');
//     openModalAnimation(menu);

//     $('[js-motivation-name]').val('');

//     $.each($('.motivation-department__select').children(), (index, item) => {
//         if ($(item).attr('value') === $('.motivation-add__department').attr('value')) {
//             $(item).prop('selected', true);
//         }
//     });

//     $('[js-motivation-year-menu]').children().remove();

//     $('[js-motivation-year-menu]').append($('<option>').attr('value', '0').html('Выберите год'));

//     if ($('[js-motivation-year-menu]').children().length === 1) {
//         $.each(monthsMain, (index, item) => {
//             $('[js-motivation-year-menu]').append($('<option>').attr('value', item).html(item));
//         });
//     }

//     $('.motivation-department__select').prop('disabled', true);
//     $('.motivation-position__select').prop('disabled', true);
//     $('[js-motivation-year-menu]').prop('disabled', true);

//     const selected = $('.motivation-add__year option:selected').attr('value');

//     $.each($('[js-motivation-year-menu]').children(), (index, item) => {
//         if ($(item).attr('value') === selected) {
//             $(item).prop('selected', true);
//         };
//     });

//     $(menu).find('[js-motivation-employment]').val($('select[name="forSelfEmployed"]').val() === 'false' ? 'В штате' : 'Самозанятый');
    
//     $('[js-motivation-save]').addClass('motivation__new');
//     $('[js-motivation-save]').removeClass('motivation__redacted');
//     $('[js-motivation-save]').removeClass('motivation__new--menu');

//     getPositions('load');

//     const dataWage = {
//         idCompany: +$('[id-company]').val(),
//         idDepartment: +$('.motivation-add__department option:selected').attr('value'),
//         idPosition: +$('.motivation-add__position option:selected').attr('value'),
//         year: +$('.motivation-add__year option:selected').attr('value'),
//     }

//     $.ajax({
//         type: "POST",
//         contentType: "application/json",
//         url: "getEmptyWageRate",
//         data: JSON.stringify(dataWage),
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             settingsNewWage(data);
//             checkMonth();

//             $('[id-company]').val(data.idCompany);

//             monthsUseAdd.length = 0;

//             emptyPack = null;

//             if (emptyPack === null) {
//                 emptyPack = data;
//                 oldBlock = data.blocks;
//             }
//         },
//         error: function (data) {
//         },
//     });
// }

// $(document).on('click', '[close-motivation-add-menu]', function () {
//     $('body').css({ overflow: 'auto' });
//     const menu = document.querySelector('[js-menu-motivation-add]');
//     const wrapper = menu.querySelector('.platform-modal__wrapper');

//     closeModalAnimation(menu, wrapper, false, true);
// });

// function openModalAnimation(modal) {
//     $(modal).get(0).classList.add('open');
//     $(modal).get(0).classList.add('black');

//     setTimeout(() => {
//         $(modal).get(0).style.opacity = '1';
//     }, 100);

//     const filter = $(modal).get(0).querySelector('.filter__wrapper');

//     if (filter) {
//         setTimeout(() => {
//             filter.style.top = '0'
//         }, 100);
//     } else {
//         setTimeout(() => {
//             const modalWindow = $(modal).get(0).querySelector('.platform-modal__wrapper');
//             modalWindow.style.right = '0';
//         }, 0);
//     }
// }

// function closeModalAnimation(modal, wrapper, isFilter, isClientCard) {
//     if (isFilter) {
//         wrapper.style.top = '-150%';
//     } else {
//         wrapper.style.right = '-100%';
//     }

//     if (isClientCard) {
//         setTimeout(() => {
//             modal.style.opacity = '0';
//         }, 400);

//         setTimeout(() => {
//             modal.classList.remove('open');
//         }, 600);

//         setTimeout(() => {
//             modal.classList.remove('black');
//         }, 600);
//     } else {
//         setTimeout(() => {
//             modal.style.opacity = '0';
//         }, 200);

//         setTimeout(() => {
//             modal.classList.remove('open');
//         }, 400);

//         setTimeout(() => {
//             modal.classList.remove('black');
//         }, 400);
//     }
// }

// function settingsNewWage(data) {

//     const dep = $('.motivation-department__select option:selected').html();
//     const pos = $('.motivation-position__select option:selected').html();

//     const blocks = $.map(data.blocks, (elem, count) => {
//         return `
//           <div modify class="motivation-add__block motivation__block motivation-${elem.className}-${elem.typeCode}">
//             <div class="motivation__image motivation-${elem.className}-${elem.typeCode}__image"></div>
//             <div class="motivation__info">
//               <span class="motivation__title">${elem.typeName}</span>
//               <div class="motivation__control">
//                 <input type="checkbox" class="motivation-add__checkbox motivation__checkbox" value="${elem.className}" id="${elem.className + '_' + elem.typeCode} + '_add'" ${(elem.active) ? 'checked' : ''}>
//                 <label for="${elem.className + '_' + elem.typeCode} + '_add'" class="motivation-add__toggle motivation__toggle"></label>
//                 <input type="hidden" class="motivation__type" value="${elem.typeCode}">
//               </div>
//             </div>
//           </div>
//         `
//     });

//     $('[js-motivation-add-blocks]').children().remove();

//     $('[js-motivation-add-blocks]').append(blocks);
// }

// $(document).on('change', '.motivation-department__select', getPositions.bind(null, 'change'));

// function getPositions(str) {

//     const selectPos = $('.motivation-department__select option:selected').attr('value');

//     if ($('.motivation-position__select').children().length > 1) {
//         $('.motivation-position__select').children().remove();
//         $('.motivation-position__select').append($('<option/>').attr('value', '0').html('Выберите отдел'));
//     }

//     if (str === 'change') {
//         $('[js-motivation-add-blocks]').children().remove();
//     }

//     if (str === 'load') {
//         $.each($('.motivation-department__select').children(), (index, item) => {
//             if ($(item).attr('value') === $('.motivation-add__department option:selected').attr('value')) {
//                 $(item).prop('selected', true)
//             }
//         });
//     }

//     const selected = $('.motivation-department__select option:selected').data('department');

//     /* Должности взависимости от департамента */
//     $.each(department, (index, item) => {
//         const dep = item.department;

//         if (dep === selected) {
//             const post = Object.entries(position);

//             for (let pos of post) {
//                 if (pos[0] === selected) {
//                     const selectPos = $('.motivation-position__select');
//                     $(selectPos).children().remove();
//                     let options;

//                     $(selectPos).append($('<option>').attr('value', '0').attr('class', 'motivation-add__pos motivation-add__pos-empty').html('Выберите должность'))

//                     $.each(pos[1], function (index, item) {
//                         options += '<option class="motivation-add__pos" value="' + item.id + '">' + item.title + '</option>';
//                     });

//                     $(selectPos).append(options);
//                 }
//             }
//         }
//     });

//     if (str === 'load') {
//         $.each($('.motivation-position__select').children(), (index, item) => {
//             if ($(item).attr('value') === $('.motivation-add__position option:selected').attr('value')) {
//                 $(item).prop('selected', true)
//             }
//         });
//     }
//     ;
// };

// function checkMonth() {
//     $.each($('.motivation-months__checkbox'), (count, elem) => {
//         $(elem).prop('checked', false);
//         $(elem).prop('disabled', false);
//     });

//     const getWagesData = getWages();

//     getWagesData.then((data) => {
//         if (data.length !== 0) {
//             setMonth(data);
//         }
//     });
// }

// function setMonth(data) {
//     monthsUseAdd.length = 0;

//     const forSelfEmployed = $('.motivation-add__employed').val() === '' ? null :
//         $('.motivation-add__employed').val() === 'false' ? false : true;

//     $.each(data, (index, item) => {
//         if (item.forSelfEmployed === forSelfEmployed) {
//             $.each(item.months, (count, elem) => {
//                 monthsUseAdd.push(elem);
//             });
//         }
//     });

//     $.each(monthsUseAdd, (index, item) => {
//         $.each($('.motivation-months__checkbox'), (count, elem) => {
//             if (item == $(elem).attr('value')) {
//                 $(elem).prop('disabled', true);
//             }
//         });
//     });
// };

// /* Запрос на получение зарплаты из меню */
// $(document).on('change', '[js-motivation-year-menu]', function () {
//     $('[js-motivation-now__block]').children().remove();

//     monthsUse.length = 0;
//     monthsUseAdd.length = 0;

//     const selectPos = $('[js-motivation-year-menu] option:selected').attr('value');

//     if (selectPos !== '0') {

//         const dataWage = {
//             idCompany: +$('[id-company]').val(),
//             idDepartment: +$('.motivation-department__select option:selected').attr('value'),
//             idPosition: +$('.motivation-position__select option:selected').attr('value'),
//             year: +$('[js-motivation-year-menu] option:selected').attr('value'),
//         };

//         $.ajax({
//             type: "POST",
//             contentType: "application/json",
//             url: "getWageRates",
//             data: JSON.stringify(dataWage),
//             dataType: 'json',
//             cache: false,
//             success: function (data) {
//                 if (data.length !== 0) {
//                     checkMonth(data);
//                 } else {
//                     $.each($('.motivation-months__checkbox'), (count, elem) => {
//                         $(elem).prop('checked', false);
//                         $(elem).prop('disabled', false);
//                     });

//                     $.each(monthsUseAdd, (index, item) => {
//                         $.each($('.motivation-months__checkbox'), (count, elem) => {
//                             if ($(elem).attr('value') == item) {
//                                 $(elem).prop('checked', true);
//                                 $(elem).prop('disabled', true);
//                             }
//                         });
//                     });
//                 }
//             },
//             error: function (data) {
//             }
//         });
//     } else {
//     }
// });

// $(document).on('click', '.motivation-add__block', settingsBlocks.bind(null, emptyPack));

// function settingsBlocks(data, e) {
//     if (emptyPack) {
//         oldBlock = emptyPack.blocks;
//     }

//     $('[js-motivation-save]').addClass('motivation__new');
//     $('[js-motivation-save]').removeClass('motivation__redacted');

//     const menu = document.querySelector('[js-menu-motivation-modify-template]');
//     openModalAnimation(menu);

//     blockEdit(emptyPack, e);
// }

// $(document).on('click', '[js-motivation-delete]', function () {
//     $('body').css({ overflow: 'auto' });
//     const menu = document.querySelector('[js-menu-motivation-add]');
//     const wrapper = menu.querySelector('.platform-modal__wrapper');
//     closeModalAnimation(menu, wrapper, false, true);
// });

// let modifyWageBlockAdd;

// let typeAdd;
// let wageBlockNameAdd;

// function blockEdit(data, e) {

//     $('[menu-modify-template__form]').children().remove();

//     $('[modify-title]').html($(e.target).closest('.motivation__block').find('.motivation__title').html());

//     const block = $(e.target).closest('.motivation__block');
//     const blockName = $(block).find('.motivation__checkbox').attr('value');
//     const typeCode = $(block).find('.motivation__type').val();
//     wageBlockNameAdd = blockName;

//     typeAdd = typeCode;

//     const targetClass = $(e.target).attr('class');

//     if (targetClass === 'motivation-add__checkbox motivation__checkbox' || targetClass === 'motivation-add__toggle motivation__toggle') {
//         e.stopPropagation();

//         $.each($('.motivation-add__checkbox'), (index, item) => {
//             $.each(emptyPack.blocks, (count, elem) => {
//                 if ($(item).val() === elem.className) {
//                     $(item).on('change', () => {
//                         if ($(item).is(':checked')) {
//                             elem.active = true;
//                         } else {
//                             elem.active = false;
//                         }
//                         ;
//                     });
//                 }
//                 ;
//             });
//         });
//     } else {
//         $('[cancel-block]').addClass('add-cancel');
//         $('[cancel-block]').removeClass('modify-cancel');

//         if ($.isArray(data)) {
//             $.each(data, (index, item) => {
//                 if (item.className === blockName && item.typeCode == typeCode) {
//                     settingsWageBLockAdd(item);
//                     modifyWageBlockAdd = item;
//                 }
//                 ;
//             });
//         } else {
//             $.each(data.blocks, (index, item) => {
//                 if (item.className === blockName && item.typeCode == typeCode) {
//                     settingsWageBLockAdd(item);
//                     modifyWageBlockAdd = item;
//                 }
//                 ;
//             });
//         }
//         ;
//         $('[save-block]').removeClass('save__template--modify');
//         $('[save-block]').addClass('save__template--add');
//     }
// }

// $(document).on('click', '[cancel-block]', function () {
//     const menu = document.querySelector('[js-menu-motivation-modify-template]');
//     const wrapper = menu.querySelector('.platform-modal__wrapper');
//     closeModalAnimation(menu, wrapper, false, false);
// });

// $(document).on('click', '[save-block]', function () {
//     const menu = document.querySelector('[js-menu-motivation-modify-template]');
//     const wrapper = menu.querySelector('.platform-modal__wrapper');
//     closeModalAnimation(menu, wrapper, false, false);
// })

// function setInputTypeNumber(inputs) {
//     const inputItems = $(`${inputs}`);

//     $.each(inputItems, (index, item) => {
//         $(item).on('keyup', function () {
//             const valueArr = $(this).val().split('');
//             const value = valueArr[valueArr.length - 1];

//             const regExp = new RegExp(/^\d*[\.]?\d*$/);

//             if (!regExp.test(value)) {
//                 $(this).val('');
//             } else if ($(this).val().split('.').length > 2) {
//                 $(this).val('');
//             }
//         });
//     });
// }

// function settingsWageBLockAdd(item) {
//     const form = $('[menu-modify-template__form]');

//     $('[menu-modify-template__form]').children().remove();

//     const name = item.className;

//     if (name === 'FixedWageRate') {

//         const redactor = () => {
//             if (item.typeCode === 0) {
//                 return `
//             <div class="fixed-item">
//               <span class="fixed-item__icon">&#8381;</span>
//               <div class="motivation-modify-template__title motivation-wage__title regular-title">Ставка в час <span class="motivation-modify-template__icon"></span></div>
//               <input autocomplete="off" placeholder="0" class="motivation-modify-template__regular menu-input__input menu-wage__input menu-input__input_small motivation__input input-number" value type="text" name="regularRate">
//             </div>
//             <div class="fixed-item">
//               <span class="fixed-item__icon">&#8381;</span>
//               <div class="motivation-modify-template__title motivation-wage__title">Ставка в час праздничная <span class="motivation-modify-template__icon"></span></div>
//               <input autocomplete="off" placeholder="0" class="motivation-modify-template__holiday menu-input__input menu-wage__input menu-input__input_small motivation__input input-number" value type="text" name="holidayRate">
//             </div>
//             `
//             }
//             ;
//         };

//         const inputs = ['.motivation-modify-template__regular', '.motivation-modify-template__holiday'];

//         $('[menu-modify-template__form]').append(redactor);
//         $('.motivation-modify-template__regular').val(`${(item.regularRate === 0) ? '' : item.regularRate}`);
//         $('.motivation-modify-template__holiday').val(`${(item.holidayRate === 0) ? '' : item.holidayRate}`);
//         setInputTypeNumber(inputs);
//     }

//     if (name === 'OneValueWageRate') {
//         const redactor = () => {
//             if (item.typeCode === 3) {
//                 return `
//               <div class="fixed-item">
//                 <span class="fixed-item__icon">&#8381;</span>
//                 <div class="motivation-modify-template__title motivation-wage__title regular-title">Ставка за одно проверенное ДЗ</div>
//                 <input autocomplete="off" placeholder="0" class="motivation-modify-template__coef menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="value">
//               </div>
//             `
//             }

//             if (item.typeCode === 4) {
//                 return `
//             <div class="fixed-item">
//               <span class="fixed-item__icon">&#8381;</span>
//               <div class="motivation-modify-template__title motivation-wage__title regular-title">Ставка за одну проверенную сделку</div>
//               <input autocomplete="off" placeholder="0" class="motivation-modify-template__coef menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="value">
//             </div>
//           `
//             }

//             if (item.typeCode === 7) {
//                 return `
//               <div class="fixed-item">
//                 <span class="fixed-item__icon">&#8381;</span>
//                 <div class="motivation-modify-template__title motivation-wage__title regular-title">Коэффициент</div>
//                 <input autocomplete="off" placeholder="0" class="motivation-modify-template__coef menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="value">
//               </div>
//             `
//             }
//         }

//         $('[menu-modify-template__form]').append(redactor);

//         const inputs = ['.motivation-modify-template__coef', '.motivation-modify-template__coef', '.motivation-modify-template__coef']

//         $('.motivation-modify-template__coef').val(`${(item.value === 0) ? '' : item.value}`);

//         setInputTypeNumber(inputs);
//     }
//     ;

//     if (name === 'ControlWageRate') {
//         const redactor = () => {
//             if (item.typeCode === 3) {
//                 return `
//             <div class="fixed-item fixed-homework">
//               <span class="fixed-item__icon">&#8381;</span>
//               <div class="motivation-modify-template__title motivation-wage__title">Ставка за одно проверенное домашнее задание </div>
//               <input autocomplete="off" placeholder="0" class="motivation-modify-template__control--hw menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="regularRate">
//             </div>
//           `
//             }
//             if (item.typeCode === 4) {
//                 return `
//             <div class="fixed-item fixed-deal">
//               <span class="fixed-item__icon">&#8381;</span>
//               <div class="motivation-modify-template__title motivation-wage__title">Ставка за оценку сделок</div>
//               <input autocomplete="off" placeholder="0" class="motivation-modify-template__control--deals menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="regularRate">
//             </div>
//           `
//             }
//         }
//         $('[menu-modify-template__form]').append(redactor);

//         const inputs = ['.motivation-modify-template__control--hw', '.motivation-modify-template__control--deals'];

//         $('.motivation-modify-template__control').val(`${(item.regularRate === 0) ? '' : item.regulaRate}`);

//         setInputTypeNumber(inputs);
//     }

//     if (name === 'LeveledWageRate') {
//         const redactor = () => {
//             if (item.typeCode === 1) {
//                 return `
//               <div class="levels-rate">
//                 <div class="levels__top">
//                   <span class="levels__title"></span>
//                   <span class="levels__delete"></span>
//                 </div>
//                 <ul class="levels__list">
//                   ${(item.levels.length) ? setLevelAdd(item.levels, 'estimation') : newLevelAdd('level', null, 'estimation')}
//                 </ul>
//                 <div class="levels__bottom">
//                   <a class="levels-bottom__btn--add">Добавить уровень</a>
//                 </div>
//               </div>
//             `
//             }

//             if (item.typeCode === 2) {
//                 return `
//               <div class="levels-rate">
//                 <div class="levels__top">
//                   <span class="levels__title"></span>
//                   <span class="levels__delete"></span>
//                 </div>
//                 <ul class="levels__list">
//                   ${(item.levels.length) ? setLevelAdd(item.levels, 'ad') : newLevelAdd('level', null, 'ad')}
//                 </ul>
//                 <div class="levels__bottom">
//                   <a class="levels-bottom__ad-btn--add">Добавить уровень</a>
//                 </div>
//               </div>
//             `
//             }
//         }

//         $('[menu-modify-template__form]').append(redactor);

//         const inputs = ['.value-from__value', '.value-to__value', '.value-reward__value'];

//         setInputTypeNumber(inputs);
//     }
//     ;

//     if (name === 'TypedLeveledWageRate') {
//         const redactor = () => {
//             if (item.typeCode === 5) {
//                 return `
//           <div class="levels">
//           </div>
//         `
//             }

//             if (item.typeCode === 6) {
//                 return `
//           <div class="levels">
//           </div>
//         `
//             }
//         }
//         $('[menu-modify-template__form]').append(redactor);

//         setLadder(item);

//         const inputs = ['.value-from__value', '.value-to__value', '.value-reward__value'];

//         setInputTypeNumber(inputs);
//     }
//     ;
// };

// /* Устанавливаем уровень по умолчанию */
// function setLevelAdd(arr, str) {
//     if (str === 'estimation') {
//         const level = $.map(arr, (item, index) => {
//             return `
//         <li class="levels__item">
//           <form class="level">
//             <div class="level__id">
//               <div class="level-id__title">Lvl</div>
//               <div class="level-id__count">${item.level}</div>
//             </div>
//             <div class="level__value-from">
//               <div class="value-from__title">Балы от</div>
//               <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="number" value="${item.valueFrom}" placeholder="0">
//             </div>
//             <span class="levels-interval__icon"></span>
//             <div class="level__value-to">
//               <div class="value-to__title">Балы до</div>
//               <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="number" value="${item.valueTo}" placeholder="0">
//             </div>
//             <div class="level__reward">
//               <div class="value-reward__title">Коэф</div>
//               <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="number" value="${item.multiplier}" placeholder="0">
//             </div>
//             <div class="level__delete"></div>
//           </form>
//         </li>
//       `
//         }).join('');

//         return level;
//     }

//     if (str === 'ad') {
//         const level = $.map(arr, (item, index) => {
//             return `
//         <li class="levels__item">
//           <form class="level">
//             <div class="level__id">
//               <div class="level-id__title">Lvl</div>
//               <div class="level-id__count">${item.level}</div>
//             </div>
//             <div class="level__value-from">
//               <div class="value-from__title">Сумма от</div>
//               <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="number" value="${item.valueFrom}" placeholder="0">
//               <div class="level-input__icon">%</div>
//             </div>
//             <span class="levels-interval__icon"></span>
//             <div class="level__value-to">
//               <div class="value-to__title">Сумма до</div>
//               <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="number" value="${item.valueTo}" placeholder="0">
//               <div class="level-input__icon">%</div>
//             </div>
//             <div class="level__reward">
//               <div class="value-reward__title">Награда</div>
//               <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="number" value="${item.multiplier}" placeholder="0">
//               <div class="level-input__icon">%</div>
//             </div>
//             <div class="level__delete"></div>
//           </form>
//         </li>
//       `
//         }).join('');

//         return level;
//     }
// }

// /* Создаем лестницу */
// function setLadder(item) {
//     if (!$('.ladder__separator').get(0)) {
//         $('<div>').attr('class', 'ladder__separator').insertBefore($('.ladder__create'));
//     }

//     $('.levels').append($('<div>').attr('class', 'levels-additional')
//         .append($('<div>').attr('class', 'levels-additional__top')
//             .append($('<span>').attr('class', 'levels-additional__title').html('База'))
//         )
//         .append($('<ul>').attr('class', 'levels-additional__list')
//             .append(item.levels.additional.length != 0 ? renderLevelsAdd(item.levels.additional, 'additional') : newLevelAdd('additional'))
//         )
//         .append($('<div>').attr('class', 'level-additional__add')
//             .append($('<a>').attr('class', 'level-additional__button--add').html('Добавить уровень'))
//         )
//     )

//     $('.levels').append($('<div>').attr('class', 'levels-traffic')
//         .append($('<div>').attr('class', 'levels-traffic__top')
//             .append($('<span>').attr('class', 'levels-traffic__title').html('Траффик'))
//         )
//         .append($('<ul>').attr('class', 'levels-traffic__list')
//             .append(item.levels.additional.length != 0 ? renderLevelsAdd(item.levels.traffic, 'traffic') : newLevelAdd('traffic'))
//         )
//         .append($('<div>').attr('class', 'level-traffic__add')
//             .append($('<a>').attr('class', 'level-traffic__button--add').html('Добавить уровень'))
//         )
//     )
// };

// $(document).on('click', '.save__template--add', saveBlockAdd);

// function saveBlockAdd() {
//     if (modifyWageBlockAdd.className === 'FixedWageRate') {
//         if (modifyWageBlockAdd.typeCode === 0) {
//             modifyWageBlockAdd.regularRate = +$('.motivation-modify-template__regular').val();
//             modifyWageBlockAdd.holidayRate = +$('.motivation-modify-template__holiday').val();

//             wageBlocks.push(modifyWageBlockAdd);
//         }
//     }

//     if (modifyWageBlockAdd.className === 'OneValueWageRate') {
//         if (modifyWageBlockAdd.typeCode === 3) {
//             modifyWageBlockAdd.value = +$('.motivation-modify-template__coef').val();

//             wageBlocks.push(modifyWageBlockAdd);
//         }

//         if (modifyWageBlockAdd.typeCode === 4) {
//             modifyWageBlockAdd.value = +$('.motivation-modify-template__coef').val();

//             wageBlocks.push(modifyWageBlockAdd);
//         }

//         if (modifyWageBlockAdd.typeCode === 7) {
//             modifyWageBlockAdd.value = +$('.motivation-modify-template__coef').val();

//             wageBlocks.push(modifyWageBlockAdd);
//         }
//     }

//     if (modifyWageBlockAdd.className === 'ControlWageRate') {

//         if (modifyWageBlockAdd.typeCode === 3) {
//             modifyWageBlockAdd.regularRate = +$('.motivation-modify-template__control').val();
//             wageBlocks.push(modifyWageBlockAdd);
//         }

//         if (modifyWageBlockAdd.typeCode === 4) {
//             modifyWageBlockAdd.regularRate = +$('.motivation-modify-template__control').val();
//             wageBlocks.push(modifyWageBlockAdd);
//         }
//     }

//     if (modifyWageBlockAdd.className === 'LeveledWageRate') {

//         if (modifyWageBlockAdd.typeCode === 1) {
//             modifyWageBlockAdd.levels = [];
//             modifyWageBlockAdd.levels.length = 0;

//             $.each($('.levels__item'), (index, item) => {
//                 const data = {
//                     level: +$(item).find('.level-id__count').html(),
//                     valueFrom: +$(item).find('.value-from__value').val(),
//                     valueTo: +$(item).find('.value-to__value').val(),
//                     multiplier: +$(item).find('.value-reward__value').val(),
//                 }
//                 modifyWageBlockAdd.levels.push(data);
//             });

//             wageBlocks.push(modifyWageBlockAdd);
//         }
//         ;

//         if (modifyWageBlockAdd.typeCode === 2) {
//             modifyWageBlockAdd.levels = [];
//             modifyWageBlockAdd.levels.length = 0;

//             $.each($('.levels__item'), (index, item) => {
//                 const data = {
//                     level: +$(item).find('.level-id__count').html(),
//                     valueFrom: +$(item).find('.value-from__value').val(),
//                     valueTo: +$(item).find('.value-to__value').val(),
//                     multiplier: +$(item).find('.value-reward__value').val(),
//                 }
//                 modifyWageBlockAdd.levels.push(data);
//             });

//             wageBlocks.push(modifyWageBlockAdd);
//         }
//         ;
//     }

//     if (modifyWageBlockAdd.className === 'TypedLeveledWageRate' && modifyWageBlockAdd.typeCode === 5) {
//         modifyWageBlockAdd.levels = {};
//         modifyWageBlockAdd.levels.additional = [];
//         modifyWageBlockAdd.levels.traffic = [];
//         modifyWageBlockAdd.levels.additional.length = 0;
//         modifyWageBlockAdd.levels.traffic.length = 0;

//         $.each($('.levels-additional__list').children(), (index, item) => {
//             const data = {
//                 level: +$(item).find('.level-id__count').html(),
//                 valueFrom: +$(item).find('.value-from__value').val(),
//                 valueTo: +$(item).find('.value-to__value').val(),
//                 multiplier: +$(item).find('.value-reward__value').val(),
//             }

//             modifyWageBlockAdd.levels.additional.push(data);
//         });

//         $.each($('.levels-traffic__list').children(), (index, item) => {
//             const data = {
//                 level: +$(item).find('.level-id__count').html(),
//                 valueFrom: +$(item).find('.value-from__value').val(),
//                 valueTo: +$(item).find('.value-to__value').val(),
//                 multiplier: +$(item).find('.value-reward__value').val(),
//             }

//             modifyWageBlockAdd.levels.traffic.push(data);
//         });

//         wageBlocks.push(modifyWageBlockAdd);
//     }

//     if (modifyWageBlockAdd.className === 'TypedLeveledWageRate' && modifyWageBlockAdd.typeCode === 6) {
//         modifyWageBlockAdd.levels = {};
//         modifyWageBlockAdd.levels.additional = [];
//         modifyWageBlockAdd.levels.traffic = [];
//         modifyWageBlockAdd.levels.additional.length = 0;
//         modifyWageBlockAdd.levels.traffic.length = 0;

//         $.each($('.levels-additional__list').children(), (index, item) => {
//             const data = {
//                 level: +$(item).find('.level-id__count').html(),
//                 valueFrom: +$(item).find('.value-from__value').val(),
//                 valueTo: +$(item).find('.value-to__value').val(),
//                 multiplier: +$(item).find('.value-reward__value').val(),
//             }

//             modifyWageBlockAdd.levels.additional.push(data);
//         });

//         $.each($('.levels-traffic__list').children(), (index, item) => {
//             const data = {
//                 level: +$(item).find('.level-id__count').html(),
//                 valueFrom: +$(item).find('.value-from__value').val(),
//                 valueTo: +$(item).find('.value-to__value').val(),
//                 multiplier: +$(item).find('.value-reward__value').val(),
//             }

//             modifyWageBlockAdd.levels.traffic.push(data);
//         });

//         wageBlocks.push(modifyWageBlockAdd);
//     }

//     wageBlocks = wageBlocks.filter((val, i) => wageBlocks.indexOf(val) === i);

//     $('[menu-modify-template__form]').children().remove();
// };

// $(document).on('click', '.level-additional__button--add', function () {
//     $('.levels-additional__list').append(newLevelAdd('additional'));
// });

// $(document).on('click', '.level-traffic__button--add', function () {
//     $('.levels-traffic__list').append(newLevelAdd('traffic'));
// });

// $(document).on('click', '.levels-bottom__btn--add', function () {
//     $('.levels__list').append(newLevelAdd('level', null, 'estimation'));
// });

// let levelAdd;

// function renderLevelsAdd(arr, setting) {
//     let countAdd;
//     let countTr;
//     let countLvl;

//     let type;

//     if (setting === 'additional') {
//         type = "additional";
//         countAdd = $('.additional').length + 1;
//     }

//     if (setting === 'traffic') {
//         type = "traffic";
//         countTr = $('.traffic').length + 1;
//     }

//     if (setting === 'level') {
//         type = 'level';
//         countLvl = $('.levels__item').length + 1;
//     }

//     let result = $.map(arr, (item, index) => {
//         return `
//     <li class="levels__item">
//     <form class="${type}">
//     <div class="level__id">
//       <div class="level-id__title">Lvl</div>
//       <div class="level-id__count">${item.level}</div>
//     </div>
//     <div class="level__value-from">
//       <div class="value-from__title">Сумма от</div>
//       <input autocomplete="off" placeholder="0" class="value-from__value input-number" type="text" name="valueFrom" value="${item.valueFrom}">
//       <div class="level-input__icon">&#8381;</div>
//     </div>
//     <span class="levels-interval__icon"></span>
//     <div class="level__value-to">
//       <div class="value-to__title">Сумма до</div>
//       <input autocomplete="off" placeholder="0" class="value-to__value input-number" type="text" name="valueTo" value="${item.valueTo}">
//       <div class="level-input__icon">&#8381;</div>
//     </div>
//     <div class="level__reward">
//       <div class="value-reward__title">Награда</div>
//       <input autocomplete="off" placeholder="0" class="value-reward__value input-number" type="text" name="multiplier" value="${item.multiplier}">
//       <div class="level-input__icon">%</div>
//     </div>
//     <div class="level__delete"></div>
//     </form>
//   </li>

//     `
//     }).join('');

//     return result;
// }

// function newLevelAdd(setting, item = null, str) {
//     let countAdd;
//     let countTr;
//     let countLvl;

//     let type;

//     if (setting === 'additional') {
//         type = "additional";
//         countAdd = $('.additional').length + 1;
//     }

//     if (setting === 'traffic') {
//         type = "traffic";
//         countTr = $('.traffic').length + 1;
//     }

//     if (setting === 'level') {
//         type = 'level';
//         countLvl = $('.levels__item').length + 1;
//     }

//     counterId = counterId + 1;

//     if (str === 'estimation') {
//         return `
//     <li class="levels__item">
//       <form class="${type}">
//       <div class="level__id">
//         <div class="level-id__title">Lvl</div>
//         <div class="level-id__count">${(type === 'additional') ? countAdd : (type === 'traffic') ? countTr : countLvl}</div>
//       </div>
//       <div class="level__value-from">
//         <div class="value-from__title">Балы от</div>
//         <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="text" placeholder="0">
//       </div>
//       <span class="levels-interval__icon"></span>
//       <div class="level__value-to">
//         <div class="value-to__title">Балы до</div>
//         <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" placeholder="0">
//       </div>
//       <div class="level__reward">
//         <div class="value-reward__title">Коэф</div>
//         <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" placeholder="0">
//       </div>
//       <div class="level__delete"></div>
//       </form>
//     </li>
//   `;
//     }

//     if (str === 'ad') {
//         return `
//     <li class="levels__item">
//       <form class="${type}">
//       <div class="level__id">
//         <div class="level-id__title">Lvl</div>
//         <div class="level-id__count">${(type === 'additional') ? countAdd : (type === 'traffic') ? countTr : countLvl}</div>
//       </div>
//       <div class="level__value-from">
//         <div class="value-from__title">% от</div>
//         <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="text" placeholder="0">
//         <div class="level-input__icon">%</div>
//       </div>
//       <span class="levels-interval__icon"></span>
//       <div class="level__value-to">
//         <div class="value-to__title">% до</div>
//         <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" placeholder="0">
//         <div class="level-input__icon">%</div>
//       </div>
//       <div class="level__reward">
//         <div class="value-reward__title">Награда</div>
//         <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" placeholder="0">
//         <div class="level-input__icon">%</div>
//       </div>
//       <div class="level__delete"></div>
//       </form>
//     </li>
//   `;
//     }

//     if (str === 'level') {
//         return `
//     <li class="levels__item">
//       <form class="${type}">
//       <div class="level__id">
//         <div class="level-id__title">Lvl</div>
//         <div class="level-id__count">${(type === 'additional') ? countAdd : (type === 'traffic') ? countTr : countLvl}</div>
//       </div>
//       <div class="level__value-from">
//         <div class="value-from__title">Балы от</div>
//         <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="text" placeholder="0">
//       </div>
//       <span class="levels-interval__icon"></span>
//       <div class="level__value-to">
//         <div class="value-to__title">Балы до</div>
//         <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" placeholder="0">
//       </div>
//       <div class="level__reward">
//         <div class="value-reward__title">Коэф</div>
//         <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" placeholder="0">
//       </div>
//       <div class="level__delete"></div>
//       </form>
//     </li>
//   `;
//     }

//     return `
//     <li class="levels__item">
//       <form class="${type}">
//       <div class="level__id">
//         <div class="level-id__title">Lvl</div>
//         <div class="level-id__count">${(type === 'additional') ? countAdd : (type === 'traffic') ? countTr : countLvl}</div>
//       </div>
//       <div class="level__value-from">
//         <div class="value-from__title">Сумма от</div>
//         <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="text" placeholder="0">
//         <div class="level-input__icon">&#8381;</div>
//       </div>
//       <span class="levels-interval__icon"></span>
//       <div class="level__value-to">
//         <div class="value-to__title">Сумма до</div>
//         <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" placeholder="0">
//         <div class="level-input__icon">&#8381;</div>
//       </div>
//       <div class="level__reward">
//         <div class="value-reward__title">Награда</div>
//         <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" placeholder="0">
//         <div class="level-input__icon">%</div>
//       </div>
//       <div class="level__delete"></div>
//       </form>
//     </li>
//   `;
// };

// let savedId;

// $(document).on('click', '.motivation__new', function () {
//     data = $('[js-menu-motivation-add__form]').serializeObject();

//     /* Формируем объект для отправки */
//     data.idCompany = +$('.motivation-add__idCompany').val();
//     data.idDepartment = +$('.motivation-add__department option:selected').attr('value');
//     data.idPosition = +$('.motivation-add__position option:selected').attr('value');
//     data.year = +$('.motivation-add__year option:selected').attr('value');
//     data.forSelfEmployed = $('[name="forSelfEmployed"]').val() === 'true' ? true :
//         $('[name="forSelfEmployed"]').val() === 'false' ? false : $('[name="forSelfEmployed"]').val() === '' ? null : '';

//     if (!$.isArray(data.months)) {
//         const months = [];
//         months.push(`${data.months}`);
//         data.months = months;
//     }

//     data.blocks = [];

//     if (wageBlock.length != 0) {
//         $.each(oldBlock, (index, item) => {
//             $.each(wageBlock, (count, elem) => {
//                 if (item.className === elem.className) {
//                     data.blocks.push(elem);
//                 } else {
//                     data.blocks.push(item);
//                 }
//             });
//         });
//     } else {
//         $.each(oldBlock, (index, item) => {
//             data.blocks.push(item);
//         });
//     }

//     data.motivationName = $('[js-motivation-name]').val();

//     updatingBox.keyField = data;

//     if ($('[js-motivation-name]').val()) {
//         $.ajax({
//             type: "POST",
//             contentType: "application/json",
//             url: "saveWageRate",
//             data: JSON.stringify(updatingBox),
//             dataType: 'json',
//             cache: false,
//             success: function (data) {
//                 const menu = document.querySelector('[js-menu-motivation-add]');
//                 const wrapper = menu.querySelector('.platform-modal__wrapper');
//                 closeModalAnimation(menu, wrapper, false, true);

//                 savedId = data;

//                 const getWagesData = getWages();

//                 getWagesData.then((data) => {
//                     $('[js-motivation-now__block]').children().remove();

//                     $.each(data, (index, item) => {
//                         if (item.id === savedId) {
//                             allPack.push(item);
//                         }
//                     });

//                     setWage(data);
//                 });
//             },
//             error: function (data) {
//             }
//         });
//     } else {
//         setError($('[js-motivation-name]').get(0));
//         return false
//     }
// });

// function setError(item) {
//     let elem = item.cloneNode(false);

//     const error = document.createElement('div');
//     error.classList.add('validate-error');
//     error.innerText = 'Заполните поле';

//     const parent = item.parentElement;
//     parent.classList.add('validate-error__wrapper');
//     parent.appendChild(error);

//     setTimeout(() => {
//         parent.classList.remove('validate-error__wrapper');
//         const error = document.querySelector('.validate-error');
//         error.remove();
//     }, 1500)
// }

// $(document).on('click', '.motivation__new--menu', function () {
//     data = $('[js-menu-motivation-add__form]').serializeObject();

//     /* Формируем объект для отправки */
//     data.idCompany = +$('.motivation-add__idCompany').val();
//     data.idDepartment = +$('.motivation-department__select option:selected').attr('value');
//     data.idPosition = +$('.motivation-position__select option:selected').attr('value');

//     data.blocks = [];
//     data.blocks.length = 0;

//     const classNames = [];

//     $.each(oldBlocks, (index, item) => {
//         classNames.push(item.className);
//     });

//     const classType = [];

//     $.each(oldBlocks, (index, item) => {
//         classType.push(item.typeCode);
//     });

//     if (wageBlocks.length != 0) {
//         $.each(oldBlocks, (index, item) => {
//             $.each(wageBlocks, (count, elem) => {
//                 if (item.className === elem.className && item.typeCode === elem.typeCode) {
//                     var iterator = classNames.indexOf(elem.className);

//                     if (iterator !== -1) {
//                         let counter = classType.indexOf(elem.typeCode);

//                         oldBlocks[counter] = elem;
//                     }
//                 }
//             });
//         });
//     } else {
//         $.each(oldBlocks, (index, item) => {
//             data.blocks.push(item);
//         });
//     }

//     data.blocks = oldBlocks;
//     updatingBox.keyField = data;

//     $.ajax({
//         type: "POST",
//         contentType: "application/json",
//         url: "saveWageRate",
//         data: JSON.stringify(updatingBox),
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             const dataWage = {
//                 idCompany: +$('[id-company]').val(),
//                 idDepartment: +$('.motivation-add__department option:selected').attr('value'),
//                 idPosition: +$('.motivation-add__position option:selected').attr('value'),
//                 year: +$('.motivation-add__year option:selected').html(),
//             };

//             $.ajax({
//                 type: "POST",
//                 contentType: "application/json",
//                 url: "getWageRates",
//                 data: JSON.stringify(dataWage),
//                 dataType: 'json',
//                 cache: false,
//                 success: function (data) {
//                     setWage(data);
//                 },
//                 error: function (data) {
//                 }
//             });
//         },
//         error: function (data) {
//         }
//     });
// })

// $(document).on('click', '.levels-bottom__ad-btn--add', function () {
//     $('.levels__list').append(newLevelAdd('level', null, 'ad'));
// });

// $(document).on('click', '.level__delete', function (e) {
//     if ($(e.target).closest('.levels__item').get(0)) {
//         $(e.target).closest('.levels__item').remove();

//         $.each($('.additional'), (index, item) => {
//             $(item).find('.level-id__count').html(index + 1);
//             $(item).find('.level-id').val(index + 1);
//         });

//         $.each($('.traffic'), (index, item) => {
//             $(item).find('.level-id__count').html(index + 1);
//             $(item).find('.level-id').val(index + 1);
//         });

//         $.each($('.level'), (index, item) => {
//             $(item).find('.level-id__count').html(index + 1);
//             $(item).find('.level-id').val(index + 1);
//         });
//     }
//     ;
// });


