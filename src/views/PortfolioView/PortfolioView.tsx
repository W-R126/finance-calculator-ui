import {Box, Container, Fab, FormControl, Grid, MenuItem, Select, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {css} from 'emotion';
import React from 'react';
import {InvestmentResults} from '../../components/InvestmentResults/InvestmentResults';
import {Separator} from '../../components/Separator/Separator';
import {usePortfoliosAPI} from '../../hooks/usePortfoliosAPI';
import {InvestmentItem} from './InvestmentItem';
import {InvestmentsTitleBox, TopBox} from './PortfolioView.styles';

const mockedInvestmentResultsParams = {
    totalChangePercent: 0.13,
    totalChange: 245,
    totalRisk: 13,
    predictedChange: 2500,
};

export const PortfolioView: React.FC = () => {
    //TODO fetching indicator
    // eslint-disable-next-line
    const [portfolios, isFetching, fetchPortfolio, details, isFetchingDetails] = usePortfoliosAPI();
    // //

    //const [investmentsFilter, setInvestmentsFilter] = useState(filterOptions[0]);

    const {totalChangePercent, totalChange, totalRisk, predictedChange} = mockedInvestmentResultsParams;

    const handlePortfolioAdd = () => {};
    const handleInvestmentAdd = () => {};

    const handleSelectChange = (event: React.ChangeEvent<{value: unknown}>) => {
        fetchPortfolio(event.target.value as number);
    };

    return (
        <Container maxWidth="sm">
            <Box className={TopBox}>
                <FormControl variant="outlined">
                    <Select value={0} onChange={handleSelectChange}>
                        <MenuItem key={0} value={0}>
                            All Investments
                        </MenuItem>
                        {portfolios.map(portfolio => (
                            <MenuItem key={portfolio.id} value={portfolio.id}>
                                {portfolio.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Fab size="medium" variant="extended" color="primary" onClick={handlePortfolioAdd}>
                    <AddIcon />
                    Portfolio
                </Fab>
            </Box>

            <Separator text="Results" />
            <InvestmentResults
                totalChangePercent={totalChangePercent}
                totalChange={totalChange}
                totalRiskPercentage={totalRisk}
                predictedChange={predictedChange}
            />
            <Box className={InvestmentsTitleBox}>
                <Separator text="Investments" />
                <Fab size="small" color="primary" aria-label="add" onClick={handleInvestmentAdd}>
                    <AddIcon />
                </Fab>
            </Box>

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                    <Typography color="primary" variant="caption">
                        NAME
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography
                        className={css`
                            padding-left: 16px;
                        `}
                        color="primary"
                        variant="caption"
                    >
                        RISK
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography color="primary" variant="caption">
                        CHANGE
                    </Typography>
                </Grid>
            </Grid>

            <Box>
                {details.investments.map(investment => (
                    <InvestmentItem
                        key={investment.name}
                        name={investment.name}
                        riskPercent={investment.risk}
                        changePercent={investment.rateOfReturnPercentage}
                    />
                ))}
            </Box>
        </Container>
    );
};
