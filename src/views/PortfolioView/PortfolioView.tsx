import {Box, Container, Fab, FormControl, Grid, MenuItem, Select, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, {useState} from 'react';
import {InvestmentResults} from '../../components/InvestmentResults/InvestmentResults';
import {Separator} from '../../components/Separator/Separator';
import {InvestmentItem} from './InvestmentItem';
import {InvestmentsTitleBox, TopBox} from './PortfolioView.styles';

const mockedInvestmentResultsParams = {
    totalChangePercent: 0.13,
    totalChange: 245,
    predictedChange: 2500,
};

const mockedInvestments = [
    {name: 'Investment 1', changePercent: 0.09},
    {name: 'Investment 2', changePercent: 0},
    {name: 'Investment 3', changePercent: 0.3},
    {name: 'Investment 4', changePercent: 43},
    {name: 'Investment 5', changePercent: 23},
    {name: 'Investment 6', changePercent: 1},
    {name: 'Investment 7', changePercent: 3},
    {name: 'Investment 8', changePercent: 1},
];

const mockedPortfolioFilterOptions = ['All investments', 'Portfolio 1', 'Portfolio 2'];

export const PortfolioView: React.FC = () => {
    const filterOptions = mockedPortfolioFilterOptions;
    const [investmentsFilter, setInvestmentsFilter] = useState(filterOptions[0]);

    const {totalChangePercent, totalChange, predictedChange} = mockedInvestmentResultsParams;
    const handlePortfolioAdd = () => {};
    const handleInvestmentAdd = () => {};

    const handleSelectChange = (event: React.ChangeEvent<{value: unknown}>) => {
        setInvestmentsFilter(event.target.value as string);
    };

    return (
        <>
            <Container maxWidth="sm">
                <Box className={TopBox}>
                    <FormControl variant="outlined">
                        <Select value={investmentsFilter} onChange={handleSelectChange}>
                            {filterOptions.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
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
                <InvestmentResults totalChangePercent={totalChangePercent} totalChange={totalChange} predictedChange={predictedChange} />
                <Box className={InvestmentsTitleBox}>
                    <Separator text="Investments" />
                    <Fab size="small" color="primary" aria-label="add" onClick={handleInvestmentAdd}>
                        <AddIcon />
                    </Fab>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <Typography color="primary" variant="caption">
                            NAME
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography color="primary" variant="caption">
                            ANNUAL
                        </Typography>
                    </Grid>
                </Grid>
                <Box>
                    {mockedInvestments.map(({name, changePercent}) => (
                        <InvestmentItem key={name} name={name} changePercent={changePercent} />
                    ))}
                </Box>
            </Container>
        </>
    );
};
