import React from 'react';
import Modal from 'yii-steroids/ui/modal/Modal';
import {html} from 'components';
import './FeedbackModal.scss';
import Button from 'yii-steroids/ui/form/Button';
import Form from 'yii-steroids/ui/form/Form';
import InputField from 'yii-steroids/ui/form/InputField';
import TextField from 'yii-steroids/ui/form/TextField';

const bem = html.bem('FeedbackModal');

export default class FeedbackModal extends React.PureComponent {

    render() {
        return (
            <Modal
                {...this.props.modalProps}
                className={bem.block()}
                forFeedback
            >
                <div className={bem.element('body')}>
                    <h1>{__('Обратная связь')}</h1>
                    <p>
                        {__('Мы готовы принять индвидуальные заказы. Свяжитесь с нашим менеджером, чтобы обсудить детали.')}
                    </p>
                    <Form
                        formId='EditProfileModal'
                        autoFocus
                        className={bem.element('form')}
                    >
                        <InputField
                            attribute='email'
                            placeholder='E-mail'
                            isFeedbackForm
                        />
                        <InputField
                            attribute='name'
                            placeholder='Имя'
                            isFeedbackForm
                        />
                        <TextField
                            attribute='text'
                            placeholder='Задайте свой вопрос'
                            className={bem.element('text-field')}
                            isFeedbackForm
                        />
                        <Button
                            type='submit'
                            color='primary'
                            className={bem.element('submit')}
                        >
                            {__('Написать')}
                        </Button>
                    </Form>
                </div>
            </Modal>
        );
    }
}
