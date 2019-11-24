import React from 'react';

import {html} from 'components';

import './ServiceAnalysisAndResearch.scss';

const bem = html.bem('ServiceAnalysisAndResearch');

export default class ServiceAnalysisAndResearch extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                <div className='container-fluid my-5'>
                    <h1>Анализ и исследование</h1>
                    <div style={{marginBottom: 500}}/>
                </div>
            </div>
        );
    }

}
