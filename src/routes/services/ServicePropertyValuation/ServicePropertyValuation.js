import React from 'react';

import {html} from 'components';

import './ServicePropertyValuation.scss';

const bem = html.bem('ServicePropertyValuation');

export default class ServicePropertyValuation extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                <div className='container-fluid my-5'>
                    <h1>Оценка объектов недвижимости</h1>
                    <div style={{marginBottom: 500}}/>
                </div>
            </div>
        );
    }

}
