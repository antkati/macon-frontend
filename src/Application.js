import React from 'react';
import {hot} from 'react-hot-loader';
import Router from 'yii-steroids/ui/nav/Router';

import {ui} from 'components';
import Layout from 'shared/Layout';
import routes from './routes';

ui.addViews(require.context('yii-steroids/ui', true, /View.js$/));

/*ui.addViews({
    'modal.ModalView': require('./ui/modal/Modal/ModalView').default,
    'form.ButtonView': require('./ui/form/Button/ButtonView').default,
});*/

// Automatically import all views from yii-steroids
ui.addViews(require.context('./ui', true, /View.js$/));

// Automatically import all fields and formatters from yii-steroids
ui.addFields(require.context('yii-steroids/ui', true, /Field.js$/));
ui.addFormatters(require.context('yii-steroids/ui', true, /Formatter.js$/));

@hot(module)
export default class Application extends React.PureComponent {

    render() {
        return (
            <Router
                wrapperView={Layout}
                routes={routes}
            />
        );
    }
}
