import {useEffect, useState} from 'react';
import {getInvestment, getInvestmentCalculation} from '../api/investmentsAPI';
import {InvestmentParameters, InvestmentResultTypes} from '../api/investmentsAPI.types';

export function useInvestmentsAPI(investmentId: number | null) {
    const [isFetching, setFetching] = useState(false);
    const [data, setData] = useState<InvestmentResultTypes | null>(null);
    const [params, setParams] = useState<InvestmentParameters | null>(null);

    useEffect(() => {
        if (investmentId) {
            setFetching(true);

            getInvestment(investmentId).then(investment => {
                console.log('HELLOW WADDASDasDASDaSD');
                console.log(investment);
                setData(investment);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (params) {
            setFetching(true);
            getInvestmentCalculation(params)
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
    }, [params]);

    const fetchData = (parameters: InvestmentParameters) => {
        setParams(parameters);
    };

    return {data, fetchData, isFetching};
}
