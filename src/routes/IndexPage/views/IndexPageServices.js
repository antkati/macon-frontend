import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getNavItems} from 'yii-steroids/reducers/navigation';
import Slider from 'react-slick';
import Button from 'yii-steroids/ui/form/Button';

import {html} from 'components';
import {ROUTE_SERVICES} from 'routes/index';
import IndexSliderArrow from './IndexSliderArrow';

import './IndexPageServices.scss';

const bem = html.bem('IndexPageServices');

@connect(
    state => ({
        navItems: getNavItems(state, ROUTE_SERVICES),
    })
)
export default class IndexPageServices extends React.PureComponent {

    static propTypes = {
        navItems: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
        }))
    };

    render() {
        return (
            <section className={bem.block()}>
                <Slider
                    dots={false}
                    infinite={true}
                    speed={500}
                    slidesToShow={4}
                    slidesToScroll={2}
                    swipe
                    swipeToSlide
                    responsive={[
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 1450,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        }
                    ]}
                    prevArrow={(
                        <IndexSliderArrow direction='left'/>
                    )}
                    nextArrow={(
                        <IndexSliderArrow direction='right'/>
                    )}
                >
                    {this.props.navItems.map(item => (
                        <div key={item.id} className={bem.element('slide')}>
                            <div className={bem.element('slide-body')}>
                                <div className={bem.element('slide-text')}>
                                    <h4 className={bem.element('slide-title')}>
                                        {item.title}
                                    </h4>
                                    <div className={bem.element('slide-description')}>
                                        {item.description}
                                    </div>
                                </div>
                                <Button
                                    className={bem.element('slide-btn')}
                                    color='primary'
                                    toRoute={item.id}
                                >
                                    {__('Подробнее')}
                                </Button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
        );
    }
}
