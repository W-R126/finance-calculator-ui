import {Box, Container} from '@material-ui/core';
import React, {useState} from 'react';
import {InvestmentResults} from '../../components/InvestmentResults/InvestmentResults';
import {Separator} from '../../components/Separator/Separator';
import {usePortfoliosAPI} from '../../hooks/usePortfoliosAPI';
import {submitPortfolio} from './PortfolioView.helpes';
import {Routes} from '../../helpers/routes';
import {useHistory, useLocation} from 'react-router';
import {AddPortfolioDialog} from './PortfolioViewDialog';
import {PortfolioViewControls} from './PortfolioViewControls';
import {InvestmentsList} from './InvestmentsList/InvestmentsList';
import {InvestmentChart} from '../../components/InvestmentChart/InvestmentChart';
import {DataGraph} from '../../components/InvestmentChart/InvestmentChart.types';

export const PortfolioView: React.FC = () => {
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const portfolioId = query.get('portfolioId') as number | null;

    const {portfolios, deleteCurrentPortfolio, portfolio, deleteInvestment, fetchPortfolio} = usePortfoliosAPI(portfolioId);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [portfolioName, setPortfolioName] = useState('');

    const handlePortfolioAdd = () => setDialogOpen(true);

    const handleDeleteInvestment = (id: number) => deleteInvestment(id);

    const handleDialogClose = () => setDialogOpen(false);

    const handleDialogAdd = () => {
        submitPortfolio(portfolioName).then(portfolioId => {
            setDialogOpen(false);
            fetchPortfolio(portfolioId as number);
            history.push(`${Routes.PORTFOLIOS}?portfolioId=${portfolioId}`);
            window.location.reload();
        });
    };

    const isGraphComplete = portfolio.investments.length > 0;

    return (
        <Container maxWidth="sm">
            <AddPortfolioDialog
                dialogOpen={dialogOpen}
                setPortfolioName={setPortfolioName}
                portfolioName={portfolioName}
                handleDialogClose={handleDialogClose}
                handleDialogAdd={handleDialogAdd}
            />

            <PortfolioViewControls
                portfolio={portfolio}
                portfolios={portfolios}
                deleteCurrentPortfolio={deleteCurrentPortfolio}
                fetchPortfolio={fetchPortfolio}
                handlePortfolioAdd={handlePortfolioAdd}
            />

            {isGraphComplete && (
                <Box display={'flex'} justifyContent={'center'}>
                    <InvestmentChart graph={(portfolio as unknown) as DataGraph} />
                </Box>
            )}

            <Separator text="Results" />
            <InvestmentResults
                totalChangePercent={portfolio.rateOfReturnPercentage}
                totalChange={portfolio.rateOfReturnValue}
                totalRiskPercentage={-1}
                predictedChange={portfolio.totalInvestedCash + portfolio.rateOfReturnValue}
            />

            <InvestmentsList portfolio={portfolio} onDelete={handleDeleteInvestment} investments={portfolio.investments} />
        </Container>
    );
};
