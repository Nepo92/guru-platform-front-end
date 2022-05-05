import Utils from '../../../../../../../../../../utils/utils.js';
import { dealAPI, homeworkAPI } from '../../../../../../../../../../api/api.js';
import AfterChangeAccessBlock from './afterChangeAccessBlock.js';

const utils = new Utils();
const afterChangeAccessBlock = new AfterChangeAccessBlock();

class ChangeAccessBlock {
  async init(block, deal, props, e) {
    let blockElem;
    let blockLabel;

    if (e) {
      const t = e.target;
      block.target = utils.getParent(t, 'platform__toggle') || t;

      blockElem = utils.getParent(t, 'block__name').querySelector('[product-block]');
      blockLabel = utils.getParent(t, 'toggle__access-tab') || t;
    } else {
      blockElem = utils.getParent(block, 'block__name').querySelector('[product-block]');
      blockLabel = block;
    }

    const active = blockLabel.classList.contains('active');
    const idBlock = blockElem.getAttribute('data-block');

    const data = {
      courseBlock: { id: idBlock },
      idDeal: deal.id || deal,
      enabled: !active,
    };

    if (e) {
      const t = e.target;

      t.style.pointerEvents = 'none';
    }

    const loader = setTimeout(utils.showLoader, 400);

    const { pack } = props;
    const { role } = pack;

    if (role === 'ROLE_CURATOR') {
      await homeworkAPI.changeBlockEnabled(data);
    } else {
      await dealAPI.changeBlockEnabled(data);
    }

    clearTimeout(loader);
    utils.hideLoader();

    const changeAccessBlockProps = {
      blockLabel,
      deal,
      target: props.target,
    };

    await this.afterChangeAccessBlock(changeAccessBlockProps, e);
  }

  async afterChangeAccessBlock(changeAccessBlockProps, e) {
    if (e) {
      const t = e.target;

      t.style.pointerEvents = 'all';
    }

    this.toggleClassActive(changeAccessBlockProps);

    await afterChangeAccessBlock.init(changeAccessBlockProps);
  }

  toggleClassActive(changeAccessBlockProps) {
    const { blockLabel } = changeAccessBlockProps;

    if (blockLabel.classList.contains('active')) {
      blockLabel.classList.remove('active');
    } else {
      blockLabel.classList.add('active');
    }

    changeAccessBlockProps.activeBlock = blockLabel.classList.contains('active');
  }
}

export default ChangeAccessBlock;
