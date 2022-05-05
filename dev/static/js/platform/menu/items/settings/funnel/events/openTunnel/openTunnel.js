import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class OpenTunnel {
  init(props) {
    const btns = document.querySelectorAll('[funnels-item]');

    if (btns.length) {
      const openTunnel = this.openTunnel.bind(this, props);

      btns.forEach((item) => {
        const btn = utils.setCloneElement(item);
        btn.addEventListener('click', openTunnel);
      });
    }
  }

  openTunnel() {
    // const tunnelProps = this.getProps(props);

    // console.log(props);
  }

  getProps(props) {
    return {
      ...props,
      menu: document.querySelector('[tunnel-links]'),
    };
  }
}

export default OpenTunnel;
