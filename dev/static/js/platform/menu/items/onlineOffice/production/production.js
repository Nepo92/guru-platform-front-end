import AddProduction from './events/addProduction.js';
import UpdateProduction from './events/updateProduction.js';
import Utils from '../../../../utils/utils.js';
import ViewProduction from './events/viewProduction.js';

const addProduction = new AddProduction();
const updateProduction = new UpdateProduction();
const utils = new Utils();
const viewProduction = new ViewProduction();

class Production {
    init(props) {
        const container = document.querySelector('.content-main.article-container.production');

        const dispatchContainer = this.dispatchContainer.bind(this, props);

        if (container) {
            const clone = utils.setCloneElement(container);
            clone.addEventListener('click', dispatchContainer);
        }
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
                addProduction.init.bind(addProduction)(props);
                break;
            }
            case 'update': {
                updateProduction.init.bind(updateProduction)(props);
                break;
            }
            case 'view': {
                viewProduction.init.bind(viewProduction)(props);
                break;
            }
            default: {
                break;
            }
        }
    }
}

export default Production;
