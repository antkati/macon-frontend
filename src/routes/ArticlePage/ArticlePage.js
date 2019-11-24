import React from 'react';
import {html} from 'components';

import ArticleDetailSchema from 'types/ArticleDetailSchema';
import './ArticlePage.scss';
import Article from 'shared/Article';

const bem = html.bem('ArticlePage');

export default class ArticlePage extends React.PureComponent {

    static propTypes = {
        article: ArticleDetailSchema
    };

    render() {
        return (
            <div className={bem.block()}>
                <div className={bem('container-fluid')}>
                    <Article article={this.props.article}/>
                </div>
            </div>
        );
    }
}
