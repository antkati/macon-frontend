import React from 'react';

import {html} from 'components';
const bem = html.bem('PublicationsArticleShared');

import './PublicationsArticleShared.scss';

const socialIcons = [
]

export default class PublicationsArticleShared extends React.PureComponent {
    static propTypes = {
    };

    render() {
        return (
            <ul className={bem(bem.block(), 'list-inline')}>
                {socialIcons.map((icon, index) => (
                    <li className={bem(bem.element('social-item'), 'list-inline-item')} key={index}>{icon}</li>
                ))}
            </ul>
        )
    }
}
