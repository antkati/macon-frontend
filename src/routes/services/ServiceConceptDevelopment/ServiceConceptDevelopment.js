import React from 'react';

import {html} from 'components';

import './ServiceConceptDevelopment.scss';

const bem = html.bem('ServiceConceptDevelopment');

export default class ServiceConceptDevelopment extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                <div className='container-fluid my-5'>
                    <h1>Разработка концепций</h1>
                    <div style={{marginBottom: 500}}/>
                </div>
            </div>
        );
    }

}
