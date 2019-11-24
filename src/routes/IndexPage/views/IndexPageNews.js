import React from 'react';
import {html} from 'components';
import { List } from 'yii-steroids/ui/list';
import Link from 'yii-steroids/ui/nav/Link';

import IndexPageNewsItem from './IndexPageNewsItem';
import {ROUTE_COMPANY_NEWS} from '../../index';
import './IndexPageNews.scss';

const bem = html.bem('IndexPageNews');

export default class IndexPageNews extends React.PureComponent {

    static propTypes = {
    };

    render() {
        return (
            <section className={bem.block()}>
                <div className={bem('container-fluid')}>
                    <div className={bem(bem.element('title'), 'row', 'align-items-center')}>
                        <div className={bem('col')}>
                            <h2 className={bem.element('heading')}>{__('Новости')}</h2>
                        </div>
                        <div className={bem('col', 'text-right')}>
                            <Link
                                className={'all-news-link'}
                                label={__('Все новости')}
                                toRoute={ROUTE_COMPANY_NEWS}
                            />
                        </div>
                    </div>
                    <List
                        listId={'news'}
                        items={this.props.news}
                        itemView={IndexPageNewsItem}
                        className={bem('row')}
                    />
                </div>

            </section>
        );
    }
}
