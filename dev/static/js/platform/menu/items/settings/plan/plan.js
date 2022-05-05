import Utils from '../../../../utils/utils.js';

const utils = new Utils();

class Plan {
  closePlanMenu() {
    const menu = document.querySelector('[js-menu-plan-add]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);
  }

  selectFunnel() {
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
        }
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
          }
        });
      }
    });
  }
}

export default Plan;
