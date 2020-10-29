import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {Data, Order} from './InvestmentsList.types';
import {headCells} from './InvestmentsList.constants';
import {Box, Typography} from '@material-ui/core';
import {VisuallyHidden} from './InvestmentsListHead.styles';

interface Props {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

export const InvestmentsListHead: React.FC<Props> = ({order, orderBy, onRequestSort}) => {
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false} padding="checkbox">
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" className={VisuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="checkbox">
                    <Typography variant="body2">Actions</Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
