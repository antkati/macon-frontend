import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import Link from 'yii-steroids/ui/nav/Link';
import ArticleSchema from 'types/ArticleSchema';
import ArticleCategory from 'enums/ArticleCategory';
import {getNavUrl} from 'yii-steroids/reducers/navigation';
import {openModal, closeModal} from 'yii-steroids/actions/modal';
import ArticleModal from 'modals/ArticleModal';
import TagCategory from 'enums/TagCategory';

@connect(
    (state, props) => {
        // Get tag name for publication
        const tagName = _get(props.article.tags.find(tag => tag.category === TagCategory.PUBLICATION), 'name');
        return {
            url: getNavUrl(state, ArticleCategory.getItemRouteId(props.article.category), {
                id: props.article.id,
                tagName,
            }),
        };
    }
)
export default class ArticleLink extends React.PureComponent {

    static propTypes = {
        article: ArticleSchema,
        url: PropTypes.string,
    };

    render() {
        const {article, ...props} = this.props;
        return (
            <Link
                {...props}
                url={this.props.url}
                onClick={e => {
                    if (e.ctrlKey || e.shiftKey || e.metaKey) {
                        return;
                    }
                    e.preventDefault();

                    const prevPath = this.props.prevPath || location.pathname;

                    history.replaceState({}, this.props.article.title, this.props.url);
                    this.props.dispatch(openModal(ArticleModal, {
                        modalId: 'ArticleModal',
                        article: this.props.article,
                        articleId: this.props.article.id,
                        prevPath: prevPath,
                        onClose: () => {
                            history.replaceState({}, '', prevPath);
                        },
                    }));
                }}
            />
        );
    }
}
