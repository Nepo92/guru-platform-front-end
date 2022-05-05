/* eslint-disable */

import PageData from '../../../../utils/pageData/pageData.js';

const pageData = new PageData();

class WorkersSalary {
  init() {
    const isWorkerSalaryPage = pageData.getPage() === 'workers-salary';

    if (isWorkerSalaryPage) {
      const data = obj;
      let department = [];
      let positionInfo = [];

      $('.calculate-department__select').append($('<option/>').attr('data-id', '0').html('Все').prop('selected', true));

      const entries = Object.entries(data);

      $.each(entries, (index, item) => {
        if (item[1].length !== 0) {
          let key = item[0].split('DtoDepartment')[1];
          const value = item[1];

          key = key.replaceAll('id', '"id"');
          key = key.replaceAll('title', '"title"');
          key = key.replaceAll('department', '"department"');
          key = key.replaceAll('=', ':');
          key = key.replaceAll("'", '"');

          let d = JSON.parse(key);

          department.push(d);

          $('.calculate-department__select').append($('<option/>').attr('data-id', `${d.id}`).attr('data-department', `${d.department}`).html(`${d.title}`))

          $.each(value, (iter, subj) => {
            const pos = {};
            pos.idPosition = subj.user.idPosition;
            pos.positionName = subj.user.positionName;
            pos.idDepartment = subj.user.idDepartment;

            positionInfo.push(pos);
          });
        }
      });

      let currentDep = [];

      $(document).on('change', '.calculate-department__select', function () {
        currentDep.length = 0;

        const selected = +$('.calculate-department__select option:selected').data('id');

        if (selected !== 0) {
          $.each(department, (index, item) => {
            $.each(positionInfo, (count, elem) => {
              if (elem.idDepartment === item.id && elem.idDepartment === +$('.calculate-department__select option:selected').data('id')) {
                currentDep.push(elem);
              }
            });
          });
        }
      });

      $('[tr-filter-form-btn]').on('click', function () {
        $('[tr-filter-form]').trigger('submit');
      });

      const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

      $.each(months, (index, item) => {
        $('.calculate-months__select').append($('<option>').attr('value', index + 1).html(item))
      });

      $(document).on('change', '.calculate-year__select', function () {
        $.each($('.calculate-months__select').children(), (index, item) => {
          if (index === 1) {
            $(item).prop('selected', true);
          }
        });
      });

      let motivations = [];
      motivations.length = 0;

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

      $(document).on('click', '[salary-about-close-btn]', function () {
        const menu = document.querySelector('[salary-about]');
        const wrapper = menu.querySelector('.platform-modal__wrapper');
        closeModalAnimation(menu, wrapper, false, false);
        $('body').css({ overflowY: 'auto' });
      })

      $(document).on('click', '[js-save-deal]', function () {
        const menu = document.querySelector('[salary-about]');
        const wrapper = menu.querySelector('.platform-modal__wrapper');
        closeModalAnimation(menu, wrapper, false, false);

        $('body').css({ overflowY: 'auto' });
      })

      $(document).on('click', '.calculate__item', function (e) {
        const t = e.target;

        let id;
        let idUser;

        if (!$(t).is('.calculate__item')) {
          id = +$(t).closest('.calculate__item').find('[pack-id]').val();
          idUser = +$(t).closest('.calculate__item').find('[pack-user-id]').val();
        } else {
          id = +$(t).find('[pack-id]').val();
          idUser = +$(t).closest('.calculate__item').find('[pack-user-id]').val();
        }

        $('body').css({ overflow: 'hidden' });

        const menu = document.querySelector('[salary-about]');
        openModalAnimation(menu);

        $('[filter-month]').html('&nbsp;' + `${$('.calculate-months__select option:selected').html().toLowerCase()}`);

        $.each(motivations, (index, item) => {
          if (item.user.idByType === id && item.user.idUser === idUser) {
            $('.salary__menu--content').find('.salary-employee__fixed').remove();
            $('.salary__menu--content').find('.salary-employee__bonus').remove();
            $('.salary__menu--content').find('.salary-employee__actions').remove();
            $('.salary__menu--content').find('.salary-employee__rating').remove();
            $('.salary__menu--content').find('.salary-employee__coeff').remove();
            $('.salary__menu--content').find('.salary-employee__total').remove();

            // Устанавливаем инфофрмацию о работнике в меню
            $('.salary-employee__about img').attr('src', `${item.user.avatar === null ? '../img/default-avatar.svg' : '/' + item.user.avatar}`)
              .css({ width: 'auto', height: 'auto' });
            $('.salary-employee__name').html(item.user.name);
            $('.salary-employee__position').html(item.user.positionName);

            checkSize($('.salary-employee__about img'));

            // Добавляем заголовок в меню
            const $aboutBlock = $('.salary-employee__about');

            const setMenuHead = () => {
              return `
                    <div class="salary__menu--head">
                        <span class="salary-head__title">Категория</span>
                        <span class="salary-head__title">Значение</span>
                    </div>
                `
            }

            if (!$('.salary__menu--head').get(0)) {
              $(setMenuHead()).insertAfter($aboutBlock.get(0));
            }

            let blocks = item.pack.blocks;

            // Фиксированная ставка
            if (item.byFixedRate !== 0) {
              $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__fixed'));

              const $fixed = $('.salary-employee__fixed');
              const regularRate = item.pack.blocks[blocks.findIndex(el => el.className === 'FixedWageRate')].regularRate;
              const holidayRate = item.pack.blocks[blocks.findIndex(el => el.className === 'FixedWageRate')].holidayRate;

              const regularTime = item.regularTime / 1000 / 60 / 60;
              const holidayTime = item.holidayTime / 1000 / 60 / 60;

              const regularWage = getRoundUp(regularRate * regularTime);
              const holidayWage = getRoundUp(holidayRate * holidayTime);

              if (regularWage !== 0) {
                $fixed.append($('<li/>').attr('class', 'salary-fixed__item')
                  .append($('<span/>').attr('class', 'salary-item__name').html('Обычные часы'))
                  .append($('<span/>').attr('class', 'tile__tooltip c-tooltip c-tooltip__wage inherit right')
                    .append($('<span/>').attr('class', 'c-tooltip__wrapper c-tooltip__calc-wage--fixed')
                      .append($('<span/>').attr('class', 'c-tooltip__text inherit').html(`${regularTime}` + ' ' + 'ч' + ' ' + '*' + ' ' + `${regularRate}` + ' ' + '&#8381;'))
                    )
                    .append($('<span/>').attr('class', 'salary-item__value').html(`${regularWage} &#8381;`)))
                )
              }

              if (holidayWage !== 0) {
                $fixed.append($('<li/>').attr('class', 'salary-fixed__item')
                  .append($('<span/>').attr('class', 'salary-item__name').html('Праздничные часы'))
                  .append($('<span/>').attr('class', 'tile__tooltip c-tooltip c-tooltip__wage inherit right')
                    .append($('<span/>').attr('class', 'c-tooltip__wrapper c-tooltip__calc-wage--fixed')
                      .append($('<span/>').attr('class', 'c-tooltip__text inherit').html(`${holidayTime}` + ' ' + 'ч' + ' ' + '*' + ' ' + `${holidayRate}` + ' ' + '&#8381;'))
                    )
                    .append($('<span/>').attr('class', 'salary-item__value').html(`${holidayWage} &#8381;`)))
                )
              }

              const fixedWage = getRoundUp(+regularWage + +holidayWage);

              if (holidayWage !== 0 || regularWage !== 0) {
                $fixed.append($('<li/>').attr('class', 'salary-fixed__item')
                  .append($('<span>').attr('class', 'salary-item__name').html('Начисления по фиксированной ставке итого'))
                  .append($('<span>').attr('class', 'salary-item__value').html(`${fixedWage} &#8381;`)));
              }
            }

            // Расчет зп с бонусами

            // Куратор
            if (item.byHomeworkControl) {
              $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__bonus'));

              const homeworkCount = item.homeworkCount;
              const homeworkMultiplier = item.pack.blocks[blocks.findIndex(el => el.className === 'OneValueWageRate' && el.typeCode === 3)].value;

              const $bonus = $('.salary-employee__bonus');

              const curatorWage = getRoundUp(homeworkMultiplier * homeworkCount);

              $bonus.append($('<li/>').attr('class', 'salary-increase__item')
                .append($('<span/>').attr('class', 'salary-item__name').html('Начисления за проверенные ДЗ'))
                .append($('<div/>').attr('class', 'tile__tooltip c-tooltip c-tooltip__wage inherit right')
                  .append($('<div/>').attr('class', 'c-tooltip__wrapper c-tooltip__wrapper--homework c-tooltip__calc-wage--fixed')
                    .append($('<div>').attr('class', 'c-tooltip__text inherit')
                      .append($('<p/>').attr('class', '').html(`Количество провереренных ДЗ: ${homeworkCount}`))
                      .append($('<p/>').attr('class', '').html(`Ставка за одно проверенное ДЗ: ${homeworkMultiplier} &#8381;`))
                    )
                  )
                  .append($('<span>').attr('class', 'salary-item__value').html(`${curatorWage} &#8381;`))
                )
              )
            }

            // Реклама
            if (item.byAdvBudget) {
              $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__bonus'));

              const $bonus = $('.salary-employee__bonus');
              const levels = item.pack.blocks[blocks.findIndex(el => el.className === "LeveledWageRate" && el.typeCode === 2)].levels;

              const advBudget = item.advBudget;

              let multiplier = getMultiplier(levels, advBudget);

              const byAdvBudget = getRoundUp(advBudget / 100 * multiplier);

              $bonus.append($('<li/>').attr('class', 'salary-increase__item')
                .append($('<span/>').attr('class', 'salary-item__name').html('% рекламного бюджета'))
                .append($('<div/>').attr('class', 'tile__tooltip c-tooltip c-tooltip__wage inherit right')
                  .append($('<div/>').attr('class', 'c-tooltip__wrapper c-tooltip__wrapper--homework c-tooltip__calc-wage--fixed')
                    .append($('<div>').attr('class', 'c-tooltip__text inherit')
                      .append($('<p/>').attr('class', '').html(`Рекламныйй бюджет: ${+advBudget.toFixed(2)} &#8381;`))
                      .append($('<p/>').attr('class', '').html(`Коэффициент: ${multiplier}`))
                    )
                  )
                  .append($('<span/>').attr('class', 'salary-item__value').html(`${byAdvBudget} &#8381;`))
                )
              )
            }

            // Проверятор
            if (item.byDealsControl) {
              $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__bonus'));

              const dealsCount = item.dealsCount;
              const dealsMultiplier = item.pack.blocks[blocks.findIndex(el => el.className === 'OneValueWageRate' && el.typeCode === 4)].value;

              const $bonus = $('.salary-employee__bonus');

              const checkerWage = getRoundUp(dealsCount * dealsMultiplier);

              $bonus.append($('<li/>').attr('class', 'salary-increase__item')
                .append($('<span/>').attr('class', 'salary-item__name').html('Начисления за проверенные сделки'))
                .append($('<div/>').attr('class', 'tile__tooltip c-tooltip c-tooltip__wage inherit right')
                  .append($('<div/>').attr('class', 'c-tooltip__wrapper c-tooltip__wrapper--homework c-tooltip__calc-wage--fixed')
                    .append($('<div>').attr('class', 'c-tooltip__text inherit')
                      .append($('<p/>').attr('class', '').html(`Количество провереренных сделок: ${dealsCount}`))
                      .append($('<p/>').attr('class', '').html(`Ставка за одну проверенную сделку: ${dealsMultiplier} &#8381;`))
                    )
                  )
                  .append($('<span>').attr('class', 'salary-item__value').html(`${checkerWage} &#8381;`))
                )
              )
            }

            // Менеджер по продажам
            let getInfoManager;
            if (item.byPersonalPercentage) {
              $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__bonus'));

              let multiplierTraffic;
              let multiplierAdditional;

              const levels = blocks.filter(el => el.className === 'TypedLeveledWageRate' && el.typeCode === 5)[0].levels;

              const personalTraffic = item.personalTraffic;
              const personalAdditional = item.personalAdditional;

              const levelsItems = Object.entries(levels);

              $.each(levelsItems, (count, elem) => {
                const funnelType = elem[0];
                const funnels = elem[1];

                if (funnelType === 'traffic') {
                  multiplierTraffic = getMultiplier(funnels, personalTraffic);
                }

                if (funnelType === 'additional') {
                  multiplierAdditional = getMultiplier(funnels, personalAdditional);
                }
              });

              const sumPersonal = (personalAdditional / 100 * multiplierAdditional) + (personalTraffic / 100 * multiplierTraffic);

              getInfoManager = getManagerBonus(personalAdditional, personalTraffic, multiplierAdditional, multiplierTraffic, sumPersonal, 'manager');
              setManagerBonusTotal(getInfoManager, null);
            }

            // РОП
            let getInfoROP;

            if (item.byTotalPercentage !== 0 && item.user.positionName === "Руководитель") {
              if (!$('.salary__menu--content').find('.salary-employee__bonus').get(0)) {
                $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__bonus'));
              }

              let multiplierTotalTraffic;
              let multiplierTotalAdditional;

              const levels = blocks.filter(el => el.className === 'TypedLeveledWageRate' && el.typeCode === 6)[0].levels;

              const totalTraffic = item.totalTraffic;
              const totalAdditional = item.totalAdditional;

              const levelsItems = Object.entries(levels);

              $.each(levelsItems, (count, elem) => {
                const funnelType = elem[0];
                const funnels = elem[1];

                if (funnelType === 'traffic') {
                  multiplierTotalTraffic = getMultiplier(funnels, totalTraffic);
                }

                if (funnelType === 'additional') {
                  multiplierTotalAdditional = getMultiplier(funnels, totalAdditional);
                }
              });

              const sumTotal = (totalTraffic / 100 * multiplierTotalTraffic) + (totalAdditional / 100 * multiplierTotalAdditional);

              getInfoROP = getManagerBonus(totalAdditional, totalTraffic, multiplierTotalAdditional, multiplierTotalTraffic, sumTotal, 'head-manager');

              setManagerBonusTotal(getInfoManager, getInfoROP);
            }

            // Акции
            if (item.actionBonus) {
              $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__actions'));

              const $actions = $('.salary-employee__actions');
              const action = getRoundUp(item.actionBonus);

              $actions.append($('<li/>').attr('class', 'salary-actions__item')
                .append($('<span/>').attr('class', 'salary-item__name').html('Акция'))
                .append($('<span/>').attr('class', 'salary-item__value').html(`${action} &#8381;`))
              )
            }

            // Рейтинг
            if (typeof item.rating === 'number' && item.totalSalary !== 0) {
              $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__rating'));

              const $rating = $('.salary-employee__rating');
              const rating = item.rating;

              const levels = blocks.filter(el => el.className === 'LeveledWageRate' && el.typeCode === 1)[0].levels;

              let multiplier = getMultiplier(levels, rating);

              $rating.append($('<li/>').attr('class', 'salary-rating__item')
                .append($('<span/>').attr('class', 'salary-item__name').html('Рейтинг'))
                .append($('<span/>').attr('class', 'salary-item__value')
                  .append($('<span/>').attr('class', 'salary-item__value--rating').html(`${rating}`))
                  .append($('<span/>').html(' / '))
                  .append($('<span/>').attr('class', 'salary-item__value--multiplier').html(`${multiplier}`))
                )
              )
            }

            // Районный коэффициент
            if (item.totalSalary) {
              const coeff = blocks.filter(el => el.className === 'OneValueWageRate' && el.typeCode === 7)[0].value;

              $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__coeff'));

              const $coeff = $('.salary-employee__coeff');

              $coeff.append($('<li/>').attr('class', 'salary-coeff__item')
                .append($('<span/>').attr('class', 'salary-item__name').html('Районный коэффициент'))
                .append($('<span/>').attr('class', 'salary-item__value').html(`${coeff}`))
              )

              if (!$('.salary__menu--content').find('.salary-employee__rating').get(0)) {
                $('.salary-employee__coeff').addClass('salary-coeff');
                $('.salary-employee__coeff').removeClass('mt_10');
              } else {
                $('.salary-employee__coeff').removeClass('salary-coeff');
                $('.salary-employee__coeff').addClass('mt_10');
              }
            }

            // Итого
            if (item.totalSalary) {
              $('.salary__menu--content').append($('<ul/>').attr('class', 'salary-employee__total'));

              const $total = $('.salary-employee__total');

              const total = getRoundUp(item.totalSalary);

              $total.append($('<li/>').attr('class', 'salary-total__item')
                .append($('<span/>').attr('class', 'salary-item__name').html('Итого начислено'))
                .append($('<span/>').attr('class', 'salary-item__value--total').html(`${total} &#8381;`))
              )
            }
          }
        });
      });

      function setManagerBonusTotal(getInfoManager, getInfoROP = null) {
        let managerBonus = Promise.allSettled([getInfoManager, getInfoROP]);

        managerBonus.then(() => {
          const $bonus = $('.salary-employee__bonus');

          if ($bonus.get(0)) {

            let sum;

            const total = $bonus.find('.total').find('[js-value]').html();
            const personal = $bonus.find('.personal').find('[js-value]').html()

            if (total || personal) {
              const valueTotal = total ? +total.split(' ')[0] : 0;
              const personalTotal = personal ? +personal.split(' ')[0] : 0;

              sum = getRoundUp(valueTotal + personalTotal);
            }

            if (!$bonus.find('.total-item').get(0)) {
              $bonus.append($('<li/>').attr('class', 'salary-bonus__item total-item')
                .append($('<span/>').attr('class', 'salary-item__name').html('Начисленения по выручке итого'))
                .append($('<span/>').attr('class', 'salary-item__value').html(`${sum} &#8381;`))
              )
            } else {
              $bonus.find('.total-item').find('.salary-item__value').html(`${sum} &#8381;`);
            }
          }
        })
      }

      function getMultiplier(levels, value) {
        let multiplier;

        $.each(levels, (iter, subj) => {
          if (subj.valueFrom <= value && subj.valueTo > value) {
            multiplier = subj.multiplier;
          }
        });

        if (!multiplier && levels.filter(el => el.valueTo < value)[0]) {
          multiplier = levels.filter(el => el.valueTo < value)[0].multiplier;
        }

        if (!multiplier) {
          multiplier = 0;
        }

        return multiplier;
      }

      async function getManagerBonus(valueAdditional, valueTraffic, multiplierAdditional, multiplierTraffic, sumPersonal, settings) {
        const $bonus = $('.salary-employee__bonus');

        const valueAdditionals = getRoundUp(valueAdditional);
        const valueTraffics = getRoundUp(valueTraffic);
        const sumPersonals = getRoundUp(sumPersonal);
        const multiplierAdditionals = getRoundUp(multiplierAdditional);
        const multiplierTraffics = getRoundUp(multiplierTraffic);

        const setBonusInfo = () => {
          return `
            <li class="salary-bonus__item ${settings === 'head-manager' ? 'total' : 'personal'}">
                <span class="'salary-item__name">${settings === 'head-manager' ? '% от обшей выручки' : '% выручки личной'}</span>
                <div class="tile__tooltip c-tooltip c-tooltip__wage inherit right">
                      <div class="c-tooltip__wrapper c-tooltip__calc-wage--fixed">
                            <div class="c-tooltip__text inherit">
                                <table class="c-tooltip-table">
                                    <thead class="c-tooltip-table__head">
                                        <tr class="c-tooltip-table__head-row">
                                            <td class="c-tooltip-table__head-col c-tooltip__text c-tooltip__text_title">База</td>
                                            <td class="c-tooltip-table__head-col c-tooltip__text c-tooltip__text_title">Трафик</td>
                                        </tr>
                                    </thead>
                                    <tbody class="c-tooltip-table__body">
                                        <tr class="c-tooltip-table__body-row">
                                            <td class="c-tooltip-table__body-col c-tooltip__text inherit ta-left">${valueAdditionals} &#8381;</td>
                                            <td class="c-tooltip-table__body-col c-tooltip__text inherit ta-left">${valueTraffics} &#8381;</td>
                                        </tr>
                                        <tr class="c-tooltip-table__body-row">
                                            <td class="c-tooltip-table__body-col c-tooltip__text inherit ta-left">${multiplierAdditionals === undefined ? '0' : multiplierAdditionals} %</td>
                                            <td class="c-tooltip-table__body-col c-tooltip__text inherit ta-left">${multiplierTraffics === undefined ? '0' : multiplierTraffics} %</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                      </div>
                      <span class="inherit salary-item__value" js-value>${sumPersonals} &#8381;</span>
                </div>
            </li>`
        }

        await $bonus.append(setBonusInfo());
      }

      $(document).ready(() => {
        $.each($('.calculate-year__select').children(), (index, item) => {
          if (+$(item).attr('value') === filter.year) {
            $(item).prop('selected', true);
          }
        });

        $.each($('.calculate-months__select').children(), (index, item) => {
          if (+$(item).attr('value') === filter.month) {
            $(item).prop('selected', true);
          }
        });

        async function setWage() {
          for (let i = 0; i < entries.length; i++) {
            const index = i;
            const item = entries[i];

            await setWageItems(index, item);
          }
        }

        setWage().then((result) => {
          checkSize($('.calculate__item').find('img'));
        });
      });

      function checkSize(photos) {
        $.each(photos, (index, item) => {
          $(item).one('load', (e) => {
            const resolution = $(e.target).width() / $(e.target).height();

            if (resolution < 1) {
              $(e.target).css({ width: '100%', height: 'auto' });
            } else {
              $(e.target).css({ width: '100%', height: '100%' });
            }
          });
        });
      }

      async function setWageItems(index, item) {
        let key = item[0].split('DtoDepartment')[1];
        const value = item[1];

        key = key.replaceAll('id', '"id"');
        key = key.replaceAll('title', '"title"');
        key = key.replaceAll('department', '"department"');
        key = key.replaceAll('=', ':');
        key = key.replaceAll("'", '"');
        key = JSON.parse(key);

        for (let i = 0; i < value.length; i++) {
          const elem = value[i];

          if (elem.month === +$('[calculate-month] option:selected').val() && elem.year === +$('.calculate-year__select option:selected').val()) {
            if (elem.pack) {
              motivations.push(elem);

              const total = getRoundUp(elem.totalSalary);

              const motivation = () => {
                return `
                        <div class="calculate__item">
                            <div class="calculate__avatar">
                                <img class="calculate-avatar__img" src = "${elem.user.avatar === null ? '../img/default-avatar.svg' : '/' + elem.user.avatar}" alt="avatar">
                            </div>
                            <p class="calculate__name">${elem.user.name}</p>
                            <p class="calculate__position">${elem.user.positionName}</p>
                            <p class="calculate__salary">
                                <span class="calculate__salary--text">Начислено</span>
                                <span class="calculate__salary--value">${total} &#8381;</span>
                                <input type="hidden" pack-id value="${elem.user.idByType}">
                                <input type="hidden" pack-user-id value="${elem.user.idUser}">
                            </p>
                        </div>`;
              };
              await $('.calculate__content').append(motivation());
            }
          }
        }
      }

      $(document).on('change', '[calculate-month]', function () {
        if (+$(this).val() !== 0) {
          $('.calculate__form').trigger('submit');
        }
      });

      function getRoundUp(num) {
        return `${num}`.split('.').length === 2 ? (num * 100 / 100).toFixed(2) : `${num}.00`;
      }
    }
  }
}

export default WorkersSalary;
