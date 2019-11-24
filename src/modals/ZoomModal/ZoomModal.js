import React from 'react';
import Modal from 'yii-steroids/ui/modal/Modal';
import PropTypes from 'prop-types';

import {html} from 'components';
import './ZoomModal.scss';

const bem = html.bem('ZoomModal');


export default class ZoomModal extends React.PureComponent {

    static propTypes = {
        url: PropTypes.string,
    };

    render() {
        const { url } = this.props;

        return (
            <Modal
                {...this.props.modalProps}
                className={bem.block()}
                forZoom={true}
            >
                <div className={bem.element('img-wrap')}>
                    <img
                        className={bem.element('img')}
                        src={url}
                    />
                </div>
            </Modal>
        );
    }
}
