import React from 'react';
import PropTypes from 'prop-types';

import {html} from 'components';

import './PaginationButtonView.scss';

const bem = html.bem('PaginationButtonView');

export default class PaginationButtonView extends React.Component {

    static propTypes = {
        pages: PropTypes.arrayOf(PropTypes.shape({
            page: PropTypes.number,
            label: PropTypes.node,
            isActive: PropTypes.bool,
        })),
        onSelect: PropTypes.func,
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
    };


    render() {
        const activePage = this.props.pages.find(page => page.isActive);

        return (
            <nav className={bem(bem.block(), 'col-12')}>
                <ul className='list-inline'>
                    <li className={bem(bem.element('item'), 'list-inline-item')}>
                        <a
                            className={bem(
                                bem.element('page-link'),
                                'page-link'
                            )}
                            href='#'
                            onClick={e => {
                                e.preventDefault();
                                if(activePage.page === 1) return;
                                this.props.onSelect(activePage.page - 1);
                            }}
                        >
                            <span>
                                &lt;
                            </span>

                        </a>
                    </li>
                    <li className={bem(bem.element('item'), 'list-inline-item')}>
                        <ul className={bem(
                            bem.element('list'),
                            'pagination'
                        )}>
                            {this.props.pages.map((item, index) => (
                                <li
                                    key={index}
                                    className={bem(
                                        bem.element('page', {hidden: !item.page}),
                                        'page-item',
                                        item.isActive ? 'active' : ''
                                    )}
                                >
                                    <a
                                        className={bem(
                                            bem.element('page-link', {hidden: !item.page}),
                                            'page-link'
                                        )}
                                        href='#'
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.onSelect(item.page);
                                        }}
                                    >
                                        <span>
                                            {item.label}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li className={bem(bem.element('item'), 'list-inline-item')}>
                        <a
                            className={bem(
                                bem.element('page-link'),
                                'page-link'
                            )}
                            href='#'
                            onClick={e => {
                                e.preventDefault();
                                const pages = this.props.pages;
                                const lastPage = pages[pages.length - 1];
                                if(activePage.page === lastPage.page) return;
                                this.props.onSelect(activePage.page + 1);
                            }}
                        >
                            <span>
                                &gt;
                            </span>

                        </a>
                    </li>
                </ul>
            </nav>
        );
    }

}
