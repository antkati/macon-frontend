import React from 'react';
import {html} from 'components';
import ArticleSchema from 'types/ArticleSchema';
import './ArticleCard.scss';
import Icon from 'shared/Icon';
import ArticleLink from 'shared/ArticleLink';
import ArticleCategory from 'enums/ArticleCategory';
import moment from 'moment';

const bem = html.bem('ArticleCard');

export default class ArticleCard extends React.PureComponent {

    static propTypes = {
        item: ArticleSchema,
    };

    renderCardBody(item) {
        return (
            <span className={'card-body'}>
                {item.category !== ArticleCategory.MEDIA && item.tags && item.tags.length > 0 && (
                    <ul className={bem(bem.element('tags'), 'list-inline', 'd-none', 'd-lg-block')}>
                        {item.tags.map((tag, index) => (
                            <li key={index} className={bem('list-inline-item')}>
                                <span className={bem.element('tag-link')}>
                                    {`#${tag.title.replace(/ /g, '_')}`}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
                <span className='card-title'>{item.title}</span>
                {item.category !== ArticleCategory.MEDIA && (
                    <p className='card-text'>
                        {item.description}
                    </p>
                )}
                {item.category !== ArticleCategory.MEDIA && (
                    <span className={bem(bem.element('info'), 'd-flex', 'flex-row', 'align-items-center', 'justify-content-between')}>
                        <span className={bem(bem.element('date'), 'flex-grow-0')}>
                            <span>{item.publishTime}</span>
                        </span>
                        {item.pdf && (
                            <span className={bem(bem.element('pdf'), 'text-right', 'flex-grow-1', 'mx-3')}>
                                <Icon
                                    className={bem(bem.element('pdf-icon'))}
                                    name='pdf'
                                />
                            </span>
                        )}
                        <span className={bem(bem.element('views'), 'flex-grow-0')}>
                            <Icon
                                className={bem.element('view-icon')}
                                name='viewed'
                            />
                            <span>{item.viewsCount}</span>
                        </span>
                    </span>
                )}
                {item.category === ArticleCategory.MEDIA && (
                    <span className={bem(bem.element('source'))}>
                        {this.props.item.source}
                    </span>
                )}
             </span>
        )
    }

    renderSmallCard(item) {
        return (
            <div className={bem(bem.block(this.props.listId), 'col-lg-4')}>
                <ArticleLink
                    className={bem(bem.element('card'), 'card')}
                    article={item}
                >
                    <span
                        className={bem(bem.element('thumbnail'), 'card-img-top')}
                        style={{
                            backgroundImage: `url(${item.thumbnailUrl})`,
                        }}
                    >
                        {item.category === ArticleCategory.MEDIA && (
                            <span className={bem(bem.element('source-date'), 'd-none', 'd-lg-block')}>
                                {moment(item.publishTime).format('YYYY-MM-DD')}
                            </span>
                        )}
                    </span>
                    {this.renderCardBody(item)}
                </ArticleLink>
            </div>
        )
    }

    render() {
        return (
            <>
                {this.props.list.first && !this.props.index && this.props.list.page === 1 ? (
                    <>
                        <div className={bem(bem.block('first', this.props.listId), 'col-12')}>
                            <ArticleLink
                                className={bem(bem.element('card'), 'card', 'w-100')}
                                article={this.props.list.first}
                            >
                                <span className={'row no-gutters'}>
                                    <span className={'col-lg-5 d-flex order-1 order-lg-0'}>
                                        {this.renderCardBody(this.props.list.first)}
                                    </span>
                                    <span className={'col-lg-7 d-flex order-0 order-lg-1'}>
                                        <span
                                            className={bem(bem.element('thumbnail'), 'card-img')}
                                            style={{
                                                backgroundImage: `url(${this.props.list.first.thumbnailUrl})`,
                                            }}
                                        />
                                    </span>
                                </span>
                            </ArticleLink>
                        </div>
                        {this.renderSmallCard(this.props.item)}
                    </>
                ) : (
                    this.renderSmallCard(this.props.item)
                )}
            </>
        )
    }
}
