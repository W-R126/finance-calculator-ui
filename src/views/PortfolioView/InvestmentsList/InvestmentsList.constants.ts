import {HeadCell} from './InvestmentsList.types';

export const rows = [
    {name: 'Investment1', risk: 1.33, change: 112},
    {name: 'Investment2', risk: 1.13, change: 122},
    {name: 'Investment3', risk: 1.43, change: 12},
];

export const headCells: HeadCell[] = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'risk', numeric: true, disablePadding: false, label: 'Risk'},
    {id: 'change', numeric: true, disablePadding: false, label: 'Change'},
];
