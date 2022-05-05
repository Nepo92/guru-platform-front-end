import Utils from '../../../../../../utils/utils.js';
import { funnelAPI } from '../../../../../../api/api.js';
import SearchAudience from './searchAudience.js';

const utils = new Utils();
const searchAudience = new SearchAudience();

class OpenCommunity {
  init() {
    const community = document.querySelector('[js-community]');

    if (community) {
      const communityBtn = utils.setCloneElement(community);

      const setCommunity = this.setCommunity.bind(this);

      communityBtn.addEventListener('click', setCommunity);
    }
  }

  setCommunity(e) {
    const t = e.target;
    this.resetCommunityTable();

    const channel = document.querySelector('[js-channel]');

    if (channel.value !== 'all' && channel.value !== 'unknown') {
      const form = document.querySelector('[funnel-filter-form]');
      const formData = new FormData(form);
      this.setCommunityByChannel(formData, t);
    }
  }

  resetCommunityTable() {
    const communityTable = document.querySelector('[community-table]');

    utils.removeChildren(communityTable);

    const tr = document.createElement('tr');
    tr.classList.add('body__row');
    tr.classList.add('body__row_small');
    tr.classList.add('body__row_channel');
    tr.setAttribute('js-menu-purchase', '');
    tr.setAttribute('js-menu-purchase-all', '');
    tr.innerHTML = this.setDefaultCommunityRow();

    communityTable.appendChild(tr);

    const unknown = document.createElement('tr');
    unknown.classList.add('body__row');
    unknown.classList.add('body__row_small');
    unknown.classList.add('body__row_channel');
    unknown.setAttribute('js-menu-purchase', '');
    unknown.innerHTML = this.setUnknownCommunityRow();

    communityTable.appendChild(unknown);
  }

  setCommunityByChannel(formData, t) {
    const getCommunities = funnelAPI.getAudience(formData);

    const menu = document.querySelector('[js-menu]');

    utils.openModalAnimation(menu, true);

    t.setAttribute('disabled', '');

    getCommunities.then((communites) => {
      t.removeAttribute('disabled');
      const communityTable = document.querySelector('[community-table]');

      const setCommunityRow = this.renderCommunityRow.bind(this);

      setCommunityRow(communites, communityTable).then(() => {
        this.changeCheckboxInTable();
        searchAudience.init();
      });
    }, () => t.removeAttribute('disabled'));
  }

  async renderCommunityRow(communites, communityTable) {
    communites.forEach(async (item) => {
      const tr = document.createElement('tr');

      tr.setAttribute('js-menu-purchase', '');
      tr.classList.add('body__row');
      tr.classList.add('body__row_small');
      tr.classList.add('body__row_channel');
      tr.innerHTML = this.communityRowTemplate(item);

      await communityTable.appendChild(tr);
    });
  }

  communityRowTemplate(item) {
    return `
      <td class="platform-table__column width_100 audience-column">
        <input js-menu-checker type="checkbox" id="${item.name}" class="platform__checkbox" name="communites" value="${item.name}" checked/>
        <label class="platform-checkbox__label audience__label" for="${item.name}">
          <span class="audience__checkbox">
            <span class="platform__checkbox--fake"></span>
          </span>
          <span class="audience__name">${item.name}</span>
          <span class="audience__link">${item.link}</span>
        </label>
      </td>
    `;
  }

  setDefaultCommunityRow() {
    return `
        <td class="platform-table__column width_100 audience-column">
          <input js-menu-checker type="checkbox" id="Все аудитории" class="platform__checkbox" name="communites" value="Все аудитории" checked/>
          <label class="platform-checkbox__label audience__label" for="Все аудитории">
            <span class="audience__checkbox">
              <span class="platform__checkbox--fake"></span>
            </span>
            <span class="audience__name">Все аудитории</span>
            <span class="audience__link"></span>
          </label>
        </td>
    `;
  }

  setUnknownCommunityRow() {
    return `
        <td class="platform-table__column width_100 audience-column">
          <input js-menu-checker type="checkbox" id="Неизвестно" class="platform__checkbox" name="communites" value="unknown" checked/>
          <label class="platform-checkbox__label audience__label" for="Неизвестно">
            <span class="audience__checkbox">
              <span class="platform__checkbox--fake"></span>
            </span>
            <span class="audience__name">Неизвестно</span>
            <span class="audience__link"></span>
          </label>
        </td>
    `;
  }

  changeCheckboxInTable() {
    const allAudienceCheckBox = document.querySelector('[js-menu-checker][value="Все аудитории"]');

    if (allAudienceCheckBox) {
      const changeAllAudience = this.changeAllAudience.bind(this);
      allAudienceCheckBox.addEventListener('change', changeAllAudience);
    }

    const unknownCheckBox = document.querySelector('[js-menu-checker][value="unknown"]');

    if (unknownCheckBox) {
      const changeUnknownCheckbox = this.changeUnknownCheckbox.bind(this);

      unknownCheckBox.addEventListener('change', changeUnknownCheckbox);
    }
  }

  changeAllAudience(e) {
    const t = e.target;

    const checkboxArr = document.querySelectorAll('[js-menu-checker]');

    if (t.checked) {
      checkboxArr.forEach((item, index) => {
        if (index !== 0) {
          item.checked = true;
        }
      });
    } else {
      checkboxArr.forEach((item, index) => {
        if (index !== 0) {
          item.checked = false;
        }
      });
    }
  }

  changeUnknownCheckbox(e) {
    const t = e.target;

    const allAudienceCheckBox = document.querySelector('[js-menu-checker][value="Все аудитории"]');

    if (t.checked) {
      allAudienceCheckBox.checked = true;
    } else {
      allAudienceCheckBox.checked = false;
    }
  }
}

export default OpenCommunity;
