import {useEffect, useState} from 'react';
import {Portfolio, PortfolioDetails} from '../api/portfoliosAPI.types';
import {getPortfolioDetails, getPortfolios} from '../api/portfoliosAPI';

export function usePortfoliosAPI(): [Portfolio[], boolean, (id: number) => void, PortfolioDetails, boolean] {
    const [isFetchingPortfolios, setFetchingPortfolios] = useState(false);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

    const [isFetchingDetails, setFetchingDetails] = useState(false);
    const [portfolio, setPortfolio] = useState<PortfolioDetails>({
        id: 0,
        investments: [],
        name: 'All Investments',
        graphPointsValue: [],
        rateOfReturnPercentage: 0,
        rateOfReturnValue: 0,
        totalInvestedCash: 0,
    });

    useEffect(() => {
        if (!isFetchingPortfolios && portfolios.length === 0) {
            setFetchingPortfolios(true);
            getPortfolios()
                .then(portfolios => {
                    setPortfolios(portfolios);
                    console.log(portfolios);
                })
                .finally(() => {
                    setFetchingPortfolios(false);
                });
        }
    }, [isFetchingPortfolios, portfolios]);

    const fetchPortfolio = (id: number) => {
        if (!isFetchingDetails) {
            setFetchingDetails(true);
            getPortfolioDetails(id)
                .then(details => setPortfolio(details))
                .finally(() => setFetchingDetails(false));
        }
    };

    return [portfolios, isFetchingPortfolios, fetchPortfolio, portfolio, isFetchingDetails];
}
