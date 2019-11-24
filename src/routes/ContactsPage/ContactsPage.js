import React from 'react';
import {connect} from 'react-redux';
import {html} from 'components';
import {getContacts} from '../../reducers/contacts';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import ContactsPageMap from './views/ContactsPageMap';
import './ContactsPage.scss';
import Icon from 'shared/Icon';

const bem = html.bem('ContactsPage');

@connect(
    state => ({
        contacts: getContacts(state),
    })
)
export default class ContactsPage extends React.PureComponent {
    static propTypes = {
        contacts: PropTypes.shape({
            address: PropTypes.string,
            email: PropTypes.string,
            phone_1: PropTypes.string,
            phone_2: PropTypes.string,
        }),
    };

    render() {
        const {address, email, phone_1, phone_2} = this.props.contacts;
        return (
            <div className={bem.block()}>
                <div className={bem('container-fluid')}>
                    <div className={bem.element('map')}>
                        <ContactsPageMap />
                    </div>
                    <div className={bem.element('contacts')}>
                        {address && (
                            <div className={bem.element('contacts-item')}>
                                <h4>{__('Адрес')}</h4>
                                <div className={bem.element('contact')}>
                                    <a
                                        href={'https://yandex.ru/maps/-/CGX5rLZr'}
                                        target={'_blank'}
                                    >
                                        {address}
                                    </a>
                                </div>
                            </div>
                        )}
                        {(phone_1 || phone_2) && (
                            <div className={bem.element('contacts-item')}>
                                <h4>{__('Телефон')}</h4>
                                {[phone_1, phone_2].filter(Boolean).map((phone, index) => {
                                    let phoneNum = phone.replace(/[^0-9]/g, '');
                                    return (
                                        <div
                                            key={index}
                                            className={bem.element('contact', `${index + 1}`)}
                                        >
                                            <a href={`tel:${phoneNum.length === 10 ? `+7${phoneNum}` : phoneNum}`}>
                                                {phoneNum.length === 10 ? `8 ${phone}` : phone}
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {email && (
                            <div className={bem.element('contacts-item')}>
                                <h4>{__('E-mail')}</h4>
                                <div className={bem.element('contact')}>
                                    <a href={`mailto:${email}`}>
                                        {email}
                                    </a>
                                </div>
                            </div>
                        )}
                        <div className={bem(bem.element('contacts-item'), 'd-none', 'd-lg-block')}>
                            <h4>{__('Мы в соц. сетях')}</h4>
                            <div className={bem.element('social-icons')}>
                                <a
                                    href={'#'}
                                    className={bem.element('social-icon')}
                                >
                                    <Icon name={'blackFacebook'} />
                                </a>
                                <a
                                    href={'#'}
                                    className={bem.element('social-icon')}
                                >
                                    <Icon name={'blackTelegram'}/>
                                </a>
                                <a
                                    href={'#'}
                                    className={bem.element('social-icon')}
                                >
                                    <Icon name={'blackYoutube'}/>
                                </a>
                                <a
                                    href={'#'}
                                    className={bem.element('social-icon')}
                                >
                                    <Icon name={'blackInstagram'}/>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}
