import { HOST } from '../contants/index';

class MemberApi {
    static invite(data) {
        return fetch(`${HOST}member/invite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static getListInvite(data) {
        return fetch(`${HOST}member/getlistinvite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static accessInvite(data) {
        return fetch(`${HOST}member/accessinvite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }

    static denyInvite(data) {
        return fetch(`${HOST}member/denyinvite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
    }
}

export default MemberApi;