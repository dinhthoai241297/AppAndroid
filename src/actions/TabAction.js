import * as actionTypes from '../actionTypes/TabActionTypes';

export const changeMainTab = tab => {
    return {
        type: actionTypes.CHANGE_MAIN_TAB,
        tab
    }
}