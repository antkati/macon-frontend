import React from 'react';
import {html} from 'components';
import moment from 'moment';

import ArticleLink from 'shared/ArticleLink';
import './Recommendations.scss';

const bem = html.bem('Recommendations');


export default class Recommendations extends React.PureComponent {
    static propTypes = {
    };

    render() {
        if (!this.props.recommendations) {
            return null;
        }

        return (
            <div className={bem.block()}>
                {this.props.recommendations.map(article => (
                    <ArticleLink
                        article={article}
                        className={bem('card')}
                        key={article.id}
                        closeCurrentArticle={this.props.onClose}
                        prevPath={this.props.prevPath}
                    >
                        <div className={bem('card-body')}>
                            <div className='card-title'>{article.title}</div>
                            <p className='card-text'>
                                {article.description}
                            </p>
                            <div className={bem(bem.element('info'), 'row', 'mt-auto')}>
                                <div className={bem(bem.element('date'), 'col')}>
                                    <time>
                                        {moment(article.publishTime).format('LLL')}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </ArticleLink>
                ))}
            </div>
        )
    }
}
