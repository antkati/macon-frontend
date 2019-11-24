import React from 'react';
import {html} from 'components';

import './PublicationsSort.scss';

const bem = html.bem('Sort');

export default class PublicationsSort extends React.PureComponent {
    static propTypes = {
    };

    render() {
        return (
            <div className={bem.block()}>
                <span className={bem(bem.element('type'), 'title')}>
                    Все города
                </span>
            </div>
        )
    }
}