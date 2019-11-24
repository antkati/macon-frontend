import React from 'react';
import {html} from 'components';
import moment from 'moment';
import Link from 'yii-steroids/ui/nav/Link';

import ProjectType from '../../../enums/ProjectType';
import {ROUTE_PROJECT_ARTICLE} from '../../index';
import './IndexPageProjectsItem.scss';
import ArticleLink from 'shared/ArticleLink';

const bem = html.bem('IndexPageProjectsItem');

export default class IndexPageProjectsItem extends React.PureComponent {

    renderCardBody(project, index) {
        return (
            <div className={bem(bem.element('card-body'), 'card-body')}>
                <div className={bem.element('section')}>
                    {ProjectType.getLabel(project.projectType)}
                </div>
                <div className={bem.element('card-title')}>
                    {project.title}
                </div>
                {!index && (
                    <p className={bem(bem.element('card-text'), 'card-text')}>
                        {project.description}
                    </p>
                )}
                <div className={bem.element('date')}>
                    <time>
                        {moment(project.publishTime).format('LL')}
                    </time>
                </div>
            </div>
        )
    }

    renderSmallCard(project, index) {
        return (
            <ArticleLink
                className={bem(bem.element('card'), 'card')}
                article={project}
            >
                <span
                    className={bem(bem.element('image'))}
                    style={{
                        backgroundImage: `url(${project.thumbnailUrl})`,
                    }}
                />
                <span className={bem.element('gradient')}>
                    {this.renderCardBody(project, index)}
                </span>
            </ArticleLink>
        )
    }

    render() {

        const project = this.props.item;
        const index = this.props.index;
        if (index > 2) return null;

        return (
            <>
                {index === 0 && (
                    <div className={bem(bem.block('wide'), 'col-lg-12')}>
                        <ArticleLink
                            className={bem(bem.element('card'), 'card')}
                            article={project}
                        >
                            <div className={bem('row')}>
                                <div className={bem('col-7')}>
                                    <div
                                        className={bem(bem.element('image'))}
                                        style={{
                                            backgroundImage: `url(${project.thumbnailUrl})`,
                                        }}
                                    />
                                </div>
                                <div className={bem(bem.element('col-body'), 'col-5')}>
                                    {this.renderCardBody(project, index)}
                                </div>
                            </div>
                        </ArticleLink>
                    </div>
                )}
                {index === 1 && (
                    <div className={bem(bem.block('small'), 'col-lg-7')}>
                        {this.renderSmallCard(project, index)}
                    </div>
                )}
                {index === 2 && (
                    <div className={bem(bem.block('small'), 'col-lg-5')}>
                        {this.renderSmallCard(project, index)}
                    </div>
                )}
            </>
        )
    }
}
