import React from 'react';
import {html} from 'components';
import './TeamPageMember.scss';
import Icon from 'shared/Icon';

const bem = html.bem('TeamPageMember');


export default class TeamPageMember extends React.PureComponent {
    render() {

        return (
            <div className={bem.block()} >
                {this.props.handleItemCancel && (
                    <div
                        onClick={this.props.handleItemCancel}
                        className={bem.element('cancel')}
                    >
                        <Icon
                            name={'filterArrow'}
                            className={bem.element('cancel-icon')}
                        />
                    </div>
                )}
                {!!this.props.teamMember.originalUrl && (
                    <div
                        className={bem.element('photo')}
                        style={{backgroundImage: `url(${this.props.teamMember.originalUrl})`}}
                    />
                )}
                <div className={bem.element('body', {'without-photo': !this.props.teamMember.originalUrl})}>
                    <h2 className={bem.element('name')}>
                        {this.props.teamMember.name}
                    </h2>
                    <div className={bem.element('workPosition')}>
                        {this.props.teamMember.workPosition}
                    </div>
                    <div className={bem.element('email')}>
                        <a
                            href={`mailto:${this.props.teamMember.email}`}
                            className={bem.element('email-link')}
                        >
                            {this.props.teamMember.email}
                        </a>
                    </div>
                    <div
                        className={bem.element('text')}
                        dangerouslySetInnerHTML={{__html: this.props.teamMember.text}}
                    />
                </div>
            </div>

        )
    }
}
