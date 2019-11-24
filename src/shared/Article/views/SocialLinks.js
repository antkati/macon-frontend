import React from 'react';
import {connect} from 'react-redux';
import _get from 'lodash/get';

import {html} from 'components';
import Icon from 'shared/Icon';
import './SocialLinks.scss';
import {FacebookShareButton, TwitterShareButton, TelegramShareButton} from 'react-share';
import Clipboard from 'react-clipboard.js';

const bem = html.bem('NewsArticleShared');

@connect(
    state => ({
        url: _get(state, 'router.location.pathname'),
    })
)
export default class SocialLinks extends React.PureComponent {

    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            successMessage: false
        };
        this.toggleSuccessMessage = this.toggleSuccessMessage.bind(this);
    }

    toggleSuccessMessage() {
        this.setState(state => ({successMessage: !state.successMessage}));
    }

    render() {
        return (
            <div className={bem(bem.block(), 'd-flex')}>
                <FacebookShareButton
                    url={this.props.url}
                    quote={this.props.title}
                    additionalProps={{title: 'Опубликовать в Facebook'}}
                >
                    <Icon className={bem.element('social-icon')} name={'facebook'} />
                </FacebookShareButton>
                <TwitterShareButton
                    url={this.props.url}
                    title={this.props.title}
                    additionalProps={{title: 'Опубликовать в Twitter'}}
                >
                    <Icon className={bem.element('social-icon')} name={'twitter'} />
                </TwitterShareButton>
                <TelegramShareButton
                    url={this.props.url}
                    title={this.props.title}
                    additionalProps={{title: 'Опубликовать в Telegram'}}
                >
                    <Icon className={bem.element('social-icon')} name={'telegram'} />
                </TelegramShareButton>
                <Clipboard
                    data-clipboard-text={window.location.href}
                    button-title='Скопировать ссылку'
                    onSuccess={() => {
                        this.toggleSuccessMessage();
                        setTimeout(this.toggleSuccessMessage, 2000);
                    }}
                    className={bem.element('copy-btn')}
                >
                    <Icon className={bem.element('social-icon')} name={'link'} />
                </Clipboard>
                {this.state.successMessage && (
                    <div className={bem.element('success-message', {modal: this.props.modal})}>
                        {__('Скопированно в буфер')}
                    </div>
                )}
            </div>
        )
    }
}
