import * as actionTypes from '../actionTypes/ProjectActionTypes';
import ProjectApi from '../api/ProjectApi';

export const loadListApi = (key, project, status, page, id) => {
    return dispatch => ProjectApi.getList({ key, project, status, page, id })
        .then(response => response.json())
        .then(res => {
            if (res.code === 200) {
                dispatch(loadListState(res.data));
            }
            return res;
        }).catch(error => {
            console.log(error);
        });
}

export const loadMoreListApi = (key, project, status, page, id) => {
    return dispatch => ProjectApi.getList({ key, project, status, page, id })
        .then(response => response.json())
        .then(res => {
            if (res.code === 200) {
                dispatch(loadMoreListState(res.data));
            }
            return res;
        }).catch(error => {
            console.log(error);
        });
}

export const loadListState = data => {
    return {
        type: actionTypes.LOAD_LIST_PROJECT,
        data
    }
}

export const loadMoreListState = data => {
    return {
        type: actionTypes.LOAD_MORE_LIST_PROJECT,
        data
    }
}