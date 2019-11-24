import React from 'react';
import {connect} from 'react-redux';
import Modal from 'yii-steroids/ui/modal/Modal';
import Form from 'yii-steroids/ui/form/Form';

import {html} from 'components';

import './RecoveryModal.scss';
import Button from 'yii-steroids/ui/form/Button';
import InputField from 'yii-steroids/ui/form/InputField';
import {login} from 'yii-steroids/actions/auth';

const bem = html.bem('RecoveryModal');

@connect()
export default class RecoveryModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isConfirmStep: false,
        };
    }

    render() {
        return (
            <Modal
                {...this.props.modalProps}
                className={bem.block()}
                title={__('Восстановление пароля')}
                forAuth
            >
                <Form
                    formId='RecoveryModal'
                    action={'/api/v1/auth/recovery' + (this.state.isConfirmStep ? '/confirm' : '')}
                    onComplete={(values, result) => {
                        if (!this.state.isConfirmStep) {
                            this.setState({isConfirmStep: true}, () => {
                                const el = document.querySelector('input[type=text][name=code]');
                                el && el.focus();
                            });
                        } else {
                            this.props.dispatch(login(result.accessToken));
                            this.props.onClose();
                        }
                    }}
                    autoFocus
                >
                    {!this.state.isConfirmStep && (
                        <>
                            <InputField
                                attribute='email'
                                placeholder={__('E-mail')}
                            />
                            <Button
                                type='submit'
                                color='primary'
                                layout={false}
                                className={bem.element('submit')}
                                label={__('Отправить код')}
                            />
                        </>
                    ) ||
                    (
                        <>
                            <p>
                                {__('Если email есть в нашей базе, то вам на почту придет проверочный код')}
                            </p>
                            <InputField
                                attribute='code'
                                placeholder='000000'
                            />
                            <InputField
                                type='password'
                                attribute='newPassword'
                                placeholder={__('Новый пароль')}
                            />
                            <InputField
                                type='password'
                                attribute='newPasswordAgain'
                                placeholder={__('Повтор пароля')}
                            />
                            <Button
                                type='submit'
                                color='primary'
                                layout={false}
                                className={bem.element('submit')}
                                label={__('Сменить пароль')}
                            />
                        </>
                    )}
                </Form>
            </Modal>
        );
    }
}
