import Enum from 'yii-steroids/base/Enum';

export default class ProjectType extends Enum {

    static DEVELOPMENT = 'development';
    static CONCEPT = 'concept';
    static RECONCEPTION = 'reconception';
    static BUSINESS_TRAINING = 'business_training';


    static getKeys() {
        return [
            this.DEVELOPMENT,
            this.CONCEPT,
            this.RECONCEPTION,
            this.BUSINESS_TRAINING
        ];
    }

    static getLabels() {
        return {
            [this.DEVELOPMENT]: __('Разработка'),
            [this.CONCEPT]: __('Концепция'),
            [this.RECONCEPTION]: __('Реконцепция'),
            [this.BUSINESS_TRAINING]: __('Бизнес-тренинг'),
        };
    }
}
