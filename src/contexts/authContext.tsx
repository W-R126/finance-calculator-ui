import React, {useReducer} from 'react';
import {AuthUser} from './authContext.types';
import {authReducer} from './authReducer';
import {AuthAction} from './authAction.types';
import {readLocalStorage} from './authHelpers';
const AuthStateContext = React.createContext<AuthUser | undefined>(undefined);
const AuthDispatchContext = React.createContext<any>(undefined);

// hook for user info context
export const useUserState = (): AuthUser => {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuthState must be used within AuthProvider');
    }
    return context;
};

// hook for modifying user info context
export const useAuthDispatch = (): React.Dispatch<AuthAction> => {
    const context = React.useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within AuthProvider');
    }
    return context;
};

// Provider, connecting state and dispatcher
export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [user, dispatch] = useReducer(authReducer, readLocalStorage());
    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};
