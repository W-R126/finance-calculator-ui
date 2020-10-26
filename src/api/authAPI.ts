import axios from 'axios';
import {AuthAction, AuthParameters, AuthResultTypes} from './authAPI.types';
import {setAxiosAuth} from '../contexts/authHelpers';

// Send sign in request, set axios headers with jwt token, return token
export function getAuth(params: AuthParameters): Promise<AuthResultTypes> {
    return axios({
        method: 'post',
        url: 'api/users/' + params.action,
        data: params.data,
        //set axios header to the returned data (JWT object) and return the passed username and
        // set isAuth to true
    })
        .then(response => {
            setAxiosAuth(response.data);
            return response.data;
        })
        .catch(error => {
            //console.log(error);
            throw Error(error);
        });
}

// todo everything below is temporary for tests
export function mockGetAuth(params: AuthParameters): Promise<AuthResultTypes> {
    return new Promise<AuthResultTypes>((resolve, reject) => {
        switch (params.action) {
            case AuthAction.SIGN_IN:
                if (params.data.username === mockUser.username && params.data.password === mockUser.password) {
                    resolve({token: 'JWT'});
                } else {
                    reject({
                        error: 'Invalid username or password',
                    });
                }
                break;
            case AuthAction.SIGN_UP:
                if (!userIn(params.data)) {
                    mockUsers.push(params.data);
                    resolve({token: 'JWT'});
                } else {
                    console.log('already in use');
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
