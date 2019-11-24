import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';
import {html, http} from 'components';
import queryString from 'querystring';
import {push} from 'connected-react-router';
import _get from 'lodash/get';
import './IndexHeaderSearch.scss';
import InputField from 'yii-steroids/ui/form/InputField';
import Form from 'yii-steroids/ui/form/Form';
import Icon from 'shared/Icon';
import DropDownField from 'yii-steroids/ui/form/DropDownField';
import {getEnumLabels} from 'yii-steroids/reducers/fields';
import TagCategory from 'enums/TagCategory';
import {getNavUrl} from 'yii-steroids/reducers/navigation';
import {ROUTE_SEARCH} from 'routes/index';
import AutoCompleteField from 'yii-steroids/ui/form/AutoCompleteField';
import {goToPage} from 'yii-steroids/actions/navigation';
import ArticleCategory from 'enums/ArticleCategory';

const bem = html.bem('IndexHeaderSearch');
const getFormId = props => props.isSearchPage ? 'SearchPage' : 'SearchForm';

@connect(
    (state, props) => ({
        tags: getEnumLabels(state, 'app.article.models.ArticleTag'),
        searchUrl: getNavUrl(state, ROUTE_SEARCH),
        query: (_get(state, 'router.location.search') || '').substr(1),
        formValues: getFormValues(getFormId(props))(state),
    })
)
export default class IndexHeaderSearch extends React.PureComponent {

    static propTypes = {
        tags: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            category: PropTypes.oneOf(TagCategory.getKeys()),
            label: PropTypes.string,
        })),
        searchUrl: PropTypes.string,
        isSearchPage: PropTypes.bool,
        formValues: PropTypes.object,
    };

    static defaultProps = {
        isSearchPage: false,
    };

    _findTags(tags, tagCategory) {
        return tags.filter(tag => tag.category === tagCategory).map(tag => ({
            ...tag,
            label: tag.label.replace(/_/g, ' ')
        }));
    }

    _getQueryValue(query, key) {
        if(typeof query[key] === 'string' && !query[key].length || typeof query[key] === 'undefined') {
            return null;
        }

        return +query[key];
    }

    render() {
        if (!this.props.tags) {
            return null;
        }

        let query = queryString.parse(this.props.query);
        query = {
            query: query.query || null,
            realty: this._getQueryValue(query, 'realty'),
            city: this._getQueryValue(query, 'city'),
        };

        const realtyTags = this._findTags(this.props.tags, TagCategory.REALTY);
        const cityTags = this._findTags(this.props.tags, TagCategory.CITY);

        const selectedRealtyTag = realtyTags.find(tag => tag.id === query.realty);
        const selectedCityTag = cityTags.find(tag => tag.id === query.city);

        return (
            <div className={bem(
                bem.block({isSearchPage: this.props.isSearchPage}),
                !this.props.isNavOpen && 'open'
            )}>
                <Form
                    formId={getFormId(this.props)}
                    initialValues={query}
                    onSubmit={values => {
                        this.props.dispatch(push(this.props.searchUrl + '?' + queryString.stringify(values)));
                    }}
                >
                    <div className={bem.element('search-input-wrap')}>
                        <Icon
                            className={bem.element('search-icon')}
                            name='search'
                        />
                        <AutoCompleteField
                            className={bem.element('search-input')}
                            placeholder={__('Публикации, аналитика, концепции')}
                            attribute='query'
                            inputProps={{autoComplete: 'off'}}
                            dataProvider={{
                                action: '/api/v1/search',
                                onSearch: async (action, params) => {
                                    const result = await http.get(action, {
                                        query: params.query,
                                        realty: this.props.formValues.realty,
                                        city: this.props.formValues.city,
                                        pageSize: 3,
                                    });
                                    return result ? result.items : [];
                                }
                            }}
                            onSelect={article => {
                                const tagName = _get(article.tags.find(tag => tag.category === TagCategory.PUBLICATION), 'name');
                                this.props.dispatch(goToPage(ArticleCategory.getItemRouteId(article.category), {
                                    id: article.id,
                                    tagName,
                                }));
                            }}
                            isSearchPage={this.props.isSearchPage}
                        />
                    </div>
                    <div className={bem.element('filters')}>
                        <DropDownField
                            isSearchFilter
                            attribute='realty'
                            isSearchPage={this.props.isSearchPage}
                            defaultItemLabel={__('Тип недвижимости')}
                            showReset={true}
                            items={realtyTags}
                            position={'left'}
                            selectedItems={selectedRealtyTag && [selectedRealtyTag]}
                        />
                        <DropDownField
                            isSearchFilter
                            isSearchPage={this.props.isSearchPage}
                            attribute='city'
                            showReset={true}
                            defaultItemLabel={__('Все города')}
                            items={cityTags}
                            position={'right'}
                            selectedItems={selectedCityTag && [selectedCityTag]}
                        />
                    </div>
                </Form>
            </div>
        );
    }
}
