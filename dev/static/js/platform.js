import Menu from "./modules/menu/menu.js";
import Curator from "./users/curator.js";
import Admin from "./users/admin.js";
import Manager from "./users/manager.js";
import User from './users/user.js';
import HeadManager from "./users/headManager.js";
import Client from "./users/client.js";
import Advertiser from "./users/advertiser.js";
import Examiner from "./users/examiner.js";

class Platform {
    constructor(settings = null) {
        if (settings) {
            this.settingsPack = settings;

            if (this.settingsPack.role === null) this.settingsPack.role = 'ROLE_CLIENT';

            this.settings(this.settingsPack.role);
        }
    }

    settings(role) {
        const ROLE_CURATOR = 'ROLE_CURATOR';
        const ROLE_ADVERTISER = 'ROLE_ADVERTISER';
        const ROLE_EXAMINER = 'ROLE_EXAMINER';
        const ROLE_ADMIN = 'ROLE_ADMIN';
        const ROLE_MANAGER = 'ROLE_MANAGER';
        const ROLE_HEAD_MANAGER = 'ROLE_HEAD_MANAGER';
        const ROLE_CLIENT = 'ROLE_CLIENT';

        switch(role) {
            case ROLE_CURATOR:
                const curator = new Curator(this.settingsPack);
                break;
            case ROLE_ADVERTISER:
                const advertiser = new Advertiser(this.settingsPack);
                break;
            case ROLE_EXAMINER:
                const examiner = new Examiner(this.settingsPack);
                break;
            case ROLE_ADMIN:
                const admin = new Admin(this.settingsPack);
                break;
            case ROLE_MANAGER:
                const manager = new Manager(this.settingsPack);
                break;
            case ROLE_HEAD_MANAGER:
                const headManager = new HeadManager(this.settingsPack);
                break;
            case ROLE_CLIENT:
                const client = new Client(this.settingsPack);
                break;
            default:
                const user = new User(this.settingsPack);
                break;
        }
    }
}

const menu = new Menu();

export default Platform;
