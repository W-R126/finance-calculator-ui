import {useHistory, useLocation} from 'react-router';
import {useEffect, useState} from 'react';
import {InvestmentParameters, InvestmentResults} from '../../api/investments/investmentsAPI.types';
import {calculateInvestment, getInvestment} from '../../api/investments/investmentsAPI';
import {defaultParameters} from './useInvestments.constants';
import {convertResultsToParameters} from '../../api/investments/investmentsAPI.helpers';
import {loginError} from '../../contexts/authAction.types';
import {authFailed} from '../../contexts/authHelpers';
import {useAuthDispatch} from '../../contexts/authContext';
import {Routes} from '../../helpers/routes';

export function useInvestments() {
    const location = useLocation();
    const authDispatch = useAuthDispatch();
    const history = useHistory();

    const urlParameters = new URLSearchParams(location.search);
    const investmentId = urlParameters.get('investmentId') as number | null;

    const [isFetching, setFetching] = useState(false);
    const [parameters, setParameters] = useState<InvestmentParameters>(defaultParameters);
    const [results, setResults] = useState<InvestmentResults | null>(null);

    const updateResults = (data: InvestmentResults) => {
        data.id = data.id ?? results?.id ?? 0;
        data.name = data.name ?? results?.name ?? '';
        data.category = data.category ?? results?.category ?? '';
        data.risk = data.risk ?? results?.risk ?? 0.5;

        setResults(data);

        const params = convertResultsToParameters(data);
        setParameters(params);
    };

    useEffect(() => {
        if (investmentId !== null) {
            setFetching(true);
            getInvestment(investmentId)
                .then(updateResults)
                .catch(error => {
                    const status = error.response.status;
                    if (status === 403) {
                        authDispatch(loginError(authFailed(status)));
                        history.push(Routes.LOGIN);
                    }
                })
                .finally(() => setFetching(false));
        } else {
            recalculate(parameters);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const recalculate = (params: InvestmentParameters) => {
        if (!isFetching) {
            setFetching(true);
            calculateInvestment(params)
                .then(updateResults)
                .finally(() => setFetching(false));
        }
    };

    return {parameters, setParameters, results, recalculate, isFetching, investmentId};
}
