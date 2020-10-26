import {Box, Grid, IconButton, Menu, MenuItem, Typography} from '@material-ui/core';
import {MoreHoriz} from '@material-ui/icons';
import React from 'react';
import {useHistory} from 'react-router';
import * as format from '../../helpers/formatNumber';
import {Routes} from '../../helpers/routes';
import * as styles from './InvestmentItem.styles';
import {MainBox} from './InvestmentItem.styles';

interface Props {
    id: number;
    name: string;
    changePercent: number;
    riskPercent: number;
    onDelete: (id: number) => void;
}

export const InvestmentItem: React.FC<Props> = ({id, name, changePercent, riskPercent, onDelete}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const history = useHistory();
    const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMoreClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box className={MainBox}>
            <Grid container spacing={2} alignItems="center">
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
                    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMoreClose}>
                        <MenuItem
                            onClick={() => {
                                onDelete(id);
                            }}
                        >
                            Delete
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                history.push(`${Routes.INVESTMENT_CALCULATOR}?investmentId=${id}`);
                            }}
                        >
                            Modify
                        </MenuItem>
                    </Menu>
                    <IconButton color="inherit" component="span" onClick={handleMoreClick}>
                        <MoreHoriz color="primary" />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};
