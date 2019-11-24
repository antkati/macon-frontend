import React from 'react';

import {html} from 'components';

import './ServiceStrategicConsulting.scss';

const bem = html.bem('ServiceStrategicConsulting');

export default class ServiceStrategicConsulting extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                <div className='container-fluid my-5'>
                    <h1>Стратегический консалтинг</h1>
                    <div style={{marginBottom: 500}}/>
                </div>
            </div>
        );
    }

}
