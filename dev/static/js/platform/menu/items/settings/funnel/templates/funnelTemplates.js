import Utils from "../../../../../utils/utils.js";

const utils = new Utils();

class FunnelTemplates {
  async renderFunnels(props) {
    const { pack } = props;
    const { funnels } = pack;

    const funnelsList = document.querySelector(".funnels-now__list");

    if (funnelsList) {
      utils.removeChildren(funnelsList);

      const chooseType = document.querySelector("[js-select-type]").value;
      const dealType = Object.entries(funnels);

      for (let i = 0; i < dealType.length; i++) {
        const item = dealType[i];

        const type = item[0];
        const funnelsData = item[1];

        if (type === chooseType) {
          for (let j = 0; j < funnelsData.length; j++) {
            const elem = funnelsData[j];

            const div = document.createElement("div");
            div.setAttribute("funnels-item", "");
            div.classList.add("funnels-funnel__item");
            div.innerHTML = this.funnelTemplate(elem);
            await funnelsList.appendChild(div);
          }
        }
      }
    }
  }

  funnelTemplate(elem) {
    const isTraffic =
      elem.dealType && elem.dealType === "traffic" ? "Трафик" : "";
    const isBase =
      elem.dealType && elem.dealType === "additional" ? "База" : "";

    const dealType = isTraffic || isBase;

    return `
          <p class='funnels-funnel__title'>${
            elem.funnelName ? elem.funnelName : ""
          } <span remove-funnel class='funnels-funnel__delete'></p>
          <p class='funnels-funnel__type'>${dealType}</p>
          <input type='hidden' funnels-id value='${
            elem.idFunnel ? elem.idFunnel : ""
          }'>
      `;
  }

  addFunnelMenu(elem) {
    return `
        <div class="menu-input menu-input_xsmall funnel-item">
          <p class="funnels-funnel__name">Название *</p>
          <div class="menu-input__wrapper">
            <input autocomplete="off" js-funnel-name value="${elem?.name || ""}"
            class="menu-input__input menu-input__input_small funnels-funnel__input" type="text" name="funnelName"
            placeholder="Введите название воронки">
          </div>
        </div>
        <div class="menu-input menu-input_xsmall funnel-item">
          <p class="funnels-funnel__name">Id на Тильда</p>
          <div class="menu-input__wrapper">
            <input id-tilda type="text" value="${
              elem?.tildaId || ""
            }" class="menu-input__input menu-input__input_small funnels-funnel__input"
            placeholder="Введите номер товара с сервиса Тильды">
          </div>
        </div>
    `;
  }
}

export default FunnelTemplates;
