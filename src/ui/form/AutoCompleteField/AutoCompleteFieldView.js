import React from 'react';
import PropTypes from 'prop-types';
import './AutoCompleteFieldView.scss';
import ArticleLink from 'shared/ArticleLink';
import Link from 'yii-steroids/ui/nav/Link';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';
import {push} from 'connected-react-router';
import {html, ui} from 'components';
import Icon from '../../../shared/Icon';
import { getNavUrl } from 'yii-steroids/reducers/navigation';
import { ROUTE_SEARCH } from '../../../routes';
import queryString from "querystring";

const bem = html.bem('AutoCompleteFieldView');

@connect(
    (state, props) => ({
        searchUrl: getNavUrl(state, ROUTE_SEARCH),
        formValues: getFormValues(props.formId)(state),
    })
)

export default class AutoCompleteFieldView extends React.PureComponent {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.string,
        required: PropTypes.bool,
        placeholder: PropTypes.string,
        isInvalid: PropTypes.bool,
        searchPlaceholder: PropTypes.string,
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
        disabled: PropTypes.bool,
        className: PropTypes.string,
        inputProps: PropTypes.object,
        multiple: PropTypes.bool,
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.bool,
            ]),
            label: PropTypes.string,
            labelHighlighted: PropTypes.array,
        })),
        selectedItems: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.bool,
            ]),
            label: PropTypes.string,
            isSelected: PropTypes.bool,
            isHovered: PropTypes.bool,
        })),
        autoComplete: PropTypes.bool,
        autoCompleteMinLength: PropTypes.number,
        autoCompleteDelay: PropTypes.number,
        isOpened: PropTypes.bool,
        showReset: PropTypes.bool,
        onOpen: PropTypes.func,
        onReset: PropTypes.func,
        onItemClick: PropTypes.func,
        onItemMouseOver: PropTypes.func,
        isSearchPage: PropTypes.bool,
    };

    render() {
        return (
            <div className={bem.block({
                size: this.props.size,
                isSearchPage: this.props.isSearchPage
            })}>
                <input
                    className={bem(
                        bem.element('input'),
                        this.props.isInvalid && 'is-invalid',
                        this.props.className
                    )}
                    {...this.props.inputProps}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    required={this.props.required}
                />
                {this.props.isOpened && (
                    <div className={bem.element('drop-down')}>
                        <div className={bem.element('drop-down-list')}>
                            {this.props.items.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => this.props.onItemClick(item)}
                                    onMouseOver={() => this.props.onItemMouseOver(item)}
                                >
                                    <ArticleLink
                                        article={item}
                                        className={bem(bem.element('drop-down-item', {hover: item.isHovered, select: item.isSelected}), 'd-flex', 'w-100')}
                                    >
                                        <span
                                            className={bem(bem.element('thumbnail'), 'd-flex', 'flex-shrink-0')}
                                            style={{
                                                backgroundImage: `url(${item.thumbnailUrl})`,
                                            }}
                                        />
                                        <span className={'card-body'}>
                                            <span className='card-title'>{item.title}</span>
                                            <span className={bem(bem.element('info'), 'd-flex', 'flex-row', 'align-items-center', 'mt-auto')}>
                                                <span className={bem(bem.element('date'), 'flex-grow-0')}>
                                                    <span>{item.publishTime}</span>
                                                </span>
                                                {item.pdf && (
                                                    <span className={bem(bem.element('pdf'), 'text-right', 'flex-grow-0', 'ml-4')}>
                                                        <Icon
                                                            className={bem(bem.element('pdf-icon'))}
                                                            name='pdf'
                                                        />
                                                    </span>
                                                )}
                                                <span className={bem(bem.element('views'), 'flex-grow-0', 'ml-3', 'd-flex', 'align-items-center')}>
                                                    <Icon
                                                        className={bem(bem.element('view-icon'), 'd-flex', 'align-items-center')}
                                                        name='viewed'
                                                    />
                                                    <span>{item.viewsCount}</span>
                                                </span>
                                            </span>
                                         </span>
                                    </ArticleLink>
                                </div>
                            ))}
                            <div className={bem.element('show-all')}>
                                <div className={bem.element('hr')} />
                                <Link
                                    label={__('Показать все')}
                                    className={bem.element('show-all-link')}
                                    onClick={() => {
                                        console.log('formValues', this.props.formValues, 'queryString', queryString.stringify(this.props.formValues))
                                        this.props.dispatch(push(this.props.searchUrl + '?' + queryString.stringify(this.props.formValues)))
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

}
