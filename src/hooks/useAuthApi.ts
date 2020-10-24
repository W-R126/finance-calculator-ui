import {useEffect, useState} from 'react';
import {AuthParameters} from '../api/authAPI.types';
import {getAuth /* mockGetAuth*/} from '../api/authAPI';
import {AuthUser} from '../contexts/authContext.types';
import {useAuthDispatch} from '../contexts/authContext';
import {loginError, loginSuccess} from '../contexts/authAction.types';
import {clearLocalStorage, setLocalStorage} from '../contexts/authHelpers';

export function useAuthAPI(): [(params: AuthParameters) => void, boolean] {
    const [isFetching, setFetching] = useState(false);
    const [params, setParams] = useState<AuthParameters | null>(null);
    const authDispatch = useAuthDispatch();

    useEffect(() => {
        if (params) {
            setFetching(true);
            getAuth(params)
                .then(token => {
                    const user: AuthUser = {
                        isAuth: true,
                        username: params.data.username,
                        error: '',
                    };
                    setLocalStorage(params.data.username, token.token);
                    authDispatch(loginSuccess(user));
                })
                .catch(error => {
                    const user: AuthUser = {
                        isAuth: false,
                        username: '',
                        error: error.error,
                    };
                    clearLocalStorage();
                    authDispatch(loginError(user));
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [params, authDispatch]);

    const fetchData = (parameters: AuthParameters) => {
        setParams(parameters);
    };

    return [fetchData, isFetching];
}
