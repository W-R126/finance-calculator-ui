import React from 'react';
import {TopBox} from './PortfolioView.styles';
import {Box, Fab, FormControl, Grid, IconButton, MenuItem, Select} from '@material-ui/core';
import {DeleteForever} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import {Portfolio} from '../../api/portfoliosAPI.types';

interface Props {
    portfolio: Portfolio;
    portfolios: Portfolio[];
    deleteCurrentPortfolio: () => void;
    handlePortfolioAdd: () => void;
    fetchPortfolio: (id: number) => void;
}

export const PortfolioViewControls: React.FC<Props> = ({
    portfolio,
    portfolios,
    deleteCurrentPortfolio,
    handlePortfolioAdd,
    fetchPortfolio,
}) => {
    const handleDeletePortfolio = () => deleteCurrentPortfolio();
    const handleSelectChange = (event: React.ChangeEvent<{value: unknown}>) => fetchPortfolio(event.target.value as number);

    return (
        <Box className={TopBox}>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl size={'small'} variant="outlined" fullWidth>
                        <Select value={portfolio.id} onChange={handleSelectChange}>
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
                </Grid>

                <Grid item xs={2}>
                    <Box display={'flex'} justifyContent={'center'} color={'red'}>
                        {portfolio.id !== 0 && (
                            <IconButton
                                size={'medium'}
                                color="inherit"
                                aria-label="upload picture"
                                component="span"
                                onClick={handleDeletePortfolio}
                            >
                                <DeleteForever />
                            </IconButton>
                        )}
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Fab style={{width: '100%'}} size="medium" variant="extended" color="primary" onClick={handlePortfolioAdd}>
                        <AddIcon />
                        Portfolio
                    </Fab>
                </Grid>
            </Grid>
        </Box>
    );
};
