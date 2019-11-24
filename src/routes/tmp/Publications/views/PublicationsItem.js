import React from 'react';
import {html} from 'components';
import moment from 'moment';

import ArticleSchema from '../../../types/ArticleSchema';
import './PublicationsItem.scss';
import Icon from 'shared/Icon';

const bem = html.bem('PublicationsItem');

export default class PublicationsItem extends React.PureComponent {
    static propTypes = {
        item: ArticleSchema,
    };

    render() {
        const publication = this.props.item;
        return (
            <>
                {this.props.index === 0 && (
                    <div className={bem(bem.element('col'), 'col-12')}>
                        <article className={bem('card')}>
                            <div className={bem('row', 'no-gutters')}>
                                <div className={bem(bem.element('inner-col'), 'col')}>
                                    {this.renderCardBody(publication)}
                                </div>
                                <div className={bem('col-auto')}>
                                    <img src={publication.thumbnailUrl} className={bem(bem.element('card-img'))} />
                                </div>
                            </div>
                        </article>
                    </div>
                ) || (
                    <div className={bem(bem.element('col'), 'col-sm-4')}>
                        <article className={bem('card')}>
                            <img src={publication.thumbnailUrl} className='card-img-top' />
                            {this.renderCardBody(publication)}
                        </article>
                    </div>
                )}
            </>

        )
    }

    renderCardBody(publication) {
        return (
            <div className={bem('card-body')}>
                <div className='card-title'>{publication.title}</div>
                <p className='card-text'>
                    {publication.description}
                </p>
                <div className={bem(bem.element('info'), bem('row'))}>
                    <div className={bem(bem.element('date'), 'col')}>
                        <time>
                            {moment(publication.publishTime).format('LLL')}
                        </time>
                    </div>
                    {publication.pdf && (
                        <div className={bem(bem.element('pdf'), 'col-auto')}>
                            <a href={publication.pdf}>
                                <Icon name='pdf'/>
                            </a>
                        </div>
                    )}
                    <div className={bem(bem.element('views'), 'col-auto')}>
                        <Icon name='viewed' className={bem.element('view-icon')}/>
                        <span>{publication.viewsCount}</span>
                    </div>
                </div>
            </div>
        )
    }
}
