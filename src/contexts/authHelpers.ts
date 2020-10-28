import {AuthUser} from './authContext.types';
import axios from 'axios';

export function clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}

export function setLocalStorage(username: string, token: string) {
    console.log(`Writing token ${token} to local storage`);
    localStorage.setItem('username', username);
    localStorage.setItem('jwtAuthToken', token);
}

// reads user data from local storage and sets axios auth header to retrieved token
export function readLocalStorage(): AuthUser {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('jwtAuthToken');

    if (username && token) {
        setAxiosAuth(token);
        return {
            isAuth: true,
            username: username,
            error: '',
        };
    }
    return {
        isAuth: false,
        username: '',
        error: '',
    };
}

export function setAxiosAuth(token: string) {
    axios.defaults.headers.common['AuthorizationJwt'] = `Bearer ${token}`;
}

export function clearAxiosAuth() {
    delete axios.defaults.headers.common['AuthorizationJwt']; // todo make sure this is how it's supposed to be done
}
