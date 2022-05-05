import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class RemoveLayer {
  init(props, t) {
    this.removeLayer(props, t);
  }

  removeLayer(props, t) {
    const { layersCounter, menu } = props;

    const item = utils.getParent(t, 'layers__item');

    const [firstItem, secondItem, info] = this.getItems(item, menu);

    props.layersCounter = layersCounter - 1;
    props.idCounter = --props.idCounter;

    if (item.hasAttribute('data-id')) {
      props.removed.push(+item.getAttribute('data-id'));
    }

    item.remove();

    const layers = document.querySelectorAll('.layers__item');
    const layersWrapper = menu.querySelector('.layers');

    if (layers.length) {
      const removedData = {
        layersWrapper,
        layers,
        firstItem,
        secondItem,
        info,
        menu,
      };

      this.removedItem(removedData);
    } else {
      this.removedAllItems(layersWrapper);
    }
  }

  getItems(item, menu) {
    let firstItem;
    let secondItem;
    let info;

    if (item.classList.contains('first-pattern')) {
      firstItem = utils.cloneElement(item);
    }

    if (item.classList.contains('second-pattern')) {
      secondItem = utils.cloneElement(item);
    }

    const infoItem = menu.querySelector('.layers__info');

    if (infoItem) {
      info = utils.cloneElement(infoItem);
    }

    return [firstItem, secondItem, info];
  }

  removedAllItems(layersWrapper) {
    layersWrapper.classList.add('mt_0');

    const btnWrapper = document.querySelector('.templates-btn__wrapper');

    btnWrapper.classList.remove('mt_20_br_1_pt_20');
  }

  removedItem(removedData) {
    const {
      layersWrapper,
      firstItem,
      secondItem,
      menu,
    } = removedData;

    layersWrapper.classList.remove('mt_0');

    const layers = menu.querySelectorAll('.layers__item');

    if (firstItem) {
      const secondItemClone = utils.cloneElement(layers[0]);
      layers[0].remove();
      layersWrapper.insertBefore(firstItem, layers[1]);

      if (layers[1]) {
        layers[1].remove();
        layersWrapper.insertBefore(secondItemClone, layers[2]);
      }
    }

    if (secondItem) {
      if (layers[1]) {
        layers[1].remove();
        layersWrapper.insertBefore(secondItem, layers[2]);
      }
    }

    layers.forEach((elem, index) => {
      elem.querySelector('.layers-item__name').innerText = `${index + 1} счет`;
    });
  }
}

export default RemoveLayer;
