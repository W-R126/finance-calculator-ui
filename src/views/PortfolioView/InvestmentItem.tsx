import {Box, Grid, IconButton, Typography} from '@material-ui/core';
import React from 'react';
import * as format from '../../helpers/formatNumber';
import * as styles from './InvestmentItem.styles';
import {Link} from 'react-router-dom';
import {Routes} from '../../helpers/routes';
import {DeleteForever} from '@material-ui/icons';
import {MainBox} from './InvestmentItem.styles';

interface Props {
    id: number;
    name: string;
    changePercent: number;
    riskPercent: number;
    onDelete: (id: number) => void;
}

export const InvestmentItem: React.FC<Props> = ({id, name, changePercent, riskPercent, onDelete}) => {
    return (
        <Box className={MainBox}>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs>
                    <Typography>{name}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography color="secondary" className={styles.InvestmentsChange}>
                        {format.asPercentage(riskPercent * 100)}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography className={styles.InvestmentsChange}>{format.asPercentage(changePercent)}</Typography>
                </Grid>
                <Grid item xs>
                    <Box>
                        <IconButton
                            size="medium"
                            color="inherit"
                            component="span"
                            onClick={() => {
                                onDelete(id);
                            }}
                        >
                            <DeleteForever />
                        </IconButton>
                        <Link className={styles.Link} to={`${Routes.INVESTMENT_CALCULATOR}?investmentId=${id}`}>
                            Details
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
