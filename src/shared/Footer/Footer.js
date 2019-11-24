import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './Footer.scss';
import {html} from 'components';
import FooterNav from './views/FooterNav';
import FooterSubscribeForm from './views/FooterSubscribeForm';
import FooterContacts from './views/FooterContacts';
import {getNavItems} from 'yii-steroids/reducers/navigation';
import {ROUTE_PUBLICATIONS_CATEGORY, ROUTE_SERVICES} from 'routes';
import {getContacts} from '../../reducers/contacts';
import {getEnumLabels} from 'yii-steroids/reducers/fields';
import TagCategory from 'enums/TagCategory';
import Icon from 'shared/Icon';

const bem = html.bem('Footer');

@connect(
    state => ({
        tags: getEnumLabels(state, 'app.article.models.ArticleTag'),
        serviceNav: getNavItems(state, ROUTE_SERVICES),
        contacts: getContacts(state),
    })
)
export default class Footer extends React.PureComponent {

    static propTypes = {
        tags: PropTypes.array,
        serviceNav: PropTypes.array,
    };

    render() {
        if (!this.props.tags) {
            return null;
        }

        return (
            <footer className={bem.block()}>
                <div className={bem('container-fluid')}>
                    <div className={'row d-flex d-lg-none'}>
                        <div className={bem(bem.element('social'), 'col', 'd-flex', 'justify-content-center', 'py-4')}>
                            <a
                                href='#'
                                className={bem.element('social-link')}
                            >
                                <Icon
                                    name={'instagram'}
                                    className={bem.element('social-icon')}
                                />
                            </a>
                            <a
                                href='#'
                                className={bem.element('social-link')}
                            >
                                <Icon
                                    name={'facebook'}
                                    className={bem.element('social-icon')}
                                />
                            </a>
                            <a
                                href='#'
                                className={bem.element('social-link')}
                            >
                                <Icon
                                    name={'rrs'}
                                    className={bem.element('social-icon')}
                                />
                            </a>
                        </div>
                    </div>
                    <div className={'row'}>
                        <nav className={bem(bem.element('nav'), 'col-lg-3')}>
                            <FooterNav
                                title={__('Обзоры и публикации')}
                                navItems={this.props.tags
                                    .filter(tag => tag.category === TagCategory.PUBLICATION)
                                    .map(tag => ({
                                        id: ROUTE_PUBLICATIONS_CATEGORY,
                                        title: tag.label.replace(/_/g, ' '),
                                        params: {
                                            tagName: tag.name,
                                        },
                                    }))
                                }
                            />
                        </nav>
                        <nav className={bem(bem.element('nav'), 'col-lg-3')}>
                            <FooterNav
                                title={__('Услуги')}
                                navItems={this.props.serviceNav}
                            />
                        </nav>
                        <div className={bem(bem.element('col-info'), 'col-lg-6', 'd-flex', 'flex-column')}>
                            <FooterSubscribeForm />
                            <FooterContacts {...this.props.contacts}/>
                        </div>
                    </div>
                    <div className={bem(bem.element('author'), 'row', 'mt-3','mt-lg-4')}>
                        <div className={bem(bem.element('hr-col'), 'col-12')}>
                            <div className={bem(bem.element('hr'), 'mb-3', 'mb-lg-4')}/>
                        </div>
                        <div className={bem(bem.element('author-col'), 'col')}>
                            {__('МАКОН Консалтинг © Все права защищены, 2006–2019 г.')}
                        </div>
                        <div className={bem(bem.element('development'), 'col', 'text-right', 'd-none', 'd-lg-block')}>
                            {__('Разработано в')}&nbsp;
                            <a
                                href='https://kuzmin.group/'
                                target='_blank'
                            >
                                {__('Kuzmin Group')}
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

        );
    }

}
