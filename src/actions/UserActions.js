import * as actionTypes from '../actionTypes/UserActionTypes';
import UserApi from '../api/UserApi';
import { AsyncStorage } from "react-native"

export const loginApi = (username, password) => {
    return dispatch => UserApi.login({ username, password })
        .then(response => response.json())
        .then(res => {
            if (res.code === 200) {
                dispatch(loginState(res.data));
                try {
                    AsyncStorage.setItem('@token', res.data.token);
                } catch (error) {
                    // Error saving data
                }
            }
            return res;
        }).catch(error => {
            console.log(error);
        });
}

export const loginState = data => {
    return {
        type: actionTypes.LOGIN,
        data
    }
}

export const logoutApi = token => {
    return dispatch => UserApi.logout({ token })
        .then(response => response.json())
        .then(res => {
            if (res.code === 200) {
                dispatch(logoutState());
                try {
                    AsyncStorage.setItem('@token', null);
                } catch (error) {
                    // Error saving data
                }
            }
            return res;
        }).catch(error => {
            console.log(error);
        });
}

export const logoutState = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const updateApi = (user, token) => {
    return dispatch => UserApi.update({ user, token })
        .then(response => response.json())
        .then(res => {
            if (res.code === 200) {
                dispatch(updateState(res.data));
            }
            return res;
        }).catch(error => {
            console.log(error);
        });
}

export const updateState = data => {
    return {
        type: actionTypes.UPDATE,
        data
    }
}

export const updatePasswordApi = (passwordOld, passwordNew, token) => {
    return dispatch => UserApi.updatePassowrd({ passwordOld, passwordNew, token })
        .then(response => response.json())
        .then(res => {
            if (res.code === 200) {
                dispatch(updatePasswordState(res.data));
                try {
                    AsyncStorage.setItem('@token', res.data.token);
                } catch (error) {
                    // Error saving data
                }
            }
            return res;
        }).catch(error => {
            console.log(error);
        });
}

export const updatePasswordState = data => {
    return {
        type: actionTypes.UPDATE_PASSWORD,
        data
    }
}