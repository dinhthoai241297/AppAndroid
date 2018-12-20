import { HOST } from '../contants/index';

class ProjectApi {

    static getList(data) {
        return fetch(`${HOST}notification/getlist`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }
}

export default ProjectApi;