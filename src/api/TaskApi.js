import { HOST } from '../contants/index';

class TaskApi {

    static addTask(data) {
        return fetch(`${HOST}task/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static getList(data) {
        return fetch(`${HOST}task/getlist`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static report(data) {
        return fetch(`${HOST}task/report`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }
}

export default TaskApi;