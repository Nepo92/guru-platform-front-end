const planAPI = {
  month: null,
  year: null,
  closeMenu: false,
  save: function (data) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "saveCommonPlan",
      data: JSON.stringify(data),
      dataType: 'json',
      cache: false,
      success: function (data) {
        planAPI.refresh();
      },
      error: function (data) {

      }
    });
  },
  deleteFunnel: function (data) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: 'deleteFunnelPlan',
      data: JSON.stringify(data),
      dataType: 'json',
      cache: false,
      success: function (data) {
        plan.afterDeleteFunnel();
        planAPI.refresh();
      },
      error: function (data) {
      }
    });
  },
  deleteManagerPlan: function (data) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: 'deleteManagerPlan',
      data: JSON.stringify(data),
      dataType: 'json',
      cache: false,
      success: function (data) {
        plan.afterDeleteManagerPlan();
        planAPI.refresh();
      },
      error: function (data) {
      }
    });
  },
  refresh: function (data) {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: `getCommonPlan/${planAPI.year}/${planAPI.month}`,
      data: null,
      dataType: 'json',
      cache: false,
      success: function (data) {
        $('.plans-add__save-border').css({ bottom: '-100%' });
        $('.plans-add .menu__wrapper').css({ height: '100vh' });

        if (planAPI.closeMenu === true) {
          $('[js-menu-plan-add]').removeClass('is-open');

          $.each($('.plans-funnel'), (index, item) => {
            $(item).children().remove();
          });
        }

        $('[js-plans-add]').append($('<input/>').attr('type', 'hidden').attr('value', `${data}`).attr('class', 'plans-add__id').attr('name', 'id'))

        $('body').css({overflow: 'hidden'});

        plan.afterSave(data);
      },
      error: function (data) {

      }
    });
  },
}

class Plan {
  constructor() {
    this.setup();
    this.setDefaultYear();
    this.renderPlans();
    this.settings();
  }

  setup() {
    this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октярь', 'Ноябрь', 'Декабрь'];
    this.plans = plans;
    this.managers = managers;
    this.idCompany = idCompany;
    this.filter = filter;
    this.id = undefined;
    this.newFunnel = {};
    this.years = years;
    this.funnels = funnels;
    this.week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  }

  setDefaultYear() {
    $.each(this.years, (index, item) => {
      $('[js-select-year]').append($('<option>').attr('value', `${item}`).html(`${item}`).attr('class', 'select-year__option'))
    });

    $.each($('.select-year__option'), (index, item) => {
      if (+$(item).attr('value') === this.filter.year) {
        $(item).prop('selected', true);
      };
    });

    $('.plans-now__list').children().remove();

    this.year = this.filter.year;

    return this.filter.year;
  }

  settings() {
    this.itsNew = true;

    $('[js-select-year]').on('change', this.submitYear);

    const openPlanMenu = this.openPlanMenu.bind(this);
    $('[js-plan-month]').on('click', openPlanMenu);

    const changeDealType = this.changeDealType.bind(this);
    $('.plans-tabs__item').on('click', changeDealType);

    $('[close-plans-add-menu]').on('click', this.closePlanMenu);

    const openFunnelMenu = this.openFunnelMenu.bind(this);
    $('[add-funnel]').on('click', openFunnelMenu);

    $('[close-plans-funnel-add]').on('click', this.closeFunnelMenu);

    $('[cancel-funnel]').on('click', this.clearFunnelMenu);

    const setDataForNewFunnel = this.setDataForNewFunnel.bind(this);
    $('[save-funnel]').on('click', setDataForNewFunnel);

    const selectFunnel = this.selectFunnel.bind(this);
    $('[js-funnel-name]').on('change', selectFunnel);

    const savePlan = this.savePlan.bind(this);
    $('.plans-add__save-button').on('click', savePlan);

    const removeFunnelItem = this.removeFunnelItem.bind(this);
    $('.plans-add__delete-button').on('click', removeFunnelItem);

    const hideActionTables = this.hideActionTables.bind(this);
    $('.plans-add__cancel-button').on('click', hideActionTables);

    $('.plans-add__delete-button--manager').off('click');
  }

  submitYear() {
    $('[js-month-form]').trigger('submit');
  }

  renderPlans() {
    const planItem = $.map(this.plans, (elem, count) => {
      let monthName;

      $.each(this.months, (index, item) => {
        if (elem.month === index + 1) {
          monthName = item;
        };
      });

      if (this.year === elem.year) {
        return `
          <div js-plan-month class="plans-now__item">
            <input js-plan-id type="hidden" value="${elem.id}">
            <input js-current-month type="hidden" value="${elem.month}">
            <p class="plans-now__title">${monthName}</p>

            <ul class="plans-plan__list">
              <li class="plans-list__item">
                <span class="plans-item__title">Рекламный бюджет</span>
                <span adv-budget class="plans-item__value">${elem.totalAdvBudget + ' ' + '&#8381;'}</span>
              </li>
              <li class="plans-list__item">
                <span class="plans-item__title">Продажи траффик</span>
                <span traffic-count class="plans-item__value">${elem.totalTrafficSalesCount + ' ' + 'шт'}</span>
              </li>
              <li class="plans-list__item">
                <span class="plans-item__title">Выручка траффик</span>
                <span traffic-total class="plans-item__value">${elem.totalTraffic + ' ' + '&#8381;'}</span>
              </li>
              <li class="plans-list__item">
                <span class="plans-item__title">Продажи допродажа</span>
                <span additional-count class="plans-item__value">${elem.totalAdditionalSalesCount + ' ' + 'шт'}</span>
              </li>
              <li class="plans-list__item">
                <span class="plans-item__title">Выручка допродажи</span>
                <span additional-total class="plans-item__value">${elem.totalAdditional + ' ' + '&#8381;'}</span>
              </li>
            </ul>
          </div>
        `;
      };
    });

    $('.plans-now__list').append(planItem);
  }

  openPlanMenu(e) {
    const t = e.target;

    $('body').css({ overflow: 'hidden' });

    this.month = +$(t).find('[js-current-month]').val();

    $('[js-menu-plan-add]').addClass('is-open');
    $('body').css({overflow: 'hidden'})

    $.each($('.plans-funnel'), (index, item) => {
      $(item).children().remove();
    });

    let monthName = this.months[this.month - 1];

    $('.plans-add__month--value').html(monthName);
    $('.plans-add__year--value').html(this.year);

    this.type = this.getType();
    this.tabsDefault();

    $.each(this.plans, (index, item) => {
      if (item.year === this.year && item.month === this.month) {

        if (item.funnelPlans.traffic.length !== 0 || item.funnelPlans.additional.length !== 0) {
          this.itsNew = false;
          this.renderFunnels(item);
          this.setEmptyTable()

          const setSaveBoard = this.setSaveBoard.bind(this);
          $('.funnel__input').on('keyup', setSaveBoard);

          const removeManagerPlan = this.removeManagerPlan.bind(this);
          $('.funnel-manager__delete-btn').off('click');
          $('.funnel-manager__delete-btn').on('click', removeManagerPlan);

          const savePlan = this.savePlan.bind(this);
          $('.plans-add__save-button').off('click');
          $('.plans-add__save-button').on('click', savePlan);

          const removeFunnel = this.removeFunnel.bind(this);
          $('[funnel-remove]').off('click');
          $('[funnel-remove]').on('click', removeFunnel);
        } else if (item.funnelPlans.traffic.length === 0) {
          this.setEmptyTable();
        } else if (item.funnelPlans.additional.length === 0) {
          this.setEmptyTable();
        };
      };
    });
  };

  setEmptyTable() {
    $.each($('.plans-funnel'), (count, elem) => {
      if ($(elem).data('type') === this.type) {
        if ($(elem).children().length === 0) {
          const emptyTable = () => {
            return `
                        <div class="empty-table">
                            На этот месяц нет настроенных планов,<br> пожалуйста добавьте план и настройте его
                        </div>
                    `
          };

          setTimeout(() => {
            if (!$(elem).find('.empty-table').get(0)) {
              $(elem).append(emptyTable)
            }
          }, 50);
        };
      };
    });
  }

  closePlanMenu() {
    $('[js-menu-plan-add]').removeClass('is-open');

    $('body').css({overflow: 'auto'});
  }

  getType() {
    let type;

    $.each($('.plans-tabs__item'), (index, item) => {
      if ($(item).is('.active')) {
        type = $(item).data('type');
      };
    });

    return type;
  }

  changeDealType(e) {
    const t = e.target;

    $.each($('.plans-tabs__item'), (index, item) => {
      $(item).removeClass('active');
    });

    $(t).addClass('active');

    this.type = $(t).data('type');

    this.tabsDefault();

    $.each(this.plans, (index, item) => {
      if (this.year === item.year && this.month === item.month) {

        const funnels = Object.entries(item.funnelPlans);

        $.each(funnels, (count, elem) => {
          if (elem[0] === this.type && elem[1].length === 0) {
            $.each($('.plans-funnel'), (iter, subj) => {
              if ($(subj).children().length === 0) {
                this.setEmptyTable();
              };
            });
          };
        });

        if (!this.itsNew) {
          this.renderFunnels(item);

          const setSaveBoard = this.setSaveBoard.bind(this);
          $('.funnel__input').off('keyup');
          $('.funnel__input').on('keyup', setSaveBoard);

          const removeManagerPlan = this.removeManagerPlan.bind(this);
          $('.funnel-manager__delete-btn').off('click');
          $('.funnel-manager__delete-btn').on('click', removeManagerPlan);

          const savePlan = this.savePlan.bind(this);
          $('.plans-add__save-button').off('click');
          $('.plans-add__save-button').on('click', savePlan);

          const removeFunnel = this.removeFunnel.bind(this);
          $('[funnel-remove]').off('click');
          $('[funnel-remove]').on('click', removeFunnel);
        }
      };
    });
  };

  tabsDefault() {
    $.each($('.plans-funnel'), (index, item) => {
      $(item).children().remove();
    });

    $.each($('.plans-funnel'), (index, item) => {
      if ($(item).data('type') === this.type) {
        $(item).css({ display: 'flex' });
      } else {
        $(item).css({ display: 'none' });
      };
    });
  }

  closeFunnelMenu() {
    $('[js-menu-plan-add]').removeClass('is-open');
    $('body').css({overflowY: 'auto', overflowX: 'hidden'});
  }

  openFunnelMenu() {
    $('[save-board]').css({ bottom: '-100%' });
    $('[delete-board]').css({ bottom: '-100%' });

    $('.plans-add .menu__wrapper').css({ height: '100vh' });

    this.clearFunnelMenu();

    $('[js-menu-funnel-add]').addClass('is-open');

    this.funnelsName();

    const manager = $.map(this.managers, (item, index) => {
      return `
        <div class="plans-menu__manager">
          <input manager-id type="checkbox" class="plans-manager__checkbox" id="manager_${index + 1}" data-id="${item.idByType}">
          <label for="manager_${index + 1}">${item.name}</label>
        </div>
      `
    });

    $('.plans-funnel__managers-list').children().remove();
    $('.plans-funnel__managers-list').append(manager);

    $.each($('.plans-week__day-percent'), (index, item) => {
      $(item).val('');
    });

    this.newFunnel = {};
    this.newFunnel.funnelName = $('[js-funnel-name] option:selected').html();
    this.newFunnel.selectedManagers = [];
    this.newFunnel.tableMangers = [];
  }

  funnelsName() {
    const funnels = Object.entries(this.funnels);
    $('[js-funnel-name]').children().remove();

    $('[js-funnel-name]').append($('<option/>').html('Выберите воронку').attr('value', '0'));

    $.each(funnels, (index, item) => {
      if (item[0] === this.type) {

        $.each(item[1], (count, elem) => {
          $('[js-funnel-name]').append($('<option/>').html(elem.funnelName));
        });
      };
    });
  }

  closeFunnelMenu() {
    $('[js-menu-funnel-add]').removeClass('is-open');
  }

  clearFunnelMenu() {
    $.each($('[js-funnel-name]').children(), (index, item) => {
      if (index === 0) {
        $(item).prop('selected', true);
      };
    });

    $.each($('[manager-id]'), (index, item) => {
      $(item).prop('checked', false);
      $(item).prop('disabled', false);
    });
  };

  setDataForNewFunnel(e) {
    const t = e.target;

    const checkManager = $.makeArray($('[manager-id]')).some((item) => {
      return $(item).is(':checked');
    });

    if (!checkManager || +$('[js-funnel-name] option:selected').attr('value') === 0) return false;

    this.newFunnel.selectedManagers.length = 0;

    $.each($('[manager-id]'), (index, item) => {
      if ($(item).is(':checked')) {
        const manager = {
          idByType: +$(item).data('id'),
          name: $(item).closest('.plans-menu__manager').find('label').html(),
        };

        this.newFunnel.selectedManagers.push(manager);
      };
    });

    /* Определяем новая или не новая воронка */
    let funnelNames = [];

    $.each($('.plans-funnel'), (index, item) => {
      if ($(item).data('type') === this.type) {
        $.each($(item).children(), (count, elem) => {
          const name = $(elem).find('.funnel-manager__title').html();
          funnelNames.push(name);
        });
      };
    });

    const editFunnel = funnelNames.includes(this.newFunnel.funnelName);

    this.plansPercents = [];
    this.plansPercents.length = 0;

    $.each($('.plans-week__day-percent'), (iter, subj) => {
      let percent = isNaN(+$(subj).val()) ? null : +$(subj).val() === 0 ? null : +$(subj).val();

      this.plansPercents.push(percent);
    })

    if (editFunnel) {
      this.itsNew = false;

      this.setDataEditableFunnel(this.newFunnel);
    } else {
      this.itsNew = true;
      this.renderNewFunnel(this.newFunnel);

      const setSaveBoard = this.setSaveBoard.bind(this);
      $('.funnel__input').off('keyup');
      $('.funnel__input').on('keyup', setSaveBoard);

      const removeManagerPlan = this.removeManagerPlan.bind(this);

      $.each($('.funnel-manager__delete-btn'), (index, item) => {
        $(item).off('click');
        $(item).on('click', removeManagerPlan);
      });

      const savePlan = this.savePlan.bind(this);
      $('.plans-add__save-button').off('click');
      $('.plans-add__save-button').on('click', savePlan);

      const removeFunnel = this.removeFunnel.bind(this);
      $('[funnel-remove]').off('click');
      $('[funnel-remove]').on('click', removeFunnel);
    }

    this.setSaveBoard();
  };

  selectFunnel(e) {
    $.each($('.plans-manager__checkbox'), (index, item) => {
      $(item).prop('checked', false);
      $(item).prop('disabled', false);
    });

    this.newFunnel.selectedManagers.length = 0;
    this.newFunnel.funnelName = $('[js-funnel-name] option:selected').html();

    this.getManagerInTabel();

    $.each($('.plans-manager__checkbox'), (index, item) => {
      $.each(this.newFunnel.selectedManagers, (count, elem) => {
        if (elem.id === $(item).data('id')) {
          $(item).prop('checked', true);
          $(item).prop('disabled', true);
        };
      });
    });

    $.each(this.plans, (index, item) => {
      if (this.year === item.year && this.month === item.month) {
        const funnels = Object.entries(item.funnelPlans);

        $.each(funnels, (count, elem) => {
          const type = elem[0];
          const items = elem[1];

          if (this.type === type) {
            $.each(items, (iter, subj) => {

              if ($('[js-funnel-name] option:selected').html() === subj.funnel.funnelName) {

                const weekPlan = $.map(this.week, (element, counter) => {
                  let value;

                  $.each(subj.planPercents, (ind, obj) => {
                    if (counter === ind) {
                      value = obj;
                    }
                  });

                  return `
                    <div class="plans-week__day">
                      <div class="plans-week__title"><span class="plans-week__name">${element}</span></div>
                      <input class="plans-week__day-percent" value="${value !== null ? value : ''}" placeholder="0" data-day="${counter + 1}" type="text">
                    </div>
                  `;
                });

                $('.plans-funnel__week').children().remove();
                $('.plans-funnel__week').append(weekPlan);
              } else {
                $('.plans-week__day-percent').val('');
              }
            });
          };
        });
      };
    });
  };

  getManagerInTabel(str) {
    this.newFunnel.tableMangers.length = 0;

    $.each($('.plans-funnel'), (index, item) => {
      if ($(item).data('type') === this.type) {
        $.each($(item).children(), (count, elem) => {
          const name = $(elem).find('.funnel-manager__title').html();

          if (name === this.newFunnel.funnelName) {
            this.editableItem = elem;
            const tbody = $(elem).find('tbody');

            $.each($(tbody).children(), (iter, subj) => {
              const manager = {
                id: +$(subj).find('[js-manager-id]').val(),
                name: $(subj).find('.funnel-manager__name').html(),
              };

              if (str === 'table') {
                this.newFunnel.tableMangers.push(manager);
              } else {
                this.newFunnel.selectedManagers.push(manager);
              }
            });
          };
        });
      };
    });
  }

  renderNewFunnel(funnel) {
    $.each($('.plans-funnel'), (index, item) => {
      if ($(item).data('type') === this.type) {
        const manager = $.map(funnel.selectedManagers, (elem, count) => {
          return `
            <tr class="plans-funnel__manager manager-row">
              <input js-manager-id type="hidden" value="${elem.idByType}">
              <td class="funnel-manager__name">${elem.name}</td>
              ${(this.type === 'traffic') ? `<td class="funnel-manager__adv"><input class="funnel__input" autocomplete="off" funnel-input manager-adv type="text"></td>` : ''}
              <td class="funnel-manager__sales ${(this.type === 'additional') ? 'additional-sales' : ''}"><input class="funnel__input" autocomplete="off" funnel-input manager-sales type="text"></td>
              <td class="funnel-manager__revenue ${(this.type === 'additional') ? 'additional-sales' : ''}"><input class="funnel__input" autocomplete="off" funnel-input manager-revenue type="text"></td>
              <td class="funnel-manager__delete"><span class="funnel-manager__delete-btn">х</span></td>
            </tr>
          `
        });

        const funnelTable = () => {
          return `
              <div class="plans-funnel__manager manager-item ${(this.type === 'additional') ? 'manager-item__additional' : ''}">
                <div class="funnel-manager__nav">
                  <span class="funnel-manager__title">${funnel.funnelName}</span>
                </div>
                <div class="funnel-manager__inner">
                  <table class="funnel-manager__table ${(this.type === 'additional') ? 'additional-table' : ''}">
                    <thead class="funnel-manager__head">
                      <tr class="funnel-manager__head-row">
                        <td class="funnel-manager__name">Сотрудник</td>
                        ${(this.type === 'traffic') ? `<td class="funnel-manager__adv">Рекламный бюджет</td>` : ''}
                        <td class="funnel-manager__sales ${(this.type === 'additional') ? 'additional-sales' : ''}">Продажи</td>
                        <td class="funnel-manager__revenue ${(this.type === 'additional') ? 'additional-sales' : ''}">Выручка</td>
                      </tr>
                    </thead>
                    <tbody class="funnel-manager__tbody">
                      ${manager.join('')}
                    </tbody>
                  </table>
                  <div class="funnel-manager__settings ${(this.type === 'additional') ? 'additional-inner' : ''}">
                    <span funnel-remove class="funnel-settings funnel-settings__remove"></span>
                  </div>
                </div>
              </div>
          `;
        };

        if ($(item).find('.empty-table').get(0)) {
          $(item).find('.empty-table').remove();
        };

        $(item).append(funnelTable);
      };
    });

    this.closeFunnelMenu();
  };

  setDataEditableFunnel(funnel) {
    this.getManagerInTabel('table');

    const managerTable = [];
    managerTable.length = 0;

    $.each(this.newFunnel.tableMangers, (index, item) => {
      managerTable.push(item.id);
    });

    const managerMenu = [];
    managerMenu.length = 0;

    $.each(this.newFunnel.selectedManagers, (index, item) => {
      managerMenu.push(item.idByType);
    });

    const deleted = managerTable.filter((item) => !managerMenu.includes(item));

    this.deletedManagersPlans = deleted;

    const append = managerMenu.filter((item) => !managerTable.includes(item));

    this.renderEditableFunnel(deleted, append);

    this.itsNew = false;

    const setSaveBoard = this.setSaveBoard.bind(this);
    $('.funnel__input').off('keyup');
    $('.funnel__input').on('keyup', setSaveBoard);

    const removeManagerPlan = this.removeManagerPlan.bind(this);

    $.each($('.funnel-manager__delete-btn'), (index, item) => {
      $(item).off('click');
      $(item).on('click', removeManagerPlan);
    });

    const savePlan = this.savePlan.bind(this);
    $('.plans-add__save-button').off('click');
    $('.plans-add__save-button').on('click', savePlan);

    const removeFunnel = this.removeFunnel.bind(this);
    $('[funnel-remove]').off('click');
    $('[funnel-remove]').on('click', removeFunnel);
  };

  renderEditableFunnel(deleted, append) {
    const items = $(this.editableItem).find('.manager-row');

    /* Удаляем не выбранные итемы */
    $.each(items, (index, item) => {
      const id = +$(item).find('[js-manager-id]').val();

      $.each(deleted, (count, elem) => {
        if (elem === id) {
          $(item).remove();
        };
      });
    });

    /* Добавляем выбранные итемы */
    const appendManagers = [];

    $.each(this.managers, (index, item) => {
      $.each(append, (count, elem) => {
        if (item.idByType === elem) {
          appendManagers.push(item);
        };
      });
    });

    const appendManager = $.map(appendManagers, (item, index) => {
      return `
      <tr class="plans-funnel__manager manager-row">
        <input js-manager-id type="hidden" value="${item.idByType}">
        <td class="funnel-manager__name">${item.name}</td>
        ${(this.type === 'traffic') ? `<td class="funnel-manager__adv"><input class="funnel__input" funnel-input manager-adv type="text"></td>` : ''}
        <td class="funnel-manager__sales ${(this.type === 'additional') ? 'additional-sales' : ''}"><input class="funnel__input" funnel-input manager-sales type="text"></td>
        <td class="funnel-manager__revenue ${(this.type === 'additional') ? 'additional-sales' : ''}"><input class="funnel__input" funnel-input manager-revenue type="text"></td>
        <td class="funnel-manager__delete"><span class="funnel-manager__delete-btn">х</span></td>
      </tr>
    `
    });

    const table = $(this.editableItem).find('tbody');

    $(table).append(appendManager);

    if (deleted.length !== 0) {
      $.each(deleted, (index, item) => {
        $.each(items, (count, elem) => {
          const manager = +$(elem).find('[js-manager-id]').val();

          if (item == manager) {
            const id = +$(elem).find('[js-id-manager-plan]').val();
          };
        });
      });
    };

    this.closeFunnelMenu();
  };

  setSaveBoard(e) {
    if (this.saveBoard) {
      return false;
    }

    if (e) {
      this.editIdKeyUp = $(e.target).closest('.manager-item').find('[js-funnel-id]').attr('value');
    }

    if (!this.saveBoard) {
      $('[delete-board]').css({ bottom: '-100%' });
      $('[delete-manager-board]').css({ bottom: '-100%' });
      $('.plans-add .menu__wrapper').css({ height: '100vh' });
      $('[save-board]').css({ bottom: '0' });

      setTimeout(() => {
        $('.plans-add .menu__wrapper').css({ height: 'calc(100vh - 80px)' });
      }, 400);

      this.saveBoard = true;
      this.deletedBoard = false;
      this.deletedManagerBoard = false;

      return false;
    }
  };

  setDeletedManagerBoard() {

    if (!this.deletedManagerBoard) {
      $('[save-board]').css({ bottom: '-100%' });
      $('[delete-board]').css({ bottom: '-100%' });
      $('.plans-add .menu__wrapper').css({ height: '100vh' });
      $('[delete-manager-board]').css({ bottom: '0' });

      setTimeout(() => {
        $('.plans-add .menu__wrapper').css({ height: 'calc(100vh - 80px)' });
      }, 400);

      this.deletedManagerBoard = true;
      this.saveBoard = false;
      this.deletedBoard = false;

      return false;
    }

    if (this.deletedManagerBoard) {
      $('[save-board]').css({ bottom: '-100%' });
      $('[delete-board]').css({ bottom: '-100%' });
      $('.plans-add .menu__wrapper').css({ height: '100vh' });

      setTimeout(() => {
        $('[delete-manager-board]').css({ bottom: '-100%' })
      }, 100);

      setTimeout(() => {
        $('[delete-manager-board]').css({ bottom: '0' });
      }, 200);

      setTimeout(() => {
        $('.plans-add .menu__wrapper').css({ height: 'calc(100vh - 80px)' });
      }, 600);
    };
  }

  setDeleteBoard(e) {
    if (!this.deletedBoard) {
      $('[save-board]').css({ bottom: '-100%' });
      $('[delete-manager-board]').css({ bottom: '-100%' });
      $('.plans-add .menu__wrapper').css({ height: '100vh' });

      setTimeout(() => {
        $('[delete-board]').css({ bottom: '0' });
      }, 100);

      setTimeout(() => {
        $('.plans-add .menu__wrapper').css({ height: 'calc(100vh - 80px)' });
      }, 1000);

      this.deletedBoard = true;
      this.deletedManagerBoard = false;
      this.saveBoard = false;

      return false;
    }

    if (this.deletedBoard) {
      $('[save-board]').css({ bottom: '-100%' });
      $('[delete-manager-board]').css({ bottom: '-100%' });
      $('.plans-add .menu__wrapper').css({ height: '100vh' });

      setTimeout(() => {
        $('[delete-board]').css({ bottom: '-100%' })
      }, 100);

      setTimeout(() => {
        $('[delete-board]').css({ bottom: '0' });
      }, 200);

      setTimeout(() => {
      //   $('.plans-add .menu__wrapper').css({ height: 'calc(100vh - 80px)' });

      }, 400);
    };
  };

  removeFunnel(e) {
    const t = e.target;

    const item = $(t).closest('.plans-funnel__manager');

    this.deletedIdFunnel = +$(item).find('[js-funnel-id]').val();

    if (!this.itsNew) {
      this.setDeleteBoard();
    } else {
      $(item).remove();

      $.each($('.plans-funnel'), (index, item) => {
        if ($(item).data('type') === this.type) {
          if ($(item).children().length === 0) {
            this.setEmptyTable();
          };
        };
      });

      $('.plans-add .menu__wrapper').css({height: '100vh'});
      $('.plans-add .menu__wrapper').css({height: '100vh'});
      $('[save-board]').css({bottom: '-100%'});
      $('[delete-board]').css({bottom: '-100%'});
      $('[delete-maanger-board]').css({bottom: '-100%'});

      this.saveBoard = false;
      this.deletedBoard = false;
      this.deletedManagerBoard = false;
    }
  }

  removeFunnelItem(e) {
    e.preventDefault();
    e.stopPropagation();

    planAPI.closeMenu = false;

    planAPI.deleteFunnel(this.deletedIdFunnel);
  }

  savePlan(e) {
    e.stopPropagation();
    e.preventDefault();

    const plan = {};

    plan.year = this.year;
    plan.month = this.month;

    planAPI.year = this.year;
    planAPI.month = this.month;

    plan.totalAdditional = 0;
    plan.totalAdditionalSalesCount = 0;
    plan.totalAdvBudget = 0;
    plan.totalTraffic = 0;
    plan.totalTrafficSalesCount = 0;
    plan.funnelPlans = {};
    plan.funnelPlans.traffic = [];
    plan.funnelPlans.additional = [];

    $.each($('.plans-funnel'), (index, item) => {
      if ($(item).data('type') === this.type) {
        $.each($(item).children(), (count, elem) => {
          const funnel = {};
          funnel.funnel = {};

          const name = $(elem).find('.funnel-manager__title').html();

          const funnelsItems = Object.entries(this.funnels);

          $.each(funnelsItems, (iter, subj) => {
            const type = subj[0];
            const items = subj[1];

            if (type === this.type) {
              $.each(items, (iterator, subject) => {
                if (subject.funnelName === name && this.type === subject.dealType) {
                  funnel.funnel = subject;
                }
              });
            };
          });

          if ($(elem).find('[js-funnel-id]').get(0)) {
            funnel.idFunnelPlan = +$(elem).find('[js-funnel-id]').val();
          }

          funnel.year = this.year;
          funnel.month = this.month;
          funnel.managerPlans = [];

          if (!this.plansPercents) {
            let id = +this.editIdKeyUp;
            let typeFunnel = this.type;

            $.each(this.plans, (iter, subj) => {
              const funnelsItems = Object.entries(subj.funnelPlans);

              $.each(funnelsItems, (iterator, subject) => {
                const type = subject[0];
                const items = subject[1];

                if (type === typeFunnel) {
                  $.each(items, (counter, element) => {
                    if (element.idFunnelPlan === id) {
                      this.plansPercents = element.planPercents;
                    };
                  });
                };
              });
            });
          };

          funnel.planPercents = this.plansPercents;

          const table = $(elem).find('.manager-row');

          $.each($(table), (iter, subj) => {

            const managerPlan = {};

            managerPlan.manager = {};

            const idManager = +$(subj).find('[js-manager-id]').val();

            $.each(this.managers, (iterator, subject) => {
              if (subject.idByType === idManager) {
                managerPlan.manager = subject;
              };
            });

            if ($(subj).find('[js-id-manager-plan]').get(0)) {
              managerPlan.idManagerPlan = +$(subj).find('[js-id-manager-plan]').val();
            }

            if ($(subj).find('[js-id-funnel-plan]').get(0)) {
              managerPlan.idFunnelPlan = +$(subj).find('[js-id-funnel-plan]').val();
            }

            managerPlan.advBudget = +$(subj).find('[manager-adv]').val();
            managerPlan.salesCount = +$(subj).find('[manager-sales]').val();
            managerPlan.revenue = +$(subj).find('[manager-revenue]').val();

            funnel.managerPlans.push(managerPlan);
          });

          const funnelsTypes = Object.entries(plan.funnelPlans);

          $.each(funnelsTypes, (iter, subj) => {
            const type = subj[0];
            const item = subj[1];

            if (type === this.type && funnel.funnel.dealType === this.type) {
              item.push(funnel);
            };
          });
        });
      };
    });

    if (plan.funnelPlans.traffic.length === 0 && plan.funnelPlans.additional.length === 0) {
    } else {
      planAPI.closeMenu = false;
      planAPI.save(plan);
    }
  }

  afterSave(data) {
    this.saveBoard = false;
    this.deleteBoard = false;
    this.deletedManagerBoard = false;
    this.itsNew = false;

    const year = data.year;
    const month = data.month;

    const position = this.plans.findIndex((val) => val.year === year && val.month === month);

    this.plans.splice(position, 1);
    this.plans.push(data);

    if (year === +$('[js-select-year] option:selected').attr('value')) {
      $.each($('[js-plan-month]'), (index, item) => {
        const monthPlan = +$(item).find('[js-current-month]').val();

        if (month === monthPlan) {
          $(item).find('[js-plan-id]').val(data.id);
          $(item).find('[adv-budget]').html(`${data.totalAdvBudget + ' ' + '&#8381;'}`);
          $(item).find('[traffic-count]').html(`${data.totalTrafficSalesCount + ' ' + 'шт'}`);
          $(item).find('[traffic-total]').html(`${data.totalTraffic + ' ' + '&#8381;'}`);
          $(item).find('[additional-count]').html(`${data.totalAdditionalSalesCount + ' ' + 'шт'}`)
          $(item).find('[additional-total]').html(`${data.totalAdditional + ' ' + '&#8381;'}`)
        };
      });
    };

    /* Расставляем id */
    $.each($('.plans-funnel'), (index, item) => {
      if ($(item).data('type') === this.type) {

        const funnels = Object.entries(data.funnelPlans);

        $.each(funnels, (count, elem) => {
          const type = elem[0];
          const items = elem[1];

          if (type === this.type) {
            $.each(items, (iter, subj) => {
              $.each($(item).children(), (iterator, subject) => {
                const name = $(subject).find('.funnel-manager__title').html();

                if (name === subj.funnel.funnelName) {
                  if (!$(subject).find('[js-funnel-id]').get(0)) {
                    $(subject).append($('<input/>').attr('type', 'hidden').attr('js-funnel-id', ''))
                  }

                  $(subject).find('[js-funnel-id]').val(`${subj.idFunnelPlan}`);

                  $.each(subj.managerPlans, (counter, element) => {
                    $.each($(subject).find('.manager-row'), (ind, obj) => {

                      const idManager = +$(obj).closest('.manager-row').find('[js-manager-id]').val();

                      if (idManager === element.manager.idByType) {

                        if (!$(obj).find('[js-id-manager-plan]').get(0)) {
                          $(obj).append($('<input>').attr('type', 'hidden').attr('js-id-manager-plan', ''))
                        }

                        $(obj).find('[js-id-manager-plan]').val(`${element.idManagerPlan}`);

                        if (!$(obj).find('[js-id-funnel-plan]').get(0)) {
                          $(obj).append($('<input>').attr('type', 'hidden').attr('js-id-funnel-plan', ''))
                        }

                        $(obj).find('[js-id-funnel-plan]').val(`${element.idFunnelPlan}`);
                      };
                    });
                  });
                };
              });
            });
          };
        });
      };
    });
  }

  renderFunnels(plan) {
    this.renderedPlan = plan;

    $.each($('.plans-funnel'), (index, item) => {
      $(item).children().remove();

      if ($(item).data('type') === this.type) {

        const funnelsType = Object.entries(plan.funnelPlans);

        $.each(funnelsType, (count, elem) => {
          const type = elem[0];
          const funnels = elem[1];

          if (type === this.type) {
            $.each(funnels, (iter, subj) => {
              const manager = $.map(subj.managerPlans, (subject, iterator) => {
                return `
                  <tr class="plans-funnel__manager manager-row">
                    <input js-id-manager-plan value="${subject.idManagerPlan}" type="hidden">
                    <input js-id-funnel-plan value="${subject.idFunnelPlan}" type="hidden">
                    <input js-manager-id type="hidden" value="${subject.manager.idByType}">
                    <td class="funnel-manager__name">${subject.manager.name}</td>
                    ${(this.type === 'traffic') ? `<td class="funnel-manager__adv"><input class="funnel__input" placeholder="0" autocomplete="off" funnel-input manager-adv value="${(subject.advBudget === 0) ? '' : subject.advBudget}" type="text"></td>` : ''}
                    <td class="funnel-manager__sales ${(this.type === 'additional') ? 'additional-sales' : ''}"><input class="funnel__input" placeholder="0" autocomplete="off" value="${(subject.salesCount === 0) ? '' : subject.salesCount}" funnel-input manager-sales type="text"></td>
                    <td class="funnel-manager__revenue ${(this.type === 'additional') ? 'additional__revenue' : ''}"><input class="funnel__input" placeholder="0" autocomplete="off" value="${(subject.revenue === 0) ? '' : subject.revenue}" funnel-input manager-revenue type="text"></td>
                    <td class="funnel-manager__delete"><span class="funnel-manager__delete-btn">х</span></td>
                  </tr>
                `;
              });

              const trafficItem = () => {
                return `
                  <div class="plans-funnel__manager manager-item ${(this.type === 'additional') ? 'manager-item__additional' : ''}">
                    <input js-funnel-id value="${subj.idFunnelPlan}" type="hidden">
                    <div class="funnel-manager__nav">
                      <span class="funnel-manager__title">${subj.funnel.funnelName}</span>
                    </div>
                    <div class="funnel-manager__inner">
                      <table class="funnel-manager__table">
                        <thead class="funnel-manger__head">
                          <tr class="funnel-manager__head-row">
                            <td class="funnel-manager__name">Сотрудник</td>
                            ${(this.type === 'traffic') ? `<td class="funnel-manager__adv">Рекламный бюджет</td>` : ''}
                            <td class="funnel-manager__sales">Продажи</td>
                            <td class="funnel-manager__revenue">Выручка</td>
                          </tr>
                        </thead>
                        <tbody class="funnel-manager__tbody">
                          ${manager.join('')}
                        </tbody>
                      </table>
                    <div class="funnel-manager__settings">
                        <span funnel-remove class="funnel-settings funnel-settings__remove"></span>
                    </div>
                  </div>
                </div>
              `;
              };

              $(item).append(trafficItem);
            });
          };
        });
      };
    });

    const setSaveBoard = this.setSaveBoard.bind(this);
    $('.funnel__input').off('keyup');
    $('.funnel__input').on('keyup', setSaveBoard);

    const removeManagerPlan = this.removeManagerPlan.bind(this);
    $('.funnel-manager__delete-btn').off('click');
    $('.funnel-manager__delete-btn').on('click', removeManagerPlan);

    const savePlan = this.savePlan.bind(this);
    $('.plans-add__save-button').off('click');
    $('.plans-add__save-button').on('click', savePlan);
  };

  afterDeleteFunnel() {
    planAPI.year = this.year;
    planAPI.month = this.month;

    $.each($('.plans-funnel'), (index, item) => {
      if ($(item).data('type') === this.type) {

        $.each($(item).children(), (count, elem) => {
          const id = +$(elem).find('[js-funnel-id]').val();
          if (id === this.deletedIdFunnel) {
            $(elem).remove();
          };
        });
      };
    });
    $('[delete-board]').css({ bottom: '-100%' });

    this.saveBoard = false;
    this.deletedBoard = false;
    this.deletedManagerBoard = false;

    $.each($('.plans-funnel'), (index, item) => {
      if ($(item).data('type') === this.type) {
        if ($(item).children().length === 0) {
          this.setEmptyTable();
        };
      };
    });

    setTimeout(() => {
      $('.plans-add .menu__wrapper').css({ height: '100vh' });
    }, 50);
  };

  removeManagerPlan(e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    const deletedManager = this.deleteManager.bind(this, t);

    if (!this.itsNew) {

      if (!$(t).closest('.manager-row').find('[js-id-manager-plan]').get(0)) {
        $(t).closest('.manager-row').remove();
      } else {
        this.setDeletedManagerBoard();

        $('.plans-add__delete-button--manager').off('click');
        $('.plans-add__delete-button--manager').on('click', deletedManager);

        $('.plans-add__cancel-button').off('click');
        $('.plans-add__cancel-button').on('click', this.hideActionTables);
      }

    } else {
      const items = $(t).closest('.manager-item').find('.manager-row');

      if($(items).length === 1) {
        $(t).closest('.manager-item').remove();
        $('[save-board]').css({bottom: '-100%'});
        $('[delete-board]').css({bottom: '-100%'});
        $('[delete-maanger-board]').css({bottom: '-100%'});

        this.saveBoard = false;
        this.deletedBoard = false;
        this.deletedManagerBoard = false;

        $.each($('.plans-funnel'), (index, item) => {
          if ($(item).data('type') === this.type) {
            if ($(item).children().length === 0) {
              this.setEmptyTable();
            };
          };
        });

        setTimeout(() => {
          $('.plans-add .menu__wrapper').css({height: '100vh'});
        }, 50)

      } else {
        $(t).closest('.manager-row').remove();
      }
    }
  }

  deleteManager(t, e) {
    e.preventDefault();
    e.stopPropagation();

    const deletedIdManagerPlan = +$(t).closest('.manager-row').find('[js-id-manager-plan]').val();

    planAPI.deleteManagerPlan(deletedIdManagerPlan);

    const deletedManagerFunnel = +$(t).closest('.manager-row').find('[js-id-funnel-plan]').val();

    this.deletedManagerId = deletedIdManagerPlan;
    this.deletedFunnelId = deletedManagerFunnel;
  }

  hideActionTables(e) {
    e.preventDefault();
    e.stopPropagation();

    this.saveBoard = false;
    this.deletedBoard = false;
    this.deletedManagerBoard = false;

    $('.plans-add .menu__wrapper').css({ height: '100vh' });

    setTimeout(() => {
      $('[save-board]').css({ bottom: '-100%' });
      $('[delete-board]').css({ bottom: '-100%' });
      $('[delete-manager-board]').css({ bottom: '-100%' });
    }, 100);
  };

  afterDeleteManagerPlan() {

    $.each($('.plans-funnel'), (index, item) => {
      if ($(item).data('type') === this.type) {
        $.each($(item).children(), (count, elem) => {
          const id = +$(elem).find('[js-funnel-id]').val();

          if (this.deletedFunnelId === id) {
            $.each($(elem).find('.manager-row'), (iter, subj) => {
              const idManager = +$(subj).find('[js-id-manager-plan]').val();

              if (idManager === this.deletedManagerId) {
                $(subj).remove();
              };
            });

            if ($(elem).find('.manager-row').length === 0) {
              planAPI.deleteFunnel(this.deletedFunnelId);
              $(elem).remove();
            };
          };
        });
      };
    });

    this.saveBoard = false;
    this.deletedBoard = false;
    this.deletedManagerBoard = false;

    $('[delete-manager-board]').css({ bottom: '-100%' });
    $('.plans-add .menu__wrapper').css({ height: '100vh' });

    planAPI.month = this.months.indexOf($('.plans-add__month--value').html()) + 1;
    planAPI.year = +$('.plans-add__year--value').html();

    planAPI.closeMenu = false;
  };
};

Object.assign(Plan.prototype, planAPI);

let plan = new Plan();
