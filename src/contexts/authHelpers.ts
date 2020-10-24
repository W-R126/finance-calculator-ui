import {AuthUser} from './authContext.types';
import axios from 'axios';

export function clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}

export function setLocalStorage(username: string, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
}

// reads user data from local storage and sets axios auth header to retrieved token
export function readLocalStorage(): AuthUser {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
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
    //todo  axios.defaults.headers.common['Authorization'] = token;
}

export function clearAxiosAuth() {
    //todo delete axios.defaults.headers.common['Authorization']; // todo make sure this is how it's supposed to be done
}
