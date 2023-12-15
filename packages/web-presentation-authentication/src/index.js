import {Pages, Popups} from './components/index';
import * as Actions from './actions/index'

const moduleName = 'auth-service';

export default arg => {
    const {name, action, page, modal} = arg;
    name(moduleName);

    Object.keys(Pages).forEach(pageDescription => {
        page(Pages[pageDescription]);
    });

    Object.keys(Popups).forEach(modalDescription => {
        modal(Popups[modalDescription]);
    });

    Object.keys(Actions).forEach(actionDescription => {
        action(Actions[actionDescription]);
    });

    return arg;
}
export {moduleName}

export Permissions from './permissions'

export {PageKeys} from './components/index'

export Rights from './rights';
