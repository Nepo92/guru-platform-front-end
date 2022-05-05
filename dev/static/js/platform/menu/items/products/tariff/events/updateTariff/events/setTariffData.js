import TariffBlocks from '../../tariffBlocks.js';

class SetTariffData extends TariffBlocks {
  constructor() {
    super();
  }

  init(props) {
    const { menu, tariff } = props;
    const { name, price } = tariff;

    const tariffName = menu.querySelector('[tariff-name]');
    tariffName.value = name;

    const tariffCoast = menu.querySelector('[tariff-coast]');
    tariffCoast.value = price;
    this.renderBlocksToMenu(props);

    const blocks = this.getBlocks(props);

    blocks.then((blocksData) => {
      const data = {
        ...props,
        blocks: blocksData,
      };

      this.renderBlocksToMenu(data);
    });
  }
}

export default SetTariffData;
