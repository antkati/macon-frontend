import React from 'react';
import {html} from 'components';
import {List} from 'yii-steroids/ui/list';

import ArticleCategory from '../../enums/ArticleCategory';
import PublicationsItem from './views/PublicationsItem';
import PublicationsSort from './views/PublicationsSort';
import './Publications.scss';

const LIST_ID = 'Publications';
const bem = html.bem('Publications');

export default class Publications extends React.PureComponent {
    static propTypes = {
    };

    render() {
        return (
            <div className={bem.block()}>
                <div className={bem('container-fluid')}>
                    <div className={bem('row')}>
                        <div className={bem(bem.element('sort'), 'col')}>
                            <span className={bem(bem.element('title'), 'title')}>
                                {__('Недвижимость регионов')}
                            </span>
                            <PublicationsSort />
                            <div className={bem.element('hr')}/>
                        </div>
                    </div>
                    <List
                        listId={LIST_ID}
                        action={`/api/v1/articles/${ArticleCategory.PUBLICATION}`}
                        actionMethod='get'
                        defaultPageSize={20}
                        itemView={PublicationsItem}
                        className={bem('row')}
                    />
                </div>
            </div>

        )
    }
}
