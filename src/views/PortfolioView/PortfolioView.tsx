import {Box, Container, Fab, FormControl, Grid, MenuItem, Select, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {css} from 'emotion';
import React from 'react';
import {InvestmentResults} from '../../components/InvestmentResults/InvestmentResults';
import {Separator} from '../../components/Separator/Separator';
import {usePortfoliosAPI} from '../../hooks/usePortfoliosAPI';
import {InvestmentItem} from './InvestmentItem';
import {InvestmentsTitleBox, TopBox} from './PortfolioView.styles';

export const PortfolioView: React.FC = () => {
    // TODO fetching indicator
    // eslint-disable-next-line
    const [portfolios, isFetching, fetchPortfolio, details, isFetchingDetails] = usePortfoliosAPI();

    const handlePortfolioAdd = () => {};
    const handleInvestmentAdd = () => {};

    const handleSelectChange = (event: React.ChangeEvent<{value: unknown}>) => fetchPortfolio(event.target.value as number);

    return (
        <Container maxWidth="sm">
            <Box className={TopBox}>
                <FormControl variant="outlined">
                    <Select value={details.id} onChange={handleSelectChange}>
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
                totalChangePercent={details.rateOfReturnPercentage}
                totalChange={details.rateOfReturnValue}
                totalRiskPercentage={0}
                predictedChange={details.totalInvestedCash + details.rateOfReturnValue}
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
                        id={investment.id}
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
