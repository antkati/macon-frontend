import React from 'react';

import {html} from 'components';

const bem = html.bem('HeaderSearch');

import './HeaderSearch.scss';
import Icon from 'shared/Icon';
import Link from 'yii-steroids/ui/nav/Link';
import {ROUTE_SEARCH} from 'routes';

export default class HeaderSearch extends React.PureComponent {

    render() {
        return (
            <Link toRoute={ROUTE_SEARCH}>
                <Icon name='search' className={bem.block()} />
            </Link>
        )
    }

}
