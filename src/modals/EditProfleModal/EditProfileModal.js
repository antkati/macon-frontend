import React from 'react';
import {connect} from 'react-redux';
import Modal from 'yii-steroids/ui/modal/Modal';
import {html} from 'components';
import './EditProfileModal.scss';
import Button from 'yii-steroids/ui/form/Button';
import {openModal, closeModal} from 'yii-steroids/actions/modal';
import ProfileModal from '../ProfileModal';
import './EditProfileModal.scss';
import Form from 'yii-steroids/ui/form/Form';
import InputField from 'yii-steroids/ui/form/InputField';
import Icon from 'shared/Icon';
import { getUser } from 'yii-steroids/reducers/auth';

const bem = html.bem('EditProfileModal');

@connect(state => ({
    user: getUser(state),
}))
export default class EditProfileModal extends React.PureComponent {

    render() {
        return (
            <Modal
                {...this.props.modalProps}
                className={bem.block()}
                forEditProfile
            >
                <div className={bem.element('body')}>
                    <div
                        onClick={() => {
                            this.props.dispatch(closeModal());
                            this.props.dispatch(openModal(ProfileModal));
                        }}
                        className={bem.element('back')}
                    >
                        <Icon name={'backArrow'} />
                    </div>
                    <Form
                        formId='EditProfileModal'
                        autoFocus
                        className={bem.element('form')}
                    >
                        <InputField
                            attribute='name'
                            placeholder='Имя'
                            input={{value: this.props.user.name}}
                        />
                        <InputField
                            attribute='email'
                            placeholder='E-mail'
                        />
                        <InputField
                            attribute='workPosition'
                            placeholder='Должность'
                            input={{value: this.props.user.workPosition}}
                        />
                        <InputField
                            attribute='organization'
                            placeholder='Организация'
                            input={{value: this.props.user.organization}}
                        />
                        <div className={bem.element('change-password')}>{__('Смена пароля')}</div>
                        <InputField
                            attribute='oldPassword'
                            placeholder='Старый пароль'
                        />
                        <InputField
                            attribute='newPassword'
                            placeholder='Новый пароль'
                        />
                        <Button
                            type='submit'
                            color='primary'
                            className={bem.element('submit')}
                        >
                            {__('Сохранить')}
                        </Button>
                    </Form>
                </div>
            </Modal>
        );
    }
}
