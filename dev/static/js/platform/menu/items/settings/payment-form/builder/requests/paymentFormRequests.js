import Utils from '../../../../../../utils/utils.js';
import { paymentFormAPI } from '../../../../../../api/api.js';
import ContentManager from '../../../../../../contentManager/contentManager.js';

const utils = new Utils();
const contentManager = new ContentManager();

class PaymentFormRequest {
  updateForm(props) {
    const { target, menu, currentForm } = props;
    const data = this.getData(props);

    data.keyField.id = utils.getParent(target, 'payment-form') ? +utils.getParent(target, 'payment-form').getAttribute('data-id') : +target.getAttribute('data-id');

    data.valueField = this.getValueField(currentForm, data);

    paymentFormAPI.updatePaymentForm(data).then(() => {
      const wrapper = menu.querySelector('.platform-modal__wrapper');

      utils.closeModalAnimation(menu, wrapper, false, false, false);

      this.updateForms(props);
    });
  }

  getValueField(currentForm, data) {
    const { streams } = currentForm;
    const { streams: choosenStreams } = data.keyField;

    const removedArray = streams.filter((el) => !choosenStreams.includes(el));

    return removedArray.length ? removedArray.map((el) => el.id) : null;
  }

  saveForm(props) {
    const { menu, target } = props;

    const data = this.getData(props);

    paymentFormAPI.savePaymentForms(data.keyField).then(() => {
      target.style.pointerEvents = 'all';

      const wrapper = menu.querySelector('.platform-modal__wrapper');
      utils.closeModalAnimation(menu, wrapper, false, false, false);

      this.updateForms(props);
    }, () => {
      target.style.pointerEvents = 'all';
    });
  }

  getData(props) {
    const { menu } = props;

    const withCoiceRadio = menu.querySelector('[with-choice]');

    let data;

    if (withCoiceRadio.checked) {
      data = this.getRequestDataWithChoice(props);
    } else {
      data = this.getRequestDataWithoutChoice(props);
    }

    return data;
  }

  getRequestDataWithChoice(props) {
    const { menu } = props;

    const [name, idCompany, dealType, funnels, outsideLink] = this.getGeneralData(props);

    const course = { id: +menu.querySelector('[data-select-type="select-product"] [id-selected]').value };

    const haveTariff = !menu.querySelector('.tariff-content').classList.contains('hide');
    const idTariff = haveTariff ? { id: +menu.querySelector('[data-select-type="select-tariff"] [id-selected]').value } : null;

    let one;

    menu.querySelectorAll('[one-date-select]').forEach((item) => {
      if (item.checked) {
        one = +item.value;
      }
    });

    const oneDay = one ? [{ id: one }] : null;
    const streamsArray = props?.pack?.streams?.concat();

    let multiplyDay;

    if (streamsArray) {
      multiplyDay = menu.querySelector('[data-select-type="select-multiply-date"]') ? streamsArray.splice(0, +menu.querySelector('[data-select-type="select-multiply-date"] [id-selected]').value).map((el) => { return { id: el.id }; }) : null;
    }

    const streams = oneDay || multiplyDay;

    let deletedStreamsId;

    if (streams?.length > 1) {
      deletedStreamsId = this.getDeletedStreamsId(props, multiplyDay);
    } else if (streams?.length < 1 && props.currentForm) {
      deletedStreamsId = [...props.currentForm.streams].map((item) => item.id);
    }

    const idPaymentMethod = menu.querySelector('[data-select-type="select-payment-method"] [id-selected]')?.value;

    return {
      keyField: {
        withChoice: true,
        idCompany: idCompany || null,
        name: name || null,
        dealType,
        funnel: funnels || null,
        course: course || null,
        tariff: idTariff || null,
        streams: streams || null,
        outsideLink: outsideLink || null,
        idPaymentMethod: idPaymentMethod || null,
      },
      valueField: deletedStreamsId?.length ? deletedStreamsId : null,
    };
  }

  getRequestDataWithoutChoice(props) {
    const [name, idCompany, dealType, funnels, outsideLink] = this.getGeneralData(props);

    return {
      keyField: {
        withChoice: false,
        name: name || null,
        idCompany: idCompany || null,
        dealType,
        funnel: funnels || null,
        outsideLink: outsideLink || null,
      },
    };
  }

  getGeneralData(props) {
    const { menu } = props;

    const name = menu.querySelector('[payment-form-name]').value;
    const idCompany = props.pack.company.id;

    const dealType = menu.querySelector('[data-select-type="select-deal-type"] [id-selected]').value;

    const funnels = { idFunnel: +menu.querySelector('[data-select-type="select-funnel"] [id-selected]').value };

    const outsideLinks = menu.querySelectorAll('.link__item');

    let outsideLink;

    outsideLinks.forEach((item) => {
      if (item.classList.contains('active')) {
        outsideLink = { id: +item.getAttribute('data-id') };
      }
    });

    return [name, idCompany, dealType, funnels, outsideLink];
  }

  updateForms(props) {
    const newProps = {
      ...props,
      target: undefined,
    };

    const getPaymentForms = paymentFormAPI.getPaymentForms();

    getPaymentForms.then((forms) => {
      props.pack.paymentForms = forms;

      contentManager.init(newProps).then(() => {
        props.paymentForm$.init(newProps);
      });
    });
  }

  getDeletedStreamsId(props, currentStreams) {
    const { currentForm } = props;

    if (currentForm) {
      const { streams } = currentForm;

      const datesId = [];
      datesId.length = 0;

      $.each(streams, (index, item) => {
        datesId.push(item.id);
      });

      const currentStremsId = [];

      currentStreams.forEach((item) => {
        currentStremsId.push(item.id);
      });

      const difference = datesId.filter((num) => !currentStremsId.includes(num));

      return difference;
    }
  }
}

export default PaymentFormRequest;
