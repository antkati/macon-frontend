import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { isAuthorized } from 'yii-steroids/reducers/auth';

import {html} from 'components';
const bem = html.bem('PublicationsArticle');



import './PublicationsArticle.scss';

import PublicationsArticleFullAccess from './views/PublicationsArticleFullAccess';
import PublicationsArticleLimitedAccess from './views/PublicationsArticleLimitedAccess';


const article = {
    title: 'Рынок многоквартирной жилой недвижимости Екатеринбурга',
    date: '12 Cентября, 10:40',
    views: 1240,
    section: 'Недвижимость регионов',
    recommendations: [
        {
            title: 'Краткий обзор рынка многоквартирной жилой недвижимости г. Ростов-на-Дону',
            description: 'На рынке Ростова-на-Дону уже более двух лет продолжается тренд к наращиванию девелоперской активности и, как следствие, к уверенному росту объема предложения.',
            date: '12 Cентября, 10:40',
        },
        {
            title: 'Краткий обзор рынка многоэтажной жилой недвижимости в Нижнем Новгороде',
            description: 'В г. Нижний Новгород с конца 2014 г. имеет место снижение девелоперской активности в отношении закладки новых многоквартирных жилых домов. Данный факт, предопределяющий сокращение общего объема предложения, еще более обостряет дефицит новостроек.',
            date: '12 Cентября, 10:40',
        }
    ]
};

@connect(
    state => ({
        isAuthorized: isAuthorized(state)
    })
)

export default class PublicationsArticle extends React.PureComponent {
    static propTypes = {
        isAuthorized: PropTypes.bool,
    };

    render() {
        return (
            <div className={bem.block()}>
                <div className={bem('container-fluid')}>
                    <div className={bem('row', 'justify-content-center')}>
                        {this.props.isAuthorized
                            ? <PublicationsArticleFullAccess {...article}/>
                            : <PublicationsArticleLimitedAccess {...article}/>}
                    </div>
                </div>
            </div>

        )
    }
}