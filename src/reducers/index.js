import {combineReducers} from 'redux';
import * as reducers from 'yii-steroids/reducers';
import contacts from './contacts';

export default asyncReducers => combineReducers({
    contacts,
    ...reducers,
    ...asyncReducers,
});
