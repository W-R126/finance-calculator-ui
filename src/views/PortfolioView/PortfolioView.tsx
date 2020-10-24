import {Box, Container, Fab, FormControl, Grid, MenuItem, Select, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {css} from 'emotion';
import React, {useState} from 'react';
import {InvestmentResults} from '../../components/InvestmentResults/InvestmentResults';
import {Separator} from '../../components/Separator/Separator';
import {InvestmentItem} from './InvestmentItem';
import {InvestmentsTitleBox, TopBox} from './PortfolioView.styles';
import {usePortfoliosAPI} from '../../hooks/usePortfoliosAPI';

const mockedInvestmentResultsParams = {
    totalChangePercent: 0.13,
    totalChange: 245,
    totalRisk: 13,
    predictedChange: 2500,
};

const mockedInvestments = [
    {name: 'Investment 1', changePercent: 0.09, riskPercent: 0.01},
    {name: 'Investment 2', changePercent: 0, riskPercent: 0},
    {name: 'Investment 3', changePercent: 0.3, riskPercent: 12},
    {name: 'Investment 4', changePercent: 43, riskPercent: 12.3},
    {name: 'Investment 5', changePercent: 23, riskPercent: 1.34},
    {name: 'Investment 6', changePercent: 1, riskPercent: 0.34},
    {name: 'Investment 7', changePercent: 3, riskPercent: 12.2},
    {name: 'Investment 8', changePercent: 1, riskPercent: 12.34},
];

const mockedPortfolioFilterOptions = ['All investments', 'Portfolio 1', 'Portfolio 2'];

export const PortfolioView: React.FC = () => {
    // //
    const [portfolios, isFetching] = usePortfoliosAPI();
    // //

    const filterOptions = mockedPortfolioFilterOptions;
    const [investmentsFilter, setInvestmentsFilter] = useState(filterOptions[0]);

    const {totalChangePercent, totalChange, totalRisk, predictedChange} = mockedInvestmentResultsParams;

    const handlePortfolioAdd = () => {};
    const handleInvestmentAdd = () => {};
    const handleSelectChange = (event: React.ChangeEvent<{value: unknown}>) => {
        console.log(event.target.value);
        setInvestmentsFilter(event.target.value as string);
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
                {mockedInvestments.map(({name, changePercent, riskPercent}) => (
                    <InvestmentItem key={name} name={name} riskPercent={riskPercent} changePercent={changePercent} />
                ))}
            </Box>
        </Container>
    );
};
