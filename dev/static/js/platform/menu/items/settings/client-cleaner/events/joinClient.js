import Utils from '../../../../../utils/utils.js';
import Popup from '../../../../../modules/popup/popup.js';
import { clientCleanerAPI, dealAPI } from '../../../../../api/api.js';

const utils = new Utils();
const popup = new Popup();

class JoinClient {
  init(props, t) {
    this.checkUniqClientBeforeAddJoinArray(t, props);

    if (props.joinArray.length === 2) {
      this.setJoinPopup(props, t);
    }

    if (props.joinArray.length > 2) {
      this.clearJoinArray(props);
    }
  }

  checkUniqClientBeforeAddJoinArray(t, props) {
    const item = utils.getParent(t, 'coincedence-client__item');
    const idClient = +item.getAttribute('data-id');

    const checkGeneral = item.parentNode === props.joinArray[0]?.parent;
    const generalParent = props.joinArray.length === 0 ? true : checkGeneral;

    const isUniqCheck = !props.joinArray.find((el) => el.idClient === idClient);

    if (isUniqCheck && generalParent) {
      this.addClientToJoinArray(item, idClient, props);
    } else if (isUniqCheck && !generalParent) {
      this.clearJoinArray(props);
      this.addClientToJoinArray(item, idClient, props);
    }

    if (!isUniqCheck) {
      props.joinArray = props.joinArray.filter((el) => el.idClient !== idClient);
    }

    item.classList.toggle('active');
  }

  addClientToJoinArray(item, idClient, props) {
    const name = item.querySelector('.coincedence-client__name').innerText.trim();

    const clientObject = {
      idClient,
      parent: item.parentNode,
      name,
    };

    props.joinArray.push(clientObject);
  }

  clearJoinArray(props) {
    props.joinArray.length = 0;

    const activeItems = document.querySelectorAll('.coincedence-client__item.active');

    activeItems.forEach((elem) => {
      elem.classList.remove('active');
    });
  }

  setJoinPopup(props, t) {
    const [first, second] = props.joinArray;
    props.joinedDeals = [];

    const getDeals = this.getDeals(props);

    utils.showLoader();
    document.body.style.overflow = 'hidden';

    getDeals.then((deals) => {
      props.joinedDeals = deals.map((item) => {
        return {
          id: item.id,
          title: item.course,
        };
      });

      const joinClients = this.joinClients.bind(this, props, t);
      const renderContentInJoinPopup = this.renderContentInJoinPopup.bind(this, props);

      const joinPopupProps = {
        text: `Вы действительно хотите объединить <b><u>${first.name}</u></b> с <b><u>${second.name}</u></b>`,
        settings: 'content',
        title: null,
        ok: joinClients,
        cancel: null,
        target: t,
        contentCreator: renderContentInJoinPopup,
      };

      setTimeout(() => {
        utils.hideLoader();
        popup.init(joinPopupProps);

        this.setPopupEvents(props);
      }, 500);
    });
  }

  async getDeals(props) {
    for (let index = 0; index < props.joinArray.length; index++) {
      const element = props.joinArray[index];
      props.joinedDeals.push(await dealAPI.getDeals(element.idClient));
    }

    const [first, second] = props.joinedDeals;

    let result = [...first];

    result = result.map((el) => {
      const coincedence = second.find((item) => item.course === el.course);

      return coincedence || el;
    });

    second.forEach((el, count) => {
      const coincedence = result.find((item) => item.course === el.course);

      if (coincedence) {
        second.splice(count, 1);
      } else {
        result.push(el);
      }
    });

    return await result;
  }

  async joinClients(props) {
    const { selectedDeals } = props;
    const [first, second] = props.joinArray;
    const { idClient: idFirst } = first;
    const { idClient: idSecond } = second;

    if (selectedDeals.length === 0) {
      document.querySelectorAll('.join-popup__checkbox').forEach((item) => {
        selectedDeals.push(+item.value);
      });
    }

    utils.showLoader();

    try {
      const dialogWrapper = document.querySelector('[dialog-window]');
      dialogWrapper.remove();

      await clientCleanerAPI.joinCopies(idFirst, idSecond, selectedDeals);

      const secondClient = document.querySelector(`.coincedence-client__item[data-id="${second.idClient}"]`);

      if (secondClient) {
        const index = first.parent.getAttribute('data-index');
        const item = document.querySelector(`.coincedence__item[data-index="${index}"]`);

        const quanity = item.querySelector('.coincedence__quanity');

        const quanityValue = parseInt(quanity.innerText, 10);

        if (quanityValue === 2) {
          await clientCleanerAPI.removeClient(second.idClient);
          item.remove();
          await first.parent.remove();

          utils.hideLoader();
          document.body.style.overflow = 'auto';
        } else {
          await clientCleanerAPI.removeClient(second.idClient);
          quanity.innerText = `${quanityValue - 1} шт`;

          secondClient.remove();

          await this.clearJoinArray(props);

          utils.hideLoader();
          document.body.style.overflow = 'auto';
        }
      }

      return await new Promise((resolve) => { resolve(); });
    } catch (error) {
      utils.hideLoader();

      const popupProps = {
        text: 'Попробуйте еще раз или сообщите администратору',
        settings: 'alert-close',
        title: 'Ошибка!',
        ok: null,
        close: null,
        target: null,
      };

      await popup.init(popupProps);

      return new Promise(() => { });
    }
  }

  renderContentInJoinPopup(props) {
    return this.setDealInPopup(props);
  }

  setDealInPopup(props) {
    const { joinedDeals } = props;

    const deals = joinedDeals.map((item, index) => {
      return `
        <li class="dialog-content__item" data-id="${item.id}">
          <input checked id="id_${index}" type="checkbox" value="${item.id}" class="platform__checkbox join-popup__checkbox">
          <label for="id_${index}" class="platform-checkbox__label">
            <span class="platform__checkbox--fake"></span>
            <span title="${item.title}" class="dialog-content__course">${item.title}</span>
          </label>
        </li>
      `;
    });

    return joinedDeals.length ? `
      <p class="dialog-content__title">Выберите сделки (изначально объединяются все):</p>
      <ul class="dialog-content__list custom-scroll">
        ${deals.join('')}
      </ul>
    ` : '';
  }

  setPopupEvents(props) {
    const wrapper = document.querySelector('.dialog__content');

    props.selectedDeals = [];

    const selectDeals = this.selectDeals.bind(this, props);

    this.selectDeals(props);

    wrapper.addEventListener('change', selectDeals);
  }

  selectDeals(props, e) {
    if (e) {
      const t = e.target;

      const isUniqCheck = !props.selectedDeals.includes(+t.value);

      if (isUniqCheck && t.checked) {
        props.selectedDeals.push(+t.value);
      } else if (!t.checked) {
        props.selectedDeals = props.selectedDeals.filter((el) => el !== +t.value);
      }
    } else {
      document.querySelectorAll('.join-popup__checkbox').forEach((item) => {
        if (item.checked) {
          props.selectedDeals.push(+item.value);
        }
      });
    }
  }
}

export default JoinClient;
