import {useEffect, useState} from 'react';
import {Portfolio, PortfolioDetails} from '../api/portfoliosAPI.types';
import {getPortfolioDetails, getPortfolios} from '../api/portfoliosAPI';

export function usePortfoliosAPI(): [Portfolio[], boolean, (id: number) => void, PortfolioDetails, boolean] {
    const [isFetchingPortfolios, setFetchingPortfolios] = useState(true);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

    const [isFetchingDetails, setFetchingDetails] = useState(true);
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
        getPortfolios()
            .then(portfolios => setPortfolios(portfolios))
            .finally(() => {
                setFetchingPortfolios(false);
            });
    }, []);

    useEffect(() => {
        getPortfolioDetails(0)
            .then(details => {
                details.id = 0;
                details.rateOfReturnPercentage = details.rateOfReturnPercentage ?? 0;
                setPortfolio(details);
            })
            .finally(() => {
                setFetchingDetails(false);
            });
    }, []);

    const fetchPortfolio = (id: number) => {
        if (!isFetchingDetails) {
            setFetchingDetails(true);
            getPortfolioDetails(id)
                .then(details => {
                    details.id = id;
                    details.rateOfReturnPercentage = details.rateOfReturnPercentage ?? 0;
                    setPortfolio(details);
                })
                .finally(() => setFetchingDetails(false));
        }
    };

    return [portfolios, isFetchingPortfolios, fetchPortfolio, portfolio, isFetchingDetails];
}
