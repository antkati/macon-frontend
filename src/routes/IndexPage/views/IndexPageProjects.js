import React from 'react';
import {html} from 'components';
import { List } from 'yii-steroids/ui/list';
import Link from 'yii-steroids/ui/nav/Link';

import IndexPageProjectsItem from './IndexPageProjectsItem';
import {ROUTE_PROJECTS} from 'routes';
import './IndexPageProjects.scss';

const bem = html.bem('IndexPageProjects');

export default class IndexPageProjects extends React.PureComponent {

    static propTypes = {
    };

    render() {
        return (
            <section className={bem.block()}>
                <div className={bem('container-fluid')}>
                    <div className={bem(bem.element('title'), 'row', 'align-items-center')}>
                        <div className={bem('col')}>
                            <h2 className={bem.element('heading')}>{__('Проекты')}</h2>
                        </div>
                        <div className={bem('col', 'text-right')}>
                            <Link
                                className={'all-projects-link'}
                                label={__('Все проекты')}
                                toRoute={ROUTE_PROJECTS}
                            />
                        </div>
                    </div>
                    <List
                        listId={'projects'}
                        items={this.props.projects}
                        itemView={IndexPageProjectsItem}
                        className={bem('row')}
                    />

                </div>

            </section>
        );
    }
}
