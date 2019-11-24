import React from 'react';
import {connect} from 'react-redux';
import IndexHeaderSearch from './views/IndexHeaderSearch';
import Link from 'yii-steroids/ui/nav/Link';
import {html} from 'components';
import Icon from 'shared/Icon';
import {openModal} from 'yii-steroids/actions/modal';
import LoginModal from 'modals/LoginModal';
import ProfileModal from 'modals/ProfileModal';
import {ROUTE_ROOT} from 'routes/index';
import {getNavItems} from 'yii-steroids/reducers/navigation';
import './IndexHeader.scss';
import logo from '../../../public/images/logo.png';
import redLogo from '../../../public/images/red-logo.png';
import PropTypes from 'prop-types';
import {isAuthorized} from 'yii-steroids/reducers/auth';


const bem = html.bem('IndexHeader');


@connect(
    state => ({
        navItems: getNavItems(state, ROUTE_ROOT),
        isAuthorized: isAuthorized(state)
    })
)

export default class IndexHeader extends React.PureComponent {

    static propTypes = {
        isSearchPage: PropTypes.bool,
        isAuthorized: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };


        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState(state => ({isNavOpen: !state.isNavOpen}));
    }

    render() {
        const navItems = this.props.navItems.filter(item => item.isNavVisible !== false);

        return (
            <header className={bem.block({isSearchPage: this.props.isSearchPage})}>
                <div className={bem(bem.element('menu'))}>
                    <div className={bem('container-fluid')}>
                        <div className={bem(bem.element('row'), 'row', 'align-items-center','justify-content-lg-start')}>
                            <Link
                                className={bem(bem.element('logo-wrap'), 'col-auto')}
                                toRoute={ROUTE_ROOT}
                            >
                                <img
                                    className={bem.element('logo', 'red')}
                                    src={redLogo}
                                    alt={__('MACON')}
                                />
                                <img
                                    className={bem.element('logo', 'white')}
                                    src={logo}
                                    alt={__('MACON')}
                                />
                            </Link>
                            <div className={bem(bem.element('search-wrap'), 'col')}>
                                    <ul className={bem(
                                        bem.element('nav'),
                                        'nav', 'justify-content-center', 'd-none', 'd-lg-flex', this.state.isNavOpen && 'open'
                                    )}>
                                        {navItems.map(item => (
                                            <li
                                                key={item.id}
                                                className={bem(bem.element('nav-item'), 'nav-item')}
                                            >
                                                <Link
                                                    color='light'
                                                    className={bem.element('header-link')}
                                                    label={item.title}
                                                    toRoute={item.id}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                     <IndexHeaderSearch
                                        isSearchPage={this.props.isSearchPage}
                                        isNavOpen={this.state.isNavOpen}
                                    />
                            </div>
                            <div className={(bem(bem.element('burger-wrap'), 'col-auto'))}>
                                {this.state.isNavOpen
                                    ? (
                                        <div
                                            className={bem.element('search-btn')}
                                            onClick={this.toggleNav}
                                        >
                                            <Icon
                                                className={bem.element('search-icon')}
                                                name='search'
                                            />
                                        </div>
                                    )
                                    : (
                                        <div
                                            className={bem.element('burger-btn')}
                                            onClick={this.toggleNav}
                                        >
                                            <Icon className={bem.element('burger-icon')} name='menu'/>
                                        </div>
                                    )}
                            </div>
                            <div className={bem(bem.element('user-wrap'), 'col-auto')}>
                                <Link
                                    className={bem.element('user-btn')}
                                    onClick={() => {
                                            if(!this.props.isAuthorized) {
                                                this.props.dispatch(openModal(LoginModal, {modalId: 'LoginModal'}))
                                            } else {
                                                this.props.dispatch(openModal(ProfileModal))
                                            }
                                        }
                                    }
                                >
                                    <Icon className={bem.element('user-icon')} name='user'/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
