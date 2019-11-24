import React from 'react';
import {html} from 'components';
import {List} from 'yii-steroids/ui/list';
import UserEmployeesItem from './views/UserEmployeesItem';
import './TeamPage.scss';
import TeamPageMember from './views/TeamPageMember';
import {connect} from 'react-redux';
import { getNavUrl } from 'yii-steroids/reducers/navigation';
import { ROUTE_COMPANY_TEAM } from 'routes/index';
import fetchHoc from 'yii-steroids/ui/nav/fetchHoc';

const LIST_ID = 'TeamPage';
const bem = html.bem('TeamPage');


@connect(
    (state) => ({
        isMobile: window.innerWidth <= 991,
        url: getNavUrl(state, ROUTE_COMPANY_TEAM),
    })
)

export default class TeamPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: +this.props.match.params.id || this.props.team.items[0].id,
            visibilityItem: !!this.props.match.params.id,
        };

        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleItemCancel = this.handleItemCancel.bind(this);
    }

    handleItemClick(id) {
       this.setState({id, visibilityItem: true});
    }

    handleItemCancel() {
        history.replaceState({}, '', this.props.url);
        this.setState({visibilityItem: false});
    }

    renderTeamPageMember(teamMember, handleItemCancel) {
        return (
            <div className={bem.element('team-member-wrap')}>
                <div className={bem.element('team-member')}>
                    <TeamPageMember
                        teamMember={teamMember}
                        handleItemCancel={handleItemCancel}
                    />
                </div>
            </div>
        )
    }

    renderList(items, handleItemClick) {
        return (
            <div className={bem.element('list-wrap')}>
                <div className={bem.element('list')}>
                    <List
                        listId={LIST_ID}
                        items={items}
                        itemView={UserEmployeesItem}
                        loadMore={false}
                        handleItemClick={handleItemClick}
                    />
                </div>
            </div>
        )
    }

    render() {
        const { team } = this.props;
        const teamMember = team.items.find(teamMember => teamMember.id === this.state.id);

        return (
            <div className={bem.block()}>
                <div className={bem.element('content')}>
                    {this.props.isMobile
                        ? this.state.visibilityItem && this.renderTeamPageMember(teamMember, this.handleItemCancel)
                        : this.renderTeamPageMember(teamMember)
                    }
                    {this.props.isMobile
                        ? !this.state.visibilityItem && this.renderList(team.items, this.handleItemClick)
                        : this.renderList(team.items, this.handleItemClick)
                    }
                </div>
            </div>
        )
    }
}
