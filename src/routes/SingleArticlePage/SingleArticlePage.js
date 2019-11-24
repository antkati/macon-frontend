import React from 'react';

import {html} from 'components';
import ArticleDetailSchema from 'types/ArticleDetailSchema';

import './SingleArticlePage.scss';

const bem = html.bem('SingleArticlePage');

export default class SingleArticlePage extends React.PureComponent {

    static propTypes = {
        article: ArticleDetailSchema
    };

    render() {
        return (
            <div className={bem.block()}>
                <div className={bem('container-fluid')}>
                    <div className={bem('row', 'justify-content-center')}>
                        <article className={bem(bem.element('article'), 'col')}>
                            <h1 className={bem.element('heading')}>
                                {this.props.article.title}
                            </h1>
                            <div
                                className={bem.element('body')}
                                dangerouslySetInnerHTML={{__html: this.props.article.text}}
                            />
                        </article>
                    </div>
                </div>
            </div>
        );
    }

}
