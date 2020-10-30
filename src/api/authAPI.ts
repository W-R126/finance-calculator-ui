import axios from 'axios';
import {AuthAction, AuthParameters} from './authAPI.types';
import {setAxiosAuth} from '../contexts/authHelpers';

// Send sign in request, set axios headers with jwt token, return token
export function getAuth(params: AuthParameters): Promise<string> {
    return axios({
        method: 'post',
        url: 'api/users/' + params.action,
        data: params.data,
        //set axios header to the returned data (JWT object) and return the passed username and
        // set isAuth to true
    }).then(response => {
        setAxiosAuth(response.data);
        return response.data;
    });
}

export function mockGetAuth(params: AuthParameters): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        switch (params.action) {
            case AuthAction.SIGN_IN:
                if (params.data.username === mockUser.username && params.data.password === mockUser.password) {
                    resolve('JWT');
                } else {
                    reject({
                        error: 'Invalid username or password',
                    });
                }
                break;
            case AuthAction.SIGN_UP:
                if (!userIn(params.data)) {
                    mockUsers.push(params.data);
                    resolve('JWT');
                } else {
                    reject({
                        error: 'Username: "' + params.data.username + '" already exists',
                    });
                }
        }
    });
}

const mockUser = {
    password: 'pass',
    username: 'John',
};

let mockUsers = [
    {
        password: 'pass',
        username: 'name',
    },
    {
        password: 'pass',
        username: 'John',
    },
];

function userIn(data: any) {
    for (let user of mockUsers) {
        if (data.username === user.username) {
            return true;
        }
    }
    return false;
}
