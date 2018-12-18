import { HOST } from '../contants/index';

class UserApi {
    static login(data) {
        console.log('data', data);
        return fetch(`${HOST}user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static register(data) {
        console.log('data', data);
        return fetch(`${HOST}user/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static loginToken(data) {
        return fetch(`${HOST}user/logintoken`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static logout(data) {
        return fetch(`${HOST}user/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static update(data) {
        return fetch(`${HOST}user/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static updatePassowrd(data) {
        return fetch(`${HOST}user/updatepassword`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static getList(data) {
        return fetch(`${HOST}user/getlist`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }
}

export default UserApi;