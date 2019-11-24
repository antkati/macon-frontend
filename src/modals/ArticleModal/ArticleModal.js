import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'yii-steroids/ui/modal/Modal';
import _get from 'lodash/get';

import {html, http} from 'components';
import ArticleDetailSchema from 'types/ArticleDetailSchema';
import Article from 'shared/Article';

import './ArticleModal.scss';

const bem = html.bem('ArticleModal');

@http.hoc(
    props => http.get(`/api/v1/articles/${props.article.category}/${props.article.id}`)
        .then(article => ({article}))
)
export default class ArticleModal extends React.PureComponent {

    static propTypes = {
        article: ArticleDetailSchema,
        articleId: PropTypes.number,
        modalProps: PropTypes.object,
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.articleId !== nextProps.articleId) {
            this.props.fetch();
        }
    }

    render() {
        return (
            <Modal
                {...this.props.modalProps}
                className={bem.block()}
                forArticle={true}
            >
                <Article
                    article={this.props.article}
                    modal={true}
                    prevPath={this.props.prevPath}
                />
            </Modal>
        )
    }
}
