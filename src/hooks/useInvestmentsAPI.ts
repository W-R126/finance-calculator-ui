import {useEffect, useState} from 'react';
import {getInvestmentCalculation} from '../api/investmentsAPI';
import {InvestmentParameters, InvestmentResultTypes} from '../api/investmentsAPI.types';

export function useInvestmentsAPI(): [InvestmentResultTypes | null, (params: InvestmentParameters) => void, boolean] {
    const [isFetching, setFetching] = useState(false);
    const [data, setData] = useState<InvestmentResultTypes | null>(null);
    const [params, setParams] = useState<InvestmentParameters | null>(null);

    useEffect(() => {
        if (params) {
            setFetching(true);
            getInvestmentCalculation(params)
                .then(values => {
                    setData(values);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [params]);

    const fetchData = (parameters: InvestmentParameters) => {
        setParams(parameters);
    };

    return [data, fetchData, isFetching];
}
