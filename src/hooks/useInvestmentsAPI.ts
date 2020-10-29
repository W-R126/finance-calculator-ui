import {useEffect, useState} from 'react';
import {getInvestment, getInvestmentCalculation} from '../api/investmentsAPI';
import {InvestmentParameters, InvestmentResultTypes} from '../api/investmentsAPI.types';
import {defaultValues} from './useInvestmentsAPI.constants';

export function useInvestmentsAPI(investmentId: number | null) {
    const [isFetching, setFetching] = useState(false);
    const [parameters, setParameters] = useState(defaultValues);
    const [data, setData] = useState<InvestmentResultTypes | null>(null);

    useEffect(() => {
        setFetching(true);

        if (investmentId) {
            getInvestment(investmentId)
                .then(values => {
                    values.id = values.id ?? data?.id ?? 0;
                    values.category = values.category ?? data?.category;
                    values.risk = values.risk ?? data?.risk ?? 0;

                    setData(values);
                    setParameters({...values, returnOfInvestment: values.rateOfReturnPercentage});
                })
                .finally(() => {
                    setFetching(false);
                });
        } else {
            getInvestmentCalculation(parameters)
                .then(values => {
                    values.id = values.id ?? data?.id ?? 0;
                    values.category = values.category ?? data?.category;
                    values.risk = values.risk ?? data?.risk ?? 0;

                    setData(values);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (parameters && data !== null) {
            setFetching(true);
            getInvestmentCalculation(parameters)
                .then(values => {
                    values.id = values.id ?? data?.id ?? 0;
                    values.category = values.category ?? data?.category;
                    values.risk = values.risk ?? data?.risk ?? 0;

                    setData(values);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parameters]);

    const fetchData = (parameters: InvestmentParameters) => {
        setParameters(parameters);
    };

    return {data, fetchData, isFetching, parameters, setParameters};
}
