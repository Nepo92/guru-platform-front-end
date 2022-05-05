import FunnelRequests from '../../requests/funnelRequests.js';

const funnelRequests = new FunnelRequests();

class RemoveFunnel {
  init(props) {
    const removeBtns = document.querySelectorAll('[remove-funnel]');

    if (removeBtns.length) {
      const container = document.querySelector('.funnels-now__list');

      const removeFunnel = this.removeFunnel.bind(this, props);

      container.addEventListener('click', removeFunnel);
    }
  }

  removeFunnel(props, e) {
    const t = e.target;

    if (t.hasAttribute('remove-funnel')) {
      funnelRequests.funnelRemove(props, e);
    }
  }
}

export default RemoveFunnel;
