import {useEffect, useState} from 'react';
import {Portfolio} from '../api/portfoliosAPI.types';
import {getPortfolios} from '../api/portfoliosAPI';

export function usePortfoliosAPI(): [Portfolio[], boolean] {
    const [isFetching, setFetching] = useState(false);

    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

    useEffect(() => {
        if (!isFetching && portfolios.length === 0) {
            setFetching(true);
            getPortfolios()
                .then(portfolios => {
                    setPortfolios(portfolios);
                    console.log(portfolios);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [isFetching, portfolios]);

    return [portfolios, isFetching];
}
