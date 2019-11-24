import React from 'react';
import {html} from 'components';
import {List} from 'yii-steroids/ui/list';
import ArticleCard from 'shared/ArticleCard';
import './SearchPage.scss';
import IndexHeader from 'shared/IndexHeader';

const bem = html.bem('SearchPage');
const SEARCH_FORM_ID = 'SearchPage';

export default class SearchPage extends React.PureComponent {

    static propTypes = {
    };

    render() {
        return (
            <div className={bem.block()}>
                <IndexHeader isSearchPage/>
                <div className={bem.element('list')}>
                    <div className='container-fluid'>
                        <List
                            listId={SEARCH_FORM_ID}
                            action={`/api/v1/search`}
                            actionMethod='get'
                            defaultPageSize={12}
                            itemView={ArticleCard}
                            className='row'
                            loadMore={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
