import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import ProjectReducer from './ProjectReducer';

const root = combineReducers({
    UserReducer,
    ProjectReducer
});

export default root;
