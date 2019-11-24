import React from 'react';

import {html} from 'components';

import './Loader.scss';

const bem = html.bem('Loader');

export default class Loader extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                <div className={bem.element('loader')}/>
            </div>
        );
    }
}
