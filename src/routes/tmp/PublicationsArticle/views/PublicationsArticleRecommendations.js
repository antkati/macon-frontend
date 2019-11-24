import React from 'react';
import {html} from 'components';

import './PublicationsArticleRecommendations.scss';

const bem = html.bem('PublicationsArticleRecommendations');


export default class PublicationsArticleRecommendations extends React.PureComponent {
    static propTypes = {
    };

    render() {
        const { recommendations } = this.props;

        return (
            <div className={bem.block()}>
                {recommendations.map((r, index) => (
                    <article key={index} className={bem('card')}>
                        <div className={bem('card-body')}>
                            <div className='card-title'>{__(r.title)}</div>
                            <p className='card-text'>
                                {__(r.description)}
                            </p>
                            <div className={bem(bem.element('info'), bem('row'))}>
                                <div className={bem(bem.element('date'), 'col')}>
                                    <time>{__(r.date)}</time>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        )
    }
}