import React from 'react';
import PropTypes from 'prop-types';

import {html} from 'components';
import icons from './resource';

import './Icon.scss';

const bem = html.bem('Icon');

export default class Icon extends React.PureComponent {

    static propTypes = {
        name: PropTypes.oneOf(Object.keys(icons)).isRequired,
        className: PropTypes.string,
    };

    render() {
        return (
            <span
                className={bem(bem.block(this.props.name), this.props.className)}
                dangerouslySetInnerHTML={{__html: icons[this.props.name]}}
            />
        );
    }
}
