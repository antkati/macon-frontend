import Enum from 'yii-steroids/base/Enum';
import {
    ROUTE_COMPANY_NEWS_ITEM,
    ROUTE_PROJECTS_ITEM,
    ROUTE_PUBLICATIONS_ALL_ITEM,
    ROUTE_PUBLICATIONS_CATEGORY_ITEM_PREFIX,
    ROUTE_PUBLICATIONS_ITEM,
    ROUTE_COMPANY_MEDIA_ITEM
} from 'routes';

export default class ArticleCategory extends Enum {

    static NEWS = 'news';
    static PROJECT = 'project';
    static SERVICE = 'service';
    static CLIENT = 'client';
    static REVIEW = 'review';
    static PARTNER = 'partner';
    static PUBLICATION = 'publication';
    static MEDIA = 'media';

    static getKeys() {
        return [
            this.NEWS,
            this.PROJECT,
            this.SERVICE,
            this.CLIENT,
            this.REVIEW,
            this.PARTNER,
            this.PUBLICATION,
            this.MEDIA
        ];
    }

    static getLabels() {
        return {
            [this.NEWS]: __('Новости'),
            [this.PROJECT]: __('Проекты'),
            [this.SERVICE]: __('Услуги'),
            [this.CLIENT]: __('Клиенты и партнеры'),
            [this.REVIEW]: __('Отзывы'),
            [this.PARTNER]: __('Партнеры'),
            [this.PUBLICATION]: __('Публикации'),
            [this.MEDIA]: __('Публикации о нас'),
        };
    }

    static getPageTitle(category) {
        const map = {
            ...this.getLabels(),
            [this.NEWS]: __('Новости за'),
            [this.PUBLICATION]: __('Публикации за'),
            [this.MEDIA]: __('Публикации о нас за'),
        };
        return map[category] || '';
    }

    static getItemRouteId(category) {
        const map = {
            [this.NEWS]: ROUTE_COMPANY_NEWS_ITEM,
            [this.PROJECT]: ROUTE_PROJECTS_ITEM,
            [this.PUBLICATION]: ROUTE_PUBLICATIONS_ITEM,
            [this.MEDIA]: ROUTE_COMPANY_MEDIA_ITEM
        };
        return map[category];
    }
}
