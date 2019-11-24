import Enum from 'yii-steroids/base/Enum';

export default class TagCategory extends Enum {

    static CITY = 'city';
    static REALTY = 'realty';
    static PUBLICATION = 'publication';

    static getKeys() {
        return [
            this.CITY,
            this.REALTY,
            this.PUBLICATION,
        ];
    }

}
