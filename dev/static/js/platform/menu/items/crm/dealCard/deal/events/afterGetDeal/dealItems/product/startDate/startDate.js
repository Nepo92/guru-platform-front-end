import Utils from '../../../../../../../../../../utils/utils.js';
import DealFields from '../../dealFields.js';
import ChangeStreams from '../../../../../../../../settings/payment-form/builder/events/formTypes/withChoice/events/events/changeStreams.js';

const utils = new Utils();
const changeStreams = new ChangeStreams();

class StartDate extends DealFields {
  constructor() {
    super();
  }

  init(dealPack) {
    const { menu } = dealPack;

    if (menu) {
      const selectWrapper = menu.querySelector('[data-select-type="select-stream"]');

      if (selectWrapper) {
        const select = selectWrapper.querySelector('[select]');
        dealPack.selectWrapper = selectWrapper;
        dealPack.select = select;

        this.setViewMode(dealPack);
        this.setOptionToStreamSelect(dealPack);

        const idSelected = selectWrapper.querySelector('[id-selected]');

        if (idSelected) {
          const changeStream = this.changeStream.bind(this, dealPack);
          idSelected.addEventListener('change', changeStream);
        }
      }
    }

    if (dealPack.isPaymentForm) {
      changeStreams.init(dealPack);
    }
  }

  changeStream(props) {
    this.change(props);
  }

  setViewMode(props) {
    const { selectWrapper, isView, select } = props;

    const wrapper = utils.getParent(select, 'platform-form__item');

    if (selectWrapper && isView) {
      wrapper.classList.add('disable');
    } else if (selectWrapper && !isView) {
      wrapper.classList.remove('disable');
    }
  }

  setOptionToStreamSelect(props) {
    const {
      select,
      pack,
      deal,
      isChangedProduct,
    } = props;
    const { streams } = pack;

    const body = select.querySelector('[select-body]');

    utils.removeChildren(body, 0);

    const streamOptionProps = {
      isChangedProduct,
      deal,
      selected: null,
      body,
    };

    if (streams?.length && Array.isArray(streams)) {
      const setStreamOptions = this.setStreamOptions.bind(this, streamOptionProps);

      streams.forEach(setStreamOptions);
    }

    const head = select.querySelector('[select-head]').querySelector('.select-head__placeholder');
    const idSelected = select.querySelector('[id-selected]');

    if (streamOptionProps.selected) {
      head.innerText = utils.getDateFormatDDMMYYYY(streamOptionProps.selected.startDate);
      head.parentNode.setAttribute('title', utils.getDateFormatDDMMYYYY(streamOptionProps.selected.startDate));

      idSelected.value = streamOptionProps.selected.id;
    } else if (deal && !streamOptionProps.selected && deal.idStream && !isChangedProduct) {
      const olderProps = {
        deal,
        body,
        head,
        idSelected,
      };

      this.olderDataStream(olderProps);
    } else if (isChangedProduct) {
      this.isChangedStream(props, head);
    }
  }

  setStreamOptions(props, item) {
    const { isChangedProduct, deal, body } = props;

    const option = document.createElement('div');
    option.setAttribute('value', item.id);
    option.classList.add('select__option');
    option.classList.add('no-icon');
    option.innerText = utils.getDateFormatDDMMYYYY(item.startDate);

    if (!isChangedProduct && item.id === deal.idStream) {
      props.selected = item;
    }

    body.appendChild(option);
  }

  olderDataStream(olderProps) {
    const {
      deal,
      body,
      head,
      idSelected,
    } = olderProps;

    const option = document.createElement('div');

    option.setAttribute('value', deal.idStream);
    option.classList.add('select__option');
    option.classList.add('no-icon');

    option.innerText = utils.getDateFormatDDMMYYYY(deal.startDate);

    body.insertBefore(option, Array.from(body.children)[1]);

    head.innerText = utils.getDateFormatDDMMYYYY(deal.startDate);
    head.parentNode.setAttribute('title', utils.getDateFormatDDMMYYYY(deal.startDate));

    idSelected.value = deal.idStream;
  }

  isChangedStream(props, head) {
    const { select, menu } = props;
    const idInput = select.querySelector('[id-selected]');
    idInput.value = '';

    const body = select.querySelector('[select-body]');
    const options = Array.from(body.children);

    head.innerText = options[0].innerText.trim();
    head.parentNode.setAttribute('title', options[0].innerText.trim());

    const idProduct = menu.querySelector('[data-select-type="select-product"] [id-selected]');

    if (!idProduct.value) {
      utils.removeChildren(menu.querySelector('[data-select-type="select-stream"] [select-body]'), 0);
    }
  }
}

export default StartDate;
