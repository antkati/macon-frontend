import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {openModal} from 'yii-steroids/actions/modal';
import RegistrationModal from 'modals/RegistrationModal';

import Button from 'yii-steroids/ui/form/Button';
import Link from 'yii-steroids/ui/nav/Link';

import {html} from 'components';
const bem = html.bem('PublicationsArticleLimitedAccess');

import './PublicationsArticleLimitedAccess.scss';
import PublicationsArticleShared from './PublicationsArticleShared';
import Icon from 'shared/Icon';

@connect()



export default class PublicationsArticleLimitedAccess extends React.PureComponent {
    render() {
        const { title, date, views, section } = this.props;
        const iconPDF = <Icon name='redpdf' className={bem.element('pdf-icon')}/>

        return (
            <article className={bem(bem.element('article'), 'col')}>
                <h1 className={bem.element('heading')}>
                    {__(title)}
                </h1>
                <div className={bem(bem.element('info'), 'row')}>
                    <div className={bem(bem.element('time'), 'col-auto')}>
                        <time>
                            {__(date)}
                        </time>
                    </div>
                    <div className={bem(bem.element('views'), 'col-auto')}>
                        <span>
                            {__(`${views} Просмотров`)}
                        </span>
                    </div>
                    <div className={bem('col-auto')}>
                        <Link
                            color='primary'
                            label={`${section}`}
                            className={bem.element('tag-link')}
                        />
                    </div>
                </div>
                <div className={bem(bem.element('shared'), 'row')}>
                    <div className='col-auto'>
                        <PublicationsArticleShared />
                    </div>
                    <div className='col-auto'>
                        <Button
                            className={bem.element('download-pdf')}
                            color={'light'}
                            label={__('Скачать PDF')}
                            icon={iconPDF}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className={bem(bem.element('body'))}>
                    <p className={bem.element('p')}>
                        {__('Ключевым трендом начала 2018 г. на рассматриваемом рынке стало возобновление положительной динамики объема предложения, после более, чем трехлетнего периода снижения объемов возводимого жилья.')}
                    </p>
                    <p className={bem.element('p')}>
                        {__('Прирост объема предложения был преимущественно обусловлен наращиванием девелоперской активности в отношении новых проектов - этот тренд прослеживался уже в 2017 г., в течение которого застройщики г. Екатеринбург увеличивали темп закладки новых проектов: совокупный объем новых комплексов в 2017 г. был на 37% больше, нежели годом ранее. Общая же площадь нового строительства в 1 квартале 2018 г. составила 280,5 тыс. кв. м, что составляет около 30% от годового показателя 2017 г. Таким образом, положительный тренд к увеличению строительной активности продолжается.')}
                    </p>
                </div>
                <div className={bem.element('limited-access')}>
                    <div className={bem('card', 'text-center')}>
                        <div className={bem('card-body')}>
                            <div className='card-title'>
                                {__('Получите полный партнёрский доступ к результатам аналитики')}
                            </div>
                            <p className='card-text'>
                                {__('Пройдите бесплатную регистрацию на сайте')}
                            </p>
                            <Button
                                className={bem.element('sign-in-btn')}
                                color={'light'}
                                label={__('Зарегистрироваться')}
                                onClick={() => this.props.dispatch(openModal(RegistrationModal))}
                            />
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
