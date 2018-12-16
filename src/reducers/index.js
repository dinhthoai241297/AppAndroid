import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import ProjectReducer from './ProjectReducer';
import TabReducer from './TabReducer';

const root = combineReducers({
    UserReducer,
    ProjectReducer,
    TabReducer
});

export default root;
