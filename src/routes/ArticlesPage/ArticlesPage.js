import React from 'react';
import PropTypes from 'prop-types';
import {html} from 'components';
import {List} from 'yii-steroids/ui/list';
import _get from 'lodash/get';
import ArticleCard from 'shared/ArticleCard';
import Sort from './views/Sort';
import ArticleCategory from '../../enums/ArticleCategory';
import './ArticlesPage.scss';

const getListId = props => 'ArticlesPage_' + props.category;
const bem = html.bem('ArticlesPage');

export default class ArticlesPage extends React.PureComponent {

    static propTypes = {
        category: PropTypes.oneOf(ArticleCategory.getKeys()).isRequired,
    };

    render() {
        const tagName = _get(this.props, 'match.params.tagName') || 'all';
        return (
            <div className={bem.block()}>
                <div className={bem(bem.element('container-fluid'), 'container-fluid')}>
                    <div className='row'>
                        <div className={bem(bem.element('sort'), 'col')}>
                            <span className={bem(bem.element('title'), 'title')}>
                                {ArticleCategory.getPageTitle(this.props.category)}
                            </span>
                            <Sort
                                listId={getListId(this.props)}
                                tagName={tagName}
                                category={this.props.category}
                            />
                            <div className={bem(bem.element('hr'), 'd-none', 'd-lg-block')}/>
                        </div>
                    </div>
                    <List
                        listId={getListId(this.props)}
                        action={`/api/v1/articles/${this.props.category}`}
                        actionMethod='get'
                        query={{
                            tagName,
                        }}
                        defaultPageSize={12}
                        itemView={ArticleCard}
                        className='row'
                        loadMore={false}
                    />
                </div>
            </div>
        );
    }

}
