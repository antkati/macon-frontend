import React from 'react';

import {html} from 'components';

import './ServicePromotionAndSales.scss';

const bem = html.bem('ServicePromotionAndSales');

export default class ServicePromotionAndSales extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                <div className='container-fluid my-5'>
                    <h1>Продвижение и продажи</h1>
                    <div style={{marginBottom: 500}}/>
                </div>
            </div>
        );
    }

}
