import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import {Routes} from '../../../helpers/routes';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import {Portfolio} from '../../../api/portfoliosAPI.types';
import {css} from 'emotion';

interface Props {
    portfolio: Portfolio;
}

export const InvestmentsListToolbar: React.FC<Props> = ({portfolio}) => (
    <Toolbar>
        <Typography
            className={css`
                flex: 1 1 100%;
            `}
            variant="h6"
            id="tableTitle"
            component="div"
        >
            Investments
        </Typography>
        <Tooltip title="Add investment">
            <Link to={portfolio.id !== 0 ? `${Routes.INVESTMENT_CALCULATOR}?portfolioId=${portfolio.id}` : Routes.INVESTMENT_CALCULATOR}>
                <Fab size="small" color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Link>
        </Tooltip>
    </Toolbar>
);
