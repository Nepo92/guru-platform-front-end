import Utils from '../../../../../utils/utils.js';
import DealTemplates from '../templates/templates.js';
import Select from '../../../../../modules/select/select.js';

const utils = new Utils();
const dealTemplates = new DealTemplates();
const select = new Select();

class RenderDealCards {
  async render(dealCard) {
    const {
      deals,
      pack,
      menu,
      client,
    } = dealCard;

    if (deals && menu) {
      const dealWrapper = menu.querySelector('[js-client-deals]');

      utils.removeChildren(dealWrapper);

      const renderProps = {
        dealWrapper,
        dealCard,
        deals,
        menu,
        pack,
      };

      await this.#renderContent(renderProps);

      const createDealBtnProps = {
        pack,
        deals,
        dealWrapper,
      };

      if (!client?.hidden) {
        this.setCreateDealBtn(createDealBtnProps);
      }
    }
  }

  async #renderContent(renderProps) {
    const {
      dealWrapper,
      deals,
    } = renderProps;

    if (deals.length) {
      await this.renderDeals(renderProps);
      await this.setSelectsToDealCard(renderProps);
      this.setImageToDeals(renderProps);
    } else {
      await this.setPlaceholder(dealWrapper);
    }
  }

  setImageToDeals(props) {
    const { deals } = props;

    if (deals.length) {
      deals.forEach((item) => {
        if (item.backgroundImage) {
          const image = document.createElement('img');

          image.setAttribute('src', `/${item.backgroundImage}`);
          image.classList.add('deal-card__img');
          image.style.opacity = '0';
          image.style.transition = 'all 0.2s linear';

          if (item.isHidden) {
            image.classList.add('hiden');
          }

          image.onload = () => {
            const dealCard = document.querySelector(`.deal-card[data-deal="${item.id}"]`);
            const header = dealCard.querySelector('.deal-card__header');

            header.querySelector('.deal-card__img')?.remove();

            header.appendChild(image);

            setTimeout(() => {
              image.style.opacity = '1';
            }, 100);
          };
        } else {
          const dealCard = document.querySelector(`.deal-card[data-deal="${item.id}"]`);

          const img = dealCard.querySelector('.deal-card__img');

          if (img) {
            img.remove();
          }
        }
      });
    }
  }

  async renderDeals(renderProps) {
    const { deals } = renderProps;

    const renderDealCard = this.renderDealCard.bind(this, renderProps);

    await deals.forEach(renderDealCard);
  }

  async renderDealCard(renderProps, item) {
    const {
      dealWrapper,
      dealCard,
    } = renderProps;

    const div = document.createElement('div');
    div.classList.add('deal-card');
    div.setAttribute('data-deal', item.id);
    div.setAttribute('data-client', item.idClient);
    div.innerHTML = dealTemplates.renderDealCard(item, dealCard);

    await dealWrapper.appendChild(div);
  }

  setPlaceholder(dealWrapper) {
    const span = document.createElement('spans');
    span.classList.add('platform__empty');
    span.innerText = 'Нет сделок...';
    dealWrapper.appendChild(span);
  }

  setCreateDealBtn(createDealBtnProps) {
    const {
      pack,
      deals,
      dealWrapper,
    } = createDealBtnProps;

    const { role } = pack;

    if (role === 'ROLE_MANAGER' || role === 'ROLE_HEAD_MANAGER') {
      if (!deals.length) {
        utils.removeChildren(dealWrapper);
      }

      const div = document.createElement('div');
      div.classList.add('deal-card');
      div.classList.add('deal-card__create');
      const span = document.createElement('span');
      span.classList.add('deal-card__create--icon');
      div.innerText = 'Создать сделку';

      const cards = document.querySelectorAll('.deal-card');

      if (cards.length) {
        div.style.height = cards[cards.length - 1].offsetHeight;
      }

      div.appendChild(span);

      dealWrapper.appendChild(div);
    }
  }

  async setSelectsToDealCard(props) {
    const { menu } = props;

    const selects = menu.querySelectorAll('[select-here]');

    if (selects.length) {
      props.selectsArray = [];

      selects.forEach(async (item) => {
        const value = item.getAttribute('data-status-code');
        const name = item.getAttribute('data-status-name');
        const type = item.getAttribute('data-select-type');

        const selectProps = {
          required: false,
          placeholder: null,
          mode: 'custom',
          item,
          type,
          defaultValue: value,
          defaultPlaceholder: name === 'Рассрочка' ? 'Долями' : name,
          name: null,
          openUp: true,
        };

        await props.selectsArray.push(selectProps);
      });

      await select.init(props);
    }
  }
}

export default RenderDealCards;
