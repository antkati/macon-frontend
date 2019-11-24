import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ModalWrapper from 'yii-steroids/ui/modal/ModalWrapper';
import layoutHoc, {STATUS_LOADING, STATUS_OK, STATUS_RENDER_ERROR} from 'yii-steroids/ui/layoutHoc';
import {getCurrentItem, getCurrentItemParam, getNavItems} from 'yii-steroids/reducers/navigation';
import {isAuthorized} from 'yii-steroids/reducers/auth';
import {html, http, store} from 'components';

import './Layout.scss';
import Loader from 'shared/Loader/Loader';
import Header from 'shared/Header';
import Footer from 'shared/Footer';
import {initContacts} from '../../actions/contacts';
import screenWatcherHoc from 'yii-steroids/ui/screenWatcherHoc';

const bem = html.bem('Layout');

export const LAYOUT_MAIN = 'main';
export const LAYOUT_INDEX = 'index';
export const LAYOUT_TEAM = 'team';

@layoutHoc(
    () => http.post('/api/v1/init', {
        timestamp: Date.now(),
        enums: [
            'app.article.models.ArticleTag',
        ],
    })
    .then(data => {
        store.dispatch(initContacts(data.contacts));
        return  data;
    })
)
@connect(
    state => ({
        isAuthorized: isAuthorized(state),
        layout: getCurrentItemParam(state, 'layout') || LAYOUT_MAIN,
        routeId: getCurrentItemParam(state, 'id'),
    })
)

@screenWatcherHoc()
export default class Layout extends React.PureComponent {

    static propTypes = {
        isAuthorized: PropTypes.bool,
        homeUrl: PropTypes.string,
        status: PropTypes.string,
        layout: PropTypes.string,
        routeId: PropTypes.string,
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.routeId !== nextProps.routeId) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        if (this.props.status === STATUS_RENDER_ERROR) {
            return null;
        }

        return (
            <div className={bem.block({layout: this.props.layout})}>
                {this.props.layout === LAYOUT_MAIN && this.renderMainLayout()}
                {this.props.layout === LAYOUT_INDEX && this.renderIndexLayout()}
                {this.props.layout === LAYOUT_TEAM && this.renderTeamLayout()}
                <ModalWrapper/>
            </div>
        );
    }

    renderMainLayout() {
        return (
            <div className={bem.element('main-wrapper')}>
                <Header/>
                {this.renderContent()}
                <Footer/>
            </div>
        );
    }

    renderIndexLayout() {
        return (
            <div className={bem.element('main-wrapper')}>
                {this.renderContent()}
                <Footer/>
            </div>
        );
    }

    renderTeamLayout() {
        return (
            <div className={bem.element('main-wrapper')}>
                <Header/>
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        switch (this.props.status) {
            case STATUS_LOADING:
                return <Loader/>;

            case STATUS_OK:
                return this.props.children;
        }

        // TODO other statuses
        return this.props.status;
    }
}
