import {AuthUser} from './authContext.types';

// types of actions allowed todo
export enum AuthActionTypes {
    // REQUEST_LOGIN = "REQUEST_LOGIN",
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    // LOGOUT,
    // LOGIN_ERROR
}

// action object type
export type AuthAction = {
    type: AuthActionTypes;
    payload: AuthUser;
    error?: string;
};

export const loginSuccess = (authUser: AuthUser) => {
    return {
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: authUser,
    };
};
