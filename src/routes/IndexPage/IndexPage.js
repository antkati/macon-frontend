import React from 'react';
import PropTypes from 'prop-types';
import {html} from 'components';
import fetchHoc from 'yii-steroids/ui/nav/fetchHoc';

import IndexPageHeader from './views/IndexPageHeader';
import IndexPageProjects from './views/IndexPageProjects';
import IndexPageServices from './views/IndexPageServices';
import IndexPageAnalytics from './views/IndexPageAnalytics'
import IndexPageNews from './views/IndexPageNews';

import './IndexPage.scss';

const bem = html.bem('IndexPage');

@fetchHoc(
    () => ({
        url: '/api/v1/main',
        key: 'main',
    })
)
export default class IndexPage extends React.PureComponent {

    static propTypes = {
        main: PropTypes.object,
    };

    render() {
        return (
            <div className={bem.block()}>
                <IndexPageHeader />
                <IndexPageProjects
                    projects={this.props.main.projects}
                />
                <IndexPageServices/>
                <IndexPageAnalytics
                    publications={this.props.main.publications}
                />
                <IndexPageNews
                    news={this.props.main.news}
                />
            </div>
        );
    }
}
