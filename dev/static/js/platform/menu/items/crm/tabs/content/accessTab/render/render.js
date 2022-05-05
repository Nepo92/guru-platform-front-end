import { dealAPI, homeworkAPI } from '../../../../../../../api/api.js';
import AccessTabTemplates from './templates/accessTemplates.js';
import Utils from '../../../../../../../utils/utils.js';
import TabWrapper from '../../tabWrapper.js';

const accessTemplates = new AccessTabTemplates();
const utils = new Utils();

class RenderAccess extends TabWrapper {
  async render(tabPack) {
    const { menu, deal } = tabPack;

    const accessWrapper = menu.querySelector('[js-client-access]');

    const span = utils.setPreloaderToTab();
    accessWrapper.appendChild(span);

    if (accessWrapper && deal) {
      utils.removeChildren(accessWrapper);

      const { allModulesHomeworkAllowed } = deal;

      tabPack.stopLesson = allModulesHomeworkAllowed;

      const div = document.createElement('div');
      div.classList.add('access__wrapper');

      let modules;

      if (tabPack.pack.role === 'ROLE_CURATOR') {
        modules = await homeworkAPI.getModules(deal.id || deal);
      } else {
        modules = await dealAPI.getModules(deal.id || deal);
      }

      if (modules.allowed) {
        tabPack.access = true;
      } else {
        tabPack.access = false;
      }

      tabPack.modules = modules;

      const stopLesson = await this.stopLesson(deal, tabPack.pack.role);

      tabPack.deal.allModulesHomeworkAllowed = stopLesson;

      div.innerHTML = accessTemplates.accessNav(tabPack);
      accessWrapper.appendChild(div);

      const accessList = menu.querySelector('[js-access-wrapper]');

      if (accessList) {
        const blocks = tabPack.pack.role !== 'ROLE_CURATOR' ? await dealAPI.getBlocks(deal.id || deal) : await homeworkAPI.getBlocks(deal.id || deal);

        tabPack.accessList = accessList;
        tabPack.blocks = blocks;

        if (blocks && blocks.length) {
          this.setBlocks(tabPack);
        } else {
          this.setModules(tabPack);
        }
      }
    } else {
      utils.removeChildren(accessWrapper);
      this.noProduct(accessWrapper);
    }
  }

  async stopLesson(deal, role) {
    const updatedDeal = role !== 'ROLE_CURATOR' ? await dealAPI.getDeal({ id: deal.id }) : await homeworkAPI.getDeal({ id: deal.id });

    const { allModulesHomeworkAllowed: stopeLesson } = updatedDeal;

    return stopeLesson;
  }

  async setBlocks(tabPack) {
    const {
      blocks,
      modules,
      accessList,
      deal,
      menu,
    } = tabPack;

    const { id } = deal;

    this.setTariffName(menu);

    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];

      const div = document.createElement('div');
      div.classList.add('access-block');
      div.innerHTML = accessTemplates.renderBlock(block, deal, index);

      const modulesData = modules.modules;
      const modulesDataId = block.courseBlock.moduleIds;

      const modulesInBlock = modulesData.filter((el) => modulesDataId.includes(el.idModule));

      modulesInBlock.forEach((item, count) => {
        const module = document.createElement('div');
        module.classList.add('module__item');
        module.setAttribute('data-module', item.idModule);
        module.setAttribute('data-deal', id);
        module.setAttribute('product-module', '');
        module.setAttribute('data-client', deal.idClient);
        module.innerText = count + 1;

        if (item.enabled) {
          module.classList.add('active');
        }

        div.querySelector('.block__modules').appendChild(module);
      });

      await accessList.appendChild(div);
    }
  }

  async setModules(tabPack) {
    const {
      deal,
      modules,
      accessList,
      menu,
    } = tabPack;

    const { id } = deal;

    const div = document.createElement('div');
    div.classList.add('access-block');

    const p = document.createElement('p');
    p.classList.add('block__name');
    p.classList.add('ml_0');

    this.setTariffName(menu);

    p.innerText = 'Модули курса';

    div.appendChild(p);

    const modulesWrapper = document.createElement('div');
    modulesWrapper.classList.add('block__modules');

    div.appendChild(modulesWrapper);

    if (modules && modules.modules.length) {
      modules.modules.forEach((item, index) => {
        const module = document.createElement('div');
        module.classList.add('module__item');
        module.setAttribute('data-module', item.idModule);
        module.setAttribute('data-deal', id);
        module.setAttribute('data-client', deal.idClient);
        module.setAttribute('product-module', '');
        module.innerText = index + 1;

        if (item.enabled) {
          module.classList.add('active');
        }

        modulesWrapper.appendChild(module);
      });

      await accessList.appendChild(div);
    }
  }

  setTariffName(menu) {
    let name = menu.querySelector('[tariff-selected] .tariff__name');

    const namePlace = menu.querySelector('.nav__left');

    if (name) {
      namePlace.innerText = name.innerText;
    } else {
      const productItem = menu.querySelector('[data-select-type="select-product"]');
      const selectedProduct = productItem.querySelector('[id-selected]').value;
      const bodyChildren = Array.from(productItem.querySelector('[select-body]').children);

      const selectedItem = bodyChildren.find((el) => el.getAttribute('value') === selectedProduct);
      name = selectedItem.innerText.trim();
      namePlace.innerText = name === 'Выберите продукт' ? 'Продукт не выбран' : name;
    }
  }
}

export default RenderAccess;
