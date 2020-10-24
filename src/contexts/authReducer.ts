import {AuthUser} from './authContext.types';
import {AuthAction, AuthActionTypes} from './authAction.types';

/*
TODO local storage
 */

export const initialAuthState: AuthUser = {
    isAuth: false,
    username: '',
};

export const authReducer = (state: AuthUser, action: AuthAction): AuthUser => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS:
            return action.payload;
        // case AuthActionTypes.LOGIN_ERROR:
        //     return {
        //         ...state,
        //         isAuth: false,
        //         username: "",
        //         errorMessage: action.error
        //     };
        default:
            throw new Error(action.type + ' - action not supported');
    }
};
