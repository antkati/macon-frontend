import React from 'react';
import {connect} from 'react-redux';
import {html} from 'components';
import AboutSchema from 'types/AboutSchema';
import {openModal} from 'yii-steroids/actions/modal';
import ZoomModal from 'modals/ZoomModal';
import './AboutPage.scss';
import Link from 'yii-steroids/ui/nav/Link';
import Icon from 'shared/Icon';
import Button from 'yii-steroids/ui/form/Button';


const bem = html.bem('AboutPage');

@connect()

export default class AboutPage extends React.PureComponent {

    static propTypes = {
        about: AboutSchema,
    };

    constructor(props) {
        super(props);

        this.state = {
            aboutIsOpened: false,
            reviewIsOpened: false
        }
    }

    openBlock(block) {
        this.setState({[`${block}IsOpened`]: true})
    }

    render() {
        const {
            article: {
                title,
                text
            },
            clients,
            reviews
        } = this.props.about;

        return (
            <div className={bem.block()}>
                <section
                    className={bem.element('about', {opened: this.state.aboutIsOpened})}
                >
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className={'col-lg-6'}>
                                <h2 className={bem.element('heading')}>{title}</h2>
                                <div
                                    className={bem.element('text')}
                                >
                                    <p>{__('Лидирующая компания в области стратегического консалтинга на рынке недвижимости России и один из самых успешных региональных консультантов в стране. С 2014 года компания является эксклюзивным представителем Российской Федерации в Восточно-Европейской Ассоциации Прогнозирования Строительства EECFA.')}</p>
                                    <p>{__('Эксперты компании решают комплекс задач по развитию девелоперских проектов: от проведения маркетинговых исследований в области недвижимости, разработки концепций застройки и бизнес-планирования до организации продаж и комплексного продвижения объектов на рынке. Одна из основных специализаций консалтинговой компании MACON – это развитие крупных территорий.')}</p>
                                    <p>{__('За 14 лет работы консультанты MACON реализовали более 750 исследовательских и консалтинговых проектов в 150 российских и 5 зарубежных городах. Эксперты совместно с клиентами подготовили стратегии развития земельных активов общей площадью более 15 000  Га.')}</p>
                                    <p>{__('Компания MACON работает во всех сегментах рынка недвижимости: жилом, офисном, складском, торговом, гостиничном и курортном. Систематические исследования и разработки MACON образуют колоссальный интеллектуальный капитал в области оценки и прогнозирования развития региональных рынков недвижимости.')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {!this.state.aboutIsOpened && (
                    <div className='container-fluid'>
                        <Button
                            className={bem(bem.element('read-more-btn'), 'd-block', 'd-lg-none', 'mx-auto', 'my-3')}
                            label={__('Читать дальше')}
                            color={'dark'}
                            onClick={() => {
                                this.openBlock('about');
                            }}
                        />
                    </div>
                )}
                <section className={bem.element('reviews')}>
                    <div className='container-fluid'>
                        <div className={'row align-items-center'}>
                            <div className={bem('col')}>
                                <h2 className={bem.element('heading')}>{__('Благодарственные письма')}</h2>
                            </div>
                            <div className={bem('col', 'text-right', 'd-none', 'd-lg-block')}>
                                <Link
                                    className='show-more-btn'
                                    label={__('Показать все')}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.openBlock('review');
                                    }}
                                />
                            </div>
                        </div>
                        <div className={bem(bem.element('review-row', {opened: this.state.reviewIsOpened}), 'row')}>
                            <div className={bem(bem.element('review-limited'))}>
                                {reviews.map(review => (
                                    <div
                                        className={bem.element('review-col')}
                                        key={review.id}
                                    >
                                        <div
                                            className={bem(bem.element('review-img-wrap'), 'd-flex', 'align-items-center', 'justify-content-center')}
                                            onClick={() => this.props.dispatch(openModal(ZoomModal, {url: review.originalUrl}))}
                                        >
                                            <img
                                                src={review.thumbnailUrl}
                                                alt={review.title}
                                                className={bem.element('review-img')}
                                            />
                                            <div className={bem.element('review-hover')}>
                                                <Icon className={bem.element('review-hover-icon')} name={'search'} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className={bem.element('clients')}>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className={'col'}>
                                <h2 className={bem.element('heading')}>
                                    {__('Клиенты')}
                                </h2>
                            </div>
                        </div>
                        <div className={bem(bem.element('clients-row'), 'row')}>
                            <div className={bem.element('clients-limited')}>
                                {clients.map(client => (
                                    <div
                                        className={bem.element('client-img-wrap')}
                                        key={client.id}
                                    >
                                        <img
                                            src={client.thumbnailUrl}
                                            alt={client.title}
                                            title={client.title}
                                            className={bem.element('client-img')}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}
