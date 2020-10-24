import {useEffect, useState} from 'react';
import {AuthParameters} from '../api/authAPI.types';
import {/*todo: getAuth,*/ mockGetAuth} from '../api/authAPI';
import {AuthUser} from '../contexts/authContext.types';

export function useAuthAPI(): [AuthUser | null, (params: AuthParameters) => void, boolean] {
    const [isFetching, setFetching] = useState(false);
    const [data, setData] = useState<AuthUser | null>(null);
    const [params, setParams] = useState<AuthParameters | null>(null);

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
                    setData(user);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [params]);

    //
    const fetchData = (parameters: AuthParameters) => {
        setParams(parameters);
    };

    return [data, fetchData, isFetching];
}
