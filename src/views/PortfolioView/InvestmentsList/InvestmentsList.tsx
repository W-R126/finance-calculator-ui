import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Data, Order} from './InvestmentsList.types';
import {getComparator, prepareInvestmentInput, stableSort} from './InvestmentsList.helpers';
import {InvestmentsListToolbar} from './InvestmentsListToolbar';
import {InvestmentsChange, MainBox, StyledPaper} from './InvestmentsList.styles';
import {InvestmentsListHead} from './InvestmentsListHead';
import {Portfolio, PortfolioInvestment} from '../../../api/portfoliosAPI.types';
import EditIcon from '@material-ui/icons/Edit';
import {Routes} from '../../../helpers/routes';
import {Box, IconButton, Typography} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {Delete} from '@material-ui/icons';
import * as format from '../../../helpers/formatNumber';

interface Props {
    portfolio: Portfolio;
    onDelete: (id: number) => void;
    investments: PortfolioInvestment[];
}

export const InvestmentsList: React.FC<Props> = ({portfolio, onDelete, investments}) => {
    const history = useHistory();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = prepareInvestmentInput(investments);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleModifyClick = (id: number) => {
        history.push(`${Routes.INVESTMENT_CALCULATOR}?investmentId=${id}`);
    };

    const handleDeleteClick = (id: number) => onDelete(id);

    return (
        <Box className={MainBox}>
            <Paper className={StyledPaper}>
                <InvestmentsListToolbar portfolio={portfolio} />
                <TableContainer>
                    <Table size="small">
                        <InvestmentsListHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" id={labelId} scope="row" padding="checkbox" size="small">
                                                <Typography>{row.name}</Typography>
                                            </TableCell>
                                            <TableCell align="left" size="small" padding="checkbox">
                                                <Typography color="secondary" className={InvestmentsChange}>
                                                    {format.asPercentage(row.risk * 100)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" size="small" padding="checkbox">
                                                <Typography className={InvestmentsChange}>
                                                    {format.asPercentage(row.rateOfReturnPercentage)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" size="small">
                                                <IconButton onClick={() => handleModifyClick(row.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteClick(row.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};
