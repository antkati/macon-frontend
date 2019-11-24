import React from 'react';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import _get from 'lodash/get';
import {html} from 'components';
import Button from 'yii-steroids/ui/form/Button';
import Form from 'yii-steroids/ui/form/Form';
import InputField from 'yii-steroids/ui/form/InputField';
import {getUser} from 'yii-steroids/reducers/auth';

import './FooterSubscribeForm.scss';
import {getContactEmail} from '../../../reducers/contacts';

const bem = html.bem('FooterSubscribeForm');
const FORM_ID = 'FooterSubscribeForm';

@connect(
    state => ({
        user: getUser(state),
        contactEmail: getContactEmail(state),
    })
)
export default class FooterSubscribeForm extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isComplete: false,
        };
    }


    render() {
        return (
            <div className={bem(bem.block(), 'order-1', 'order-lg-0')}>
                <h5 className={bem.element('heading')}>{__('Рассылка')}</h5>
                <p className={bem(bem.element('text'), 'mb-3')}>
                    {__('Подпишитесь на нашу рассылку и получайте актуальные новости, анонсы аналитики и многое другое.')}
                </p>
                {this.state.isComplete && (
                    <p className={bem(bem.element('text'), 'text-success')}>
                        {__('Вы подписались на рассылку')}
                    </p>
                )}
                <Form
                    formId={FORM_ID}
                    className={bem(bem.element('form'))}
                    action='/api/v1/subscribe'
                    initialValues={{
                        email: _get(this.props, 'user.email'),
                    }}
                    onComplete={() => {
                        this.setState({isComplete: true});
                        this.props.dispatch(change(FORM_ID, 'email', null))
                    }}
                >
                    <div className={'d-flex flex-column flex-sm-row flex-wrap flex-sm-nowrap align-items-start mb-3 mb-sm-0'}>
                        <div className={'flex-grow-1 mr-sm-3 w-100'}>
                            <InputField
                                attribute='email'
                                type='email'
                                placeholder='Ваш E-mail'
                                className={bem(bem.element('input'), 'flex-grow-2')}
                            />
                        </div>
                        <div className={'flex-grow-0'}>
                            <Button
                                type='submit'
                                color='primary'
                                layout={false}
                                className={bem(bem.element('btn'))}
                            >
                                {__('Подписаться')}
                            </Button>
                        </div>
                    </div>
                </Form>

                <p className={bem(bem.element('text'), 'mb-0', 'mb-lg-3')}>
                    {__('Можно также подписаться, ')}
                    <a
                        color={'info'}
                        className={bem.element('send-mail-link')}
                        href={`mailto:${this.props.contactEmail}`}
                    >
                        {__('отправив письмо.')}
                    </a>
                </p>
                <div className={bem(bem.element('hr'), 'd-none', 'd-lg-block')}/>
            </div>


        );
    }

}
