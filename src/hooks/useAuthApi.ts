import {useEffect, useState} from 'react';
import {AuthParameters} from '../api/authAPI.types';
import {/*todo: getAuth,*/ mockGetAuth} from '../api/authAPI';
import {AuthUser} from '../contexts/authContext.types';
import {useAuthDispatch} from '../contexts/authContext';
import {loginSuccess} from '../contexts/authAction.types';

export function useAuthAPI(): [(params: AuthParameters) => void, boolean] {
    const [isFetching, setFetching] = useState(false);
    // const [data, setData] = useState<AuthUser | null>(null);
    const [params, setParams] = useState<AuthParameters | null>(null);
    const authDispatch = useAuthDispatch();

    useEffect(() => {
        if (params) {
            setFetching(true);
            mockGetAuth(params)
                .then(token => {
                    localStorage.setItem('token', token.token);
                    const user: AuthUser = {
                        isAuth: true,
                        username: params.username,
                    };
                    localStorage.setItem('username', params.username);
                    authDispatch(loginSuccess(user));
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [params, authDispatch]);

    //
    const fetchData = (parameters: AuthParameters) => {
        setParams(parameters);
    };

    return [fetchData, isFetching];
}
