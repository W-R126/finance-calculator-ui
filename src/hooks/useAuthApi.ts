import {useEffect, useState} from 'react';
import {AuthParameters} from '../api/authAPI.types';
import {getAuth} from '../api/authAPI';
import {AuthUser} from '../contexts/authContext.types';
import {useAuthDispatch} from '../contexts/authContext';
import {loginError, loginSuccess} from '../contexts/authAction.types';
import {clearLocalStorage, setLocalStorage} from '../contexts/authHelpers';
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
                    console.log('TOKEN AAAAAAAAA IS');
                    console.log(token);
                    setLocalStorage(params.data.username, token);
                    authDispatch(loginSuccess(user));
                    history.push(Routes.PORTFOLIOS);
                })
                .catch(error => {
                    console.log(error);
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
    }, [params, authDispatch, history]);

    const fetchData = (parameters: AuthParameters) => {
        setParams(parameters);
    };

    return [fetchData, isFetching];
}
