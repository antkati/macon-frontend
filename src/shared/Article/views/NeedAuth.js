import React from 'react';
import {html} from 'components';
import {connect} from 'react-redux';
import Button from 'yii-steroids/ui/form/Button';
import {openModal} from 'yii-steroids/actions/modal';

import RegistrationModal from 'modals/RegistrationModal';
import './NeedAuth.scss';
import PropTypes from 'prop-types';


const bem = html.bem('NeedAuth');

@connect()

export default class NeedAuth extends React.PureComponent {
    static propTypes = {
        path: PropTypes.string,
    };

    render() {
        return (
            <div className={bem.block()}>
                <div className={bem('card', 'text-center')}>
                    <div className={bem('card-body')}>
                        <div className='card-title'>
                            {__('Получите полный партнёрский доступ к результатам аналитики')}
                        </div>
                        <p className='card-text'>
                            {__('Пройдите бесплатную регистрацию на сайте')}
                        </p>
                    </div>
                    <>
                        <Button
                            className={bem.element('sign-in-btn')}
                            color={'light'}
                            onClick={() => this.props.dispatch(openModal(RegistrationModal,
                                this.props.path
                                    ? {
                                        onClose: () => {window.location.href = this.props.path},
                                    }
                                    : null
                            ))}
                        >
                            {__('Зарегистрироваться')}
                        </Button>
                    </>
                </div>
            </div>
        );
    }
}
