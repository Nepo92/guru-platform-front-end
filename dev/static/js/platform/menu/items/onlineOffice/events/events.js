import AddEvents from './events/addEvents.js';
import UpdateEvents from './events/updateEvents.js';
import Utils from '../../../../utils/utils.js';
import ViewEvents from './events/viewEvents.js';

const addEvents = new AddEvents();
const updateEvents = new UpdateEvents();
const utils = new Utils();
const viewEvents = new ViewEvents();

class Events {
    init(props) {
        const container = document.querySelector('.content-main.article-container');

        const dispatchContainer = this.dispatchContainer.bind(this, props);

        container.addEventListener('click', dispatchContainer);
    }

    dispatchContainer(props, e) {
        const t = e.target;
        props.target = t;

        const create = t.hasAttribute('js-create-article') ? 'create' : '';
        const update = t.hasAttribute('js-update-article') ? 'update' : '';
        const view = t.hasAttribute('js-open-article') ? 'view' : '';

        const button = create || update || view;

        props.idReglament = +utils.getParent(t, 'theme')?.getAttribute('data-article');

        switch (button) {
            case 'create': {
                addEvents.init.bind(addEvents)(props);
                break;
            }
            case 'update': {
                updateEvents.init.bind(updateEvents)(props);
                break;
            }
            case 'view': {
                viewEvents.init.bind(viewEvents)(props, e);
                break;
            }
            default: {
                break;
            }
        }
    }
}

export default Events;
