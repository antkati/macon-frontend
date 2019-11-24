import React from 'react';
import PropTypes from 'prop-types';

import {html} from 'components';

import './IndexSliderArrow.scss';
import Icon from 'shared/Icon';

const bem = html.bem('IndexSliderArrow');

export default class IndexSliderArrow extends React.Component {
    static propTypes = {
        direction: PropTypes.oneOf(['left', 'right']).isRequired,
        onClick: PropTypes.func,
    };

    render() {
        return (
            <div
                className={bem.block({direction: this.props.direction})}
                onClick={this.props.onClick}
            >
                <Icon name='arrow' className={bem.element('arrow-icon', {direction: this.props.direction})}/>
            </div>
        );
    }
}
