import * as actions from '../actionTypes/TabActionTypes';

const intitState = {
    mainTab: 'project'
}

const TabReducer = (state = intitState, action) => {
    switch (action.type) {
        case actions.CHANGE_MAIN_TAB: {
            return {
                ...state,
                mainTab: action.tab
            }
        }
        default: {
            return { ...state };
        }
    }
}

export default TabReducer;