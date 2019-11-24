import React from 'react';
import {connect} from 'react-redux';
import Modal from 'yii-steroids/ui/modal/Modal';
import Form from 'yii-steroids/ui/form/Form';

import {html} from 'components';

import './RegistrationModal.scss';
import Button from 'yii-steroids/ui/form/Button';
import InputField from 'yii-steroids/ui/form/InputField';
import {login} from 'yii-steroids/actions/auth';

import logo from '../../../public/images/logo.png';
import Link from 'yii-steroids/ui/nav/Link';
import { closeModal, openModal } from 'yii-steroids/actions/modal';
import LoginModal from 'modals/LoginModal';
const bem = html.bem('RegistrationModal');

@connect()

export default class RegistrationModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
        };
    }


    render() {
        const actions = [
            '/api/v1/auth/registration/step-1',
            '/api/v1/auth/registration/step-2',
            '/api/v1/auth/registration/confirm',
        ];


        return (
            <Modal
                {...this.props.modalProps}
                className={bem.block()}
                forAuth
            >
                <div className={bem(bem.element('left-col'), 'd-none', 'd-md-block')}>
                    <img className={bem.element('logo')} src={logo}/>
                </div>
                <div className={bem.element('right-col')}>
                    {this.state.step <= 2 && (
                        <>
                            <h5 className={bem.element('title')}>{__('Регистрация')}</h5>
                            <div className={bem.element('text')}>
                                {__('Пройдите бесплатную регистрацию и получите партнёрский доступ к результатам аналитики.')}
                            </div>
                        </>
                    )}
                    <Form
                        formId='RegistrationModal'
                        action={actions[this.state.step - 1]}
                        onComplete={(values, result) => {
                            if (this.state.step <= 2) {
                                this.setState({step: this.state.step + 1}, () => {
                                    const el = document.querySelector(`.${bem.block()} input[type=text]`);
                                    el && el.focus();
                                });
                            } else if (result.accessToken) {
                                this.props.dispatch(login(result.accessToken));
                                this.props.onClose();
                            }
                        }}
                        autoFocus
                    >
                        {this.state.step === 1 && (
                            <>
                                <InputField
                                    attribute='email'
                                    placeholder='E-mail'
                                />
                                <InputField
                                    type='password'
                                    attribute='password'
                                    placeholder={__('Пароль')}
                                />
                            </>
                        )}
                        {this.state.step === 2 && (
                            <>
                                <InputField
                                    attribute='username'
                                    placeholder={__('Имя')}
                                />
                                <InputField
                                    attribute='workPosition'
                                    placeholder={__('Должность')}
                                />
                                <InputField
                                    attribute='workOrganisation'
                                    placeholder={__('Организация')}
                                />
                            </>
                        )}
                        {this.state.step === 3 && (
                            <div className={bem.element('confirmation')}>
                                <h5>
                                    {__('Спасибо')}
                                </h5>
                                <div className={bem.element('text')}>
                                    <span>
                                        {__('Остался всего один шаг.')}
                                        <br/>
                                        {__('Проверьте свою почту и введите 6-значный код, присланный вам, ниже.')}
                                    </span>
                                </div>
                                <InputField
                                    attribute='code'
                                />
                            </div>
                        )}
                        {this.state.step <= 2 && (
                            <div className={bem.element('actions')}>
                                    <div className={bem.element('step')}>
                                        {__('Шаг {number} из {total}', {
                                            number: this.state.step,
                                            total: 2,
                                        })}
                                    </div>
                                <Button
                                    type='submit'
                                    color='primary'
                                    layout={false}
                                    className={bem.element('submit')}
                                >
                                    {__('Далее')}
                                </Button>
                            </div>
                        )}
                    </Form>
                    <div className={bem.element('offer-login')}>
                        <span className={bem.element('offer-login-text')}>
                            {__('Уже есть аккаунт?')}
                        </span>
                        <Link
                            className={bem.element('offer-login-link')}
                            label={__('Авторизация')}
                            layout={false}
                            onClick={() => {
                                this.props.dispatch(closeModal(this.props.modalId));
                                this.props.dispatch(openModal(LoginModal, {modalId: 'LoginModal'}));
                            }}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}
