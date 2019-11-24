import React from 'react';

import {html} from 'components';

import './ServiceLargeAreaDevelopment.scss';

const bem = html.bem('ServiceLargeAreaDevelopment');

export default class ServiceLargeAreaDevelopment extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                <div className='container-fluid my-5'>
                    <h1>Развитие крупных территорий</h1>
                    <div style={{marginBottom: 500}}/>
                </div>
            </div>
        );
    }

}
