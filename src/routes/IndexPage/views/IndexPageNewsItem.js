import React from 'react';
import {html} from 'components';
import moment from 'moment';
import Link from 'yii-steroids/ui/nav/Link';

import './IndexPageNewsItem.scss';
import {ROUTE_NEWS_ARTICLE} from '../../index';
import ArticleLink from 'shared/ArticleLink';
import ArticleCategory from '../../../enums/ArticleCategory';

const bem = html.bem('IndexPageNewsItem');

export default class IndexPageNewsItem extends React.PureComponent {

    render() {
        const news = this.props.item;

        return (
            <div className={bem(bem.block(), 'col-lg-6', 'd-flex')}>
                <ArticleLink
                    className={bem(bem.element('card'), 'card', 'flex-row')}
                    article={news}
                >
                    <span
                        className={bem(bem.element('thumbnail'), 'd-block', 'd-lg-none')}
                        style={{
                            backgroundImage: `url(${news.thumbnailUrl})`,
                        }}
                    />
                    <div className={bem('card-body')}>
                        <div className='card-title'>{news.title}</div>
                        <p className='card-text d-none d-lg-block'>
                            {news.description}
                        </p>
                        <div className={bem(bem.element('date'), 'mt-auto')}>
                            <span>
                                {moment(news.publishTime).format('LL')}
                            </span>
                        </div>
                    </div>
                </ArticleLink>
            </div>
        )
    }
}
