import MonitorBackground from './changeBackground.js';
import Tabs from './tabs.js';
import ResizeImg from './resizeImg.js';
import HoverTooltipActionBanner from './hoverTooltip.js';

const monitorBg = new MonitorBackground();
const monitorTabs = new Tabs();
const resizeImg = new ResizeImg();
const hoverTooltipActionBanner = new HoverTooltipActionBanner();

class MonitorEvents {
  init(props) {
    const items = [monitorBg, monitorTabs, resizeImg, hoverTooltipActionBanner];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default MonitorEvents;
