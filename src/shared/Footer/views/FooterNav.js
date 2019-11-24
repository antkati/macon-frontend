import React from 'react';
import PropTypes from 'prop-types';
import Link from 'yii-steroids/ui/nav/Link';
import Icon from 'shared/Icon'
import './FooterNav.scss';

import {html} from 'components';
const bem = html.bem('FooterNav');


export default class FooterNav extends React.PureComponent {

    static propTypes = {
        title: PropTypes.string,
        navItems: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            params: PropTypes.object,
        })),
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        }
    }

    toggleNav() {
        this.setState(state => ({
            isOpened: !state.isOpened
        }))
    }

    renderNav(navItems) {
        return (
            <ul className={bem(bem.element('nav'), 'nav', 'flex-column')}>
                {navItems.map((item, index) => (
                    <li key={index} className={bem(bem.element('nav-item'), 'nav-item')}>
                        <Link
                            color='dark'
                            className={bem.element('nav-link')}
                            label={item.title}
                            toRoute={item.id}
                            toRouteParams={item.params}
                        />
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        return (
            <>
                <div className={bem(bem.block(), 'd-none', 'd-lg-block')}>
                    <h4 className={bem.element('heading')}>
                        {this.props.title}
                    </h4>
                    {this.renderNav(this.props.navItems)}
                </div>
                <div className={bem(bem.block('mobile'), 'd-block', 'd-lg-none')}>
                    <div
                        className={bem(bem.element('heading-btn'), 'd-flex', 'justify-content-between')}
                        onClick={() => this.toggleNav()}
                    >
                        <span>{this.props.title}</span>
                        <Icon
                            name={'filterArrow'}
                            className={bem.element('arrow-icon', {
                                opened: this.state.isOpened
                            })}
                        />
                    </div>
                    {this.state.isOpened && this.renderNav(this.props.navItems)}
                </div>
            </>
        );
    }

}
