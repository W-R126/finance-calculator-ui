import axios from 'axios';
import {AuthParameters, AuthResultTypes} from './authAPI.types';

// Send sign in request, set axios headers with jwt token, return token
export function getAuth(params: AuthParameters): Promise<AuthResultTypes> {
    return axios({
        method: 'post',
        url: 'api/users/signin',
        data: params,
        //set axios header to the returned data (JWT object) and return the passed username and
        // set isAuth to true
    }).then(response => {
        axios.defaults.headers.common['Authorization'] = response.data;
        return response.data;
    });
}

// todo temporary for test
export function mockGetAuth(params: AuthParameters): Promise<AuthResultTypes> {
    return new Promise<AuthResultTypes>((resolve, reject) => {
        if (params.username === mockUser.username && params.password === mockUser.password) {
            resolve({token: 'JWT'});
        } else {
            reject({
                error: 'Invalid username or password',
            });
        }
    });
}

const mockUser: AuthParameters = {
    password: 'pass',
    username: 'name',
};
