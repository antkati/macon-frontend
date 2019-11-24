import React from 'react';
import {html} from 'components';
import Slider from 'react-slick';
import ArticleSliderArrow from './views/ArticleSliderArrow';
import ImagesGallerySchema from '../../types/ImagesGallerySchema';
import {connect} from 'react-redux';
import './ArticleSlider.scss';
import {openModal} from 'yii-steroids/actions/modal';
import ZoomModal from '../../modals/ZoomModal';

const bem = html.bem('ArticleSlider');

@connect()
export default class ArticleSlider extends React.PureComponent {
    static propTypes = {
        images: ImagesGallerySchema
    };

    render() {
        const { images } = this.props;

        return (
            <div className={bem.block()}>
                <Slider
                    customPaging={(i) => (
                        <a>
                            <img className={bem.element('img-preview')} src={images[i].thumbnail} />
                        </a>
                    )}
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    dotsClass={'slick-thumb'}
                    prevArrow={(
                        <ArticleSliderArrow direction='left'/>
                    )}
                    nextArrow={(
                        <ArticleSliderArrow direction='right'/>
                    )}
                >
                    {images.map((image, index) => (
                        <div key={index} className={bem.element('slide')}>
                            <img
                                className={bem.element('img')}
                                src={image.src}
                                onClick={() => this.props.dispatch(openModal(ZoomModal, {url: image.src}))}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        )
    }
}
