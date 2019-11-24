import React from 'react';
import PropTypes from 'prop-types';
import './TextFieldView.scss';
import {html} from 'components';
const bem = html.bem('TextFieldView');

export default class TextFieldView extends React.PureComponent {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.string,
        required: PropTypes.bool,
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
        placeholder: PropTypes.string,
        isInvalid: PropTypes.bool,
        disabled: PropTypes.bool,
        inputProps: PropTypes.object,
        className: PropTypes.string,
        isFeedbackForm: PropTypes.bool,
    };

    render() {
        return (
            <textarea
                className={bem(
                    bem.block({
                        isFeedbackForm: this.props.isFeedbackForm
                    }),
                    this.props.isInvalid && 'is-invalid',
                    this.props.className
                )}
                {...this.props.inputProps}
            />
        );
    }

}
