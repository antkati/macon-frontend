import React from 'react';
import PropTypes from 'prop-types';

import {html} from 'components';
const bem = html.bem('InputFieldView');

import './InputFieldView.scss';
import DropDownField from 'yii-steroids/ui/form/DropDownField';

export default class InputFieldView extends React.PureComponent {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.string,
        required: PropTypes.bool,
        type: PropTypes.oneOf(['text', 'email', 'hidden', 'phone', 'password']),
        placeholder: PropTypes.string,
        isInvalid: PropTypes.bool,
        disabled: PropTypes.bool,
        inputProps: PropTypes.object,
        className: PropTypes.string,
        filters: PropTypes.array,
        icon: PropTypes.object,
        isFeedbackForm: PropTypes.bool,
    };

    render() {

        return (
            <div className={bem(
                bem.block({
                    isInvalid: this.props.isInvalid,
                    isFeedbackForm: this.props.isFeedbackForm
                }),
                this.props.className
            )}>
                <input
                    className={bem.element('input')}
                    {...this.props.inputProps}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    required={this.props.required}
                />
                {this.props.icon && (
                    <div className={bem.element('icon')}>
                        {this.props.icon}
                    </div>
                )}
            </div>
        );
    }

}
