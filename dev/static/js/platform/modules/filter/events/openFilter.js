import Utils from '../../../utils/utils.js';
import Datepicker from '../../datepicker/datepicker.js';

const utils = new Utils();
const datepicker = new Datepicker();

class OpenFilter {
    init(props) {
        const filterBtn = document.querySelector('.platform__filter--btn');

        if (filterBtn) {
            const openFilter = this.openFilter.bind(this, props);
            const filterCloneBtn = utils.setCloneElement(filterBtn);

            filterCloneBtn.addEventListener('click', openFilter);
        }
    }

    openFilter(props, e) {
        const t = e.target;
        t.classList.add('active');

        const filter = document.querySelector('.platform__filter');

        utils.openModalAnimation(filter, true);
        this.setFunnelsToFilter(props);
        datepicker.init();
    }

    setFunnelsToFilter(props) {
        const select = document.querySelector('[filter-funnels]');
        const { pack } = props;
        const { funnels, filter } = pack;

        const dealType = document.querySelector('[name="saleType"]');

        if (dealType && select) {
            const type = dealType.value;

            const funnelsData = Object.entries(funnels);

            utils.removeChildren(select, 0);

            const funnelFilterProps = {
                funnelsData,
                type,
                select,
                filter,
                isChange: false,
            };

            if (funnelsData.length) {
                this.addFunnelsToSelect(funnelFilterProps);
            }

            const addFunnelsToSelect = this.addFunnelsToSelect.bind(this, funnelFilterProps);

            dealType.addEventListener('change', addFunnelsToSelect);
        }
    }

    addFunnelsToSelect(props, e) {
        let { type, isChange } = props;
        const { funnelsData, select, filter } = props;

        if (e) {
            const t = e.target;
            type = t.value;
            isChange = true;
        }

        utils.removeChildren(select, 0);

        let selectedFunnelId;

        funnelsData.forEach((item) => {
            const typeFunnel = item[0];
            const funnelsItems = item[1];

            if (type === typeFunnel) {
                funnelsItems.forEach((elem) => {
                    const option = document.createElement('option');
                    option.setAttribute('value', elem.idFunnel);
                    option.innerText = elem.funnelName;

                    if (elem.idFunnel === filter.idFunnel) {
                        selectedFunnelId = elem.idFunnel;
                    }

                    select.appendChild(option);
                });
            }
        });

        if (!isChange) {
            select.value = selectedFunnelId || '0';
        }
    }
}

export default OpenFilter;
