import Utils from '../../../../../utils/utils.js';
import { billTemplateAPI } from '../../../../../api/api.js';
import BillTemplatesTemplates from '../templates/billTemplatesTemplates.js';
import Validation from '../../../../../utils/validation.js';
import TemplateData from './templateData.js';
import RemoveTemplate from './removeTemplate.js';
import SelectDates from './layer/selectDates.js';

const utils = new Utils();
const billTemplatesTemplates = new BillTemplatesTemplates();
const validation = new Validation();
const templateData = new TemplateData();
const removeTemplate = new RemoveTemplate();
const selectDates = new SelectDates();

class EditBillTemplate {
  init(props) {
    const container = document.querySelector('.templates__content');

    const dispatchContainer = this.dispatchContainer.bind(this, props);

    if (container) {
      container.addEventListener('click', dispatchContainer);
    }
  }

  dispatchContainer(props, e) {
    const t = e.target;

    if (t.classList.contains('templates__item')) {
      this.editTemplate(props, e);
    }
  }

  editTemplate(props, e) {
    const t = e.target;

    const id = +t.getAttribute('data-id');

    const getTemplate = billTemplateAPI.getBillTemplate(id);

    const loader = setTimeout(() => {
      utils.showLoader();
    }, 400);

    getTemplate.then((template) => {
      clearTimeout(loader);
      utils.hideLoader();

      props.currentTemplate = template;

      this.openEditMenu(props, e);

      removeTemplate.init(props);
    });
  }

  openEditMenu(props) {
    const menu = document.querySelector('[js-menu-add-bill-template]');

    props.menu = menu;

    menu.querySelector('.template-form__header').innerText = 'Редактировать шаблон';

    if (!menu.querySelector('[remove-bill-template]')) {
      this.setRemoveBtn(props);
    }

    props.idCounter = 0;
    props.layersCounter = 0;

    this.setData(props);

    const layers = menu.querySelectorAll('.layers__item');

    if (layers.length) {
      const wrapper = menu.querySelector('.templates-btn__wrapper');
      wrapper.style.marginTop = '20px';

      const inputs = wrapper.querySelectorAll('input');

      inputs.forEach((item) => {
        const validateInput = validation.validationInputNuber.bind(validation, item, false, '%');
        const cloneInput = utils.setCloneElement(item);
        cloneInput.addEventListener('input', validateInput);
      });
    }

    const updateBtn = menu.querySelector('[js-add-template]');

    if (updateBtn) {
      const update = utils.setCloneElement(updateBtn);

      const updateTemplate = this.updateTemplate.bind(this, props);

      update.addEventListener('click', updateTemplate);
    }

    const items = [selectDates];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  setRemoveBtn(props) {
    const button = document.createElement('button');
    button.setAttribute('remove-bill-template', '');
    button.classList.add('button');
    button.classList.add('button_white');
    button.innerText = 'Удалить шаблон';

    const { menu } = props;

    menu.querySelector('.template-form__footer').appendChild(button);
  }

  setData(props) {
    const { menu, currentTemplate } = props;

    const name = menu.querySelector('[bill-template-name]');
    name.value = currentTemplate.name;

    utils.openModalAnimation(menu, true);
    props.removed = [];

    const wrapper = menu.querySelector('[js-templates-bill-wrapper]');

    const layers = menu.querySelector('.layers');
    layers.classList.remove('mt_0');

    utils.removeChildren(wrapper);

    currentTemplate.patterns.forEach((item, index, patterns) => {
      const div = document.createElement('div');
      div.classList.add('layers__item');
      div.setAttribute('data-id', item.id);

      /* eslint-disable-next-line */
      props.idCounter = props.idCounter + 1;

      if (props.idCounter !== 1) {
        div.classList.add('mt_20_br_1_pt_20');
      } else {
        div.classList.add('first-pattern');
      }

      if (props.idCounter === 2) {
        div.classList.add('second-pattern');
      }

      const layerData = [
        item,
        index,
        props,
        patterns,
      ];

      div.innerHTML = billTemplatesTemplates.setBillLayerTemplate(layerData);

      wrapper.appendChild(div);
    });

    const startDate = menu.querySelector('[date-start-second]');

    if (startDate?.checked) {
      const step = menu.querySelector('[step-item="2"]');
      step.classList.add('hide');
    }
  }

  updateTemplate(props, e) {
    const t = e.target;

    const { menu, currentTemplate } = props;
    const { pack } = props;
    const { company } = pack;

    e.preventDefault();
    e.stopPropagation();

    const form = menu.querySelector('[js-menu-add-template-form]');

    if (validation.validateBillTemplate(form, true)) {
      const data = templateData.getData(company, props, true, currentTemplate);

      const updateBillTemplate = billTemplateAPI.updateBillTemplate(data);

      t.style.pointerEvents = 'none';

      const loader = setTimeout(() => {
        utils.showLoader();
      }, 400);

      updateBillTemplate.then((updateItem) => {
        clearTimeout(loader);
        utils.hideLoader();

        t.style.pointerEvents = 'all';

        const updateParams = {
          data,
          menu,
          updateItem,
        };

        this.afterUpdate(updateParams);
      }, () => t.style.pointerEvents = 'all');
    }
  }

  afterUpdate(updateParams) {
    const { data, menu, updateItem } = updateParams;

    let id;

    if (typeof updateItem === 'object' && updateItem !== null && !Array.isArray(updateItem)) {
      id = data.keyField.id;
    } else {
      id = updateItem;
    }

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);

    const updatingItem = Array.from(document.querySelectorAll('.templates__item')).find((el) => +el.getAttribute('data-id') === +id);

    updatingItem.querySelector('.templates__name').innerText = data.keyField.name;

    updatingItem.querySelector('.templates__structure').innerText = `${data.keyField.patterns.length} ${utils.declOfNum(data.keyField.patterns.length, ['счет', 'счета', 'счетов'])}`;
  }
}

export default EditBillTemplate;
