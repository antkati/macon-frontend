import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './ModalView.scss';
import {html} from 'components';
const bem = html.bem('ModalView');


export default class ModalView extends React.PureComponent {

    static propTypes = {
        onClose: PropTypes.func,
        children: PropTypes.node,
        forArticle: PropTypes.bool,
        forReview: PropTypes.bool,
        forAuth: PropTypes.bool,
        forProfile: PropTypes.bool
    };

    render() {
        const {
            forArticle,
            forZoom,
            forAuth,
            forProfile,
            forEditProfile,
            forFeedback
        } = this.props;

        return (
            <div className={bem.block()}>
                <Modal
                    isOpen={true}
                    overlayClassName={bem.element('overlay', {
                        forAuth,
                        forArticle,
                        forProfile,
                        forEditProfile,
                        forFeedback
                    })}
                    ariaHideApp={false}
                    {...this.props}
                    className={bem(bem.element('modal', {
                            forArticle,
                            forZoom,
                            forAuth,
                            forProfile,
                            forEditProfile,
                            forFeedback
                        }),
                        this.props.className
                    )}
                    overlayRef={node => {
                        if(node) {
                            node.onclick = (e) => {
                                if(e.target === node) {
                                    this.props.onClose();
                                }
                            };
                        }
                    }}
                >
                    <div className={bem.element('inner')}>
                        <div className={bem.element('header')}>
                            <span className={bem.element('title')}>
                                {this.props.title}
                            </span>
                            {!forEditProfile && (
                                <a
                                    className={bem.element('close', {
                                        forZoom,
                                        forProfile
                                    })}
                                    href='#'
                                    onClick={e => {
                                        e.preventDefault();
                                        this.props.onClose();
                                    }}
                                />
                            )}
                        </div>
                        <div className={bem.element('content')}>
                            {this.props.children}
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

}
