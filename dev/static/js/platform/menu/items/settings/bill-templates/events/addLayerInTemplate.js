import Datepicker from '../../../../../modules/datepicker/datepicker.js';
import BillTemplatesTemplates from '../templates/billTemplatesTemplates.js';
import Validation from '../../../../../utils/validation.js';

const datepicker = new Datepicker();
const billTemplatesTemplates = new BillTemplatesTemplates();
const validation = new Validation();

class AddLayerInTemplate {
  init(props) {
    const addLayerBtn = document.querySelector('.templates__bill-button');

    props.menu = document.querySelector('[js-menu-add-bill-template]');

    const addLayer = this.addLayer.bind(this, props);

    addLayerBtn.addEventListener('click', addLayer);
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
    const layer = document.createElement('li');
    layer.classList.add('layers__item');
    layer.innerHTML = billTemplatesTemplates.setBillLayerTemplate(props, props.layersCounter);

    return layer;
  }

  validateInputs(inputs) {
    inputs.forEach((item) => {
      const validate = validation.validationInputNuber.bind(validation, item, false, '%');
      item.addEventListener('input', validate);
    });
  }
}

export default AddLayerInTemplate;
