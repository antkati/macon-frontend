import React from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import Icon from 'shared/Icon';
import './DropDownFieldView.scss';
import {html} from 'components';
const bem = html.bem('DropDownFieldView');

export default class DropDownFieldView extends React.PureComponent {

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
        searchInputProps: PropTypes.object,
        searchAutoFocus: PropTypes.bool,
        multiple: PropTypes.bool,
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.bool,
            ]),
            label: PropTypes.string,
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
        isFilter: PropTypes.bool,
        defaultItemLabel: PropTypes.string,
        isSearchFilter: PropTypes.bool,
        isArticleFilter: PropTypes.bool,
        isSearchPage: PropTypes.bool,

    };

    static defaultProps = {
        searchAutoFocus: true,
    };

    componentDidUpdate(prevProps) {
        // Auto focus on search
        if (this.props.searchAutoFocus && this.props.autoComplete && !prevProps.isOpened && this.props.isOpened) {
            const input = findDOMNode(this).querySelector('.' + bem.element('search-input'));
            if (input) {
                input.focus();
            }
        }
    }

    render() {
        return (
            <div className={bem.block({
                size: this.props.size,
                isSearchFilter: this.props.isSearchFilter,
                isArticleFilter: this.props.isArticleFilter,
                isSearchPage: this.props.isSearchPage,
            })}>
                <div
                    className={bem.element('selected-items', {
                        reset: this.props.showReset,
                        'is-invalid': this.props.isInvalid,
                        'is-opened': this.props.isOpened,
                    })}
                    onClick={this.props.onOpen}
                >
                    {this.props.selectedItems && this.props.selectedItems.length > 0 && (
                        this.props.selectedItems.map(item => (
                        <span
                            key={item.id}
                            className={bem(bem.element('selected-item'), 'text-break')}
                        >
                            {item.label}
                        </span>))
                    ) || (
                        <>
                            {this.props.defaultItemLabel && (
                                <span className={bem(bem.element('default-item'), 'text-break')}>
                                    {this.props.defaultItemLabel}
                                </span>
                            )}
                        </>
                    )}
                    {this.props.showReset && !!this.props.selectedItems.length && (
                        <span
                            className={bem.element('reset')}
                            onClick={e => {
                                this.props.onReset();
                                e.stopPropagation();
                            }}
                        />
                    )}
                    {this.props.isArticleFilter && (
                        <Icon
                            name='filterArrow'
                            className={bem.element('arrow-icon')}
                        />
                    )}
                </div>

                {this.props.isOpened && (
                    <div className={bem.element('drop-down', this.props.position)}>
                        <div className={bem.element('drop-down-inner')}>
                            {this.props.autoComplete && (
                                <div className={bem.element('search')}>
                                    <input
                                        {...this.props.searchInputProps}
                                        className={bem(bem.element('search-input'), 'form-control')}
                                    />
                                </div>
                            )}
                            <div className={bem.element('drop-down-list')}>
                                {this.props.items.map(item => (
                                    <div
                                        key={item.id}
                                        className={bem(bem.element('drop-down-item', {hover: item.isHovered, select: item.isSelected}), 'text-break')}
                                        onClick={() => this.props.onItemClick(item)}
                                        onMouseOver={() => this.props.onItemMouseOver(item)}
                                    >

                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

}
