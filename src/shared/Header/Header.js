import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import {getUser, isAuthorized, isInitialized} from 'yii-steroids/reducers/auth';
import {html} from 'components';
import './Header.scss';
import Link from 'yii-steroids/ui/nav/Link';
import {openModal} from 'yii-steroids/actions/modal';
import LoginModal from 'modals/LoginModal';
import Button from 'yii-steroids/ui/form/Button';
import ProfileModal from 'modals/ProfileModal';
import HeaderSearch from './views/HeaderSearch.js';
import UserRole from 'enums/UserRole';
import {ROUTE_PUBLICATIONS_CATEGORY, ROUTE_ROOT} from 'routes';
import {getNavItems} from 'yii-steroids/reducers/navigation';
import Icon from 'shared/Icon';
import logo from '../../../public/images/red-logo.png';
import {getEnumLabels} from 'yii-steroids/reducers/fields';
import TagCategory from 'enums/TagCategory';
import {getCurrentRoute} from 'yii-steroids/reducers/navigation';

const bem = html.bem('Header');

@connect(
    state => {
        const navItems = getNavItems(state, ROUTE_ROOT);
        const activeItem = navItems.find(item => item.isActive);

        return {
            isInitialized: isInitialized(state),
            isAuthorized: isAuthorized(state),
            user: getUser(state),
            navItems,
            subNavItems: activeItem ? getNavItems(state, activeItem.id) : null,
            tags: getEnumLabels(state, 'app.article.models.ArticleTag'),
            activeTagName: _get(getCurrentRoute(state), 'params.tagName'),
        };
    }
)
export default class Header extends React.PureComponent {

    static propTypes = {
        isInitialized: PropTypes.bool,
        isAuthorized: PropTypes.bool,
        user: PropTypes.object,
        activeTagName: PropTypes.string,
    };


    render() {
        if (!this.props.tags) {
            return null;
        }

        const navItems = this.props.navItems.filter(item => item.isNavVisible !== false);
        let subNavItems = (this.props.subNavItems || []).filter(item => item.isNavVisible !== false);
        if (subNavItems.length === 1 && subNavItems[0].id === ROUTE_PUBLICATIONS_CATEGORY) {
            // id, title, isActive, params
            subNavItems = []
                .concat({
                    name: 'all',
                    label: __('Все публикации')
                })
                .concat(this.props.tags.filter(tag => tag.category === TagCategory.PUBLICATION))
                .map(tag => ({
                    id: ROUTE_PUBLICATIONS_CATEGORY,
                    title: tag.label.replace(/_/g, ' '),
                    isActive: this.props.activeTagName === tag.name,
                    params: {
                        tagName: tag.name,
                    }
                }))
        }

        return (
            <header className={bem.block()}>
                <div className={bem.element('main-nav')}>
                    <div className={bem('container-fluid')}>
                        <div className={bem(bem.element('row'), 'row')}>
                            <Link
                                className={bem(bem.element('burger'), 'col-auto', 'align-self-center', 'd-lg-none')}
                            >
                                <Icon className={bem.element('burger-icon')} name={'menu'}/>
                            </Link>
                            <div className={'col-auto align-self-center flex-grow-1 flex-lg-grow-0 text-center'}>
                                <Link
                                    toRoute={ROUTE_ROOT}
                                >
                                    <img className={bem.element('logo-img')} src={logo}/>
                                </Link>
                            </div>
                            <Link
                                className={bem(bem.element('user-mobile'), 'col-auto', 'align-self-center', 'd-lg-none')}
                                onClick={() => this.props.dispatch(openModal(LoginModal, {modalId: 'LoginModal'}))}
                            >
                                <Icon className={bem.element('user-icon')} name={'user'}/>
                            </Link>
                            <nav className={'col d-lg-flex flex-row justify-content-center d-none'}>
                                <ul className={bem(bem.element('nav'), 'nav', 'justify-content-center')}>
                                    {navItems.map(item => (
                                        <li
                                            key={item.id}
                                            className={bem(bem.element('nav-item', {active: item.isActive}), 'nav-item')}
                                        >
                                            <Link
                                                color='light'
                                                className={bem.element('link')}
                                                label={item.title}
                                                toRoute={item.id}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className={'d-lg-flex d-none flex-row align-items-center col-auto'}>
                                <HeaderSearch />
                                <div>
                                    {this.props.isAuthorized && (
                                        <p>
                                            {this.props.user.role === UserRole.ADMIN && (
                                                <>
                                                    &nbsp;
                                                    <Link
                                                        label='Admin'
                                                        url='/admin'
                                                    />
                                                </>
                                            )}
                                            &nbsp;
                                            <Link
                                                label={this.props.user.name}
                                                onClick={() => this.props.dispatch(openModal(ProfileModal))}
                                            />
                                        </p>
                                    ) ||
                                    (
                                        <>
                                            <Button
                                                color='info'
                                                layout={false}
                                                onClick={() => this.props.dispatch(openModal(LoginModal, {modalId: 'LoginModal'}))}
                                            >
                                                {__('Войти')}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={bem(bem.element('row-white'), 'row', 'd-flex', 'd-lg-none')}></div>
                    </div>
                </div>
                {subNavItems.length > 0 && (
                    <div className={bem(bem.element('sub-nav'))}>
                        <div
                            onMouseDown={(e) => e.preventDefault()}
                            className='container-fluid'
                        >
                            <div className={bem(bem.element('sub-nav-row'))}>
                                <div className={bem(bem.element('sub-nav-col'))}>
                                    <ul className={bem(bem.element('sub-nav-ul'))}>
                                        {subNavItems.map((item, index) => (
                                            <li
                                                key={index}
                                                className={bem(bem.element('sub-nav-item',
                                                    {active: item.isActive})
                                                )}
                                            >
                                                <Link
                                                    color='light'
                                                    className={bem.element('link')}
                                                    label={item.title}
                                                    toRoute={item.id}
                                                    toRouteParams={item.params}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        );
    }

}
