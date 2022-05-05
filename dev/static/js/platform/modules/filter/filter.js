import ApplyFilter from './events/applyFilter.js';
import CloseFilter from './events/closeFilter.js';
import OpenFilter from './events/openFilter.js';
import DefaultFilter from './events/defaultFilter.js';
import AnalyticsFilter from './analytics/analyticsFilter.js';
import DefaultFilterCustomSelect from './events/defaultFilterCustomSelect.js';
import Utils from '../../utils/utils.js';

const utils = new Utils();
const applyFilter = new ApplyFilter();
const closeFilter = new CloseFilter();
const openFilter = new OpenFilter();
const defaultFilter = new DefaultFilter();
const analyticsFilter = new AnalyticsFilter();
const defaultFilterCustomSelect = new DefaultFilterCustomSelect();

class Filter {
    init(props) {
        const items = [
            analyticsFilter,
            defaultFilter,
            defaultFilterCustomSelect,
            applyFilter,
            openFilter,
            closeFilter,
        ];

        const filterProps = this.getProps(props);

        items.forEach((item) => {
            const init = item.init.bind(item);
            init(filterProps);
        });
    }

    getProps(props) {
        return utils.getDeepCopy(props);
    }
}

export default Filter;
