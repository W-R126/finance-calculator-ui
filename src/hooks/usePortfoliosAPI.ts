import {useEffect, useState} from 'react';
import {Portfolio, PortfolioDetails} from '../api/portfoliosAPI.types';
import {deletePortfolio, getPortfolioDetails, getPortfolios} from '../api/portfoliosAPI';

export function usePortfoliosAPI() {
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

    const deleteCurrentPortfolio = () => {
        setFetchingPortfolios(true);
        setFetchingDetails(true);
        deletePortfolio(portfolio.id).then(success => {
            getPortfolios()
                .then(portfolios => setPortfolios(portfolios))
                .finally(() => {
                    setFetchingPortfolios(false);
                });
            getPortfolioDetails(0)
                .then(details => {
                    details.id = 0;
                    details.rateOfReturnPercentage = details.rateOfReturnPercentage ?? 0;
                    setPortfolio(details);
                })
                .finally(() => setFetchingDetails(false));
        });
    };

    return {
        portfolios,
        isFetchingPortfolios,
        fetchPortfolio,
        deleteCurrentPortfolio,
        portfolio,
        isFetchingDetails,
    };
}
