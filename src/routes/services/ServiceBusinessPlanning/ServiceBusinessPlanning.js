import React from 'react';

import {html} from 'components';

import './ServiceBusinessPlanning.scss';

const bem = html.bem('ServiceBusinessPlanning');

export default class ServiceBusinessPlanning extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                <div className='container-fluid my-5'>
                    <h1>Бизнес-планирование</h1>
                    <div style={{marginBottom: 500}}/>
                </div>
            </div>
        );
    }

}
