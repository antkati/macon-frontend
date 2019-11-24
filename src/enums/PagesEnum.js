import Enum from 'yii-steroids/base/Enum';

export default class PagesEnum extends Enum {

    static CAREER = 'career';
    static MEDIA = 'media';
    static PRESS = 'press';

    static getKeys() {
        return [
            this.CAREER,
            this.MEDIA,
            this.PRESS,
        ];
    }

}
