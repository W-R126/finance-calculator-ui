import {Button, Grid, Typography} from '@material-ui/core';
import React from 'react';
import * as format from '../../helpers/formatNumber';
import {InvestmentsChange} from './InvestmentItem.styles';

interface Props {
    name: string;
    changePercent: number;
    riskPercent: number;
}
export const InvestmentItem: React.FC<Props> = ({name, changePercent, riskPercent}) => {
    const handleDetailsClick = () => {};

    return (
        <>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={4}>
                    <Typography>{name}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography color="secondary" className={InvestmentsChange}>
                        {format.asPercentage(riskPercent)}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography className={InvestmentsChange}>{format.asPercentage(changePercent)}</Typography>
                </Grid>
                <Grid item xs>
                    <Button color="primary" onClick={handleDetailsClick}>
                        Details
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
