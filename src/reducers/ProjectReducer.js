import * as actions from '../actionTypes/ProjectActionTypes';

const intitState = {
    projects: [],
    next: false
}

const UserReducer = (state = intitState, action) => {
    switch (action.type) {
        case actions.LOAD_LIST_PROJECT: {
            return {
                projects: action.data.list,
                next: action.data.next
            }
        }
        case actions.LOAD_MORE_LIST_PROJECT: {
            return {
                projects: state.projects.concat(action.data.list),
                next: action.data.next
            }
        }
        default: {
            return { ...state };
        }
    }
}

export default UserReducer;