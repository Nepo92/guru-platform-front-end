import Datepicker from '../../../../../../modules/datepicker/datepicker.js';
import BillTemplatesTemplates from '../../templates/billTemplatesTemplates.js';
import Validation from '../../../../../../utils/validation.js';
import SelectDates from './selectDates.js';

const datepicker = new Datepicker();
const billTemplatesTemplates = new BillTemplatesTemplates();
const validation = new Validation();
const selectDates = new SelectDates();

class AddLayer {
  init(props) {
    const addLayerBtn = document.querySelector('.templates__bill-button');

    props.menu = document.querySelector('[js-menu-add-bill-template]');

    const addLayer = this.addLayer.bind(this, props);

    if (addLayerBtn) {
      addLayerBtn.addEventListener('click', addLayer);
    }
  }

  addLayer(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const { menu } = props;

    const wrapper = menu.querySelector('[js-templates-bill-wrapper]');

    const layers = menu.querySelectorAll('.layers__item');
    props.layersCounter = layers.length;

    const layer = this.createLayer(props);

    const inputs = layer.querySelectorAll('input');

    if (inputs.length) {
      this.validateInputs(inputs);
    }

    this.setStyleToAddLayerBtn(props);

    wrapper.appendChild(layer);

    const layersWrapper = menu.querySelector('.layers');

    if (layersWrapper.classList.contains('mt_0')) {
      layersWrapper.classList.remove('mt_0');
    }

    const items = [selectDates];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });

    datepicker.init();
  }

  setStyleToAddLayerBtn(props) {
    const btnWrapper = document.querySelector('.templates-btn__wrapper');

    if (props.layersCounter !== 1 && btnWrapper.classList.contains('mt_20')) {
      btnWrapper.classList.add('mt_20');
      btnWrapper.style.paddingTop = '20px';
      btnWrapper.style.borderTop = '0';
    } else if (props.layersCounter === 0) {
      btnWrapper.classList.remove('mt_20');
      btnWrapper.style.paddingTop = '20px';
      btnWrapper.style.borderTop = '1px solid #7C7B851A';
      btnWrapper.style.marginTop = '20px';
    } else if (props.layersCounter === 1) {
      btnWrapper.classList.remove('mt_20');
      btnWrapper.style.borderTop = '1px solid #7C7B851A';
      btnWrapper.style.paddingTop = '20px';
      btnWrapper.style.marginTop = '20px';
    }
  }

  createLayer(props) {
    props.idCounter = ++props.idCounter;

    const layer = document.createElement('li');
    layer.classList.add('layers__item');

    if (props.idCounter !== 1) {
      layer.classList.add('mt_20_br_1_pt_20');
    } else {
      layer.classList.add('first-pattern');
    }

    if (props.idCounter === 2) {
      layer.classList.add('second-pattern');
    }

    const startDate = document.querySelector('[date-start]');

    if (startDate) {
      props.startDateSelected = startDate.checked;
    }

    const layerData = [
      props,
      props.layersCounter,
      props,
      false,
    ];

    layer.innerHTML = billTemplatesTemplates.setBillLayerTemplate(layerData);

    return layer;
  }

  validateInputs(inputs) {
    inputs.forEach((item) => {
      const validate = validation.validationInputNuber.bind(validation, item, false, '%', true);
      item.addEventListener('input', validate);
    });
  }
}

export default AddLayer;
