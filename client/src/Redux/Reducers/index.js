import {combineReducers} from 'redux';
import {accountreducer} from '../Reducers/account.js'
const reducers=combineReducers({
    user:accountreducer,
});
export default reducers;