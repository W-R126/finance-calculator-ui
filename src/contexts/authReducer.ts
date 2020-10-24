import {AuthUser} from './authContext.types';
import {AuthAction, AuthActionTypes} from './authAction.types';
import {clearAxiosAuth, clearLocalStorage} from './authHelpers';

export const authReducer = (state: AuthUser, action: AuthAction): AuthUser => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS:
            return action.payload;
        case AuthActionTypes.LOGIN_ERROR:
            return action.payload;
        case AuthActionTypes.LOGOUT:
            clearLocalStorage();
            clearAxiosAuth();
            return action.payload;
        default:
            throw new Error(action.type + ' - action not supported');
    }
};
