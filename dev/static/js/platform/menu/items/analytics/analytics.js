import Utils from '../../../utils/utils.js';
import AnalyticsParams from './params/analyticsParams.js';
import ToggleRows from './toggle/toggleRows.js';
import Render from './render/render.js';
import AnalyticsTemplate from './template/analyticsTemplate.js';
import FunnelSettings from './events/funnelSettings.js';
import SetColors from './render/events/setColors.js';

const utils = new Utils();
const getAnalyticParams = new AnalyticsParams();
const toggleRows = new ToggleRows();
const renderAnalytic = new Render();
const analyticsTemplate = new AnalyticsTemplate();
const funnelSettings = new FunnelSettings();
const setColors = new SetColors();

class Analytics {
  init(props) {
    if (this.access()) {
      utils.hideLoader();

      const analyticsParams = getAnalyticParams.init(props);

      const render = this.render.bind(this);

      analyticsParams.then((params) => {
        render(params).then(() => {
          const items = [toggleRows, funnelSettings, setColors];

          items.forEach((item) => {
            const init = item.init.bind(item);
            init(params);
          });

          this.searchMetric();
        });
      });
    }
  }

  access() {
    const page = utils.getPage();

    const analytics = ['funnel', 'additional', 'traffic'];

    return analytics.includes(page);
  }

  async render(props) {
    if (props) {
      this.getAnalyticBoard(props);

      const items = [renderAnalytic];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    }
  }

  getAnalyticBoard(props) {
    const div = document.createElement('div');
    div.classList.add('analytic__wrapper-board');

    div.innerHTML = analyticsTemplate.analyticsBoard(props);

    const wrapper = document.querySelector('[analytics-board]');
    wrapper.appendChild(div);
  }

  searchMetric() {
    const search = document.querySelector('.analytic__metric-search');

    if (search) {
      const metrics = Array.from(document.querySelectorAll('.analytic__wrapper-board .analytic__row'));

      const filtredMetrics = metrics.filter((el) => !el.classList.contains('manager-board') && !el.classList.contains('manager__row'));

      const initSearch = this.initSearch.bind(this, filtredMetrics);

      search.addEventListener('input', initSearch);
    }
  }

  initSearch(filtredMetrics, e) {
    const t = e.target;

    const value = t.value.toLowerCase();

    filtredMetrics.forEach((item) => {
      const metricClass = item.classList[item.classList.length - 1];

      const rows = document.querySelectorAll(`.analytic__row.${metricClass}`);

      if (~item.innerText.toLowerCase().indexOf(value)) {
        rows.forEach((elem) => {
          elem.classList.remove('hide');
        });
      } else {
        rows.forEach((elem) => {
          elem.classList.add('hide');
        });
      }
    });
  }
}

export default Analytics;
