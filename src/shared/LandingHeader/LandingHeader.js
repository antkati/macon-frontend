import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser, isAuthorized, isInitialized} from 'yii-steroids/reducers/auth';
import {html} from 'components';
import './LandingHeader.scss';
import Link from 'yii-steroids/ui/nav/Link';
import {openModal} from 'yii-steroids/actions/modal';
import LoginModal from 'modals/LoginModal';
import {logout} from 'yii-steroids/actions/auth';
import Button from 'yii-steroids/ui/form/Button';
import UserRole from 'enums/UserRole';
import { ROUTE_ROOT, ROUTE_SEARCH } from 'routes';
import {getNavItems} from 'yii-steroids/reducers/navigation';
import Icon from 'shared/Icon';
import logo from '../../../public/images/logo.png';


const bem = html.bem('LandingHeader');

@connect(
    state => {
        return {
            isInitialized: isInitialized(state),
            isAuthorized: isAuthorized(state),
            user: getUser(state),
            navItems: getNavItems(state, ROUTE_ROOT),
        };
    }
)
export default class LandingHeader extends React.PureComponent {

    static propTypes = {
        isInitialized: PropTypes.bool,
        isAuthorized: PropTypes.bool,
        user: PropTypes.object,
    };


    render() {
        const navItems = this.props.navItems.filter(item => item.isNavVisible !== false);

        return (
            <header className={bem.block()}>
                <div className={bem(bem.element('main-nav'), 'row')}>
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
                                        color='dark'
                                        className={bem.element('link')}
                                        label={item.title}
                                        toRoute={item.id}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={'d-lg-flex d-none flex-row align-items-center col-auto'}>
                        <Link toRoute={ROUTE_SEARCH}>
                            <Icon name='search' className={bem.element('search')} />
                        </Link>
                        <div>
                            {this.props.user && (
                                <p>
                                    {this.props.user.name}
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
                                        label='Logout'
                                        onClick={() => this.props.dispatch(logout())}
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
            </header>
        );
    }

}
