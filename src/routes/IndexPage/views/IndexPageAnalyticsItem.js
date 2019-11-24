import React from 'react';
import {html} from 'components';
import moment from 'moment';
import './IndexPageAnalyticsItem.scss';
import ArticleLink from 'shared/ArticleLink';

const bem = html.bem('IndexPageAnalyticsItem');

export default class IndexPageAnalyticsItem extends React.PureComponent {

    render() {
        const { item: publication, index, items } = this.props;

        return (
            <>
                {index <= 1 && (
                    <div className={bem(bem.block('main'), 'col-lg-4')}>
                        <ArticleLink
                            className={bem(bem.element('card'), 'card')}
                            article={publication}
                        >
                            <div
                                className={bem.element('img')}
                                style={{
                                    backgroundImage: `url(${publication.thumbnailUrl})`,
                                }}
                            />
                            {this.renderCardBody(publication, index)}
                        </ArticleLink>
                    </div>

                ) || (
                    <div className={bem(bem.block('short'), 'col-lg-4')}>
                        <ArticleLink
                            className={bem(bem.element('card'))}
                            article={publication}
                        >
                            {this.renderCardBody(publication, index)}
                        </ArticleLink>
                        {index !== items.length - 1 && (
                            <div className={bem.element('hr')} />
                        )}
                    </div>
                )}
            </>

        )
    }

    renderCardBody(publication, index) {
        return (
            <div className={bem(index <= 1 ? 'card-body' : 'card-body-short')}>
                <div className={bem('card-title')}>{publication.title}</div>
                {index <= 1 && (
                    <p className={bem('card-text')}>
                        {publication.description}
                    </p>
                )}
                <div className={bem.element('date')}>
                    <time>
                        {moment(publication.publishTime).format('LL')}
                    </time>
                </div>
            </div>
        )
    }
}
