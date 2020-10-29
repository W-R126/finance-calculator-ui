import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import {useToolbarStyles} from './InvestmentsListToolbar.styles';
import {Routes} from '../../../../helpers/routes';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import {Portfolio} from '../../../../api/portfoliosAPI.types';

interface Props {
    numSelected: number;
    portfolio: Portfolio;
}

export const InvestmentsListToolbar: React.FC<Props> = ({numSelected, portfolio}) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Investments
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Add investment">
                    <Link
                        to={
                            portfolio.id !== 0
                                ? `${Routes.INVESTMENT_CALCULATOR}?portfolioId=${portfolio.id}`
                                : Routes.INVESTMENT_CALCULATOR
                        }
                    >
                        <Fab size="small" color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </Tooltip>
            )}
        </Toolbar>
    );
};
