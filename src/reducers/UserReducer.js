import * as actions from '../actionTypes/UserActionTypes';

const intitState = {
    user: undefined,
    token: undefined
}

const UserReducer = (state = intitState, action) => {
    switch (action.type) {
        case actions.LOGIN: {
            return {
                ...state,
                user: action.data.user,
                token: action.data.token
            }
        }
        case actions.UPDATE_PASSWORD: {
            return {
                ...state,
                user: action.data.user,
                token: action.data.token
            }
        }
        case actions.UPDATE: {
            return {
                ...state,
                user: action.data.user
            }
        }
        case actions.LOGOUT: {
            return {
                ...state,
                user: undefined,
                token: undefined
            }
        }
        default: {
            return { ...state };
        }
    }
}

export default UserReducer;