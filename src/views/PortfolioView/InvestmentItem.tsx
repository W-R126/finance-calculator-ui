import {Grid, IconButton, Typography} from '@material-ui/core';
import React from 'react';
import * as format from '../../helpers/formatNumber';
import * as styles from './InvestmentItem.styles';
import {Link} from 'react-router-dom';
import {Routes} from '../../helpers/routes';
import {DeleteForever} from '@material-ui/icons';

interface Props {
    id: number;
    name: string;
    changePercent: number;
    riskPercent: number;
    onDelete: (id: number) => void;
}

export const InvestmentItem: React.FC<Props> = ({id, name, changePercent, riskPercent, onDelete}) => {
    return (
        <Grid container spacing={3} alignItems="center">
            <Grid item xs={4}>
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
                <IconButton
                    size={'medium'}
                    color="inherit"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                        onDelete(id);
                    }}
                >
                    <DeleteForever />
                </IconButton>
            </Grid>
            <Grid item xs>
                <Link className={styles.Link} to={`${Routes.INVESTMENT_CALCULATOR}?investmentId=${id}`}>
                    Details
                </Link>
            </Grid>
        </Grid>
    );
};
