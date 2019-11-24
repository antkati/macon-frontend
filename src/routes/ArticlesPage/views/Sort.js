import React from 'react';
import {connect} from 'react-redux';
import {html} from 'components';
import Form from 'yii-steroids/ui/form/Form';
import DateField from 'yii-steroids/ui/form/DateField';
import PropTypes from 'prop-types';
import ArticleCategory from '../../../enums/ArticleCategory';
import DropDownField from 'yii-steroids/ui/form/DropDownField';
import TagCategory from '../../../enums/TagCategory';
import { getEnumLabels } from 'yii-steroids/reducers/fields';

import './Sort.scss';

const bem = html.bem('Sort');

@connect(
    (state) => ({
        tags: getEnumLabels(state, 'app.article.models.ArticleTag'),
    })
)

export default class Sort extends React.PureComponent {
    static propTypes = {
        listId: PropTypes.string,
        tagName: PropTypes.string,
        category: PropTypes.oneOf(ArticleCategory.getKeys()).isRequired,
    };

    _findTags(tags, tagCategory) {
        return tags.filter(tag => tag.category === tagCategory).map(tag => ({
            ...tag,
            label: tag.label.replace(/_/g, ' ')
        }));
    }

    render() {
        return (
            <div className={bem.block()}>
                <Form
                    formId={this.props.listId}
                    syncWithAddressBar
                    useHash={false}
                >
                    {this.props.category !== ArticleCategory.PROJECT
                        ? (
                            <DateField attribute={'date'} />
                        )
                        : (
                            this.props.tags && (
                                <div className={'d-flex align-items-center flex-wrap'}>
                                    <DropDownField
                                        isArticleFilter
                                        attribute='city'
                                        defaultItemLabel={__('Все города')}
                                        items={this._findTags(this.props.tags, TagCategory.CITY)}
                                    />
                                    <DropDownField
                                        isArticleFilter
                                        attribute='realty'
                                        defaultItemLabel={__('Тип недвижимости')}
                                        items={this._findTags(this.props.tags, TagCategory.REALTY)}
                                    />
                                </div>
                            )
                        )
                    }
                </Form>
            </div>
        )
    }
}
