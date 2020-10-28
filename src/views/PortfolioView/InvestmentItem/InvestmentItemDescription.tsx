import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {css} from 'emotion';

export const InvestmentItemDescription: React.FC = () => (
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
);
