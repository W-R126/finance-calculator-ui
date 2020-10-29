import {Box, Container} from '@material-ui/core';
import React, {useState} from 'react';
import {InvestmentResults} from '../../components/InvestmentResults/InvestmentResults';
import {Separator} from '../../components/Separator/Separator';
import {usePortfoliosAPI} from '../../hooks/usePortfoliosAPI';
import {InvestmentItem} from './InvestmentItem/InvestmentItem';
import {InvestmentsTitleBox} from './PortfolioView.styles';
import {submitPortfolio} from './PortfolioView.helpes';
import {Routes} from '../../helpers/routes';
import {useHistory, useLocation} from 'react-router';
import {AddPortfolioDialog} from './PortfolioViewDialog';
import {InvestmentItemDescription} from './InvestmentItem/InvestmentItemDescription';
import {PortfolioViewControls} from './PortfolioViewControls';
import {InvestmentsList} from './InvestmentsList/InvestmentsList';

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
            // TODO: this is rather temporary solution
            fetchPortfolio(portfolioId as number);
            history.push(`${Routes.PORTFOLIOS}?portfolioId=${portfolioId}`);
            window.location.reload();
        });
    };

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

            <Separator text="Results" />
            <InvestmentResults
                totalChangePercent={portfolio.rateOfReturnPercentage}
                totalChange={portfolio.rateOfReturnValue}
                totalRiskPercentage={-1}
                predictedChange={portfolio.totalInvestedCash + portfolio.rateOfReturnValue}
            />
            <Box className={InvestmentsTitleBox}>
                <Separator text="Investments" />
            </Box>

            <InvestmentItemDescription />

            <Box>
                {portfolio.investments.map(investment => (
                    <InvestmentItem
                        id={investment.id}
                        key={investment.id}
                        name={investment.name}
                        riskPercent={investment.risk}
                        changePercent={investment.rateOfReturnPercentage}
                        onDelete={handleDeleteInvestment}
                    />
                ))}
            </Box>
            <InvestmentsList portfolio={portfolio} />
        </Container>
    );
};
