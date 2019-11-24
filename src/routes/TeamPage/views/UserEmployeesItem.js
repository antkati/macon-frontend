import React from 'react';
import {html} from 'components';
import {connect} from 'react-redux';
import './UserEmployeesItem.scss';
import UserEmployeSchema from '../../../types/UserEmployeSchema';
import { ROUTE_COMPANY_TEAM_ITEM } from 'routes/index';
import {getNavUrl} from 'yii-steroids/reducers/navigation';

const bem = html.bem('UserEmployeesItem');

@connect(
    (state, props) => ({
        url: getNavUrl(state, ROUTE_COMPANY_TEAM_ITEM, {id: props.item.id}),
    })
)

export default class UserEmployeesItem extends React.PureComponent {
    static propTypes = {
        item: UserEmployeSchema,
    };

    render() {
        const userEmployee = this.props.item;

        return (
            <div
                className={bem.block()}
                style={!!userEmployee.thumbnailUrl
                    ? {backgroundImage: `url(${userEmployee.thumbnailUrl})`}
                    : {backgroundColor: '#f5f5f5'}
                }
                onClick={() => {
                    history.replaceState({}, userEmployee.name, this.props.url);
                    this.props.handleItemClick(userEmployee.id)
                }}
            >
                <div className={bem.element('body')}>
                    <div className={bem.element('name')}>
                        {userEmployee.name}
                    </div>
                    <div className={bem.element('workPosition')}>
                        {userEmployee.workPosition}
                    </div>
                </div>
            </div>

        )
    }
}
