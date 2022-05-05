import AddReglament from './events/addReglaments.js';
import UpdateReglament from './events/updateReglament.js';
import Utils from '../../../../utils/utils.js';
import ViewReglament from './events/viewReglament.js';

const addReglament = new AddReglament();
const updateReglament = new UpdateReglament();
const utils = new Utils();
const viewReglament = new ViewReglament();

class Reglament {
    init(props) {
        const container = document.querySelector('.content-main.article-container');

        const dispatchContainer = this.dispatchContainer.bind(this, props);

        container.addEventListener('click', dispatchContainer);
    }

    dispatchContainer(props, e) {
        const t = e.target;
        props.target = t;

        const create = t.hasAttribute('js-create-article');
        const update = t.hasAttribute('js-update-article');
        const view = t.hasAttribute('js-open-article');

        const button = create || update || view;

        props.idReglament = +utils.getParent(t, 'theme')?.getAttribute('data-article');

        switch (button) {
            case create: {
                addReglament.init.bind(addReglament)(props);
                break;
            }
            case update: {
                updateReglament.init.bind(updateReglament)(props);
                break;
            }
            case view: {
                viewReglament.init.bind(viewReglament)(props);
                break;
            }
            default: {
                break;
            }
        }
    }
}

export default Reglament;
