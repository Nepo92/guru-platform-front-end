import Menu from './menu/menu.js';
import Admin from './users/admin/admin.js';
import Manager from './users/manager/manager.js';
import Examiner from './users/examiner/examiner.js';
import HeadManager from './users/headManager/headManager.js';
import Control from './users/control/control.js';
import Client from './users/client/client.js';
import Utils from './utils/utils.js';
import Curator from './users/curator/curator.js';

const menu = new Menu();
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

		const items = [menu, user];

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
				instance: new Control(),
				role: 'ROLE_CONTROL',
			},
			{
				instance: new Curator(),
				role: 'ROLE_CURATOR',
			},
			{
				instance: new Client(),
				role: null,
			},
		];
	}
}

export default Platform;
