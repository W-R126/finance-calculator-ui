import {useEffect, useState} from 'react';
import {AuthParameters} from '../api/authAPI.types';
import {getAuth} from '../api/authAPI';
import {AuthUser} from '../contexts/authContext.types';
import {useAuthDispatch} from '../contexts/authContext';
import {loginError, loginSuccess} from '../contexts/authAction.types';
import {authFailed, clearAxiosAuth, clearLocalStorage, setLocalStorage} from '../contexts/authHelpers';
import {useHistory} from 'react-router';
import {Routes} from '../helpers/routes';

export function useAuthAPI(): [(params: AuthParameters) => void, boolean] {
    const [isFetching, setFetching] = useState(false);
    const [params, setParams] = useState<AuthParameters | null>(null);
    const authDispatch = useAuthDispatch();
    const history = useHistory();
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
                    setLocalStorage(params.data.username, token);
                    authDispatch(loginSuccess(user));
                    history.push(Routes.PORTFOLIOS);
                })
                .catch(error => {
                    authDispatch(loginError(authFailed(error.response.status)));
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [params, authDispatch, history]);

    const fetchData = (parameters: AuthParameters) => {
        setParams(parameters);
    };

    return [fetchData, isFetching];
}
