import Menu from './menu/menu.js';
import Tabs from './modules/tabs/tabs';
import Admin from './users/admin/admin.js';
import Manager from './users/manager/manager.js';
import Examiner from './users/examiner/examiner.js';
import HeadManager from './users/headManager/headManager.js';
import Client from './users/client/client.js';
import Utils from './utils/utils.js';
import Curator from './users/curator/curator.js';
import Advertiser from './users/advertiser/advertiser';

const menu = new Menu();
const tabs = new Tabs();
const utils = new Utils();

class Platform {
	init(props) {
		const { role } = props;

		const user = this.getUsers().find((el) => el.role === role)?.instance;

		const platformData = {
			pack: {
				...props,
			},
			user,
		};

		const items = [menu, user, tabs];

		items.forEach((item) => {
			const init = item.init.bind(item);
			init(platformData);
		});

		utils.hideLoader();
	}

	getUsers() {
		return [
			{
				instance: new Admin(),
				role: 'ROLE_ADMIN',
			},
			{
				instance: new Manager(),
				role: 'ROLE_MANAGER',
			},
			{
				instance: new Examiner(),
				role: 'ROLE_EXAMINER',
			},
			{
				instance: new HeadManager(),
				role: 'ROLE_HEAD_MANAGER',
			},
			{
				instance: new Curator(),
				role: 'ROLE_CURATOR',
			},
			{
				instance: new Advertiser(),
				role: 'ROLE_ADVERTISER',
			},
			{
				instance: new Client(),
				role: null,
			},
		];
	}
}

export default Platform;
