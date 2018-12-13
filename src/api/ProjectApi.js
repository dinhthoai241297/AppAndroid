import { HOST } from '../contants/index';

class UserApi {

    static addProject(data) {
        return fetch(`${HOST}project/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static getList(data) {
        return fetch(`${HOST}project/getlist`, {
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