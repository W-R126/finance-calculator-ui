import {AuthUser} from './authContext.types';

// types of actions allowed
export enum AuthActionTypes {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
    LOGOUT = 'LOG_OUT',
}

// action object type
export type AuthAction = {
    type: AuthActionTypes;
    payload: AuthUser;
    error?: string;
};

// actions generators

export const loginSuccess = (authUser: AuthUser) => {
    return {
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: authUser,
    };
};

export const loginError = (authUser: AuthUser) => {
    return {
        type: AuthActionTypes.LOGIN_ERROR,
        payload: authUser,
    };
};

export const logOut = () => {
    return {
        type: AuthActionTypes.LOGOUT,
        payload: {
            isAuth: false,
            username: '',
            error: '',
        },
    };
};
