import Enum from 'yii-steroids/base/Enum';

export default class UserRole extends Enum {

    static GUEST = null;
    static USER = 'user';
    static ADMIN = 'admin';

    static getKeys() {
        return [
            this.GUEST,
            this.USER,
            this.ADMIN,
        ];
    }

}
