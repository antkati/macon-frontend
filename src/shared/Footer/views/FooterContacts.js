import React from 'react';
import PropTypes from 'prop-types';
import {html} from 'components';
import './FooterContacts.scss';
import Icon from '../../Icon';

const bem = html.bem('FooterContacts');

export default class FooterContacts extends React.PureComponent {
    static propTypes = {
        address: PropTypes.string,
        email: PropTypes.string,
        phone_1: PropTypes.string,
        phone_2: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        }
    }

    toggleContact() {
        this.setState(state => ({
            isOpened: !state.isOpened
        }))
    }

    renderContact({address, email, phone_1, phone_2}) {
        return (
            <ul className={bem(bem.element('contacts-list'), 'list-unstyled', 'order-0', 'order-lg-1')}>
                {address && (
                    <li className={bem.element('contacts-item')}>
                        <span className={bem.element('label')}>{__('Адрес')}</span>
                        <a
                            href={'https://yandex.ru/maps/-/CGX5rLZr'}
                            target={'_blank'}
                            className={bem.element('address')}
                        >
                            {address}
                        </a>
                    </li>
                )}
                {(phone_1 || phone_2) && (
                    <li className={bem.element('contacts-item')}>
                        <span className={bem.element('label')}>{__('Телефон')}</span>
                        {[phone_1, phone_2].filter(Boolean).map((phone, index) => {
                            let phoneNum = phone.replace(/[^0-9]/g, '');
                            return (
                                <a
                                    href={`tel:${phoneNum.length === 10 ? `+7${phoneNum}` : phoneNum}`}
                                    key={index}
                                    className={bem.element('phone')}
                                >
                                    {phoneNum.length === 10 ? `8 ${phone}` : phone}
                                </a>
                            )
                        })}
                    </li>
                )}
                {email && (
                    <li className={bem.element('contacts-item')}>
                        <span className={bem.element('label')}>{__('E-mail')}</span>
                        <a className={bem.element('email')} href={`mailto:${email}`}>
                            {email}
                        </a>
                    </li>
                )}
            </ul>
        )
    }

    render() {
        return (
            <>
                <div className={bem(bem.block(), 'd-none', 'd-lg-block')}>
                    {this.renderContact(this.props)}
                </div>
                <div className={bem(bem.block('mobile'), 'd-block', 'd-lg-none')}>
                    <div
                        className={bem(bem.element('heading-btn'), 'd-flex', 'justify-content-between')}
                        onClick={() => this.toggleContact()}
                    >
                        <span>{__('Контакты')}</span>
                        <Icon
                            name={'filterArrow'}
                            className={bem.element('arrow-icon', {
                                opened: this.state.isOpened
                            })}
                        />
                    </div>
                    {this.state.isOpened && this.renderContact(this.props)}
                </div>

            </>
        );
    }
}
