import Utils from '../../../../../utils/utils.js';
import Validation from '../../../../../utils/validation.js';
import { billTemplateAPI } from '../../../../../api/api.js';
import TemplateData from './templateData.js';
import RemoveLayer from './layer/removeLayer.js';
import BillTemplatesTemplates from '../templates/billTemplatesTemplates.js';

const utils = new Utils();
const validation = new Validation();
const templateData = new TemplateData();
const removeLayer = new RemoveLayer();
const billTemplatesTemplates = new BillTemplatesTemplates();

class AddBillTemplate {
  init(props) {
    props.addBtn = document.querySelector('.templates__add-btn');
    props.menu = document.querySelector('[js-menu-add-bill-template]');

    const { addBtn, menu } = props;

    if (addBtn) {
      const openMenu = this.openMenu.bind(this, props);
      addBtn.addEventListener('click', openMenu);
    }

    if (menu) {
      const closeBtn = menu.querySelector('[js-menu-add-template-close]');

      if (closeBtn) {
        const closeMenu = this.#closeMenu.bind(this, menu);
        closeBtn.addEventListener('click', closeMenu);
      }

      const container = document.querySelector('.layers');

      if (container) {
        const dispatchContainer = this.dispatchContainer.bind(this, props);
        container.addEventListener('click', dispatchContainer);
      }
    }
  }

  #closeMenu(menu) {
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, false);
  }

  dispatchContainer(props, e) {
    const t = e.target;

    if (t.classList.contains('layers-item__delete')) {
      removeLayer.init(props, t);
    }
  }

  openMenu(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const { menu } = props;

    utils.openModalAnimation(menu, true);

    props.idCounter = 0;

    this.clearMenu(menu);

    const layers = menu.querySelector('.layers');
    layers.classList.add('mt_0');

    const save = menu.querySelector('[js-add-template]');

    if (save) {
      const saveBillTemplate = this.saveBillTemplate.bind(this, props);
      const saveBill = utils.setCloneElement(save);

      saveBill.addEventListener('click', saveBillTemplate);

      const toError = validation.toValidationError.bind(validation);
      saveBill.addEventListener('dblclick', toError);
    }
  }

  clearMenu(menu) {
    const header = menu.querySelector('.template-form__header');
    header.innerText = 'Создать шаблон';

    const removeBtn = document.querySelector('[remove-bill-template]');

    if (removeBtn) {
      removeBtn.remove();
    }

    const addLayerBtn = document.querySelector('.templates__bill-button');
    addLayerBtn.style.marginTop = '0';

    const name = menu.querySelector('[bill-template-name]');
    name.value = '';

    const templateLayer = menu.querySelector('[js-templates-bill-wrapper]');

    utils.removeChildren(templateLayer);
  }

  saveBillTemplate(props, e) {
    const t = e.target;
    const { menu, pack } = props;
    const { company } = pack;

    const form = menu.querySelector('[js-menu-add-template-form]');

    if (validation.validateBillTemplate(form, false)) {
      const data = templateData.getData(company, props, false);

      const checkTemplate = billTemplateAPI.checkPatterns(data);

      checkTemplate.then((isValid) => {
        if (isValid) {
          const saveBullTemplate = billTemplateAPI.saveBillTemplate(data);

          t.style.pointerEvents = 'none';

          const loader = setTimeout(() => {
            utils.showLoader();
          }, 400);

          saveBullTemplate.then((templateId) => {
            clearTimeout(loader);
            utils.hideLoader();

            props.billTemplate = data;
            props.billTemplate.id = templateId;
            props.target = t;

            this.afterSave(props);
          }, () => t.style.pointerEvents = 'all');
        }
      });
    }
  }

  afterSave(props) {
    const { menu, billTemplate, target } = props;
    target.style.pointerEvents = 'all';

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);

    const div = document.createElement('div');
    div.classList.add('templates__item');
    div.setAttribute('data-id', billTemplate.id);
    div.innerHTML = billTemplatesTemplates.templateItems(billTemplate);

    const templates = document.querySelector('.templates__content');

    templates.appendChild(div);
  }
}

export default AddBillTemplate;
