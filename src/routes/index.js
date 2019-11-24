import {Redirect} from 'react-router';

import UserRole from 'enums/UserRole';
import IndexPage from 'routes/IndexPage';
import TeamPage from 'routes/TeamPage';
import AboutPage from 'routes/AboutPage';
import ArticlesPage from 'routes/ArticlesPage';
import ArticleCategory from 'enums/ArticleCategory';
import PagesEnum from 'enums/PagesEnum';
import SingleArticlePage from 'routes/SingleArticlePage';
import ServiceAnalysisAndResearch from 'routes/services/ServiceAnalysisAndResearch';
import ServiceConceptDevelopment from 'routes/services/ServiceConceptDevelopment';
import ServiceLargeAreaDevelopment from 'routes/services/ServiceLargeAreaDevelopment';
import ServiceStrategicConsulting from 'routes/services/ServiceStrategicConsulting';
import ServiceBusinessPlanning from 'routes/services/ServiceBusinessPlanning';
import ServicePropertyValuation from 'routes/services/ServicePropertyValuation';
import ServicePromotionAndSales from 'routes/services/ServicePromotionAndSales';
import ServiceBusinessTraining from 'routes/services/ServiceBusinessTraining';
import ArticlePage from 'routes/ArticlePage';
import ContactsPage from 'routes/ContactsPage';
import SearchPage from 'routes/SearchPage';

export const ROUTE_ROOT = 'root';
export const ROUTE_COMPANY = 'company';
export const ROUTE_COMPANY_ABOUT = 'company_about';
export const ROUTE_COMPANY_NEWS = 'company_news';
export const ROUTE_COMPANY_NEWS_ITEM = 'company_news_item';
export const ROUTE_COMPANY_TEAM = 'company_team';
export const ROUTE_COMPANY_TEAM_ITEM = 'company_team_item';
export const ROUTE_COMPANY_CAREER = 'company_career';
export const ROUTE_COMPANY_MEDIA = 'company_media';
export const ROUTE_COMPANY_MEDIA_ITEM = 'company_media_item';
export const ROUTE_COMPANY_PRESS = 'company_press';
export const ROUTE_SERVICES = 'services';
export const ROUTE_SERVICES_ANALYSIS_AND_RESEARCH = 'services_analysis_and_research';
export const ROUTE_SERVICES_CONCEPT_DEVELOPMENT = 'services_concept_development';
export const ROUTE_SERVICES_LARGE_AREA_DEVELOPMENT = 'services_large_area_development';
export const ROUTE_SERVICES_STRATEGIC_CONSULTING = 'services_consulting';
export const ROUTE_SERVICES_BUSINESS_PLANNING = 'services_business_planning';
export const ROUTE_SERVICES_PROPERTY_VALUATION = 'services_property_valuation';
export const ROUTE_SERVICES_PROMOTION_AND_SALES = 'services_promotion_and_sales';
export const ROUTE_SERVICES_BUSINESS_TRAINING = 'services_business_training';
export const ROUTE_PUBLICATIONS = 'publications';
export const ROUTE_PUBLICATIONS_CATEGORY = 'publications_category';
export const ROUTE_PUBLICATIONS_ITEM = 'publications_item';
export const ROUTE_PROJECTS = 'projects';
export const ROUTE_PROJECTS_ITEM = 'projects_item';
export const ROUTE_CONTACTS = 'contacts';
export const ROUTE_SEARCH = 'search';

// Default roles
const roles = UserRole.getKeys();

export default {
    id: ROUTE_ROOT,
    exact: true,
    path: '/',
    component: IndexPage,
    layout: 'index',
    roles,
    items: {
        [ROUTE_COMPANY]: {
            exact: true,
            path: '/company',
            title: __('Компания'),
            roles,
            component: Redirect,
            componentProps: {
                to: '/company/about',
            },
            items: {
                [ROUTE_COMPANY_ABOUT]: {
                    exact: true,
                    path: '/company/about',
                    component: AboutPage,
                    title: __('О компании'),
                    roles,
                    fetch: () => ({
                        url: '/api/v1/about',
                        key: 'about',
                    }),
                },
                [ROUTE_COMPANY_NEWS]: {
                    exact: true,
                    path: '/company/news',
                    component: ArticlesPage,
                    title: __('Новости'),
                    componentProps: {
                        category: ArticleCategory.NEWS,
                    },
                    roles,
                    items: {
                        [ROUTE_COMPANY_NEWS_ITEM]: {
                            path: '/company/news/:id',
                            component: ArticlePage,
                            roles,
                            fetch: ({params}) => ({
                                url: `/api/v1/articles/${ArticleCategory.NEWS}/${params.id}`,
                                key: 'article',
                            }),
                        },
                    },
                },
                [ROUTE_COMPANY_TEAM]: {
                    exact: true,
                    path: '/company/team',
                    component: TeamPage,
                    layout: 'team',
                    title: __('Команда'),
                    roles,
                    fetch: () => ({
                        url: '/api/v1/team',
                        key: 'team',
                    }),
                    items: {
                        [ROUTE_COMPANY_TEAM_ITEM]: {
                            path: '/company/team/:id',
                            component: TeamPage,
                            layout: 'team',
                            roles,
                            fetch: () => ({
                                url: '/api/v1/team',
                                key: 'team',
                            }),
                        },
                    },
                },
                [ROUTE_COMPANY_CAREER]: {
                    exact: true,
                    path: '/company/career',
                    component: SingleArticlePage,
                    title: __('Карьера'),
                    roles,
                    fetch: () => ({
                        url: `/api/v1/pages/${PagesEnum.CAREER}`,
                        key: 'article',
                    }),
                },
                [ROUTE_COMPANY_MEDIA]: {
                    exact: true,
                    path: '/company/media',
                    component: ArticlesPage,
                    title: __('СМИ о нас'),
                    roles,
                    componentProps: {
                        category: ArticleCategory.MEDIA,
                    },
                },
                [ROUTE_COMPANY_PRESS]: {
                    exact: true,
                    path: '/company/press',
                    component: SingleArticlePage,
                    title: __('Пресс центр'),
                    roles,
                    fetch: () => ({
                        url: `/api/v1/pages/${PagesEnum.PRESS}`,
                        key: 'article',
                    }),
                },
            },
        },
        [ROUTE_SERVICES]: {
            exact: true,
            path: '/services',
            title: __('Услуги'),
            roles,
            component: Redirect,
            componentProps: {
                to: '/services/analysis-and-research',
            },
            items: {
                [ROUTE_SERVICES_ANALYSIS_AND_RESEARCH]: {
                    path: '/services/analysis-and-research',
                    component: ServiceAnalysisAndResearch,
                    isNavVisible: false,
                    title: __('Анализ и исследование'),
                    description: __('Одно из популярнейших направлений исследований, заказываемых у наших специалистов'),
                    roles,
                },
                [ROUTE_SERVICES_CONCEPT_DEVELOPMENT]: {
                    path: '/services/concept-development',
                    component: ServiceConceptDevelopment,
                    isNavVisible: false,
                    title: __('Разработка концепций'),
                    description: __('Проектный консалтинг для заказчиков, реализующих инвестиционные проекты'),
                    roles,
                },
                [ROUTE_SERVICES_STRATEGIC_CONSULTING]: {
                    path: '/services/strategic-consulting',
                    component: ServiceStrategicConsulting,
                    isNavVisible: false,
                    title: __('Стратегический консалтинг'),
                    description: __('Одно из популярнейших направлений исследований, заказываемых у нас'),
                    roles,
                },
                [ROUTE_SERVICES_BUSINESS_PLANNING]: {
                    path: '/services/business-planning',
                    component: ServiceBusinessPlanning,
                    isNavVisible: false,
                    title: __('Бизнес-планирование'),
                    description: __('Бизнес-планирование позволяет оценить объем необходимых инвестиций'),
                    roles,
                },
                [ROUTE_SERVICES_LARGE_AREA_DEVELOPMENT]: {
                    path: '/services/large-area-development',
                    component: ServiceLargeAreaDevelopment,
                    isNavVisible: false,
                    title: __('Развитие крупных территорий'),
                    description: __('Подобные проекты требуют комплексного подхода и опытной команды профессионало'),
                    roles,
                },
                [ROUTE_SERVICES_PROPERTY_VALUATION]: {
                    path: '/services/property-valuation',
                    component: ServicePropertyValuation,
                    isNavVisible: false,
                    title: __('Оценка объектов недвижимости'),
                    description: __('Специалисты нашей компании провели уже значительное число оценочных работ тех или иных объектов недвижимости для крупных инвестиционных структур и кредитных учреждений.'),
                    roles,
                },
                [ROUTE_SERVICES_PROMOTION_AND_SALES]: {
                    path: '/services/promotion-and-sales',
                    component: ServicePromotionAndSales,
                    isNavVisible: false,
                    title: __('Продвижение и продажи'),
                    description: __('Мы создаем стратегию позиционирования проекта, выгодно отличающую его среди конкурентов.'),
                    roles,
                },
                [ROUTE_SERVICES_BUSINESS_TRAINING]: {
                    path: '/services/business-training',
                    layout: 'index',
                    component: ServiceBusinessTraining,
                    isNavVisible: false,
                    title: __('Бизнес-тренинги'),
                    description: __('На проводимых тренингах будут представлены лучшие девелоперские проекты в выбранном сегменте недвижимости, детально проанализированы их причины успеха.'),
                    roles,
                },
            }
        },
        [ROUTE_PUBLICATIONS]: {
            exact: true,
            path: '/publications',
            title: __('Обзоры и публикации'),
            roles,
            component: Redirect,
            componentProps: {
                to: '/publications/all',
            },
            items: {
                [ROUTE_PUBLICATIONS_CATEGORY]: {
                    exact: true,
                    path: '/publications/:tagName',
                    component: ArticlesPage,
                    componentProps: {
                        category: ArticleCategory.PUBLICATION,
                    },
                    title: __('Все публикации'),
                    roles,
                    items: {
                        [ROUTE_PUBLICATIONS_ITEM]: {
                            path: '/publications/:tagName/:id',
                            component: ArticlePage,
                            roles,
                            fetch: ({params}) => ({
                                url: `/api/v1/articles/${ArticleCategory.PUBLICATION}/${params.id}`,
                                key: 'article',
                            }),
                        },
                    },
                }
            },
        },
        [ROUTE_PROJECTS]: {
            exact: true,
            path: '/projects',
            component: ArticlesPage,
            title: __('Проекты'),
            componentProps: {
                category: ArticleCategory.PROJECT,
            },
            roles,
            items: {
                [ROUTE_PROJECTS_ITEM]: {
                    path: '/projects/:id',
                    component: ArticlePage,
                    isNavVisible: false,
                    roles,
                    fetch: ({params}) => ({
                        url: `/api/v1/articles/${ArticleCategory.PROJECT}/${params.id}`,
                        key: 'article',
                    }),
                },
            },
        },
        [ROUTE_CONTACTS]: {
            exact: true,
            path: '/contacts',
            title: __('Контакты'),
            component: ContactsPage,
            roles,
        },
        [ROUTE_SEARCH]: {
            exact: true,
            path: '/search',
            isNavVisible: false,
            title: __('Поиск по сайту'),
            layout: 'index',
            component: SearchPage,
            roles,
        },
    }
};
