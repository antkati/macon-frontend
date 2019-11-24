import React from 'react';
import {html} from 'components';
import Link from 'yii-steroids/ui/nav/Link';
import { List } from 'yii-steroids/ui/list';

import IndexPageAnalyticsItem from './IndexPageAnalyticsItem';
import {ROUTE_PUBLICATIONS_CATEGORY} from '../../index';
import './IndexPageAnalytics.scss';

const bem = html.bem('IndexPageAnalytics');

export default class IndexPageAnalytics extends React.PureComponent {

    static propTypes = {
    };

    render() {
        return (
            <section className={bem.block()}>
                <div className={bem('container-fluid')}>
                    <div className={bem(bem.element('title'), 'row', 'align-items-center')}>
                        <div className={bem('col')}>
                            <h2 className={bem.element('heading')}>{__('Аналитика')}</h2>
                        </div>
                        <div className={bem('col', 'text-right')}>
                            <Link
                                className='all-publications-link'
                                label={__('Все публикации')}
                                toRoute={ROUTE_PUBLICATIONS_CATEGORY}
                                toRouteParams={{
                                    tagName: 'all',
                                }}
                            />
                        </div>
                    </div>
                    <List
                        listId={'publications'}
                        items={this.props.publications}
                        itemView={IndexPageAnalyticsItem}
                        className={bem.element('publications-list')}
                    />
                </div>
            </section>
        );
    }
}
