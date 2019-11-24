import React from 'react';
import {connect} from 'react-redux';
import Modal from 'yii-steroids/ui/modal/Modal';
import Form from 'yii-steroids/ui/form/Form';
import {html} from 'components';
import './LoginModal.scss';
import Button from 'yii-steroids/ui/form/Button';
import InputField from 'yii-steroids/ui/form/InputField';
import {login} from 'yii-steroids/actions/auth';
import {openModal, closeModal} from 'yii-steroids/actions/modal';
import Link from 'yii-steroids/ui/nav/Link';
import RecoveryModal from 'modals/RecoveryModal';
import RegistrationModal from 'modals/RegistrationModal';

import logo from '../../../public/images/logo.png';
const bem = html.bem('LoginModal');

@connect()
export default class LoginModal extends React.PureComponent {

    render() {
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
                    <h5 className={bem.element('title')}>{__('Вход')}</h5>
                    <div className={bem.element('text')}>
                        {__('Войдите в свой аккаунт, чтобы получить полный партнёрский доступ к результатам аналитики.')}
                    </div>
                    <Form
                        formId='LoginModal'
                        action='/api/v1/auth/login'
                        onComplete={(values, result) => {
                            this.props.dispatch(login(result.accessToken));
                            this.props.onClose();
                        }}
                        autoFocus
                    >
                        <InputField
                            attribute='email'
                            placeholder='E-mail'
                        />
                        <InputField
                            type='password'
                            attribute='password'
                            placeholder={__('Пароль')}
                        />
                        <div className={bem.element('actions')}>
                            <Link
                                className={bem.element('forgot-password')}
                                label={__('Забыли пароль?')}
                                layout={false}
                                onClick={() => {
                                    this.props.dispatch(openModal(RecoveryModal));
                                    this.props.onClose();
                                }}
                            />
                            <Button
                                type='submit'
                                color='primary'
                                layout={false}
                                className={bem.element('submit')}
                            >
                                {__('Войти')}
                            </Button>
                        </div>
                    </Form>
                    <div className={bem.element('offer-registration')}>
                        <span className={bem.element('offer-registration-text')}>
                            {__('Нет аккаунта?')}
                        </span>
                        <Link
                            className={bem.element('offer-registration-link')}
                            label={__('Зарегистрируйтесь бесплатно')}
                            layout={false}
                            onClick={() => {
                                this.props.dispatch(closeModal(this.props.modalId));
                                this.props.dispatch(openModal(RegistrationModal, {modalId: 'RegistrationModal'}));
                            }}
                        />
                    </div>
                </div>

            </Modal>
        );
    }
}
