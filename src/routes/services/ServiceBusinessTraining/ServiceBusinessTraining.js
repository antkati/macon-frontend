import React from 'react';
import LandingHeader from 'shared/LandingHeader';
import {html} from 'components';
import IndexPageProjectsItem from 'routes/IndexPage/views/IndexPageProjectsItem';
import './ServiceBusinessTraining.scss';
import { List } from 'yii-steroids/ui/list';
import ArticleCard from '../../../shared/ArticleCard';

const bem = html.bem('ServiceBusinessTraining');

const CARTS = [
    'Получать базовые знания о рыночном механизме сегмента недвижимости, особенностях взаимодействия спроса и предложения',
    'Научитесь определять и использовать основные источники рыночной информации и организовывать эффективные исследования рынков недвижимости',
    'Научитесь с помощью собственных специалистов анализировать макроэкономические, инвестиционные и маркетинговые риски девелоперских проектов',
    'Самостоятельно выбирать перспективные ниши с точки зрения местоположения и рыночного потенциала объекта недвижимости',
    'Основными методами прогнозирования рыночной ситуации и особенностями маркетинга различных типов недвижимости'
];

const PROJECTS = [
    {
        projectType: 'business_training',
        category: 'project',
        description: 'Анализ перспектив строительства крупного оптово-розничного торгового комплекса в Краснодаре',
        id: 6461,
        originalUrl: 'https://macon.dev.kozhindev.com/files/uploaded/project/73afbcd6-5c50-4524-b86a-3740083aaf37.jpg',
        pdf: null,
        publishTime: '2011-11-17 12:55:03',
        tags: [{id: 728, category: 'city', name: 'krasnodar', title: 'Краснодар'}],
        thumbnailUrl: 'https://macon.dev.kozhindev.com/files/uploaded/project/73afbcd6-5c50-4524-b86a-3740083aaf37.thumbnail.jpg',
        title: 'Анализ перспектив строительства крупного оптово-розничного торгового комплекса в Краснодаре',
        viewsCount: 0,
    },
    {
        projectType: 'business_training',
        category: 'project',
        description: 'Анализ целесообразности реализации торговой функции в рамках МФК в Краснодаре',
        id: 6458,
        originalUrl: 'https://macon.dev.kozhindev.com/files/uploaded/project/4ca57ef0-16d3-428d-a4fd-89e101720ce9.jpg',
        pdf: null,
        publishTime: '2011-11-17 12:54:41',
        tags: [{id: 728, category: 'city', name: 'krasnodar', title: 'Краснодар'}],
        thumbnailUrl: 'https://macon.dev.kozhindev.com/files/uploaded/project/4ca57ef0-16d3-428d-a4fd-89e101720ce9.thumbnail.jpg',
        title: 'Анализ целесообразности реализации торговой функции в рамках МФК в Краснодаре',
        viewsCount: 1,
    },
    {
        projectType: 'business_training',
        category: 'project',
        description: '',
        id: 6431,
        originalUrl: 'https://macon.dev.kozhindev.com/files/uploaded/project/eb854fcd-cc05-4db9-bae4-100e554131e8.jpg',
        pdf: null,
        publishTime: '2011-11-17 12:52:50',
        tags: [{id: 731, category: 'realty', name: 'residential_real_estate', title: 'Жилая недвижимость'}],
        thumbnailUrl: 'https://macon.dev.kozhindev.com/files/uploaded/project/eb854fcd-cc05-4db9-bae4-100e554131e8.thumbnail.jpg',
        title: 'Разработка бизнес-концепции жилого комплекса в Геленджике',
        viewsCount: 2,
    }
];

export default class ServiceBusinessTraining extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                <section className={bem.element('title')}>
                    <div className='container-fluid h-100'>
                        <LandingHeader/>
                        <div className={bem.element('title-text')}>
                            <span className={bem.element('label')}>{__('Услуга')}</span>
                            <h1>{__('Бизнес-тренинги')}</h1>
                            <p className={'d-none d-lg-block'}>
                                {__('Для реализации самостоятельных успешных проектов в области недвижимости самые опытные консультанты компании MACON готовы делиться своим многолетним опытом и проводить тематические тренинги. Услуга будет полезна инвесторам, девелоперам, руководителям проектов в области недвижимости и проектным менеджерам.')}
                            </p>
                            <p className={'d-none d-lg-block'}>
                                {__('Для достижения успеха в инвестиционно-строительной деятельности необходимо четко определять текущую ситуацию на рынке недвижимости, оценивать потенциал объекта и рынка, а также выявлять основные риски девелопмента.')}
                            </p>
                        </div>
                    </div>
                </section>
                <main className={bem.element('features')}>
                    <div className='container-fluid'>
                        <h2>{__('В ходе тренингов вы научитесь')}</h2>
                        <div className={bem.element('hr')}/>
                        <div className='row'>
                            {CARTS.map((cart, index) => (
                                <div key={index} className='col-lg-4'>
                                    <div className={bem.element('features-cart')}>
                                        <span className={bem.element('features-num')}>{`0${index + 1}`}</span>
                                        <p>{cart}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
                <section className={bem(bem.element('projects'), 'd-none', 'd-lg-block')}>
                    <div className='container-fluid'>
                        <h2>{__('Проекты')}</h2>
                        <div className={bem.element('hr')}/>
                        <List
                            listId={'ServiceBusinessPage_Projects'}
                            items={PROJECTS}
                            itemView={IndexPageProjectsItem}
                            className={bem('row')}
                        />
                    </div>
                </section>
            </div>
        );
    }

}
