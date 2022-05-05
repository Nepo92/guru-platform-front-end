import ITabsSettingsContracts from './iTabsSettingsContracts/iTabsSettingsContracts.js';
import IAddContract from './iAddContract/iAddContract.js';
import ICloseContractMenu from './iCloseContractMenu/iCloseContractMenu.js';
import IEditContract from './iEditContract/iEditContract.js';
import ISearchContract from './iSearchContract/iSearchContract.js';

const iTabsSettingsContracts = new ITabsSettingsContracts();
const iAddContract = new IAddContract();
const iCloseContractMenu = new ICloseContractMenu();
const iEditContract = new IEditContract();
const iSearchContract = new ISearchContract();

class ISettingsContracts {
  init(props) {
    const items = [
      iTabsSettingsContracts,
      iAddContract,
      iCloseContractMenu,
      iEditContract,
      iSearchContract,
    ];

    props.iEditContract = iEditContract;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default ISettingsContracts;
