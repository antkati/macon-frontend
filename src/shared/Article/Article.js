import React from 'react';
import {html} from 'components';
import moment from 'moment';
import Link from 'yii-steroids/ui/nav/Link';
import Button from 'yii-steroids/ui/form/Button';
import Icon from 'shared/Icon';
import ArticleSlider from '../../shared/ArticleSlider/ArticleSlider';
import ArticleDetailSchema from '../../types/ArticleDetailSchema';
import './Article.scss';
import NeedAuth from 'shared/Article/views/NeedAuth';
import PropTypes from 'prop-types';
import Recommendations from './views/Recommendations';
import SocialLinks from './views/SocialLinks';
import queryString from "querystring";
import { getNavUrl } from 'yii-steroids/reducers/navigation';
import { ROUTE_SEARCH } from '../../routes';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {closeModal} from 'yii-steroids/actions/modal';
import animateScrollTo from 'animated-scroll-to';
import {initialize, getFormValues} from 'redux-form';

const SEARCH_FORM_ID = 'SearchPage';
const bem = html.bem('Article');

@connect(
    (state) => ({
        searchUrl: getNavUrl(state, ROUTE_SEARCH),
        formValues: getFormValues(SEARCH_FORM_ID)(state),
    })
)
export default class Article extends React.PureComponent {
    static propTypes = {
        article: ArticleDetailSchema,
        modal: PropTypes.bool,
    };

    componentDidUpdate() {
        const overlay = document.querySelector('.ModalView__overlay_forArticle');
        if(!overlay) return;
        if(overlay.scrollTop > 0) {
            animateScrollTo(0, {elementToScroll: overlay});
        }
    }

    handleTagClick(tagName) {
        if(this.props.modal) {
            this.props.dispatch(closeModal());
        }

        if(this.props.formValues) {
            this.props.dispatch(initialize(SEARCH_FORM_ID, {query: tagName, city: null, realty: null}));
        }

        this.props.dispatch(push(this.props.searchUrl + '?' + queryString.stringify({query: tagName})))
    }


    render() {
        const {modal} = this.props;
        const iconPDF = <Icon className={bem.element('pdf-icon')} name={'redpdf'}/>

        return (
            <div className={bem.block(modal ? 'modal' : 'static')}>
                <article className={bem(bem.element('article'))}>
                    <h1 className={bem.element('heading')}>
                        {this.props.article.title}
                    </h1>
                    <div className={bem(bem.element('info'), 'd-flex', 'flex-wrap')}>
                        <div className={bem(bem.element('time'), 'flex-grow-0', 'mr-3')}>
                            <time>
                                {moment(this.props.article.publishTime).format('LLL')}
                            </time>
                        </div>
                        <div className={bem(bem.element('views'), 'flex-grow-0', 'mr-3')}>
                            <span>
                              {__('{count} {count, plural, one{Просмотр} few{Просмотра} many{Просмотров}}', {
                                  count: this.props.article.viewsCount
                              })}
                            </span>
                        </div>
                        <div className={bem('flex-grow-0 overflow-hidden text-break')}>
                            <ul className={bem(bem.element('tags'), 'list-inline', 'd-flex', 'flex-wrap')}>
                                {this.props.article.tags.map((tag, index) => {
                                    const tagName = `#${tag.title}`;

                                    return (
                                        <li
                                            key={index}
                                            className={bem('list-inline-item')}
                                        >
                                            <Link
                                                color='primary'
                                                label={tagName}
                                                className={bem.element('tag-link')}
                                                onClick={() => this.handleTagClick(tagName)}
                                            />
                                        </li>
                                    )}
                                )}
                            </ul>
                        </div>
                    </div>
                    <div
                        className={bem(bem.element('shared'), 'd-flex', 'flex-wrap', 'flex-column', 'flex-sm-row', 'align-items-start', 'align-items-sm-center')}>
                        <SocialLinks
                            {...this.props.article}
                            modal={this.props.modal}
                        />
                        {this.props.article.pdf && (
                            <Button
                                className={bem(bem.element('download-pdf'), 'ml-0', 'ml-sm-3', 'mt-3', 'mt-sm-0')}
                                color={'light'}
                                label={__('Скачать PDF')}
                                icon={iconPDF}
                                url={this.props.article.pdf}
                                disabled={this.props.article.needAuth}
                            />
                        )}
                    </div>
                    <div className={bem.element('body')}>
                        {this.renderText(this.props.article.text)}
                    </div>
                    {this.props.article.imagesGallery && (
                        <div className={bem.element('slider')}>
                            <ArticleSlider images={this.props.article.imagesGallery}/>
                        </div>
                    )}

                    {this.props.article.needAuth && (
                        <NeedAuth
                            path={this.props.location.pathname}
                        />
                    )}
                    <div className={bem.element('recommendations')}>
                        <Recommendations
                            recommendations={this.props.article.recommendations}
                            prevPath={this.props.prevPath}
                        />
                    </div>
                </article>
            </div>
        );
    }

    renderText(text) {
        if (!text) {
            return null;
        }

        const parts = text.split(/<img src="([^"]+)">/).filter(Boolean);
        const result = [];
        let images = [];
        parts.forEach((part, index) => {
            const image = (this.props.article.imagesInline || []).find(image => {
                return image.default.indexOf(part) !== -1;
            });
            if (image) {
                images.push(image);
            } else {
                if (images.length > 0) {
                    result.push(
                        <div className={bem.element('body-slider')}>
                            <ArticleSlider
                                key={index}
                                images={images}
                            />
                        </div>
                    );
                    images = [];
                }
                result.push(
                    <div
                        key={index}
                        dangerouslySetInnerHTML={{__html: part}}
                    />
                );
            }
        });

        return result;
    }

    renderGallery(images) {
        if (images) {
            return (
                <div className={bem.element('slider')}>
                    <ArticleSlider images={images}/>
                </div>
            );
        }
        return null;
    }
}
