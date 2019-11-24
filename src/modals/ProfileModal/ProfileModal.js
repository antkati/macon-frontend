import React from 'react';
import {connect} from 'react-redux';
import Modal from 'yii-steroids/ui/modal/Modal';
import {html} from 'components';
import './ProfileModal.scss';
import Button from 'yii-steroids/ui/form/Button';
import Icon from 'shared/Icon';
import {openModal, closeModal} from 'yii-steroids/actions/modal';
import EditProfileModal from 'modals/EditProfleModal';
import './ProfileModal.scss';
import {logout} from 'yii-steroids/actions/auth';
import {getUser} from 'yii-steroids/reducers/auth';
import PropTypes from 'prop-types';

const bem = html.bem('ProfileModal');

@connect(state => ({
    user: getUser(state),
}))

export default class ProfileModal extends React.PureComponent {

    static propTypes = {
        user: PropTypes.object,
    };

    render() {
        return (
            <Modal
                {...this.props.modalProps}
                className={bem.block()}
                forProfile
            >
                <div className={bem.element('body')}>
                    <div className={bem.element('header')}>
                        <h2 className={bem.element('name')}>{this.props.user.name}</h2>
                        <Button
                            label={'изменить'}
                            className={bem.element('edit-btn')}
                            color={'info'}
                            onClick={() => {
                                this.props.dispatch(closeModal());
                                this.props.dispatch(openModal(EditProfileModal));
                            }}
                        />


                        <div
                            className={bem.element('logout')}
                            onClick={() => this.props.dispatch(logout())}
                        >
                            <Icon name={'exit'}/>
                        </div>
                    </div>
                    <div className={bem.element('info')}>
                        <ul className='list-group list-group-flush'>
                            {this.props.user.company && (
                                <li className='list-group-item d-flex align-items-center'>
                                    <Icon name={'company'}/>
                                    <span className='ml-3'>{`Работает в  ${this.props.user.company}`}</span>
                                </li>
                            )}
                            {this.props.user.workPosition && (
                                <li className='list-group-item d-flex align-items-center'>
                                    <Icon name={'workPosition'}/>
                                    <span className='ml-3'>{this.props.user.workPosition}</span>
                                </li>
                            )}
                            {this.props.user.email && (
                                <li className='list-group-item d-flex align-items-center'>
                                    <Icon name={'email'}/>
                                    <span className='ml-3'>{this.props.user.email}</span>
                                </li>
                            )}
                        </ul>
                        <div className={bem.element('footer')}>
                            {__('У Вас есть партнёрский доступ к полным результатам аналитики. Ознакомится с ними можно ')}
                            <a href={'#'}>{__('тут')}</a>
                            {'.'}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
