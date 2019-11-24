import React from 'react';
import Link from 'yii-steroids/ui/nav/Link';
import {html} from 'components';
import Icon from 'shared/Icon';
import './IndexPageHeader.scss';
import IndexHeader from 'shared/IndexHeader';
import Slider from 'react-slick';
import IndexSliderArrow from './IndexSliderArrow';
const bem = html.bem('IndexPageHeader');
import {openModal} from 'yii-steroids/actions/modal';
import {connect} from 'react-redux';
import FeedbackModal from 'modals/FeedbackModal';

@connect()
export default class IndexPageHeader extends React.PureComponent {

    static propTypes = {
    };


    render() {
        const arrowIcon = (
            <Icon
                name='arrow'
                className={bem.element('arrow')}
            />
        );

        return (
            <header className={bem.block()}>
                <IndexHeader />
                <div className={bem(bem.element('title'))}>
                    <div className={bem('container-fluid')}>
                        <div className={bem.element('content')}>
                            <Slider
                                dots={false}
                                infinite={true}
                                autoplay
                                autoplaySpeed={5000}
                                slidesToShow={1}
                                slidesToScroll={1}
                                fade
                                arrows={false}
                                pauseOnHover={false}
                                swipeToSlide={false}
                                swipe={false}
                            >
                                <div>
                                    <h1 className={bem.element('heading')}>
                                        {__('Мы – лидеры в области')}
                                        <br/>
                                        {__('стратегического консалтинга')}
                                    </h1>
                                    <p className={bem.element('subtitle')}>
                                        {__('Оценка инвестиционных проектов и разработка концепций –')}
                                        <br/>
                                        {__('гарантия успешной реализации')}
                                    </p>
                                </div>
                                <div>
                                    <h1 className={bem.element('heading')}>
                                        {__('Более 13 лет опыта аналитики')}
                                        <br/>
                                        {__('рынка недвижимости')}
                                    </h1>
                                    <p className={bem.element('subtitle')}>
                                        {__('Проводим прогнозирование развития рынка в России')}
                                        <br/>
                                        {__('на ежеквартальной основе')}
                                    </p>
                                </div>
                                <div>
                                    <h1 className={bem.element('heading')}>
                                        {__('Крупнейшая команда аналитиков')}
                                    </h1>
                                    <p className={bem.element('subtitle')}>
                                        {__('Мы проводим всю экспертизу в рамках своей команды')}
                                        <br/>
                                        {__('и прибегаем к услугам сторонних компаний')}
                                    </p>
                                </div>
                            </Slider>
                            <div className={bem.element('feedback')}>
                                <Link
                                    color='secondary'
                                    label={__('Напишите нам')}
                                    className={bem.element('link')}
                                    onClick={() => this.props.dispatch(openModal(FeedbackModal))}
                                    icon={arrowIcon}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
